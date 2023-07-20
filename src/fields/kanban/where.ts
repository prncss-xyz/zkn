import { INotebookConfig } from "@/server/data/notebookConfig";
import { getKanban } from "./query";
import { getTags } from "./utils";
import { Where } from "@/app/(main)/(views)/search";

export function whereKanban(
  notebookConfig: INotebookConfig,
  params: URLSearchParams
): Where {
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
