import { paramsToQuery } from "./query";

export function where(params: URLSearchParams) {
  const tags = paramsToQuery(params);
  if (!tags.length) return {};
  return {
    AND: tags.map((tagId) => ({
      tags: {
        some: {
          tagId,
        },
      },
    })),
  };
}
