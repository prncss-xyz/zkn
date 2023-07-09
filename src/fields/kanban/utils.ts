import {
  INotebookConfig,
  getNotebookConfig,
} from "@/server/data/notebookConfig";
import { CommonEntry } from "../virtualTags/opts";
import { NoteEntry } from "@/app/(main)/note/[...path]/page";

export async function getTags(workflow: string) {
  const config = await getNotebookConfig();
  return config.kanban[workflow] ?? [];
}

export function getKanbans(notebookConfig: INotebookConfig, note: NoteEntry) {
  const selected = new Set<string>();
  for (const [kanban, kanbanTags] of Object.entries(notebookConfig.kanban)) {
    for (const kanbanTag of kanbanTags) {
      for (const { tagId } of note.tags) {
        if (tagId === kanbanTag) selected.add(kanban);
      }
    }
  }
  return Array.from(selected).sort();
}

export async function getTest(workflow: string) {
  const tags = await getTags(workflow);
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
  for (const [workflow, kanbanTags] of Object.entries(config.kanban))
    for (const tag of kanbanTags)
      if (tags.includes(tag)) kanbanSet.add(workflow);
  return Array.from(kanbanSet).sort();
}
