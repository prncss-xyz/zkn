const key = "tags";

export function paramsToValueTags(params: URLSearchParams) {
  const tagsStr = params.get(key);
  if (tagsStr) return tagsStr.split(" ");
  return [];
}

export function valueToParamsTags(params: URLSearchParams, tags: string[]) {
  if (tags.length) {
    params.set(key, tags.join(" "));
  } else {
    params.delete(key);
  }
  return params.toString();
}
