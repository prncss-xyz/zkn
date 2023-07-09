const key = "kanban";

export function paramsToQuery(params: URLSearchParams) {
  return params.get(key) || "";
}

export function kanbanClear(params: URLSearchParams) {
  const workflow = paramsToQuery(params);
  return queryToParams(new URLSearchParams(), workflow);
}

export function queryToParams(params: URLSearchParams, workflow: string) {
  if (workflow) {
    params.set(key, workflow);
  } else {
    params.delete(key);
  }
  return params.toString();
}
