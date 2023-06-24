import { IEntry } from "@/app/utils/search";
import { dirname, upDirs } from "../../utils/path";
import { processScalar } from "./scalar/process";

export function processNotes(
  queryKanban: string,
  kanbanConfig: { [kanban: string]: string[] },
  sep: string,
  entries: IEntry[]
) {
  const tagSet = new Set<string>();
  const dirSet = new Set<string>();
  const [foldScalars, getEnabledScalars] = processScalar();
  for (const entry of entries) {
    if (
      queryKanban &&
      !entry.tags.some(({ tagId }) => kanbanConfig[queryKanban].includes(tagId))
    ) {
      continue;
    }
    foldScalars(entry);
    for (const tag of entry.tags) {
      tagSet.add(tag.tagId);
    }
    for (const dir of upDirs(sep, dirname(sep, entry.id))) {
      dirSet.add(dir);
    }
  }
  const enabledTags = Array.from(tagSet).sort();
  const enabledDirs = Array.from(dirSet).sort();
  const enabledScalars = getEnabledScalars();

  const kanbanSet = new Set<string>();
  for (const [label, tags] of Object.entries(kanbanConfig))
    for (const tag of tags) if (enabledTags.includes(tag)) kanbanSet.add(label);
  const enabledKanbans = Array.from(kanbanSet).sort();

  return { enabledDirs, enabledTags, enabledKanbans, enabledScalars };
}
