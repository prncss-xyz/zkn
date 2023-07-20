import { processScalars } from "@/fields/scalars/process";
import { processTags } from "@/fields/tags/process";
import { processVirtualTags } from "@/fields/virtualTags/process";
import { processDirs } from "@/fields/dir/process";
import { NotesEntry } from "@/app/(main)/(views)/search";
import { processKanban } from "@/fields/kanban/utils";
import { INotebookConfig } from "@/server/data/notebookConfig";
import { processAsset } from "@/fields/asset/process";

function processNotes_(
  notebookConfig: INotebookConfig,
  params: URLSearchParams,
  entries: NotesEntry[]
) {
  const entriesOut: NotesEntry[] = [];
  const [foldScalars, getEnabledScalars] = processScalars();
  const [foldDirs, getEnabledDirs] = processDirs();
  const [foldTags, getEnabledTags, filterTags] = processTags(
    notebookConfig,
    params
  );
  const [foldVirtualTags, getEnabledVirtualTags, filterVirtualTags] =
    processVirtualTags(notebookConfig, params);
  const [foldAssets, getEnabledAssets] = processAsset();
  for (const entry of entries) {
    let skip = false;
    skip ||= !filterTags(entry);
    skip ||= !filterVirtualTags(entry);
    if (skip) continue;
    entriesOut.push(entry);
    foldScalars(entry);
    foldTags(entry);
    foldDirs(entry);
    foldVirtualTags(entry);
    foldAssets(entry);
  }
  const dirs = getEnabledDirs();
  const tags = getEnabledTags();
  const scalars = getEnabledScalars();
  const virtualTags = getEnabledVirtualTags();
  const asset = getEnabledAssets();

  return {
    entries: entriesOut,
    dirs,
    tags,
    virtualTags,
    scalars,
    asset,
  };
}

export type ProcessNotesRaw = ReturnType<typeof processNotes_>;

export function processNotes(
  notebookConfig: INotebookConfig,
  params: URLSearchParams,
  entries: NotesEntry[]
) {
  const res = processNotes_(notebookConfig, params, entries);
  const kanbans = processKanban(notebookConfig, res.tags.direct);
  return { ...res, kanbans };
}

export type IProcessNotes = ReturnType<typeof processNotes>;
