import prisma from "@/lib/data/prisma";
import { searchToOrderBy } from "../components/navigator/scalar/where";
import { searchToWhere } from "../server/where";

export type ISearch = { [key: string]: string };

export type IEntry = Awaited<ReturnType<typeof getEntries>>[0];

export async function getEntries(params: URLSearchParams) {
  const where = searchToWhere(params);
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
