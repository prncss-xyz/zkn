import { paramsToValueVirtualTags } from "./query";
import { virtualTagsOpts } from "./opts";
import { Where } from "@/app/(main)/(views)/search";

export function whereVirtualTags(params: URLSearchParams) {
  const virtualTags = paramsToValueVirtualTags(params);
  if (!virtualTags.length) return {};
  return virtualTags.reduce(
    (acc: Where, tag) => ({ ...acc, ...(virtualTagsOpts[tag].where || {}) }),
    {}
  );
}
