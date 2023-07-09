import { paramsToQuery } from "./query";
import { getTags } from "./utils";

export async function where(params: URLSearchParams) {
  const workflow = paramsToQuery(params);
  const tags = await getTags(workflow);
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
