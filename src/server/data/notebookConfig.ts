import path from "node:path/posix";
import { notebookDir } from "../notebookDir";
import { readFile } from "node:fs/promises";
import { load } from "js-yaml";
import { z } from "zod";

const kanbansSchema = z.record(z.string(), z.array(z.string())).default({});
const reversedTagsSchema = z.array(z.string()).default([]);

async function loadConfig(): Promise<any> {
  const file = path.join(notebookDir, ".notebook.yaml");
  let raw: string | null = null;
  try {
    raw = await readFile(file, "utf8");
  } catch (err) {
    return {};
  }
  const obj = load(raw);
  if (typeof obj !== "object")
    throw new Error("Config file should be a yaml object");
  if (obj === null) throw new Error("Config file should be a yaml object");
  return obj;
}

async function getNotebookConfig_() {
  const obj = await loadConfig();
  return {
    kanbans: kanbansSchema.parse(obj.kanbans),
    reversedTags: reversedTagsSchema.parse(obj.reversed_tags),
  };
}
let config: ReturnType<typeof getNotebookConfig_>;

export function getNotebookConfig() {
  config ??= getNotebookConfig_();
  return config;
}

export type INotebookConfig = Awaited<ReturnType<typeof getNotebookConfig>>;
