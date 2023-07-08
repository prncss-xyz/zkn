import { NotesEntry } from "@/app/(main)/(views)/search";

export function processScalars() {
  // these scalars exists on every data
  const acc = new Set<string>(["mtime", "wordcount"]);
  function fold(entry: NotesEntry) {
    if (entry.event) acc.add("event");
  }
  function result() {
    return Array.from(acc);
  }
  return [fold, result] as const;
}
