const key = "asset";

export function getAsset(params: URLSearchParams) {
  return params.get(key) || "";
}

export function setAsset(params: URLSearchParams, asset: string) {
  if (asset) {
    params.set(key, asset);
  } else {
    params.delete(key);
  }
}
