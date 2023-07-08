const name = "backlink";

export function paramsToQuery(params: URLSearchParams) {
  return params.get(name) || "";
}

export function queryToParams(params: URLSearchParams, backlink: string) {
  if (backlink) {
    params.set(name, backlink);
  } else {
    params.delete(name);
  }
  return params.toString();
}
