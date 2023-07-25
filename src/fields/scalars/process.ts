import { NotesEntry } from "@/app/(main)/(views)/search";

export function processScalars() {
  // these scalars exists on every data
  const acc = new Set<string>([]);
  function fold(entry: NotesEntry) {
    if (entry.event) acc.add("event");
    if (entry.due) acc.add("due");
    if (entry.since) acc.add("since");
    if (entry.until) acc.add("until");
  }
  function result() {
    return ["frecency", "mtime", "wordcount", ...Array.from(acc).sort()];
  }
  return [fold, result] as const;
}
