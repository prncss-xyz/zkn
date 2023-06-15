import { sep } from "node:path";
import { IQuery } from "../utils/search";

export function searchToWhere(query: IQuery) {
  const idQuery = query.dir ? { startsWith: query.dir + sep } : undefined;
  const tagsQuery = query.tags
    ? query.tags.map((tagId) => ({
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
    wordcount: {
      gte: query.wordcount.gte,
      lte: query.wordcount.lte,
    },
  };
}
