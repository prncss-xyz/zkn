import { Where } from "@/app/(main)/(views)/search";
import { NotesEntry } from "@/app/(main)/(views)/search";
import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { Common } from "@/utils/common";

export type CommonEntry = Common<NotesEntry, NoteEntry>;

interface IVirtualTagOpts {
  test: (entry: CommonEntry) => boolean;
  where: () => Where;
}

export const virtualTagsOpts: {
  [name: string]: IVirtualTagOpts;
} = {
  due: {
    test: (entry) => (entry.due ? entry.due <= new Date() : false),
    where: () => ({
      due: {
        lte: new Date(),
      },
    }),
  },
  since: {
    test: (entry) => (entry.since ? entry.since >= new Date() : false),
    where: () => ({
      since: {
        gte: new Date(),
      },
    }),
  },
  until: {
    test: (entry) => (entry.until ? entry.until <= new Date() : false),
    where: () => ({
      until: {
        lte: new Date(),
      },
    }),
  },
  event: {
    test: (entry) => {
      if (!entry.event) return false;
      const now = new Date();
      return entry.event.start <= now && now <= entry.event.end;
    },
    where: () => {
      const now = new Date();
      return {
        event: {
          start: {
            lte: now,
          },
          end: {
            gte: now,
          },
        },
      };
    },
  },
  orphan: {
    test: (entry) => !entry.links.length,
    where: () => ({
      links: {
        none: {
          targetId: {},
        },
      },
    }),
  },
};

export const virtualTags = Object.keys(virtualTagsOpts);
