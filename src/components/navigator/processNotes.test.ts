import { noteEntry0 } from "@/app/(main)/(views)/search";
import { processNotes } from "./processNotes";

const kanbans = { v: ["p", "z"], w: ["a"] };
const config = { kanbans, reversedTags: [], reversedVirtualTags: [] };
const params = new URLSearchParams();

describe("processNotes", () => {
  it("description", () => {
    expect(processNotes(config, params, [])).toMatchObject({
      dirs: [],
      kanbans: [],
      scalars: ["frecency", "mtime", "wordcount"],
      tags: { direct: [], reverse: [] },
      virtualTags: { direct: [], reverse: [] },
    });
    expect(
      processNotes(config, params, [
        { ...noteEntry0, id: "a/1.md", tags: [{ tagId: "p" }] },
        {
          ...noteEntry0,
          id: "a/b/c/1.md",
          tags: [{ tagId: "p" }, { tagId: "q" }],
        },
        { ...noteEntry0, id: "b/1.md", tags: [{ tagId: "p" }] },
        { ...noteEntry0, id: "c/1.md", tags: [{ tagId: "q" }] },
      ])
    ).toMatchObject({
      dirs: ["", "a", "a/b", "a/b/c", "b", "c"],
      tags: { direct: ["p", "q"], reverse: [] },
      virtualTags: { direct: ["orphan"] },
      kanbans: ["v"],
      scalars: ["frecency", "mtime", "wordcount"],
    });
  });
});
