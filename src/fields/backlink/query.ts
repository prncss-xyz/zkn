const name = "backlink";

export function getBacklink(params: URLSearchParams) {
  return params.get(name) || "";
}

export function setBacklink(
  params: URLSearchParams,
  backlink: string
) {
  if (backlink) {
    params.set(name, backlink);
  } else {
    params.delete(name);
  }
}
