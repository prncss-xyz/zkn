const key = "kanban";

export function getKanban(params: URLSearchParams) {
  return params.get(key) || "";
}

export function setKanban(params: URLSearchParams, kanban: string) {
  if (kanban) {
    params.set(key, kanban);
  } else {
    params.delete(key);
  }
}
