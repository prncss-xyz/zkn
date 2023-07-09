import { processScalars } from "@/fields/scalars/process";
import { processTags } from "@/fields/tags/process";
import { processVirtualTags } from "@/fields/virtualTags/process";
import { processDirs } from "@/fields/dir/process";
import { NotesEntry } from "@/app/(main)/(views)/search";
import { processKanban } from "@/fields/kanban/utils";
import { INotebookConfig } from "@/server/data/notebookConfig";

function processNotes_(entries: NotesEntry[]) {
  const [foldScalars, getEnabledScalars] = processScalars();
  const [foldDirs, getEnabledDirs] = processDirs();
  const [foldTags, getEnabledTags] = processTags();
  const [foldVirtualTags, getEnabledVirtualTags] = processVirtualTags();
  for (const entry of entries) {
    foldScalars(entry);
    foldTags(entry);
    foldDirs(entry);
    foldVirtualTags(entry);
  }
  const dirs = getEnabledDirs().sort();
  const tags = getEnabledTags().sort();
  const scalars = getEnabledScalars().sort();
  const virtualTags = getEnabledVirtualTags().sort();

  return {
    dirs,
    tags,
    virtualTags,
    scalars,
  };
}

export type ProcessNotesRaw = ReturnType<typeof processNotes_>;

export function processNotes(config: INotebookConfig, entries: NotesEntry[]) {
  const res = processNotes_(entries);
  const kanbans = processKanban(config, res);
  return { ...res, kanbans };
}
