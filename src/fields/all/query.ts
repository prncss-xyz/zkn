const key = "all";

export function getAll(params: URLSearchParams) {
  return params.get(key) === key;
}

export function setAll(params: URLSearchParams, all: boolean) {
  if (all) {
    params.set(key, key);
  } else {
    params.delete(key);
  }
}
