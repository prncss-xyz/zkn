const key = "dir";

export function paramsToValueDir(params: URLSearchParams) {
  return params.get(key) || "";
}

export function valueToQueryDir(params: URLSearchParams, dir: string) {
  if (dir) {
    params.set(key, dir);
  } else {
    params.delete(key);
  }
  return params.toString();
}
