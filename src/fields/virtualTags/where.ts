import { getVirtualTags } from "./query";
import { virtualTagsOpts } from "./opts";
import { Where } from "@/app/(main)/(views)/search";

export function whereVirtualTags(params: URLSearchParams): Where {
  const virtualTags = getVirtualTags(params);
  if (!virtualTags.length) return {};
  return virtualTags.reduce(
    (acc: Where, tag) => ({ ...acc, ...(virtualTagsOpts[tag].where() || {}) }),
    {}
  );
}
