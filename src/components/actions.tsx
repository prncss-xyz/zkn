import {
  deleteNoteTemplate,
  editNoteTemplate,
  openAssetTemplate,
  openGalleryTemplate,
} from "@/server/actions/templates";
import {
  DeleteNoteClient,
  EditNoteClient,
  OpenAssetClient,
  OpenGalleryClient,
} from "./actionsClient";

interface Entry {
  id: string;
  asset: string | null;
  assetType: string | null;
}

export function EditNote({ entry: { id } }: { entry: { id: string } }) {
  if (!editNoteTemplate()) return null;
  return <EditNoteClient entry={{ id }} />;
}

export function DeleteNote({ entry }: { entry: Entry }) {
  if (!deleteNoteTemplate()) return null;
  return <DeleteNoteClient entry={entry} />;
}

export function OpenAsset({ entry }: { entry: Entry }) {
  if (!openAssetTemplate) return null;
  return <OpenAssetClient entry={entry} />;
}

export function OpenGallery({ entries }: { entries: Entry[] }) {
  if (!openGalleryTemplate) return null;
  return <OpenGalleryClient entries={entries} />;
}
