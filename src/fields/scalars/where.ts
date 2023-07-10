import { getScalars } from "./query";

function condNum(str?: string) {
  if (!str) return undefined;
  const num = Number(str);
  if (isNaN(num)) return undefined;
  return num;
}

function whereNum({ gte, lte }: { gte?: string; lte?: string }) {
  return { gte: condNum(gte), lte: condNum(lte) };
}

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

export function whereScalars(params: URLSearchParams) {
  const { scalars } = getScalars(params);
  return {
    wordcount: whereNum(scalars.wordcount),
    mtime: whereDate(scalars.mtime),
    event: whereDateRange(scalars.event),
  };
}

export function searchToOrderBy(params: URLSearchParams) {
  const {
    sort: { scalar, asc },
  } = getScalars(params);
  if (scalar === "event" && asc === true)
    return {
      event: {
        start: "asc" as const,
      },
    };
  if (scalar === "event" && asc === false)
    return {
      event: {
        end: "desc" as const,
      },
    };
  return {
    [scalar]: asc ? "asc" as const : "desc" as const,
  };
}
