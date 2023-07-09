import { INotebookConfig } from "@/server/data/notebookConfig";
import { CommonEntry } from "../virtualTags/opts";
import { NoteEntry } from "@/app/(main)/note/[...path]/page";

export function getTags(notebookConfig: INotebookConfig, kanban: string) {
  return notebookConfig.kanbans[kanban] ?? [];
}

export function getKanbans(notebookConfig: INotebookConfig, note: NoteEntry) {
  const selected = new Set<string>();
  for (const [kanban, kanbanTags] of Object.entries(notebookConfig.kanbans)) {
    for (const kanbanTag of kanbanTags) {
      for (const { tagId } of note.tags) {
        if (tagId === kanbanTag) selected.add(kanban);
      }
    }
  }
  return Array.from(selected).sort();
}

export function getTest(notebookConfig: INotebookConfig, kanban: string) {
  const tags = getTags(notebookConfig, kanban);
  if (!tags.length) return (_: CommonEntry) => true;
  return function (entry: CommonEntry) {
    for (const { tagId } of entry.tags) {
      if (tags.includes(tagId)) return true;
    }
    return false;
  };
}

export function processKanban(
  config: INotebookConfig,
  { tags }: { tags: string[] }
) {
  const kanbanSet = new Set<string>();
  for (const [kanban, kanbanTags] of Object.entries(config.kanbans))
    for (const tag of kanbanTags) if (tags.includes(tag)) kanbanSet.add(kanban);
  return Array.from(kanbanSet).sort();
}
