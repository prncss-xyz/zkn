interface IEntry {
  id: string;
  title: string | null;
}

function cmp(a: any, b: any) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export function titleSorter(a: IEntry, b: IEntry) {
  if (!a.title && !b.title) {
    return cmp(a.id, b.id);
  }
  if (!a.title) return -1;
  if (!b.title) return 1;
  return cmp(a.title, b.title);
}
