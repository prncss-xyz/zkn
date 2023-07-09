import { paramsToValueLink } from "./query";

export function whereLink(params: URLSearchParams) {
  const link = paramsToValueLink(params);
  if (!link) return {};
  return {
    backlinks: {
      some: {
        sourceId: link,
      },
    },
  };
}
