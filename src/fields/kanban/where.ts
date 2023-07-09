import { INotebookConfig } from "@/server/data/notebookConfig";
import { paramsToValueKanban } from "./query";
import { getTags } from "./utils";

export function whereKanban(
  notebookConfig: INotebookConfig,
  params: URLSearchParams
) {
  const kanban = paramsToValueKanban(params);
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
