import { NotesEntry } from "@/app/(main)/(views)/search";
import { dirname, upDirs } from "@/utils/path";

export function processDirs() {
  const acc = new Set<string>();
  function fold(entry: NotesEntry) {
    for (const dir of upDirs(dirname(entry.id))) {
      acc.add(dir);
    }
  }
  function result() {
    return Array.from(acc);
  }
  return [fold, result] as const;
}
