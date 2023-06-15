import { IHref, IQuery, ISearch } from "../../utils/search";
import { dirname, upDirs } from "../../utils/path";

export interface IEntry {
  id: string;
  tags: { tagId: string }[];
}

export function hrefURL({ pathname, query }: IHref) {
  const search: ISearch = {};
  if (query.dir) search.dir = query.dir;
  if (query.tags.length) search.tags = query.tags.join(" ");
  if (pathname === "/kanban" && query.kanban) search.kanban = query.kanban;
  let searchString = new URLSearchParams(search).toString();
  if (searchString) searchString = "?" + searchString;
  return `${pathname}${searchString}`;
}

export interface IHrefDelta {
  pathname?: string;
  query?: Partial<IQuery>;
}

// using `??` makes it possible to erease a value by setting to ""
export function update(href: IHref, delta: IHrefDelta) {
  return {
    pathname: delta.pathname ?? href.pathname,
    query: {
      dir: delta.query?.dir ?? href.query.dir,
      tags: delta.query?.tags ?? href.query.tags,
      kanban: delta.query?.kanban ?? href.query.kanban,
    },
  };
}

export function processNotes(
  queryKanban: string,
  kanbanConfig: { [kanban: string]: string[] },
  sep: string,
  entries: IEntry[]
) {
  const tagSet = new Set<string>();
  const dirSet = new Set<string>();
  const kanbanSet = new Set<string>();
  for (const entry of entries) {
    if (
      queryKanban &&
      !entry.tags.some(({ tagId }) => kanbanConfig[queryKanban].includes(tagId))
    ) {
      continue;
    }
    for (const tag of entry.tags) {
      tagSet.add(tag.tagId);
      for (const [label, tags] of Object.entries(kanbanConfig)) {
        if (kanbanSet.has(label)) continue;
        if (tags.includes(tag.tagId)) {
          kanbanSet.add(label);
        }
      }
    }
    for (const dir of upDirs(sep, dirname(sep, entry.id))) {
      dirSet.add(dir);
    }
  }
  const enabledTags = Array.from(tagSet).sort();
  const enabledDirs = Array.from(dirSet).sort();
  const enabledKanbans = Array.from(kanbanSet).sort();
  return [enabledDirs, enabledTags, enabledKanbans] as const;
}
