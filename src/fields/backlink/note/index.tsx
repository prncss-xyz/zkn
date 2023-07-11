import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { Box } from "@/components/box";
import { Link } from "@/components/link";
import prisma from "@/server/data/prisma";
import { backlink } from "./index.css";
import { getContents } from "./contents";

interface ILink {
  source: {
    id: string;
    title: string | null;
  };
  context: string;
  rank: number;
}

async function NoteBacklink({
  link: {
    source: { id, title },
    context,
  },
}: {
  link: ILink;
}) {
  const contents = await getContents(context);
  return (
    <Box
      borderStyle="top"
      borderColor="background"
      borderWidth={1}
      p={5}
      display="flex"
      flexDirection="column"
    >
      <Link fontFamily={title ? undefined : "monospace"} href={`/note/${id}`}>
        {title || id}
      </Link>
      <Box className={backlink}>{contents}</Box>
    </Box>
  );
}

export async function NoteBacklinks({ entry }: { entry: NoteEntry }) {
  const backlinks = await prisma.link.findMany({
    where: { targetId: entry.id },
    select: {
      context: true,
      rank: true,
      id: true,
      source: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
  if (!backlinks.length) return null;
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
        {backlinks.map((link) => (
          // @ts-ignore
          <NoteBacklink key={link.id} link={link} />
        ))}
      </Box>
    </Box>
  );
}
