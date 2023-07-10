import path from "node:path/posix";
import { notebookDir } from "../notebookDir";
import { readFile } from "node:fs/promises";
import { load } from "js-yaml";
import { z } from "zod";

const conf = z.object({
  kanbans: z.record(z.string(), z.array(z.string())),
  reversed_tags: z.optional(z.array(z.string())),
});

async function getNotebookConfig_() {
  const file = path.join(notebookDir, ".notebook.yaml");
  let raw: string | null = null;
  try {
    raw = await readFile(file, "utf8");
  } catch (err) {}
  const obj = raw ? load(raw) : {};
  const res = conf.parse(obj);
  return { kanbans: res.kanbans ?? {}, reversedTags: res.reversed_tags ?? [] };
}
let config: ReturnType<typeof getNotebookConfig_>;

export function getNotebookConfig() {
  config ??= getNotebookConfig_();
  return config;
}

export type INotebookConfig = Awaited<ReturnType<typeof getNotebookConfig>>;
