const key = "link";

export function paramsToValueLink(params: URLSearchParams) {
  return params.get(key) || "";
}

export function valueToQueryLink(params: URLSearchParams, link: string) {
  if (link) {
    params.set(key, link);
  } else {
    params.delete(key);
  }
  return params.toString();
}
