import { Where } from "@/app/(main)/(views)/search";
import { getBacklink } from "./query";

export function whereBacklinks(params: URLSearchParams): Where {
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
