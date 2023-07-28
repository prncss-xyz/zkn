"use client";

import { Button } from "@/components/button";
import { deleteNote, editNote, openAsset, openGallery } from "@/server/actions";
import { LuEdit, LuDelete, LuArrowUpSquare } from "react-icons/lu";

interface Entry {
  id: string;
  asset: string | null;
  assetType: string | null;
}

export function EditNoteClient({ entry: { id } }: { entry: { id: string } }) {
  return (
    <Button
      onClick={() => editNote(id)}
      display="flex"
      flexDirection="row"
      alignItems="center"
      p={2}
    >
      <LuEdit />
    </Button>
  );
}

export function DeleteNoteClient({ entry: { id, asset } }: { entry: Entry }) {
  return (
    <Button
      onClick={() => deleteNote(id, asset)}
      display="flex"
      flexDirection="row"
      alignItems="center"
      p={2}
    >
      <LuDelete />
    </Button>
  );
}

export function OpenAssetClient({ entry: { asset } }: { entry: Entry }) {
  if (!asset) return null;
  return (
    <Button
      onClick={() => openAsset(asset)}
      display="flex"
      flexDirection="row"
      alignItems="center"
      p={2}
    >
      <LuArrowUpSquare />
    </Button>
  );
}

export function OpenGalleryClient({ entries }: { entries: Entry[] }) {
  const assets: string[] = [];
  for (const { asset, assetType } of entries) {
    if (assetType === "image" && asset) {
      assets.push(asset);
    }
  }
  return (
    <Button
      onClick={() => openGallery(assets)}
      display="flex"
      flexDirection="row"
      alignItems="center"
      p={2}
    >
      <LuArrowUpSquare />
    </Button>
  );
}
