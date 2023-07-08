"use client";

import { Box } from "../box";
import { Link } from "../link";
import { NotesEntry } from "@/app/(main)/(views)/search";
import { processNotes } from "./processNotes";
import { InputScalars } from "@/fields/scalars/navigator";
import { InputTags } from "@/fields/tags/navigator";
import { InputVirtualTags } from "@/fields/virtualTags/navigator";
import { InputDirs } from "@/fields/dir/navigator";
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
}: {
  entries: NotesEntry[];
  config: INotebookConfig;
}) {
  const enabled = processNotes(useKanban(), config.kanban, entries);
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
          <KanbanSelector enabledKanbans={enabled.kanbans} />
        </Box>
        <Box display="flex" flexDirection="column" gap={5}>
          <Clear />
          <InputVirtualTags enabledVirtualTags={enabled.virtualTags} />
          <InputTags enabledTags={enabled.tags} />
          <InputDirs enabledDirs={enabled.dirs} />
          <InputScalars enabledScalars={enabled.scalars} />
        </Box>
        <Box borderColor="foreground2" borderWidth={1} borderStyle="top" />
      </Box>
    </Box>
  );
}
