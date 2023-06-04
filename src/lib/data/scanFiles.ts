import { Entry, Link, Event } from "@prisma/client";
import prisma from "./prisma";
import { mkdir, readFile, stat, watch } from "node:fs/promises";
import path, { extname } from "node:path";
import { getFiles } from "@/lib/files";
import { analyzeMD } from "./parseMD";
import { notebookDir } from "../notebookDir";

export interface Data {
  entry: Entry;
  tags: string[];
  links: Omit<Link, "id" | "sourceId">[];
  event: Omit<Event, "id" | "entryId"> | null;
}

export interface FileEntry {
  id: string;
  mtime: number;
}

const defaultEntry = {
  asset: null,
  title: null,
  wordCount: 0,
};

const defaultData = {
  tags: [] as Data["tags"],
  links: [] as Data["links"],
  event: null,
};

// this is a test helper
export function mergeDefaults<T extends { entry: Partial<Entry> }>(data: T) {
  return { ...defaultData, ...data, entry: { ...defaultEntry, ...data.entry } };
}

async function update(data: Data) {
  const op = {
    ...data.entry,
    event: data.event ? { create: data.event } : undefined,
    links: { create: data.links },
    tags: {
      create: data.tags.map((tag) => ({
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
    prisma.event.deleteMany({ where: { entryId: data.entry.id } }),
    prisma.link.deleteMany({ where: { sourceId: data.entry.id } }),
    prisma.tagsOnEntries.deleteMany({
      where: { entryId: data.entry.id },
    }),
    prisma.entry.upsert({
      where: {
        id: data.entry.id,
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

async function scanFile(notebookDir: string, id: string, entry?: FileEntry) {
  const fullPath = path.join(notebookDir, id);
  let mtime: number;
  try {
    mtime = (await stat(fullPath)).mtimeMs;
  } catch (err) {
    remove(id);
    return 0;
  }
  if (entry?.mtime === mtime) return 0;
  const raw = await readFile(fullPath, "utf8");
  let data: Awaited<ReturnType<typeof analyzeMD>>;
  try {
    data = await analyzeMD({ id, mtime }, raw);
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
  await mkdir(notebookDir, { recursive: true });
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
      scanFile(notebookDir, filename);
    }, 300);
    oldFilename = filename;
  }
}

let done: Promise<void>;
export function setup() {
  done ??= scanFiles(notebookDir);
  return done;
}
