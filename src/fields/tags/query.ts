const key = "tags";

export function paramsToQuery(params: URLSearchParams) {
  const tagsStr = params.get(key);
  if (tagsStr) return tagsStr.split(" ");
  return [];
}

export function queryToParams(params: URLSearchParams, tags: string[]) {
  if (tags.length) {
    params.set(key, tags.join(" "));
  } else {
    params.delete(key);
  }
  return params.toString();
}
