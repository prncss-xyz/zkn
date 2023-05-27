import { Box } from "@/app/components/box";
import { Note } from "@/app/components/note";
import prisma from "@/lib/data/prisma";
import { setup } from "@/lib/data/scanFiles";
import Link from "next/link";

export async function getNote(id: string) {
  await setup();
  const entry = await prisma.entry.findUnique({
    where: { id },
    select: { id: true, wordCount: true, links: true },
  });
  return entry;
}

export default async function Page({
  params: { path },
}: {
  params: { path: string };
}) {
  const id = path + ".md";
  const entry = await getNote(id);
  if (!entry)
    return (
      <>
        <Box>
          The node with filename <code>{id}</code> cannot be found.
        </Box>
        <Box>
          <Link href="/">Back</Link>
        </Box>
      </>
    );

  console.log(entry.links);
  return (
    <Box>
      {/* @ts-ignore */}
      <Note id={id} />
      <Box>
        <b>wordcount: </b>
        {entry.wordCount}
      </Box>
    </Box>
  );
}
