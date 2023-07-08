import { paramsToQuery } from "./query";

export function where(params: URLSearchParams) {
  const link = paramsToQuery(params);
  if (!link) return {};
  return {
    backlinks: {
      some: {
        sourceId: link,
      },
    },
  };
}
