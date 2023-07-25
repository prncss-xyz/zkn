type Type = "NUMBER" | "DATE" | "DATE_RANGE";

interface IScalarOpts {
  label: string;
  type: Type;
  always: boolean;
  select: boolean;
}

export const defaultSort = {
  scalar: "frecency",
  asc: false,
};

export function toNum(type: Type, str: string) {
  if (type === "NUMBER") return Number(str);
  return new Date(str).getTime();
}

export const scalarOpts: {
  [key: string]: IScalarOpts;
} = {
  wordcount: {
    always: true,
    label: "Wordcount",
    type: "NUMBER",
    select: true,
  },
  mtime: {
    always: true,
    label: "Modified",
    type: "DATE",
    select: true,
  },
  event: {
    always: false,
    label: "Event",
    type: "DATE_RANGE",
    select: true,
  },
  frecency: {
    always: true,
    label: "Frecency",
    type: "DATE",
    select: false,
  },
  due: {
    always: false,
    label: "Due",
    type: "DATE",
    select: true,
  },
  since: {
    always: false,
    label: "Since",
    type: "DATE",
    select: true,
  },
  until: {
    always: false,
    label: "Until",
    type: "DATE",
    select: true,
  },
};

export const scalars = Object.keys(scalarOpts);
