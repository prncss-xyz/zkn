import { Where } from "@/app/(main)/(views)/search";
import { NotesEntry } from "@/app/(main)/(views)/search";
import { NoteEntry } from "@/app/(main)/note/[...path]/page";
import { Common } from "@/utils/common";

export type CommonEntry = Common<NotesEntry, NoteEntry>;

export const virtualTags = ["orphan"];

interface IVirtualTagOpts {
  test: (entry: CommonEntry) => boolean;
  where: Where;
}

export const virtualTagsOpts: {
  [name: string]: IVirtualTagOpts;
} = {
  orphan: {
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
