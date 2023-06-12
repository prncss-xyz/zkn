import { Box } from "@/app/components/box";
import { setup } from "@/lib/data/scanFiles";
import { group } from "moderndash";
import { basename, sep } from "node:path";
import prisma from "@/lib/data/prisma";
import { titleSorter } from "@/app/utils/titleSorter";
import { Link } from "@/app/components/link";
import { dirname } from "@/app/utils/dirname";
import { Navigator } from "@/app/components/navigator";
import { ISearch, searchToQuery } from "@/app/components/search";
import { searchToWhere } from "@/app/components/where";
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
    },
    where,
    orderBy: { id: "asc" },
  });
  const grouped = group(entries, (entry) => dirname(sep, entry.id));
  const config = await getNotebookConfig();
  return (
    <Box display="flex" flexDirection="column" gap={20}>
      <Navigator
        hrefObj={{ pathname: "/notes", query }}
        entries={entries}
        config={config}
        sep={sep}
      />
      <Box display="flex" flexDirection="column" gap={20}>
        {Object.entries(grouped).map(([p, entries]) => (
          <Box display="flex" flexDirection="column" gap={5} key={p}>
            <Box fontFamily="monospace" px={{ xs: 5, md: 0 }}>
              {p || "."}
            </Box>
            <Notes entries={entries} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
