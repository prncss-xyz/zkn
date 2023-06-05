import prisma from "@/lib/data/prisma";
import { Box } from "@/app/components/box";
import Link from "next/link";
import { setup } from "@/lib/data/scanFiles";

export default async function Page() {
  await setup();
  const entries = await prisma.entry.findMany({
    select: { id: true, title: true },
  });

  // entries.sort((a, b) => b.mtime - a.mtime);
  return (
    <>
      <Box as="h1">Notes</Box>
      <Box>
        {entries.map((entry) => (
          <Box key={entry.id}>
            <Link href={`note/${entry.id}`}>
              {entry.title ? entry.title : <i>{entry.id}</i>}
            </Link>
          </Box>
        ))}
      </Box>
    </>
  );
}
