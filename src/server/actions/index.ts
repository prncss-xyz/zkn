"use server";

import matter from "gray-matter";
import path from "path";
import { notebookDir } from "../notebookDir";
import fs from "node:fs/promises";
import prisma from "../data/prisma";

export async function getContent(id: string) {
  const file = path.join(notebookDir, id);
  try {
    const raw = await fs.readFile(file, "utf8");
    const { content } = matter(raw);
    return content;
  } catch (_) {
    return null;
  }
}

export async function getTitle(link: string) {
  const res = await prisma.entry.findUnique({
    where: { id: link },
    select: {
      title: true,
    },
  });
  const title = res?.title ?? link;
  const status = res ? (res.title ? "untitled" : "plain") : "broken";
  return { title, status };
}

export async function getIdToTitle(links: string[]) {
  return Object.fromEntries(
    await Promise.all(
      links.map(async (link) => {
        const res = await getTitle(link);
        return [link, res] as const;
      })
    )
  );
}

export async function getBacklinks(id: string) {
  return await prisma.link.findMany({
    where: {
      targetId: id,
    },
    select: {
      sourceId: true,
      context: true,
      rank: true,
    },
  });
}
