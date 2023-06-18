import { sep } from "node:path";
import { IQuery } from "../utils/search";

function condDate(str?: string) {
  if (!str) return undefined;
  const date = new Date(str);
  if (isNaN(date.getTime())) return undefined;
  return date;
}

function whereDate({ gte, lte }: { gte?: string; lte?: string }) {
  return { gte: condDate(gte), lte: condDate(lte) };
}

function whereDateRange({ gte, lte }: { gte?: string; lte?: string }) {
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
}

export function searchToWhere(query: IQuery) {
  const idQuery = query.dir ? { startsWith: query.dir + sep } : undefined;
  const tagsQuery = query.tags
    ? query.tags.map((tagId) => ({
        tags: {
          some: {
            tagId,
          },
        },
      }))
    : undefined;
  return {
    id: idQuery,
    AND: tagsQuery,
    wordcount: {
      gte: query.wordcount.gte ? query.wordcount.gte : undefined,
      lte: query.wordcount.lte ? query.wordcount.lte : undefined,
    },
    mtime: whereDate(query.mtime),
    event: whereDateRange(query.event),
  };
}
