const key = "kanban";

export function paramsToValueKanban(params: URLSearchParams) {
  return params.get(key) || "";
}

export function valueToQueryKanban(params: URLSearchParams) {
  const kanban = paramsToValueKanban(params);
  return queryToParams(new URLSearchParams(), kanban);
}

export function queryToParams(params: URLSearchParams, kanban: string) {
  if (kanban) {
    params.set(key, kanban);
  } else {
    params.delete(key);
  }
  return params.toString();
}
