import { NotesEntry } from "@/app/(main)/(views)/search";

export function processTags() {
  // these scalars exists on every data
  const acc = new Set<string>([]);
  function fold(entry: NotesEntry) {
    for (const tag of entry.tags) {
      acc.add(tag.tagId);
    }
  }
  function result() {
    return Array.from(acc);
  }
  return [fold, result] as const;
}
