import { Box } from "@/components/box";
import prisma from "@/server/data/prisma";
import { setup } from "@/server/data/scanFiles";
import { markdown } from "./page.css";
import { NoteDir } from "@/fields/dir/note";
import { NoteTags } from "@/fields/tags/note";
import { NoteVirtualTags } from "@/fields/virtualTags/note";
import { NoteLinks } from "@/fields/link/note";
import { NoteBacklinks } from "@/fields/backlink/note";
import { NoteScalars } from "@/fields/scalars/note";
import { Contents } from "./contents";
import { Link } from "@/components/link";
import { KanbanViews } from "@/fields/kanban/views";

export const dynamic = "force-dynamic";

export type NoteEntry = Exclude<Awaited<ReturnType<typeof getEntry>>, null>;

async function getEntry(id: string) {
  const entry = await prisma.entry.findUnique({
    where: { id },
    select: {
      id: true,
      wordcount: true,
      links: true,
      backlinks: true,
      tags: true,
      mtime: true,
      event: true,
    },
  });
  return entry;
}

function Views({ note }: { note: NoteEntry }) {
  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" gap={10}>
      <Link href="/notes">Notes</Link>
      {/* @ts-ignore */}
      <KanbanViews note={note} />
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
      <Views note={entry} />
      <NoteDir note={entry} />
      <NoteTags note={entry} />
      <NoteVirtualTags note={entry} />
      <Box
        backgroundColor="foreground1"
        p={5}
        borderRadius={{ xs: 0, md: 5 }}
        className={markdown}
      >
        {/* @ts-ignore */}
        <Contents note={entry} />
      </Box>
      <NoteScalars note={entry} />
      {/* @ts-ignore */}
      <NoteLinks note={entry} />
      {/* @ts-ignore */}
      <NoteBacklinks note={entry} />
    </Box>
  );
}
