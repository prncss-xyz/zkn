"use server";

import matter from "gray-matter";
import path from "path";
import { notebookDir } from "../notebookDir";
import prisma from "./prisma";
import { scanFiles } from "./scanFiles";
import fs from "node:fs/promises";

let done: Promise<void>;

function setup() {
  done ??= scanFiles(notebookDir);
  return done;
}

export async function getEntries() {
  await setup();
  return await prisma.entry.findMany({
    select: {
      id: true,
      title: true,
    },
  });
}

export async function getContent(id: string) {
  const file = path.join(notebookDir, id);
  const raw = await fs.readFile(file, "utf8");
  const { content } = matter(raw);
  return content;
}

export async function getEntry(id: string) {
  await setup();
  return await prisma.entry.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
    },
  });
}
