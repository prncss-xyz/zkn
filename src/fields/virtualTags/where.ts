import { paramsToQuery } from "./query";
import { virtualTagsOpts } from "./opts";
import { Where } from "@/app/(main)/(views)/search";

export function where(params: URLSearchParams) {
  const virtualTags = paramsToQuery(params);
  if (!virtualTags.length) return {};
  return virtualTags.reduce(
    (acc: Where, tag) => ({ ...acc, ...(virtualTagsOpts[tag].where || {}) }),
    {}
  );
}
