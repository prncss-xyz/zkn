export function paramsToQuery(params: URLSearchParams) {
  return params.get("dir") || "";
}

export function queryToParams(params: URLSearchParams, dir: string) {
  if (dir) {
    params.set("dir", dir);
  } else {
    params.delete("dir");
  }
  return params.toString();
}
