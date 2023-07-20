import { boolean, z } from "zod";
import { FileEntry } from "./scanFiles";
import { resolve, relative, dirname } from "node:path/posix";

const hourMs = 60 * 60 * 1000;
const dayMs = 24 * hourMs;

function nextHour(date: Date) {
  const next = new Date(date);
  next.setTime(next.getTime() + hourMs);
  return next;
}

function nextDay(date: Date) {
  const next = new Date(date);
  next.setTime(next.getTime() + dayMs);
  return next;
}

const date = z.preprocess(function (raw: any) {
  if (raw === undefined) return null;
  // sometimes YAML parser return dates, sometimes strings that can be converted to dates
  if (typeof raw === "string") {
    raw = new Date(raw);
    if (isNaN(raw.getTime())) throw new Error("Invalid date");
  }
  return raw;
}, z.nullable(z.date()));

const dateRange = z.preprocess(
  function (raw: any) {
    if (!raw) return null;
    if (typeof raw === "string" || raw instanceof Date) {
      raw = { start: raw };
    }
    if (typeof raw !== "object") throw new Error("Invalid date range");
    const start = date.parse(raw.start);

    if (!start) throw new Error("Invalid date range");
    const day = z.optional(boolean()).parse(raw.day);
    let end: Date | null;
    end = date.parse(raw.end);
    if (end && day !== undefined) throw new Error("Invalid date range");
    end ??= day ? nextDay(start) : nextHour(start);
    return { start, end };
  },

  z.nullable(
    z.object({
      start: z.date(),
      end: z.date(),
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
  event: dateRange,
  due: date,
  since: date,
  until: date,
  asset: z.nullable(z.string()).default(null),
});

export const defaultPreamble = {
  tags: [] as string[],
  event: null,
  due: null,
  since: null,
  until: null,
  asset: null,
};

export function analyzePreamble(entry: FileEntry, raw: unknown) {
  const preamble = dataSchema.parse(raw);
  if (preamble.asset) {
    preamble.asset = relative(".", resolve(dirname(entry.id), preamble.asset));
  }
  return {
    preamble,
    entry,
  };
}
