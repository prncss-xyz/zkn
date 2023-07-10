import { Where } from "@/app/(main)/(views)/search";
import { getTags } from "./query";

export function whereTags(params: URLSearchParams): Where {
  const tags = getTags(params);
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
