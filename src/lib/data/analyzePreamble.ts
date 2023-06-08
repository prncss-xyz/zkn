import { z } from "zod";
import { FileEntry } from "./scanFiles";

// TODO: status (task)
// const status = data.status?.at(-1)?.name;

const event = z.preprocess(
  function (raw: any) {
    if (raw instanceof Date) {
      return { start: raw, end: raw };
    }
    if (raw && typeof raw === "object") {
      raw.end ??= raw?.start;
    }
    if (!raw) return null;
    return raw;
  },
  z.nullable(
    z.object({
      start: z.date(),
      end: z.date(),
      day: z.boolean().default(false),
    })
  )
);

function toNull(raw: unknown) {
  if (typeof raw === "undefined") return null;
  return raw;
}

function toArray(raw: unknown) {
  if (raw == undefined) return [];
  if (!Array.isArray(raw)) return [raw];
  return raw;
}

const dataSchema = z.object({
  status: z.preprocess(toNull, z.string().nullable()),
  tags: z.preprocess(toArray, z.array(z.string()).default([])),
  event,
});

export function analyzePreamble(fileEntry: FileEntry, raw: unknown) {
  const data = dataSchema.parse(raw);
  return {
    entry: { ...fileEntry, status: data.status },
    event: data.event,
    tags: data.tags,
  };
}
