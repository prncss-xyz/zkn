import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { Link } from "@/components/link";
import { queryToParams } from "../kanban//query";
import { getNotebookConfig } from "@/server/data/notebookConfig";
import { getKanbans } from "./utils";

export async function KanbanViews({ note }: { note: NoteEntry }) {
  const notebookConfig = await getNotebookConfig();
  const kanbans = getKanbans(notebookConfig, note);
  return (
    <>
      {kanbans.map((workflow) => (
        <Link
          key={workflow}
          href={{
            pathname: "/kanban",
            query: queryToParams(new URLSearchParams(), workflow),
          }}
        >
          {workflow}
        </Link>
      ))}
    </>
  );
}
