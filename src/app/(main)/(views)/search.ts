import prisma from "@/server/data/prisma";

import * as Dir from "@/fields/dir/where";
import * as Tag from "@/fields/tags/where";
import * as VirtualTag from "@/fields/virtualTags/where";
import * as Scalar from "@/fields/scalars/where";
import * as Link from "@/fields/link/where";
import * as Backlink from "@/fields/backlink/where";
import { searchToOrderBy } from "@/fields/scalars/where";

export type ISearch = { [key: string]: string };

export type NotesEntry = Awaited<ReturnType<typeof getEntries>>[0];

export type Where = Exclude<
  Parameters<typeof prisma.entry.findMany>[0],
  undefined
>["where"];

export async function getEntries(params: URLSearchParams) {
  const where = {
    ...Scalar.where(params),
    ...Dir.where(params),
    ...Tag.where(params),
    ...VirtualTag.where(params),
    ...Link.where(params),
    ...Backlink.where(params),
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
