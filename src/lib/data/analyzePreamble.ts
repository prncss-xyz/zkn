import { z } from "zod";
import { FileEntry } from "./scanFiles";

function isDay(raw: any) {
  if (!(raw instanceof Date)) return false;
  if (raw.getHours() !== 0) return false;
  if (raw.getMinutes() !== 0) return false;
  if (raw.getSeconds() !== 0) return false;
  if (raw.getMilliseconds() !== 0) return false;
  return true;
}

const event = z.preprocess(
  function (raw: any) {
    if (!raw) return null;
    if (typeof raw === "string" || raw instanceof Date) {
      raw = { start: raw };
    }
    // sometimes YAML parser return dates, sometimes strings that can be converted to dates
    if (typeof raw.start === "string") raw.start = new Date(raw.start);
    if (typeof raw.end === "string") raw.end = new Date(raw.end);
    // TODO: test
    raw.day ??= isDay(raw.start) && (!raw.end || isDay(raw.end));
    if (!raw.end || raw.end === raw.start) raw.end = null;
    return raw;
  },
  z.nullable(
    z.object({
      start: z.date(),
      end: z.nullable(z.date()),
      day: z.boolean(),
    })
  )
);

function toArray(raw: unknown) {
  if (raw == undefined) return [];
  if (!Array.isArray(raw)) return [raw];
  return raw;
}

const dataSchema = z.object({
  tags: z.preprocess(toArray, z.array(z.string()).default([])),
  event,
});

export function analyzePreamble(fileEntry: FileEntry, raw: unknown) {
  const data = dataSchema.parse(raw);
  return {
    entry: { ...fileEntry },
    event: data.event,
    tags: data.tags,
  };
}
