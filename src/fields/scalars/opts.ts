type Type = "NUMBER" | "DATE" | "DATE_RANGE";

interface IScalarOpts {
  label: string;
  type: Type;
  always: boolean;
}

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
  },
  mtime: {
    always: true,
    label: "Modified",
    type: "DATE",
  },
  event: {
    always: false,
    label: "Event",
    type: "DATE_RANGE",
  },
  due: {
    always: false,
    label: "Due",
    type: "DATE",
  },
  since: {
    always: false,
    label: "Since",
    type: "DATE",
  },
  until: {
    always: false,
    label: "Until",
    type: "DATE",
  },
};

export const scalars = Object.keys(scalarOpts);
