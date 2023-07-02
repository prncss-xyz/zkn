import { paramsToQuery } from "./query";

export function where(params: URLSearchParams, sep: string) {
  const dir = paramsToQuery(params);
  if (!dir) return {};
  return { id: { startsWith: dir + sep } };
}
