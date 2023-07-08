import { Where } from "@/app/(main)/(views)/search";
import { NotesEntry } from "@/app/(main)/(views)/search";
import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { Common } from "@/utils/common";

export type CommonEntry = Common<NotesEntry, NoteEntry>;

export const virtualTags = ["top", "bottom"];

interface IVirtualTagOpts {
  test: (entry: CommonEntry) => boolean;
  where: Where;
}

export const virtualTagsOpts: {
  [name: string]: IVirtualTagOpts;
} = {
  bottom: {
    test: (entry: CommonEntry) => !entry.backlinks.length,
    where: {
      backlinks: {
        none: {
          sourceId: {},
        },
      },
    },
  },
  top: {
    test: (entry: CommonEntry) => !entry.links.length,
    where: {
      links: {
        none: {
          targetId: {},
        },
      },
    },
  },
};
