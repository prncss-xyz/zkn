import { Box } from "@/app/components/box";
import Link from "next/link";
import { setup } from "@/lib/data/scanFiles";
import { group } from "moderndash";
import { basename, dirname } from "node:path";
import prisma from "@/lib/data/prisma";
import {
  IEntriesFromSearch,
  whereFromSearch,
} from "@/app/utils/whereFromSearch";
import { titleSorter } from "@/app/utils/titleSorter";

interface IEntry {
  id: string;
  title: string | null;
}

function Notes({ entries }: { entries: IEntry[] }) {
  entries.sort(titleSorter);
  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundColor="foreground2"
      borderRadius={{ xs: 0, md: 5 }}
    >
      {entries.map((entry) => (
        <Box
          key={entry.id}
          p={5}
          borderStyle="top"
          borderWidth={1}
          borderColor="background"
          // this makes the whole width of the box clickable
          display="flex"
          flexDirection="column"
        >
          <Link href={`note/${entry.id}`}>
            {entry.title ? entry.title : <code>{basename(entry.id)}</code>}
          </Link>
        </Box>
      ))}
    </Box>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: IEntriesFromSearch;
}) {
  await setup();
  const entries = await prisma.entry.findMany({
    select: { id: true, title: true, mtime: true },
    where: whereFromSearch(searchParams),
    orderBy: { id: "asc" },
  });

  const grouped = group(entries, (entry) => dirname(entry.id));
  return (
    <Box display="flex" flexDirection="column" gap={20}>
      {Object.entries(grouped).map(([p, entries]) => (
        <Box display="flex" flexDirection="column" gap={5} key={p}>
          <Box fontFamily="monospace">{p || "."}</Box>
          <Notes entries={entries} />
        </Box>
      ))}
    </Box>
  );
}
