"use client";

import { Box } from "../box";
import { Link } from "../link";
import { IEntry } from "../../server/actions/search";
import { processNotes } from "./processNotes";
import { InputScalars } from "./scalar";
import { InputTags } from "./tag";
import { InputDirs } from "./dir";
import { usePathname, useSearchParams } from "next/navigation";
import { sprinkles } from "@/sprinkles.css";
import { INotebookConfig } from "@/server/data/notebookConfig";

function Kanban({ kanban }: { kanban: string }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  const active = params.get("kanban") === kanban;
  params.set("kanban", kanban);
  const query = params.toString();
  return (
    <Link
      className={sprinkles({ color: active ? "active" : "link" })}
      href={{ pathname: "/kanban", query }}
    >
      {kanban}
    </Link>
  );
}

function KanbanSelector({ enabledKanbans }: { enabledKanbans: string[] }) {
  return (
    <>
      {enabledKanbans.map((kanban) => (
        <Kanban key={kanban} kanban={kanban} />
      ))}
    </>
  );
}

function Notes({}: {}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as any);
  params.delete("kanban");
  const query = params.toString();
  const active = pathname === "/notes";
  return (
    <Link
      className={sprinkles({ color: active ? "active" : "link" })}
      href={{ pathname: "/notes", query }}
    >
      Notes
    </Link>
  );
}

function Clear({}: {}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.toString() === "";
  return (
    <Link
      className={sprinkles({ color: active ? "active" : "link" })}
      href={{ pathname }}
    >
      Clear filters
    </Link>
  );
}

function useKanban() {
  const searchParams = useSearchParams();
  return searchParams.get("kanban") || "";
}

export function Navigator({
  entries,
  config,
  sep,
}: {
  entries: IEntry[];
  config: INotebookConfig;
  sep: string;
}) {
  const { enabledDirs, enabledTags, enabledKanbans, enabledScalars } =
    processNotes(useKanban(), config.kanban, entries);
  return (
    <Box
      px={{ s: 5, md: 0 }}
      width="screenMaxWidth"
      display="flex"
      flexDirection="column"
    >
      <Box display="flex" flexDirection="column" gap={10}>
        <Box display="flex" flexDirection="row" gap={10}>
          <Notes />
          <KanbanSelector enabledKanbans={enabledKanbans} />
        </Box>
        <Box display="flex" flexDirection="column" gap={5}>
          <Clear />
          <InputTags enabledTags={enabledTags} />
          <InputDirs enabledDirs={enabledDirs} />
          <InputScalars enabledScalars={enabledScalars} />
        </Box>
        <Box borderColor="foreground2" borderWidth={1} borderStyle="top" />
      </Box>
    </Box>
  );
}
