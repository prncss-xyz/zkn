"use server";

import prisma from "../data/prisma";

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
