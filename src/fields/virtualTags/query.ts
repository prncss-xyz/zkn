const key = "vtags";

export function getVirtualTags(params: URLSearchParams) {
  const tagsStr = params.get(key);
  if (tagsStr) return tagsStr.split(" ");
  return [];
}

export function setVirtualTags(params: URLSearchParams, tags: string[]) {
  if (tags.length) {
    params.set(key, tags.join(" "));
  } else {
    params.delete(key);
  }
}
