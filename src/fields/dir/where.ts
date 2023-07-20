import { Where } from "@/app/(main)/(views)/search";
import { getDir } from "./query";

const sep = "/";

export function whereDir(params: URLSearchParams): Where {
  const dir = getDir(params);
  if (!dir) return {};
  return { id: { startsWith: dir + sep } };
}
