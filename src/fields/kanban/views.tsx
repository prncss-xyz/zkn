import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { Link } from "@/components/link";
import { setKanban } from "../kanban//query";
import { getNotebookConfig } from "@/server/data/notebookConfig";
import { setEntryKanban } from "./utils";

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
          <Link
            key={kanban}
            href={{
              pathname: "/kanban",
              query,
            }}
          >
            {kanban}
          </Link>
        );
      })}
    </>
  );
}
