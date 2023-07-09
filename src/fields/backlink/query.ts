const name = "backlink";

export function paramsToValueBacklink(params: URLSearchParams) {
  return params.get(name) || "";
}

export function valueToQueryBacklink(params: URLSearchParams, backlink: string) {
  if (backlink) {
    params.set(name, backlink);
  } else {
    params.delete(name);
  }
  return params.toString();
}
