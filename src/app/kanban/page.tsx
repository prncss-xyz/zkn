import { Box } from "@/app/components/box";
import { getPrefixLen } from "@/app/utils/prefixLen";
import { getNotebookConfig } from "@/lib/data/notebookConfig";
import prisma from "@/lib/data/prisma";
import { setup } from "@/lib/data/scanFiles";
import Link from "next/link";
import { Nav } from "../(main)/nav";

// wether to hide empty kanban columns
const dense = true;

async function Column({
  tag: tagId,
  prefixLen,
}: {
  tag: string;
  prefixLen: number;
}) {
  const tag = await prisma.tagsOnEntries.findMany({
    where: { tagId },
    select: {
      entry: {
        select: {
          id: true,
          title: true,
          mtime: true,
        },
      },
    },
  });
  if (dense && tag.length === 0) return null;
  tag.sort((a, b) => b.entry.mtime - a.entry.mtime);
  return (
    <Box
      flexShrink={0}
      width="kanbanWidth"
      display="flex"
      flexDirection="column"
      gap={5}
    >
      <Box
        backgroundColor="foreground2"
        py={5}
        borderRadius={5}
        fontWeight="bold"
        textAlign="center"
      >
        {tagId.slice(prefixLen)}
      </Box>
      {tag.map((tag) => (
        <Box
          key={tag.entry.id}
          backgroundColor="foreground1"
          borderRadius={5}
          p={5}
          color="link"
          fontWeight="bold"
          display="flex"
          flexDirection="column"
        >
          <Link href={`note/${tag.entry.id}`}>
            {tag.entry.title ? tag.entry.title : <i>{tag.entry.id}</i>}
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
            px={5}
            borderRadius={3}
            backgroundColor="foreground1"
          >
            {workflow_}
          </Box>
        ) : (
          <Box key={workflow_} px={5} color="link">
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
}: {
  workflow: string;
  tags: string[];
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
        <Column key={tag} tag={tag} prefixLen={getPrefixLen(tags)} />
      ))}
    </Box>
  );
}


export default async function Layout({
  searchParams: { workflow },
}: {
  searchParams: {
    workflow?: string;
  };
}) {
  await setup();
  const config = await getNotebookConfig();
  const kanban = config.kanban;
  const workflows = Object.keys(kanban);
  workflow ??= workflows[0] ?? "";
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
      <Kanban workflow={workflow} workflows={workflows} tags={tags} />
    </Box>
  );
}
