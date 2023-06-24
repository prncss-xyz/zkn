import { IEntry } from "@/app/utils/search";

export function processScalar() {
  // these scalars exists on every data
  const acc = new Set<string>(["mtime", "wordcount"]);
  function fold(entry: IEntry) {
    if (entry.event) acc.add("event");
  }
  function result() {
    return Array.from(acc);
  }
  return [fold, result] as const;
}
