export type ISearch = { [key: string]: string };

export function searchToQuery(search: { [key: string]: string }) {
  const dir = search.dir || "";
  const tags = search.tags?.split(" ") || [];
  const kanban = search.kanban || "";
  return { dir, tags, kanban };
}

export interface IQuery {
  tags: string[];
  dir: string;
  kanban?: string;
}

export interface IHref {
  pathname: string;
  query: IQuery;
}
