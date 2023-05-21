import { constants } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

export async function* getFiles(
  prefix: string,
  dir?: string
): AsyncGenerator<string> {
  const entries = await fs.readdir(path.join(prefix, dir || ""), {
    withFileTypes: true,
  });
  for (const file of entries) {
    if (file.name.startsWith(".")) continue;
    if (file.isDirectory()) {
      yield* getFiles(prefix, path.join(dir || "", file.name));
    } else {
      yield path.join(dir || "", file.name);
    }
  }
}

export async function exists(path: string) {
  try {
    await fs.access(path, constants.F_OK);
  } catch (err) {
    return false;
  }
  return true;
}
