import { Box } from "@/app/components/box";
import { setup } from "@/lib/data/scanFiles";
import { basename, sep } from "node:path";
import prisma from "@/lib/data/prisma";
import { titleSorter } from "@/app/utils/titleSorter";
import { Link } from "@/app/components/link";
import { Navigator } from "@/app/components/navigator";
import { ISearch, searchToQuery } from "@/app/utils/search";
import { searchToWhere } from "@/app/server/where";
import { getNotebookConfig } from "@/lib/data/notebookConfig";

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
        <Link
          key={entry.id}
          p={5}
          borderStyle="top"
          borderWidth={1}
          borderColor="background"
          // this makes the whole width of the box clickable
          display="flex"
          flexDirection="column"
          href={`note/${entry.id}`}
        >
          {entry.title ? entry.title : <code>{basename(entry.id)}</code>}
        </Link>
      ))}
    </Box>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: ISearch;
}) {
  await setup();
  const query = searchToQuery(searchParams);
  const where = searchToWhere(query);
  const entries = await prisma.entry.findMany({
    select: {
      id: true,
      title: true,
      mtime: true,
      tags: { select: { tagId: true } },
      event: true,
    },
    where,
    orderBy: { id: "asc" },
  });
  const config = await getNotebookConfig();
  const hrefObj = { pathname: "/notes", query };
  return (
    <Box display="flex" flexDirection="column" gap={20}>
      <Navigator
        hrefObj={hrefObj}
        entries={entries}
        config={config}
        sep={sep}
      />

      <Notes entries={entries} />
    </Box>
  );
}
