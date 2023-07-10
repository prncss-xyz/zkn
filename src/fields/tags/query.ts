const key = "tags";

export function getTags(params: URLSearchParams) {
  const tagsStr = params.get(key);
  if (tagsStr) return tagsStr.split(" ");
  return [];
}

export function setTags(params: URLSearchParams, tags: string[]) {
  if (tags.length) {
    params.set(key, tags.join(" "));
  } else {
    params.delete(key);
  }
}
