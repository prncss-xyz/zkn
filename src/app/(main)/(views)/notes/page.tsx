import { Box } from "@/components/box";
import { setup } from "@/server/data/scanFiles";
import { basename } from "node:path";
import { Link } from "@/components/link";
import { Navigator } from "@/components/navigator";
import { ISearch, getEntries } from "../search";
import { getNotebookConfig } from "@/server/data/notebookConfig";
import { processNotes } from "@/components/navigator/processNotes";

export const dynamic = "force-dynamic";

interface IEntry {
  id: string;
  title: string | null;
}

function Note({ entry }: { entry: IEntry }) {
  return (
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
      fontFamily={entry.title ? undefined : "monospace"}
    >
      {entry.title || basename(entry.id)}
    </Link>
  );
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
      {entries.map((entry) => (
        <Note key={entry.id} entry={entry} />
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
  const notebookConfig = await getNotebookConfig();
  const processed = processNotes(notebookConfig, params, entries);
  return (
    <>
      <Navigator processed={processed} />
      <Box display="flex" flexDirection="column" width="screenMaxWidth" gap={5}>
        <Box display="flex" flexDirection="row">
          <Box>{processed.entries.length} notes</Box>
        </Box>
        <Notes entries={processed.entries} />
      </Box>
    </>
  );
}
