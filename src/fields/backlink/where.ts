import { paramsToValueBacklink } from "./query";

export function whereBacklinks(params: URLSearchParams) {
  const backlink = paramsToValueBacklink(params);
  if (!backlink) return {};
  return {
    links: {
      some: {
        targetId: backlink,
      },
    },
  };
}
