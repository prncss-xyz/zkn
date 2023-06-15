export type ISearch = { [key: string]: string };

export interface IEntry {
  id: string;
  tags: { tagId: string }[];
}

export interface IHref {
  pathname: string;
  query: IQuery;
}

export interface IHrefDelta {
  pathname?: string;
  query?: Partial<IQuery>;
}

export interface IQuery {
  tags: string[];
  dir: string;
  kanban: string;
  wordcount: { lte?: number; gte?: number };
}

export function hrefURL({ pathname, query }: IHref) {
  const search: ISearch = {};
  if (query.dir) search.dir = query.dir;
  if (query.tags.length) search.tags = query.tags.join(" ");
  if (pathname === "/kanban" && query.kanban) search.kanban = query.kanban;
  if (query.wordcount.lte) search.wordcount_lte = String(query.wordcount.lte);
  if (query.wordcount.gte) search.wordcount_gte = String(query.wordcount.gte);
  let searchString = new URLSearchParams(search).toString();
  if (searchString) searchString = "?" + searchString;
  return `${pathname}${searchString}`;
}

export function searchToQuery(search: { [key: string]: string }): IQuery {
  const dir = search.dir || "";
  const tags = search.tags?.split(" ") || [];
  const kanban = search.kanban || "";
  const wordcount = {
    lte: search.wordcount_lte ? Number(search.wordcount_lte) : undefined,
    gte: search.wordcount_gte ? Number(search.wordcount_gte) : undefined,
  };
  return { dir, tags, kanban, wordcount };
}

// using `??` makes it possible to erease a value by setting to ""
export function update(href: IHref, delta: IHrefDelta) {
  return {
    pathname: delta.pathname ?? href.pathname,
    query: {
      dir: delta.query?.dir ?? href.query.dir,
      tags: delta.query?.tags ?? href.query.tags,
      kanban: delta.query?.kanban ?? href.query.kanban,
      wordcount: {
        lte: delta.query?.wordcount?.lte ?? href.query.wordcount.lte,
        gte: delta.query?.wordcount?.gte ?? href.query.wordcount.gte,
      },
    },
  };
}

export function dest(href: IHref, delta: IHrefDelta) {
  return hrefURL(update(href, delta));
}
