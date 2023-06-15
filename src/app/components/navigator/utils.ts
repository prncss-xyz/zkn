import { IEntry } from "@/app/utils/search";
import { dirname, upDirs } from "../../utils/path";

export function processNotes(
  queryKanban: string,
  kanbanConfig: { [kanban: string]: string[] },
  sep: string,
  entries: IEntry[]
) {
  const tagSet = new Set<string>();
  const dirSet = new Set<string>();
  const kanbanSet = new Set<string>();
  for (const entry of entries) {
    if (
      queryKanban &&
      !entry.tags.some(({ tagId }) => kanbanConfig[queryKanban].includes(tagId))
    ) {
      continue;
    }
    for (const tag of entry.tags) {
      tagSet.add(tag.tagId);
      for (const [label, tags] of Object.entries(kanbanConfig)) {
        if (kanbanSet.has(label)) continue;
        if (tags.includes(tag.tagId)) {
          kanbanSet.add(label);
        }
      }
    }
    for (const dir of upDirs(sep, dirname(sep, entry.id))) {
      dirSet.add(dir);
    }
  }
  const enabledTags = Array.from(tagSet).sort();
  const enabledDirs = Array.from(dirSet).sort();
  const enabledKanbans = Array.from(kanbanSet).sort();
  return [enabledDirs, enabledTags, enabledKanbans] as const;
}
