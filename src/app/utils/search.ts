export type ISearch = { [key: string]: string };

export interface IEntry {
  id: string;
  tags: { tagId: string }[];
  event: {
    start: Date;
    end: Date;
  } | null;
}

export interface IHref {
  pathname: string;
  query: IQuery;
}

export interface IHrefDelta {
  pathname?: string;
  query?: IQueryDelta;
}

export interface IQueryDelta {
  tags?: string[];
  dir?: string;
  kanban?: string;
  wordcount?: { lte?: number; gte?: number };
  mtime?: { lte?: string; gte?: string };
  event?: { lte?: string; gte?: string; some?: boolean };
}

export interface IQuery {
  tags: string[];
  dir: string;
  kanban: string;
  wordcount: { lte: number; gte: number };
  mtime: { lte: string; gte: string };
  event: { lte: string; gte: string; some: boolean };
}

export const query0: IQuery = {
  tags: [],
  dir: "",
  kanban: "",
  wordcount: { gte: 0, lte: 0 },
  mtime: { gte: "", lte: "" },
  event: { gte: "", lte: "", some: false },
};

export function hrefURL({ pathname, query }: IHref) {
  const search: ISearch = {};
  if (query.dir) search.dir = query.dir;
  if (query.tags.length) search.tags = query.tags.join(" ");
  if (pathname === "/kanban" && query.kanban) search.kanban = query.kanban;
  if (query.wordcount.lte) search.wordcount_lte = String(query.wordcount.lte);
  if (query.wordcount.gte) search.wordcount_gte = String(query.wordcount.gte);
  if (query.mtime.lte) search.mtime_lte = query.mtime.lte;
  if (query.mtime.gte) search.mtime_gte = query.mtime.gte;
  if (query.event.lte) search.mtime_lte = query.event.lte;
  if (query.event.gte) search.mtime_gte = query.event.gte;
  if (query.event.some && !query.event.lte && !query.event.gte)
    search.event = "some";
  let searchString = new URLSearchParams(search).toString();
  if (searchString) searchString = "?" + searchString;
  return `${pathname}${searchString}`;
}

export function searchToQuery(search: { [key: string]: string }): IQuery {
  const dir = search.dir || "";
  const tags = search.tags?.split(" ") || [];
  const kanban = search.kanban || "";
  const wordcount = {
    lte: search.wordcount_lte ? Number(search.wordcount_lte) : 0,
    gte: search.wordcount_gte ? Number(search.wordcount_gte) : 0,
  };
  const mtime = {
    lte: search.mtime_lte ?? "",
    gte: search.mtime_gte ?? "",
  };
  const event = {
    lte: search.event_lte ?? "",
    gte: search.event_gte ?? "",
    some: !!search.event && !search.event_lte && !search.event_gte,
  };
  return { dir, tags, kanban, wordcount, mtime, event };
}

// using `??` makes it possible to erease a value by setting to ""
function update(href: IHref, delta: IHrefDelta) {
  return {
    pathname: delta.pathname ?? href.pathname,
    query: {
      dir: delta.query?.dir ?? href.query.dir,
      tags: delta.query?.tags ?? href.query.tags ?? [],
      kanban: delta.query?.kanban ?? href.query.kanban,
      wordcount: {
        lte: delta.query?.wordcount?.lte ?? href.query.wordcount.lte,
        gte: delta.query?.wordcount?.gte ?? href.query.wordcount.gte,
      },
      mtime: {
        lte: delta.query?.mtime?.lte ?? href.query.mtime.lte,
        gte: delta.query?.mtime?.gte ?? href.query.mtime.gte,
      },
      event: {
        lte: delta.query?.event?.lte ?? href.query.event.lte,
        gte: delta.query?.event?.gte ?? href.query.event.gte,
        some:
          (delta.query?.event?.some &&
            !delta.query?.event.lte &&
            !delta.query?.event.gte) ||
          false,
      },
    },
  };
}

export function dest(href: IHref, delta: IHrefDelta) {
  // const merged = merge(href as any, delta as any) as IHref;
  const merged = update(href, delta);
  return hrefURL(merged);
}
