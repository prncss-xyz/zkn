const sep = "/";

function upTag(tag: string) {
  const res: string[] = [];
  if (!tag) return [];
  const segments = tag.split(sep);
  for (let i = 1; i <= segments.length; i++)
    res.push(segments.slice(0, i).join(sep));
  return res;
}

export function upTags(tags: string[]) {
  const acc = new Set<string>();
  for (const tag of tags) {
    for (const tag_ of upTag(tag)) {
      acc.add(tag_);
    }
  }
  return Array.from(acc);
}
