import { Box } from "@/components/box";
import { setup } from "@/server/data/scanFiles";
import { basename, sep } from "node:path";
import { Link } from "@/components/link";
import { Navigator } from "@/components/navigator";
import { ISearch, getEntries } from "@/server/actions/search";
import { getNotebookConfig } from "@/server/data/notebookConfig";

interface IEntry {
  id: string;
  title: string | null;
}

function Notes({ entries }: { entries: IEntry[] }) {
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
  const params = new URLSearchParams(searchParams);
  const entries = await getEntries(params);
  const config = await getNotebookConfig();
  return (
    <Box display="flex" flexDirection="column" gap={20}>
      <Navigator entries={entries} config={config} sep={sep} />
      <Notes entries={entries} />
    </Box>
  );
}
