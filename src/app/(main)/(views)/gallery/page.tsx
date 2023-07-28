import { Box } from "@/components/box";
import { setup } from "@/server/data/scanFiles";
import { Link } from "@/components/link";
import { Navigator } from "@/components/navigator";
import { ISearch, getEntries } from "../search";
import { getNotebookConfig } from "@/server/data/notebookConfig";
import { processNotes } from "@/components/navigator/processNotes";
import { OpenGallery } from "@/components/actions";

export const dynamic = "force-dynamic";

interface IEntry {
  id: string;
  title: string | null;
  asset: string | null;
  assetType: string | null;
}

function Note({ entry }: { entry: IEntry }) {
  if (!entry.asset) return null;
  if (!(entry.assetType === "image")) return null;
  return (
    <Link
      p={5}
      borderStyle="top"
      borderWidth={1}
      borderColor="background"
      href={`note/${entry.id}`}
      width="galleryImage"
      height="galleryImage"
    >
      <img
        src={`/API/asset/${entry.asset}`}
        alt={entry.title || "asset"}
        style={{ objectFit: "contain" }}
      />
    </Link>
  );
}

function Notes({ entries }: { entries: IEntry[] }) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      width="screenMaxWidth"
      gap={5}
    >
      {entries.map((entry) => (
        <Note key={entry.id} entry={entry} />
      ))}
    </Box>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: ISearch;
}) {
  await setup();
  const params = new URLSearchParams(searchParams);
  const entries = await getEntries(params);
  const notebookConfig = await getNotebookConfig();
  const processed = processNotes(notebookConfig, params, entries);
  return (
    <>
      <Navigator processed={processed} />
      <Box display="flex" flexDirection="column" width="screenMaxWidth" gap={5}>
        <Box display="flex" flexDirection="row" gap={5}>
          <Box>{processed.entries.length} images</Box>
          <OpenGallery entries={entries} />
        </Box>
        <Notes entries={processed.entries} />
      </Box>
    </>
  );
}
