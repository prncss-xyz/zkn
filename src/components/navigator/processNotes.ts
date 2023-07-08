import { processScalars } from "@/fields/scalars/process";
import { processTags } from "@/fields/tags/process";
import { processVirtualTags } from "@/fields/virtualTags/process";
import { processDirs } from "@/fields/dir/process";
import { NotesEntry } from "@/app/(main)/(views)/search";

export function processNotes(
  queryKanban: string,
  kanbanConfig: { [kanban: string]: string[] },
  entries: NotesEntry[]
) {
  const [foldScalars, getEnabledScalars] = processScalars();
  const [foldDirs, getEnabledDirs] = processDirs();
  const [foldTags, getEnabledTags] = processTags();
  const [foldVirtualTags, getEnabledVirtualTags] = processVirtualTags();
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
    foldVirtualTags(entry);
  }
  const dirs = getEnabledDirs().sort();
  const tags = getEnabledTags().sort();
  const scalars = getEnabledScalars().sort();
  const virtualTags = getEnabledVirtualTags().sort();

  const kanbanSet = new Set<string>();
  for (const [label, tags] of Object.entries(kanbanConfig))
    for (const tag of tags) if (tags.includes(tag)) kanbanSet.add(label);
  const kanbans = Array.from(kanbanSet).sort();

  return {
    dirs,
    tags,
    virtualTags,
    kanbans,
    scalars,
  };
}
