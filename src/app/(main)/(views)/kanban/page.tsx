import { Box } from "@/components/box";
import { getPrefixLen } from "@/utils/prefixLen";
import { Navigator } from "@/components/navigator";
import { getNotebookConfig } from "@/server/data/notebookConfig";
import { Link } from "@/components/link";
import { setup } from "@/server/data/scanFiles";
import { ISearch, getEntries } from "../search";

export const dynamic = "force-dynamic";

// wether to hide empty kanban columns
const dense = true;

interface IEntry {
  id: string;
  title: string | null;
  mtime: number;
  tags: { tagId: string }[];
}

function Column({
  tag: tagId,
  prefixLen,
  entries,
}: {
  tag: string;
  prefixLen: number;
  entries: IEntry[];
}) {
  const entries_ = entries.filter((entry) =>
    entry.tags.some(({ tagId: tagId_ }) => tagId_ === tagId)
  );
  if (dense && entries_.length === 0) return null;
  return (
    <Box
      flexShrink={0}
      width="kanbanWidth"
      display="flex"
      flexDirection="column"
      gap={5}
    >
      <Link
        backgroundColor="foreground2"
        py={5}
        borderRadius={5}
        textAlign="center"
        href={`/notes/?tags=${tagId}`}
      >
        {tagId.slice(prefixLen)}
      </Link>
      {entries_.map((entry) => (
        <Link
          key={entry.id}
          href={`note/${entry.id}`}
          backgroundColor="foreground1"
          borderRadius={5}
          p={5}
          display="flex"
          flexDirection="column"
        >
          {entry.title ? entry.title : <i>{entry.id}</i>}
        </Link>
      ))}
    </Box>
  );
}

async function Kanban({
  workflow,
  tags,
  entries,
}: {
  workflow: string;
  tags: string[];
  entries: IEntry[];
}) {
  if (!workflow)
    return (
      <Box px={{ s: 5, md: 0 }}>
        A proper workflow needs to be configured in file{" "}
        <code>.notebook.yaml</code>
      </Box>
    );
  if (tags.length === 0)
    return (
      <Box px={{ s: 5, md: 0 }}>
        The workflow <i>{workflow}</i> does not exist or is empty.
      </Box>
    );
  return (
    <Box
      px={{ s: 5, md: 0 }}
      minWidth="screenMaxWidth"
      maxWidth="100%"
      display="flex"
      flexDirection="row"
      overflowX="scroll"
      gap={10}
      rowGap={20}
      pb={40}
    >
      {tags.map((tag) => (
        <Column
          key={tag}
          tag={tag}
          entries={entries}
          prefixLen={getPrefixLen(tags)}
        />
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
  const config = await getNotebookConfig();
  const kanban = config.kanban;
  const workflows = Object.keys(kanban);
  const workflow = searchParams.workflow ?? workflows[0] ?? "";
  const tags = kanban[workflow] ?? [];
  const params = new URLSearchParams(searchParams);
  const entries = await getEntries(params);
  return (
    <>
      <Navigator entries={entries} config={config} />
      {/* @ts-ignore */}
      <Kanban workflow={workflow} tags={tags} entries={entries} />
    </>
  );
}
