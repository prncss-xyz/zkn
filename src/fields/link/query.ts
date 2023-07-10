const key = "link";

export function getLink(params: URLSearchParams) {
  return params.get(key) || "";
}

export function setLink(params: URLSearchParams, link: string) {
  if (link) {
    params.set(key, link);
  } else {
    params.delete(key);
  }
}
