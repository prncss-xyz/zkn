import { scalarOpts } from "./opts";
import { getScalars } from "./query";

function condNum(str?: string) {
  if (!str) return undefined;
  const num = Number(str);
  if (isNaN(num)) return undefined;
  return num;
}

function whereNum({ gte, lte }: { gte?: string; lte?: string }) {
  if (gte || lte) return { gte: condNum(gte), lte: condNum(lte) };
  return {};
}

function condDate(str?: string) {
  if (!str) return undefined;
  const date = new Date(str);
  if (isNaN(date.getTime())) return undefined;
  return date;
}

function whereDate({ gte, lte }: { gte?: string; lte?: string }) {
  if (gte || lte) return { gte: condDate(gte), lte: condDate(lte) };
  return {};
}

function whereDateOpt({
  gte,
  lte,
  some,
}: {
  gte?: string;
  lte?: string;
  some?: boolean;
}) {
  if (gte || lte) return { gte: condDate(gte), lte: condDate(lte) };
  if (some) return { not: null };
  return {};
}

function whereDateRangeOpt({
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
      isNot: null,
    };
  return {};
}

export function whereScalars(params: URLSearchParams) {
  const { scalars } = getScalars(params);
  return {
    wordcount: whereNum(scalars.wordcount),
    mtime: whereDate(scalars.mtime),
    due: whereDateOpt(scalars.due),
    since: whereDateOpt(scalars.since),
    until: whereDateOpt(scalars.until),
    event: whereDateRangeOpt(scalars.event),
  };
}

export function searchToOrderBy(params: URLSearchParams) {
  const {
    sort: { scalar, asc },
  } = getScalars(params);
  const { type } = scalarOpts[scalar];
  if (type === "DATE_RANGE" && asc === true)
    return {
      [scalar]: {
        start: "asc" as const,
      },
    };
  if (scalar === "event" && asc === false)
    return {
      [scalar]: {
        end: "desc" as const,
      },
    };
  return {
    [scalar]: asc ? ("asc" as const) : ("desc" as const),
  };
}
