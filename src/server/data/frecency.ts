/** half-life */
const hl = 30 * 24 * 3600 * 1000;

export function initFrecency() {
  return new Date();
}

export function incFrecency(frecency: Date, inc: number) {
  const now = Date.now();
  const s = Math.exp(hl * (frecency.getTime() - now)) + inc;
  return new Date(now + Math.log(s) / hl);
}
