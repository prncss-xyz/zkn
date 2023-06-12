export function upDirs(sep: string, dir: string) {
  const res: string[] = [];
  if (!dir) return [""];
  const segments = dir.split(sep);
  for (let i = 0; i <= segments.length; i++)
    res.push(segments.slice(0, i).join(sep));
  return res;
}
