import { Box } from "@/app/components/box";
import { getPrefixLen } from "@/app/utils/prefixLen";
import { getNotebookConfig } from "@/lib/data/notebookConfig";
import prisma from "@/lib/data/prisma";
import { setup } from "@/lib/data/scanFiles";
import Link from "next/link";
import { Nav } from "../(main)/nav";
import { sprinkles } from "@/sprinkles.css";
import { IEntriesFromSearch, whereFromSearch } from "../utils/whereFromSearch";

// wether to hide empty kanban columns
const dense = true;

async function Column({
  tag: tagId,
  prefixLen,
  searchParams,
}: {
  tag: string;
  prefixLen: number;
  searchParams: IEntriesFromSearch;
}) {
  const searchTag = searchParams.tags ? `${searchParams.tags} ${tagId}` : tagId;
  searchParams = {
    ...searchParams,
    tags: searchTag,
  };
  const entries = await prisma.entry.findMany({
    select: { id: true, title: true, mtime: true },
    where: whereFromSearch(searchParams),
    orderBy: { mtime: "asc" },
  });
  if (dense && entries.length === 0) return null;
  return (
    <Box
      flexShrink={0}
      width="kanbanWidth"
      display="flex"
      flexDirection="column"
      gap={5}
    >
      <Link
        className={sprinkles({
          backgroundColor: "foreground2",
          py: 5,
          borderRadius: 5,
          textAlign: "center",
        })}
        href={`/notes/?tags=${tagId}`}
      >
        {tagId.slice(prefixLen)}
      </Link>
      {entries.map((entry) => (
        <Box
          key={entry.id}
          backgroundColor="foreground1"
          borderRadius={5}
          p={5}
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

function WorkflowSelector({
  workflow,
  workflows,
}: {
  workflow: string;
  workflows: string[];
}) {
  if (workflows.length === 0) return null;
  return (
    <Box
      px={{ s: 5, md: 0 }}
      width="screenMaxWidth"
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
    >
      {workflows.map((workflow_) =>
        workflow_ === workflow ? (
          <Box
            key={workflow_}
            fontWeight="bold"
            px={5}
            borderRadius={3}
            backgroundColor="foreground1"
          >
            {workflow_}
          </Box>
        ) : (
          <Box key={workflow_} px={5}>
            <Link
              href={{
                pathname: "kanban",
                query: { workflow: workflow_ },
              }}
            >
              {workflow_}
            </Link>
          </Box>
        )
      )}
    </Box>
  );
}

async function Kanban({
  workflow,
  tags,
  searchParams,
}: {
  workflow: string;
  tags: string[];
  searchParams: IEntriesFromSearch;
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
          prefixLen={getPrefixLen(tags)}
          searchParams={searchParams}
        />
      ))}
    </Box>
  );
}

export default async function Layout({
  searchParams,
}: {
  searchParams: {
    workflow?: string;
  } & IEntriesFromSearch;
}) {
  await setup();
  const config = await getNotebookConfig();
  const kanban = config.kanban;
  const workflows = Object.keys(kanban);
  const workflow = searchParams.workflow ?? workflows[0] ?? "";
  const tags = kanban[workflow] ?? [];
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      gap={20}
    >
      <Box
        width="screenMaxWidth"
        display="flex"
        flexDirection="column"
        gap={20}
      >
        <Nav />
        <WorkflowSelector workflow={workflow} workflows={workflows} />
      </Box>
      {/* @ts-ignore */}
      <Kanban workflow={workflow} tags={tags} searchParams={searchParams} />
    </Box>
  );
}
