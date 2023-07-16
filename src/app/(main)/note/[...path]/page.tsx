import { Box } from "@/components/box";
import prisma from "@/server/data/prisma";
import { setup } from "@/server/data/scanFiles";
import { markdown } from "./page.css";
import { NoteDir } from "@/fields/dir/note";
import { NoteTags } from "@/fields/tags/note";
import { NoteVirtualTags } from "@/fields/virtualTags/note";
import { NoteBacklinks } from "@/fields/backlink/note";
import { NoteScalars } from "@/fields/scalars/note";
import { Contents } from "./contents";
import { KanbanViews } from "@/fields/kanban/views";
import { NavLink } from "@/components/navLink";

export const dynamic = "force-dynamic";

export type NoteEntry = Exclude<Awaited<ReturnType<typeof getEntry>>, null>;

async function getEntry(id: string) {
  const entry = await prisma.entry.findUnique({
    where: { id },
    select: {
      id: true,
      wordcount: true,
      links: true,
      tags: true,
      mtime: true,
      event: true,
    },
  });
  return entry;
}

function Views({ entry }: { entry: NoteEntry }) {
  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" gap={10}>
      <NavLink type="label" href={{ pathname: "/notes" }}>
        Notes
      </NavLink>
      {/* @ts-ignore */}
      <KanbanViews entry={entry} />
    </Box>
  );
}

export default async function Page({
  params: { path },
}: {
  params: { path: string[] };
}) {
  await setup();
  let id = path.map((p) => decodeURI(p)).join("/");
  const entry = await getEntry(id);
  if (!entry)
    return (
      <Box>
        The node with filename <code>{id}</code> do not exist.
      </Box>
    );
  return (
    <Box display="flex" flexDirection="column" gap={10} width="screenMaxWidth">
      <Views entry={entry} />
      <NoteDir entry={entry} />
      <NoteTags entry={entry} />
      <NoteVirtualTags entry={entry} />
      <Box
        backgroundColor="foreground1"
        p={5}
        borderRadius={{ xs: 0, md: 5 }}
        className={markdown}
      >
        {/* @ts-ignore */}
        <Contents entry={entry} />
      </Box>
      <NoteScalars entry={entry} />
      {/* @ts-ignore */}
      <NoteBacklinks entry={entry} />
    </Box>
  );
}
