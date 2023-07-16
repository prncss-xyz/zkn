import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { setKanban } from "../kanban//query";
import { getNotebookConfig } from "@/server/data/notebookConfig";
import { setEntryKanban } from "./utils";
import { NavLink } from "@/components/navLink";

export async function KanbanViews({ entry }: { entry: NoteEntry }) {
  const notebookConfig = await getNotebookConfig();
  const kanbans = setEntryKanban(notebookConfig, entry);
  const params = new URLSearchParams();
  return (
    <>
      {kanbans.map((kanban) => {
        setKanban(params, kanban);
        const query = params.toString();
        return (
          <NavLink
            key={kanban}
            href={{
              pathname: "/kanban",
              query,
            }}
          >
            {kanban}
          </NavLink>
        );
      })}
    </>
  );
}
