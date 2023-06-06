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
    <Box
      display="flex"
      flexDirection="column"
      gap={10}
      backgroundColor="gray200"
      borderRadius={{ s: 0, md: 5 }}
    >
      <Box display="flex" flexDirection="column" gap={5}>
        {entries.map((entry) => (
          <Box
            key={entry.id}
            color="link"
            fontWeight="bold"
            p={5}
            borderStyle="top"
            borderWidth={1}
            borderColor="background"
          >
            <Link href={`note/${entry.id}`}>
              {entry.title ? entry.title : <i>{entry.id}</i>}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
