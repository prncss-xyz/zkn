export function paramsToQuery(params: URLSearchParams) {
  const tagsStr = params.get("tags");
  if (tagsStr) return tagsStr.split(" ");
  return [];
}

export function queryToParams(params: URLSearchParams, tags: string[]) {
  if (tags.length) {
    params.set("tags", tags.join(" "));
  } else {
    params.delete("tags");
  }
  return params.toString();
}
