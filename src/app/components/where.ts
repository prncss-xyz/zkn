import { sep } from "node:path";
import { IQuery } from "./search";

export function searchToWhere({ dir, tags }: IQuery) {
  const idQuery = dir ? { startsWith: dir + sep } : undefined;
  const tagsQuery = tags
    ? tags.map((tagId) => ({
        tags: {
          some: {
            tagId,
          },
        },
      }))
    : undefined;
  return {
    id: idQuery,
    AND: tagsQuery,
  };
}
