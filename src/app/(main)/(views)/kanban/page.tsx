import { Box } from "@/components/box";
import { getPrefixLen } from "@/utils/prefixLen";
import { Navigator } from "@/components/navigator";
import { Link } from "@/components/link";
import { setup } from "@/server/data/scanFiles";
import { ISearch, NotesEntry, getEntries } from "../search";
import { getTags } from "@/fields/kanban/utils";
import { getNotebookConfig } from "@/server/data/notebookConfig";

export const dynamic = "force-dynamic";

// wether to hide empty kanban columns
const dense = true;

function Column({
  tag: tagId,
  prefixLen,
  entries,
}: {
  tag: string;
  prefixLen: number;
  entries: NotesEntry[];
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
  kanban,
  entries,
}: {
  kanban: string;
  entries: NotesEntry[];
}) {
  if (!kanban)
    return (
      <Box px={{ s: 5, md: 0 }}>
        A proper workflow needs to be configured in file{" "}
        <code>.notebook.yaml</code>
      </Box>
    );
  const notebookConfig = await getNotebookConfig();
  const tags = getTags(notebookConfig, kanban);
  if (tags.length === 0)
    return (
      <Box px={{ s: 5, md: 0 }}>
        The workflow <i>{kanban}</i> does not exist or is empty.
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
  const kanban = searchParams.kanban ?? "";
  const params = new URLSearchParams(searchParams);
  const entries = await getEntries(params);
  return (
    <>
      {/* @ts-ignore */}
      <Navigator entries={entries} />
      {/* @ts-ignore */}
      <Kanban kanban={kanban} entries={entries} />
    </>
  );
}
