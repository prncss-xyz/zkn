import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { NavLink } from "@/components/navLink";
import { setAsset } from "./query";

export async function AssetViews({ entry }: { entry: NoteEntry }) {
  if (entry.assetType !== "image") return null;
  const params = new URLSearchParams();
  setAsset(params, "image");
  const query = params.toString();
  return (
    <NavLink
      href={{
        pathname: "/gallery",
        query,
      }}
    >
      Gallery
    </NavLink>
  );
}
