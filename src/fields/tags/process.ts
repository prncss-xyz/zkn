import { NotesEntry } from "@/app/(main)/(views)/search";
import { INotebookConfig } from "@/server/data/notebookConfig";
import { getTags } from "./query";
import { getAll } from "../all/query";

export function processTags(
  notebookConfig: INotebookConfig,
  params: URLSearchParams
) {
  // these scalars exists on every data
  const tagSet = new Set<string>([]);
  const vTagSet = new Set<string>([]);
  const queryTags = getTags(params);
  // reverse tags which are not in the active query
  const rev = notebookConfig.reversedTags.filter(
    (tag) => !queryTags.includes(tag)
  );
  const all = getAll(params);

  function filter(entry: NotesEntry) {
    let res = true;
    for (const { tagId } of entry.tags) {
      if (rev.includes(tagId)) {
        res = false;
        vTagSet.add(tagId);
      }
    }
    return res || all;
  }
  function fold(entry: NotesEntry) {
    for (const tag of entry.tags) {
      tagSet.add(tag.tagId);
    }
  }
  function result() {
    return {
      direct: Array.from(tagSet).sort(),
      reverse: Array.from(vTagSet).sort(),
    };
  }
  return [fold, result, filter] as const;
}
