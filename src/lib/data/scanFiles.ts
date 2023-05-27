import { Entry, Link, Event } from "@prisma/client";
import prisma from "./prisma";
import fs from "node:fs/promises";
import path from "node:path";
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
  mtime: bigint;
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
  const mtime = BigInt(Math.floor((await fs.stat(fullPath)).mtimeMs));
  if (entry?.mtime === mtime) return 0;
  const raw = await fs.readFile(fullPath, "utf8");
  let data: Awaited<ReturnType<typeof analyzeMD>> | undefined;
  try {
    data = await analyzeMD({ id, mtime }, raw);
  } catch (err) {
    if (entry) await remove(id);
    console.error(`error in file ${id}:`, err);
  }
  console.log("updating", id);
  if (!data) throw new Error("faulty logic");
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
  await fs.mkdir(notebookDir, { recursive: true });
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

export async function watchFiles(notebookDir: string) {
  // TODO:
}

export async function setup() {
  scanFiles(notebookDir);
}
