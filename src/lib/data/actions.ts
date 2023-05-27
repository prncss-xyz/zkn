"use server";

import matter from "gray-matter";
import path from "path";
import { notebookDir } from "../notebookDir";
import fs from "node:fs/promises";

export async function getContent(id: string) {
  const file = path.join(notebookDir, id);
  const raw = await fs.readFile(file, "utf8");
  const { content } = matter(raw);
  return content;
}
