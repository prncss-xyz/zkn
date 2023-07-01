import { IEntry } from "@/app/utils/search";
import { processScalars } from "./scalar/process";
import { processTags } from "./tag/process";
import { processDirs } from "./dir/process";

export function processNotes(
  queryKanban: string,
  kanbanConfig: { [kanban: string]: string[] },
  sep: string,
  entries: IEntry[]
) {
  const [foldScalars, getEnabledScalars] = processScalars();
  const [foldDirs, getEnabledDirs] = processDirs(sep);
  const [foldTags, getEnabledTags] = processTags();
  for (const entry of entries) {
    if (
      queryKanban &&
      !entry.tags.some(({ tagId }) => kanbanConfig[queryKanban].includes(tagId))
    ) {
      continue;
    }
    foldScalars(entry);
    foldTags(entry);
    foldDirs(entry);
  }
  const enabledDirs = getEnabledDirs().sort();
  const enabledTags = getEnabledTags().sort();
  const enabledScalars = getEnabledScalars().sort();

  const kanbanSet = new Set<string>();
  for (const [label, tags] of Object.entries(kanbanConfig))
    for (const tag of tags) if (enabledTags.includes(tag)) kanbanSet.add(label);
  const enabledKanbans = Array.from(kanbanSet).sort();

  return { enabledDirs, enabledTags, enabledKanbans, enabledScalars };
}
