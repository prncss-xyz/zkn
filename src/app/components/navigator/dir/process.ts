import { dirname, upDirs } from "@/app/utils/path";
import { IEntry } from "@/app/utils/search";

export function processDirs(sep: string) {
  // these scalars exists on every data
  const acc = new Set<string>();
  function fold(entry: IEntry) {
    for (const dir of upDirs(sep, dirname(sep, entry.id))) {
      acc.add(dir);
    }
  }
  function result() {
    return Array.from(acc);
  }
  return [fold, result] as const;
}
