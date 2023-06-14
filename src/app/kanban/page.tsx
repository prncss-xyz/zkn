import { Box } from "@/app/components/box";
import { getPrefixLen } from "@/app/utils/prefixLen";
import { getNotebookConfig } from "@/lib/data/notebookConfig";
import prisma from "@/lib/data/prisma";
import { setup } from "@/lib/data/scanFiles";
import { Link } from "../components/link";
import { Navigator } from "../components/navigator";
import { sep } from "node:path";
import { ISearch, searchToQuery } from "../components/search";
import { searchToWhere } from "../components/where";
import { maxH } from "../(main)/components/maxH.css";

// wether to hide empty kanban columns
const dense = true;

interface IEntry {
  id: string;
  title: string | null;
  mtime: number;
  tags: { tagId: string }[];
}

async function Column({
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
        // @ts-ignore
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

export default async function Layout({
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
  const query = searchToQuery(searchParams);
  // no need of/cannot use useCallback since it is a server component
  const where = { ...searchToWhere(query) };
  const entries = await prisma.entry.findMany({
    select: {
      id: true,
      title: true,
      mtime: true,
      tags: { select: { tagId: true } },
    },
    where,
    orderBy: { mtime: "asc" },
  });
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      gap={20}
      className={maxH} 
    >
      <Box
        width="screenMaxWidth"
        display="flex"
        flexDirection="column"
        gap={20}
      >
        <Navigator
          hrefObj={{ pathname: "/kanban", query }}
          entries={entries}
          config={config}
          sep={sep}
        />
      </Box>
      {/* @ts-ignore */}
      <Kanban workflow={workflow} tags={tags} entries={entries} />
    </Box>
  );
}
