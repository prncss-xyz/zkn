import { NotesEntry } from "@/app/(main)/(views)/search";

export function processAsset() {
  const map = new Set<string>();
  let all = false;
  function fold(entry: NotesEntry) {
    if (entry.asset) {
      all = true;
      const asset = entry.assetType;
      if (asset) map.add(asset);
    }
  }
  function result() {
    if (all) {
      return ["all", ...Array.from(map).sort()];
    }
    return [];
  }
  return [fold, result] as const;
}
