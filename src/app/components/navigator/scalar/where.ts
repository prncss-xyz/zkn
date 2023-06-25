import { IQuery } from "@/app/utils/search";

function condDate(str?: string) {
  if (!str) return undefined;
  const date = new Date(str);
  if (isNaN(date.getTime())) return undefined;
  return date;
}

function whereDate({ gte, lte }: { gte?: string; lte?: string }) {
  return { gte: condDate(gte), lte: condDate(lte) };
}

function whereDateRange({
  gte,
  lte,
  some,
}: {
  gte?: string;
  lte?: string;
  some?: boolean;
}) {
  if (gte || lte)
    return {
      start: gte
        ? {
            gte: new Date(gte),
          }
        : undefined,
      end: lte
        ? {
            lte: new Date(lte),
          }
        : undefined,
    };
  if (some)
    return {
      start: {},
    };
}

export function whereScalars(query: IQuery) {
  return {
    wordcount: {
      gte: query.wordcount.gte ? query.wordcount.gte : undefined,
      lte: query.wordcount.lte ? query.wordcount.lte : undefined,
    },
    mtime: whereDate(query.mtime),
    event: whereDateRange(query.event),
  };
}
