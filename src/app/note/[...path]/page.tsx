import { Box } from "@/app/components/box";
import { Note } from "@/app/components/note";
import { getEntry } from "@/lib/data/actions";
import Link from "next/link";

export default async function Page({
  params: { path },
}: {
  params: { path: string };
}) {
  const id = path + ".md";
  const entry = await getEntry(id);
  if (entry) {
    // @ts-ignore
    return <Note id={id} />;
  }
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
}
