const key = "dir";

export function paramsToQuery(params: URLSearchParams) {
  return params.get(key) || "";
}

export function queryToParams(params: URLSearchParams, dir: string) {
  if (dir) {
    params.set(key, dir);
  } else {
    params.delete(key);
  }
  return params.toString();
}
