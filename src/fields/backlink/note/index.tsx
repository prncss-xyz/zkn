import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { Box } from "@/components/box";
import { Link } from "@/components/link";
import prisma from "@/server/data/prisma";
import { backlink } from "./index.css";
import { getContents } from "./contents";

async function getBacklinksTitles(id: string) {
  return await prisma.entry.findMany({
    select: {
      id: true,
      title: true,
    },
    where: {
      links: {
        some: {
          targetId: id,
        },
      },
    },
  });
}

interface ILink {
  sourceId: string;
  context: string;
  rank: number;
}

async function NoteBacklink({ link, title }: { link: ILink; title?: string }) {
  const contents = await getContents(link.context);
  return (
    <Box
      borderStyle="top"
      borderColor="background"
      borderWidth={1}
      p={5}
      display="flex"
      flexDirection="column"
    >
      <Link
        fontFamily={title ? undefined : "monospace"}
        href={`/note/${link.sourceId}`}
      >
        {title || link.sourceId}
      </Link>
      <Box className={backlink}>{contents}</Box>
    </Box>
  );
}

export async function NoteBacklinks({ entry }: { entry: NoteEntry }) {
  if (!entry.backlinks.length) return null;
  const titles = await getBacklinksTitles(entry.id);
  return (
    <Box
      backgroundColor="foreground2"
      borderRadius={{ xs: 0, md: 5 }}
      display="flex"
      flexDirection="column"
    >
      <Box as="h2" fontWeight="bold" p={5}>
        <Link href={`/notes?link=${entry.id}`}>Backlinks</Link>
      </Box>
      <Box display="flex" flexDirection="column">
        {entry.backlinks.map((link) => (
          // @ts-ignore
          <NoteBacklink
            key={link.sourceId}
            link={link}
            title={
              titles.find((e) => e.id === link.sourceId)?.title ?? undefined
            }
          />
        ))}
      </Box>
    </Box>
  );
}
