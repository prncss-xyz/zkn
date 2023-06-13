export function upDirs(sep: string, dir: string) {
  const res: string[] = [];
  if (!dir) return [""];
  const segments = dir.split(sep);
  for (let i = 0; i <= segments.length; i++)
    res.push(segments.slice(0, i).join(sep));
  return res;
}

export function dirname(sep: string, filepath: string) {
  const index = filepath.lastIndexOf(sep);
  if (index === -1) return "";
  return filepath.slice(0, index);
}

export function headDir(sep: string, filepath: string, position?: number) {
  const index = filepath.indexOf(sep, position);
  if (index === -1) return null;
  return filepath.slice(0, index);
}
