import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { Link } from "@/components/link";
import { queryToParams } from "../kanban//query";
import { getNotebookConfig } from "@/server/data/notebookConfig";
import { getKanbans } from "./utils";

export async function KanbanViews({ entry }: { entry: NoteEntry }) {
  const notebookConfig = await getNotebookConfig();
  const kanbans = getKanbans(notebookConfig, entry);
  return (
    <>
      {kanbans.map((kanban) => (
        <Link
          key={kanban}
          href={{
            pathname: "/kanban",
            query: queryToParams(new URLSearchParams(), kanban),
          }}
        >
          {kanban}
        </Link>
      ))}
    </>
  );
}
