export const scalars = ["wordcount", "mtime", "event"];

const toNumDate = (str: string) => new Date(str).getTime();


interface IScalarOpts {
  label: string;
  toNum: (str: string) => number;
  always: boolean;
}

export const scalarOpts: {
  [key: string]: IScalarOpts;
} = {
  wordcount: {
    always: true,
    label: "Wordcount",
    toNum: Number,
  },
  mtime: {
    always: true,
    label: "Modified",
    toNum: toNumDate,
  },
  event: {
    always: false,
    label: "Event",
    toNum: toNumDate,
  },
};
