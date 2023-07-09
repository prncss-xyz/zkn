import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { Box } from "@/components/box";
import { Link } from "@/components/link";
import prisma from "@/server/data/prisma";

export async function getLinkTitles(id: string) {
  return await prisma.entry.findMany({
    select: {
      id: true,
      title: true,
    },
    where: {
      backlinks: {
        some: {
          sourceId: id,
        },
      },
    },
  });
}

export async function NoteLinks({ entry }: { entry: NoteEntry }) {
  if (!entry.links.length) return null;
  const titles = await getLinkTitles(entry.id);
  return (
    <Box
      backgroundColor="foreground2"
      borderRadius={{ xs: 0, md: 5 }}
      display="flex"
      flexDirection="column"
    >
      <Box as="h2" fontWeight="bold" p={5}>
        <Link href={`/notes?link=${entry.id}`}>Links</Link>
      </Box>
      <Box display="flex" flexDirection="column">
        {entry.links.map((link) => {
          return (
            <Box
              key={link.targetId}
              borderStyle="top"
              borderColor="background"
              borderWidth={1}
              p={5}
            >
              <Link href={`/note/${link.targetId}`}>
                {titles.find((e) => e?.id === entry.id)?.title || link.targetId}
              </Link>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
