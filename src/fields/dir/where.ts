import { getDir } from "./query";

const sep = "/";

export function whereDir(params: URLSearchParams) {
  const dir = getDir(params);
  if (!dir) return {};
  return { id: { startsWith: dir + sep } };
}
