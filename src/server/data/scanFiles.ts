import prisma from "./prisma";
import { readFile, stat, watch } from "node:fs/promises";
import path, { extname } from "node:path/posix";
import { ParseMD, parseMD } from "./parseMD";
import { notebookDir } from "../notebookDir";
import { getFiles } from "../files";
import { normalizePath } from "@/utils/path";

export interface FileEntry {
  id: string;
  mtime: Date;
}

async function update({ data, relations }: ParseMD) {
  const op = {
    ...data,
    event: relations.event ? { create: relations.event } : undefined,
    links: { create: relations.links },
    tags: {
      create: relations.tags.map((tag) => ({
        tag: {
          connectOrCreate: {
            where: {
              id: tag,
            },
            create: {
              id: tag,
            },
          },
        },
      })),
    },
  };
  await prisma.$transaction([
    prisma.event.deleteMany({ where: { entryId: data.id } }),
    prisma.link.deleteMany({ where: { sourceId: data.id } }),
    prisma.tagsOnEntries.deleteMany({
      where: { entryId: data.id },
    }),
    prisma.entry.upsert({
      where: {
        id: data.id,
      },
      create: op,
      update: op,
    }),
  ]);
}

async function remove(id: string) {
  await prisma.entry.delete({
    where: { id },
  });
}

function isSameDate(e: Date | undefined, d: Date) {
  if (!e) return false;
  return e.getTime() === d.getTime();
}

async function scanFile(notebookDir: string, id: string, entry?: FileEntry) {
  const fullPath = path.join(notebookDir, id);
  let mtime: Date;
  try {
    mtime = (await stat(fullPath)).mtime;
  } catch (err) {
    remove(id);
    return 0;
  }
  if (isSameDate(entry?.mtime, mtime)) return 0;
  const raw = await readFile(fullPath, "utf8");
  let data: Awaited<ReturnType<typeof parseMD>>;
  try {
    data = await parseMD({ id, mtime }, raw);
  } catch (err) {
    if (entry) await remove(id);
    console.error(`error in file "${id}":`, err);
    return 0;
  }
  console.log("updating", id);
  await update(data);
  return 1;
}

export async function scanFiles(notebookDir: string) {
  const entries = await prisma.entry.findMany({
    select: {
      id: true,
      mtime: true,
    },
  });
  const startTime = Date.now();
  const noteIndex = new Map<string, FileEntry>();
  for (const entry of entries) {
    noteIndex.set(entry.id, entry);
  }
  const updates: Promise<number>[] = [];
  const removes: Promise<void>[] = [];
  for await (const id of getFiles(notebookDir)) {
    const ext = path.extname(id);
    if (ext !== ".md") continue;
    const entry = noteIndex.get(id);
    if (entry) noteIndex.delete(id);
    updates.push(scanFile(notebookDir, id, entry));
  }
  for (const entry of noteIndex.values()) {
    console.log("removing", entry.id);
    removes.push(remove(entry.id));
  }
  const updateCount = (await Promise.all(updates)).reduce(
    (sum, x) => sum + x,
    0
  );
  const deleteCount = (await Promise.all(removes)).length;
  const endTime = Date.now();
  console.log(`${updateCount} files updated`);
  console.log(`${deleteCount} files deleted`);
  console.log(`in ${endTime - startTime} ms`);
}

// recursively watch files from notebook dir;
// debouncing events
export async function watchFiles(notebookDir: string) {
  let oldFilename: string = "";
  let handle: NodeJS.Timeout | null = null;
  const watcher = watch(notebookDir, { persistent: false, recursive: true });
  for await (const event of watcher) {
    const { filename } = event;
    if (!filename || extname(filename) !== ".md") continue;
    if (handle && filename === oldFilename) {
      clearTimeout(handle);
    }
    handle = setTimeout(() => {
      scanFile(notebookDir, normalizePath(filename));
    }, 300);
    oldFilename = filename;
  }
}

async function setup_() {
  await scanFiles(notebookDir);
  // lauch but do not wait
  watchFiles(notebookDir);
}

let done: Promise<void>;
export function setup() {
  done ??= setup_();
  return done;
}
