import { Where } from "@/app/(main)/(views)/search";
import { getAsset } from "./query";

export function whereAsset(params: URLSearchParams): Where {
  const assetType = getAsset(params);
  if (!assetType) return {};
  if (assetType === "all")
    return {
      asset: {
        not: null,
      },
    };
  return { assetType };
}
