import { Where } from "@/app/(main)/(views)/search";
import { getTags } from "./query";
import { getKanban } from "../kanban/query";
import { INotebookConfig } from "@/server/data/notebookConfig";

export function whereTags(
  notebookConfig: INotebookConfig,
  params: URLSearchParams
): Where {
  const tags = getTags(params);
  const kanban = getKanban(params);
  const kanbanTags = notebookConfig.kanbans[kanban] ?? [];
  return {
    AND: tags
      .filter((tag) => !kanbanTags.includes(tag))
      .map((tagId) => ({
        tags: {
          some: {
            tagId,
          },
        },
      })),
  };
}
