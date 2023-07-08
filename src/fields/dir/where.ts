import { paramsToQuery } from "./query";

const sep = "/";

export function where(params: URLSearchParams) {
  const dir = paramsToQuery(params);
  if (!dir) return {};
  return { id: { startsWith: dir + sep } };
}
