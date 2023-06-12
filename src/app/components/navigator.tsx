import { toggle } from "../utils/arrays";
import { dirname } from "../utils/dirname";
import { upDirs } from "../utils/upDirs";
import { Box, BoxProps } from "./box";
import { Link } from "./link";
import { ReactNode } from "react";
import { IHref, IQuery, ISearch } from "./search";
import { INotebookConfig } from "@/lib/data/notebookConfig";

function isEmpty(o: object) {
  for (const _ in o) {
    return false;
  }
  return true;
}

export interface IEntry {
  id: string;
  tags: { tagId: string }[];
}

export function queryToSearch(query: IQuery) {
  const search: ISearch = {};
  if (query.dir) search.dir = query.dir;
  if (query.tags.length) search.tags = query.tags.join(" ");
  if (query.kanban) search.kanban = query.kanban;
  return search;
}

export function queryURL(pathname: string, query: IQuery) {
  const search: ISearch = {};
  if (query.dir) search.dir = query.dir;
  if (query.tags.length) search.tags = query.tags.join(" ");
  if (pathname === "kanban" && query.kanban) search.kanban = query.kanban;
  let searchString = new URLSearchParams(search).toString();
  if (searchString) searchString = "?" + searchString;
  return `${pathname}${searchString}`;
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

interface IHrefDelta {
  pathname?: string;
  query?: Partial<IQuery>;
}

// using `??` makes it possible to erease a value by setting to ""
function update(href: IHref, delta: IHrefDelta) {
  return {
    pathname: delta.pathname ?? href.pathname,
    query: {
      dir: delta.query?.dir ?? href.query.dir,
      tags: delta.query?.tags ?? href.query.tags,
      kanban: delta.query?.kanban ?? href.query.kanban,
    },
  };
}

function NavLink({
  hrefObj,
  delta,
  active: active_,
  disabled,
  children,
  ...extra
}: {
  hrefObj: IHref;
  delta: IHrefDelta;
  active: boolean;
  disabled: boolean;
  children: ReactNode;
} & Omit<BoxProps, "href">) {
  const newHref = hrefURL(update(hrefObj, delta));
  const active = hrefURL(hrefObj) === newHref;
  if (active || disabled)
    return (
      <Box fontWeight="bold" color={active ? "active" : "disabled"} {...extra}>
        {children}
      </Box>
    );
  return (
    <Link href={newHref} {...extra}>
      {children}
    </Link>
  );
}

function ToggleTagLink({ hrefObj, tag }: { hrefObj: IHref; tag: string }) {
  const tags = hrefObj.query.tags;
  const active = tags.includes(tag);
  const href = hrefURL(update(hrefObj, { query: { tags: toggle(tags, tag) } }));
  return (
    <Link
      px={5}
      borderRadius={3}
      backgroundColor={active ? "active" : "foreground2"}
      href={href}
    >
      {tag}
    </Link>
  );
}

function KanbanSelector({
  hrefObj,
  enabledKanbans,
}: {
  hrefObj: IHref;
  enabledKanbans: string[];
}) {
  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" gap={5}>
      <Box fontWeight="bold">Kanban</Box>
      {enabledKanbans.map((label) => (
        <NavLink
          key={label}
          hrefObj={hrefObj}
          delta={{ pathname: "/kanban", query: { kanban: label } }}
          active={hrefObj.query.kanban === label}
          disabled={!enabledKanbans.includes(label)}
        >
          {label}
        </NavLink>
      ))}
    </Box>
  );
}

export function Navigator({
  hrefObj,
  entries,
  config,
  sep,
}: {
  hrefObj: IHref;
  entries: IEntry[];
  config: INotebookConfig;
  sep: string;
}) {
  const tagSet = new Set<string>();
  const dirSet = new Set<string>();
  const kanbanSet = new Set<string>();
  const { query } = hrefObj;
  entries: for (const entry of entries) {
    const queryKanban = query.kanban; // this is for type inference
    if (
      queryKanban &&
      hrefObj.pathname === "/kanban" &&
      query.kanban &&
      !entry.tags.some(({ tagId }) =>
        config.kanban[queryKanban].includes(tagId)
      )
    ) {
      continue entries;
    }
    for (const tag of entry.tags) {
      tagSet.add(tag.tagId);
      for (const [label, tags] of Object.entries(config.kanban)) {
        // if (label === query.kanban) continue;
        if (kanbanSet.has(label)) continue;
        if (tags.includes(tag.tagId)) {
          kanbanSet.add(label);
        }
      }
    }
    const dir = dirname(sep, entry.id);
    if (dir !== query.dir) dirSet.add(dir);
  }
  const enabledTags = [...tagSet].sort();
  const enabledDirs = [...dirSet].sort();
  const enabledKanbans = [...kanbanSet].sort();
  const someFilters = query.dir || query.tags.length;
  return (
    <Box px={{ s: 5, md: 0 }} width="screenMaxWidth">
      <Box display="flex" flexDirection="column" gap={10}>
        <Box display="flex" flexDirection="column" gap={5}>
          <NavLink
            hrefObj={hrefObj}
            delta={{ pathname: "/notes" }}
            active={hrefObj.pathname === "/notes"}
            disabled={false}
          >
            Notes
          </NavLink>
          {!isEmpty(config.kanban) && (
            <KanbanSelector hrefObj={hrefObj} enabledKanbans={enabledKanbans} />
          )}
        </Box>
        <Box display="flex" flexDirection="column" gap={5}>
          <NavLink
            hrefObj={hrefObj}
            delta={{ query: { dir: "", tags: [] } }}
            active={!someFilters}
            disabled={!someFilters}
          >
            Clear filters
          </NavLink>
          <Box display="flex" flexDirection="row" flexWrap="wrap" gap={10}>
            <Box fontWeight="bold">Tags</Box>
            {enabledTags.map((tag) => (
              <ToggleTagLink key={tag} hrefObj={hrefObj} tag={tag} />
            ))}
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            alignItems="center"
            gap={10}
          >
            <Box fontWeight="bold">Dirs</Box>
            {upDirs(sep, query.dir).map((dir) => (
              <NavLink
                key={dir}
                hrefObj={hrefObj}
                delta={{ query: { dir } }}
                active={hrefObj.query.dir === dir}
                disabled={false}
                fontFamily="monospace"
              >
                {dir || "."}
              </NavLink>
            ))}
            <Box fontFamily="monospace" color="foreground1">
              |
            </Box>
            {enabledDirs.map((dir) => (
              <NavLink
                key={dir}
                hrefObj={hrefObj}
                delta={{ query: { dir } }}
                active={hrefObj.query.dir === dir}
                disabled={false}
                fontFamily="monospace"
              >
                {dir || "."}
              </NavLink>
            ))}
          </Box>
        </Box>
        <Box borderColor="foreground2" borderWidth={1} borderStyle="top" />
      </Box>
    </Box>
  );
}
