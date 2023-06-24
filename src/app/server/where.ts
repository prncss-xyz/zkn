import { sep } from "node:path";
import { IQuery } from "../utils/search";
import { whereScalars } from "../components/navigator/scalar/where";

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
    ...whereScalars(query),
  };
}
