import { getLink } from "./query";

export function whereLink(params: URLSearchParams) {
  const link = getLink(params);
  if (!link) return {};
  return {
    backlinks: {
      some: {
        sourceId: link,
      },
    },
  };
}
