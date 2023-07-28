export function escapeShell(str: string) {
  return str.replaceAll(/[*\\ "'?]/g, (char) => "\\" + char);
}
