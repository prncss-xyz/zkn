import { INotebookConfig } from "@/server/data/notebookConfig";
import { getKanban } from "./query";
import { getTags } from "./utils";

export function whereKanban(
  notebookConfig: INotebookConfig,
  params: URLSearchParams
) {
  const kanban = getKanban(params);
  const tags = getTags(notebookConfig, kanban);
  if (!tags.length) return {};
  return {
    OR: tags.map((tagId) => ({
      tags: {
        some: {
          tagId,
        },
      },
    })),
  };
}
