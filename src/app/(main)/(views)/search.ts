import prisma from "@/server/data/prisma";

import { searchToOrderBy, whereScalars } from "@/fields/scalars/where";
import { getNotebookConfig } from "@/server/data/notebookConfig";
import { whereBacklinks } from "@/fields/backlink/where";
import { whereDir } from "@/fields/dir/where";
import { whereKanban } from "@/fields/kanban/where";
import { whereLink } from "@/fields/link/where";
import { whereTags } from "@/fields/tags/where";
import { whereVirtualTags } from "@/fields/virtualTags/where";

export type ISearch = { [key: string]: string };

export type NotesEntry = Awaited<ReturnType<typeof getEntries>>[0];

export type Where = Exclude<
  Parameters<typeof prisma.entry.findMany>[0],
  undefined
>["where"];

export async function getEntries(params: URLSearchParams) {
  const notebookConfig = await getNotebookConfig();
  const where = {
    ...whereScalars(params),
    ...whereDir(params),
    ...whereTags(params),
    ...whereVirtualTags(params),
    ...whereLink(params),
    ...whereBacklinks(params),
    ...whereKanban(notebookConfig, params),
  };
  const orderBy = searchToOrderBy(params);
  return await prisma.entry.findMany({
    select: {
      id: true,
      title: true,
      mtime: true,
      tags: { select: { tagId: true } },
      event: true,
      links: { select: { id: true } },
      backlinks: { select: { id: true } },
    },
    where,
    orderBy,
  });
}
