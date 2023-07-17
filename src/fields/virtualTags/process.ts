import { INotebookConfig } from "@/server/data/notebookConfig";
import { virtualTags, virtualTagsOpts } from "./opts";
import { CommonEntry } from "./opts";
import { getVirtualTags } from "./query";
import { getAll } from "../all/query";
import { NotesEntry } from "@/app/(main)/(views)/search";

export function processVirtualTags(
  notebookConfig: INotebookConfig,
  params: URLSearchParams
) {
  // these scalars exists on every data
  const tagSet = new Set<string>([]);
  const rTagSet = new Set<string>([]);
  const queryTags = getVirtualTags(params);
  // reverse tags which are not in the active query
  const rev = notebookConfig.reversedVirtualTags;
  const all = getAll(params);

  function filter(entry: NotesEntry) {
    let res = true;
    for (const tag of rev) {
      if (virtualTagsOpts[tag]?.test(entry)) {
        if (!queryTags.includes(tag)) res = false;
        rTagSet.add(tag);
      }
    }
    return res || all;
  }

  function fold(entry: CommonEntry) {
    for (const tag of virtualTags) {
      if (!rev.includes(tag) && virtualTagsOpts[tag].test(entry))
        tagSet.add(tag);
    }
  }
  function result() {
    return {
      direct: Array.from(tagSet).sort(),
      reverse: Array.from(rTagSet).sort(),
    };
  }
  return [fold, result, filter] as const;
}
