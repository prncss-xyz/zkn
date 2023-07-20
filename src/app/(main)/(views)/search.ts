import prisma from "@/server/data/prisma";

import { searchToOrderBy, whereScalars } from "@/fields/scalars/where";
import { getNotebookConfig } from "@/server/data/notebookConfig";
import { whereBacklinks } from "@/fields/backlink/where";
import { whereDir } from "@/fields/dir/where";
import { whereKanban } from "@/fields/kanban/where";
import { whereTags } from "@/fields/tags/where";
import { whereVirtualTags } from "@/fields/virtualTags/where";
import { whereAsset } from "@/fields/asset/where";
import { mergeAll } from "rambda";

export type ISearch = { [key: string]: string };

export type NotesEntry = Awaited<ReturnType<typeof getEntries>>[0];

export type Where = Exclude<
  Exclude<Parameters<typeof prisma.entry.findMany>[0], undefined>["where"],
  undefined
>;

export const noteEntry0: NotesEntry = {
  id: "",
  title: null,
  mtime: new Date(),
  event: null,
  links: [],
  due: null,
  since: null,
  until: null,
  asset: null,
  assetType: null,
  tags: [],
};

export async function getEntries(params: URLSearchParams) {
  const notebookConfig = await getNotebookConfig();
  const where = mergeAll([
    whereScalars(params),
    whereDir(params),
    whereAsset(params),
    whereTags(notebookConfig, params),
    whereVirtualTags(params),
    whereBacklinks(params),
    whereKanban(notebookConfig, params),
  ]) as Where;
  const orderBy = searchToOrderBy(params);
  return await prisma.entry.findMany({
    select: {
      id: true,
      title: true,
      mtime: true,
      due: true,
      since: true,
      until: true,
      tags: { select: { tagId: true } },
      event: true,
      links: { select: { id: true } },
      asset: true,
      assetType: true,
    },
    where,
    orderBy,
  });
}
