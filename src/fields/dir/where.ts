import { paramsToValueDir } from "./query";

const sep = "/";

export function whereDir(params: URLSearchParams) {
  const dir = paramsToValueDir(params);
  if (!dir) return {};
  return { id: { startsWith: dir + sep } };
}
