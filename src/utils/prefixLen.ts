function min(prefix: string | null, tag: string) {
  const endRange = tag.indexOf("/") + 1;
  const sub = tag.slice(0, endRange);
  if (prefix === null) return sub;
  if (sub.startsWith(prefix)) return prefix;
  if (prefix.startsWith(sub)) return sub;
  return "";
}

export function getPrefixLen(tags: string[]) {
  const prefix = tags.reduce(min, null);
  return prefix?.length ?? 0;
}
