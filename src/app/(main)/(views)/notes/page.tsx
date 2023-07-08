import { Box } from "@/components/box";
import { setup } from "@/server/data/scanFiles";
import { basename } from "node:path";
import { Link } from "@/components/link";
import { Navigator } from "@/components/navigator";
import { ISearch, getEntries } from "@/app/(main)/(views)/search";
import { getNotebookConfig } from "@/server/data/notebookConfig";

export const dynamic = "force-dynamic";

interface IEntry {
  id: string;
  title: string | null;
}

function Notes({ entries }: { entries: IEntry[] }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="screenMaxWidth"
      backgroundColor="foreground2"
      borderRadius={{ xs: 0, md: 5 }}
    >
      <Box p={5}>{`${entries.length} notes`}</Box>
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
    <>
      <Navigator entries={entries} config={config} />
      <Notes entries={entries} />
    </>
  );
}
