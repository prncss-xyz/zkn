import { NotesEntry } from "@/app/(main)/(views)/search";
import { dirname, upDirs } from "@/utils/path";

export function processDirs() {
  const acc = new Set<string>();
  function fold(entry: NotesEntry) {
    acc.add(dirname(entry.id));
  }
  function result() {
    const res = new Set<string>();
    for (const dir of acc) {
      for (const dir_ of upDirs(dir)) {
        res.add(dir_);
      }
    }
    return Array.from(res).sort();
  }
  return [fold, result] as const;
}
