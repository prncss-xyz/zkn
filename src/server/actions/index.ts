"use server";

import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import prisma from "../data/prisma";
import { incFrecency } from "../data/frecency";

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

const idToLastUpdated = new Map<string, number>();
const updateThreshold = 1000 * 3600;

export async function updateFrecency({ id, frecency }: NoteEntry) {
  const lastUpdated = idToLastUpdated.get(id);
  const now = Date.now();
  if (!lastUpdated || now - lastUpdated > updateThreshold) {
    await prisma.entry.update({
      where: { id },
      data: { frecency: incFrecency(frecency, 1) },
    });
  }
  idToLastUpdated.set(id, now);
}
