const key = "dir";

export function getDir(params: URLSearchParams) {
  return params.get(key) || "";
}

export function setDir(params: URLSearchParams, dir: string) {
  if (dir) {
    params.set(key, dir);
  } else {
    params.delete(key);
  }
}
