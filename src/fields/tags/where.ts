import { paramsToValueTags } from "./query";

export function whereTags(params: URLSearchParams) {
  const tags = paramsToValueTags(params);
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
