const key = "link";

export function paramsToQuery(params: URLSearchParams) {
  return params.get(key) || "";
}

export function queryToParams(params: URLSearchParams, link: string) {
  if (link) {
    params.set(key, link);
  } else {
    params.delete(key);
  }
  return params.toString();
}
