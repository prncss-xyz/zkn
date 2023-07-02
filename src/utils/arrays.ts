export function toggle<T>(xs: T[], x: T): T[] {
  if (xs.includes(x)) return xs.filter((x_) => x_ !== x);
  return [...xs, x];
}
