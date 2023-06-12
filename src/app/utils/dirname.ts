export function dirname(sep: string, filepath: string) {
  const index = filepath.lastIndexOf(sep);
  if (index === -1) return "";
  return filepath.slice(0, index);
}
