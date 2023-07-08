import { virtualTags, virtualTagsOpts } from "./opts";
import { CommonEntry } from "./opts";

export function processVirtualTags() {
  // these scalars exists on every data
  const acc = new Set<string>([]);
  function fold(entry: CommonEntry) {
    for (const tag of virtualTags) {
      if (virtualTagsOpts[tag].test(entry)) acc.add(tag);
    }
  }
  function result() {
    return Array.from(acc);
  }
  return [fold, result] as const;
}
