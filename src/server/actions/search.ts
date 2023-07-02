import prisma from "@/server/data/prisma";
import { searchToOrderBy } from "../../components/navigator/scalar/where";
import { sep } from "node:path";

import * as Dir from "@/components/navigator/dir/where";
import * as Tag from "@/components/navigator/tag/where";
import * as Scalar from "@/components/navigator/scalar/where";

export type ISearch = { [key: string]: string };

export type IEntry = Awaited<ReturnType<typeof getEntries>>[0];

export async function getEntries(params: URLSearchParams) {
  const where = {
    ...Scalar.where(params),
    ...Dir.where(params, sep),
    ...Tag.where(params),
  };
  const orderBy = searchToOrderBy(params);
  return await prisma.entry.findMany({
    select: {
      id: true,
      title: true,
      mtime: true,
      tags: { select: { tagId: true } },
      event: true,
    },
    where,
    orderBy,
  });
}
