import prisma from "@/lib/data/prisma";
import { Box } from "@/app/components/box";
import Link from "next/link";
import { setup } from "@/lib/data/scanFiles";
import { group } from "moderndash";
import { dirname } from "node:path";

interface IEntry {
  id: string;
  title: string | null;
}

function cmp(a: any, b: any) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function sortByTitle(a: IEntry, b: IEntry) {
  if (!a.title && !b.title) {
    return cmp(a.id, b.id);
  }
  if (!a.title) return -1;
  if (!b.title) return 1;
  return cmp(a.title, b.title);
}

function Notes({ entries }: { entries: IEntry[] }) {
  entries.sort(sortByTitle);
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
          color="link"
          fontWeight="bold"
          p={5}
          borderStyle="top"
          borderWidth={1}
          borderColor="background"
          // this makes the whole width of the box clickable
          display="flex"
          flexDirection="column"
        >
          <Link href={`note/${entry.id}`}>
            {entry.title ? entry.title : <i>{entry.id}</i>}
          </Link>
        </Box>
      ))}
    </Box>
  );
}

export default async function Page() {
  await setup();
  const entries = await prisma.entry.findMany({
    select: { id: true, title: true, mtime: true },
    orderBy: { id: "asc" },
  });
  const grouped = group(entries, (entry) => dirname(entry.id));
  return (
    <Box display="flex" flexDirection="column" gap={20}>
      {Object.entries(grouped).map(([p, entries]) => (
        <Box display="flex" flexDirection="column" gap={5} key={p}>
          <Box>
            <code>{p || "."}</code>
          </Box>
          <Notes entries={entries} />
        </Box>
      ))}
    </Box>
  );
}
