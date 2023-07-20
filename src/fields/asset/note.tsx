import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { Box } from "@/components/box";
import { Link } from "@/components/link";
import { setAsset } from "./query";
import { sprinkles } from "@/sprinkles.css";

export function NoteAsset({ entry }: { entry: NoteEntry }) {
  if (entry.asset === null) return null;
  const params = new URLSearchParams();
  setAsset(params, "all");
  const queryAll = params.toString();
  if (entry.assetType) setAsset(params, entry.assetType);
  const queryType = params.toString();
  const src = `/API/asset/${entry.asset}`;
  return (
    <Box display="flex" flexDirection="column" gap={5}>
      <Box display="flex" flexDirection="row" alignItems="center" gap={10}>
        <Box fontWeight="bold">Asset</Box>
        <Link href={{ pathname: "/notes", query: queryAll }}>all</Link>
        {entry.assetType && (
          <Link href={{ pathname: "/notes", query: queryType }}>
            {entry.assetType}
          </Link>
        )}
        <Link href={{ pathname: src }} fontFamily="monospace">
          {entry.asset}
        </Link>
      </Box>
      {entry.assetType === "image" && (
        <Box height="noteAssetHeight">
          <img
            src={src}
            alt="asset"
            className={sprinkles({ height: "100%" })}
          />
        </Box>
      )}
    </Box>
  );
}
