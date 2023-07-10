import { getBacklink } from "./query";

export function whereBacklinks(params: URLSearchParams) {
  const backlink = getBacklink(params);
  if (!backlink) return {};
  return {
    links: {
      some: {
        targetId: backlink,
      },
    },
  };
}
