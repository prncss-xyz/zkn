import path from "path";
import { notebookDir } from "../notebookDir";
import { readFile } from "node:fs/promises";
import { load } from "js-yaml";
import { z } from "zod";

const conf = z.object({
  kanban: z.record(z.string(), z.array(z.string())),
});

export type INotebookConfig = Awaited<ReturnType<typeof getNotebookConfig>>;

export async function getNotebookConfig() {
  const file = path.join(notebookDir, ".notebook.yaml");
  let raw: string | null = null;
  try {
    raw = await readFile(file, "utf8");
  } catch (err) {}
  const obj = raw ? load(raw) : {};
  return conf.parse(obj);
}
