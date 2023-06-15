import { toggle } from "../../utils/arrays";
import { Box, BoxProps } from "../box";
import { Link } from "../link";
import { ReactNode } from "react";
import { IHref } from "../../utils/search";
import { INotebookConfig } from "@/lib/data/notebookConfig";
import { IEntry, IHrefDelta, hrefURL, processNotes, update } from "./utils";

function isEmpty(o: object) {
  for (const _ in o) {
    return false;
  }
  return true;
}

export function NavLink({
  hrefObj,
  delta,
  children,
  ...extra
}: {
  hrefObj: IHref;
  delta: IHrefDelta;
  children: ReactNode;
} & Omit<BoxProps, "href">) {
  const newHref = hrefURL(update(hrefObj, delta));
  const active = hrefURL(hrefObj) === newHref;
  if (active)
    return (
      <Box fontWeight="bold" color={"active"} {...extra}>
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
  const queryKanban =
    (hrefObj.pathname === "kanban" && hrefObj.query.kanban) || "";
  const [enabledDirs, enabledTags, enabledKanbans] = processNotes(
    queryKanban,
    config.kanban,
    sep,
    entries
  );
  return (
    <Box
      px={{ s: 5, md: 0 }}
      width="screenMaxWidth"
      style={{ maxHeight: "30vh", overflowY: "scroll" }}
    >
      <Box display="flex" flexDirection="column" gap={10}>
        <Box display="flex" flexDirection="column" gap={5}>
          <NavLink hrefObj={hrefObj} delta={{ pathname: "/notes" }}>
            Notes
          </NavLink>
          {!isEmpty(config.kanban) && (
            <KanbanSelector hrefObj={hrefObj} enabledKanbans={enabledKanbans} />
          )}
        </Box>
        <Box display="flex" flexDirection="column" gap={5}>
          <NavLink hrefObj={hrefObj} delta={{ query: { dir: "", tags: [] } }}>
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
            {enabledDirs.map((dir) => (
              <NavLink
                key={dir}
                hrefObj={hrefObj}
                delta={{ query: { dir } }}
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
