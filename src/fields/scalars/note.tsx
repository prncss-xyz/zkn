import { Box } from "@/components/box";
import { ReactNode } from "react";
import { NoteEntry } from "@/app/(main)/note/[...path]/page";

function Entry({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Box p={5} display="flex" flexDirection="row" alignItems="center">
      <Box width="labelWidth">{label}</Box>
      {children}
    </Box>
  );
}

function toStringDate(date: Date) {
  return date.toLocaleDateString();
}

function Mtime({ note }: { note: NoteEntry }) {
  return <Entry label="modified">{toStringDate(note.mtime)}</Entry>;
}

function Wordcount({ note }: { note: NoteEntry }) {
  return <Entry label="wordcount">{note.wordcount}</Entry>;
}

interface IEvent {
  start: Date;
  end: Date;
}

function ContentEvent({ event }: { event: IEvent }) {
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

function Event({ note }: { note: NoteEntry }) {
  if (!note.event) return null;
  return (
    <Entry label="event">
      <ContentEvent event={note.event} />
    </Entry>
  );
}

export function NoteScalars({ entry }: { entry: NoteEntry }) {
  return (
    <Box backgroundColor="foreground2" p={5} borderRadius={{ xs: 0, md: 5 }}>
      <Mtime note={entry} />
      <Wordcount note={entry} />
      <Event note={entry} />
    </Box>
  );
}
