import { Box } from "@/components/box";
import { ReactNode } from "react";
import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { scalarOpts } from "./opts";

function Entry({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Box p={5} display="flex" flexDirection="row" alignItems="center">
      <Box width="labelWidth">{label}</Box>
      {children}
    </Box>
  );
}

function Scalar({
  field,
  value,
}: {
  field: string;
  value: number | Date | DateRange | null;
}) {
  if (!value) return null;
  const { label } = scalarOpts[field];
  if (typeof value === "number") return <Entry label={label}>{value}</Entry>;
  if (value instanceof Date)
    return <Entry label={label}>{value.toLocaleDateString()}</Entry>;
  return (
    <Entry label={label}>
      <ContentDateRange event={value} />
    </Entry>
  );
}

interface DateRange {
  start: Date;
  end: Date;
}

function ContentDateRange({ event }: { event: DateRange }) {
  const day = true; // TODO:
  const start = day
    ? event.start.toLocaleDateString()
    : event.start.toLocaleString();
  if (event.end === event.start) {
    return start;
  }
  const end = day ? event.end.toLocaleDateString() : event.end.toLocaleString();
  return (
    <>
      {start} &mdash; {end}
    </>
  );
}

export function NoteScalars({ entry }: { entry: NoteEntry }) {
  return (
    <Box backgroundColor="foreground2" p={5} borderRadius={{ xs: 0, md: 5 }}>
      <Scalar field="mtime" value={entry.mtime} />
      <Scalar field="wordcount" value={entry.wordcount} />
      <Scalar field="event" value={entry.event} />
      <Scalar field="due" value={entry.due} />
      <Scalar field="since" value={entry.since} />
      <Scalar field="until" value={entry.until} />
    </Box>
  );
}
