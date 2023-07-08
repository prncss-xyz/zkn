import { paramsToQuery } from "./query";

export function where(params: URLSearchParams) {
  const backlink = paramsToQuery(params);
  if (!backlink) return {};
  return {
    links: {
      some: {
        targetId: backlink,
      },
    },
  };
}
