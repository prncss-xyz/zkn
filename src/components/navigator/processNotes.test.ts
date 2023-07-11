import { processNotes } from "./processNotes";

const entry0 = {
  title: null,
  mtime: new Date(),
  event: null,
  links: [],
  backlinks: [],
};

const kanbans = { v: ["p", "z"], w: ["a"] };
const config = { kanbans, reversedTags: [] };
const params = new URLSearchParams();

describe("processNotes", () => {
  it("description", () => {
    expect(processNotes(config, params, [])).toMatchObject({
      dirs: [],
      kanbans: [],
      scalars: ["mtime", "wordcount"],
      tags: { direct: [], reverse: [] },
      virtualTags: [],
    });
    expect(
      processNotes(config, params, [
        { ...entry0, id: "a/1.md", tags: [{ tagId: "p" }] },
        { ...entry0, id: "a/b/c/1.md", tags: [{ tagId: "p" }, { tagId: "q" }] },
        { ...entry0, id: "b/1.md", tags: [{ tagId: "p" }] },
        { ...entry0, id: "c/1.md", tags: [{ tagId: "q" }] },
      ])
    ).toMatchObject({
      dirs: ["", "a", "a/b", "a/b/c", "b", "c"],
      tags: { direct: ["p", "q"], reverse: [] },
      virtualTags: ["orphan"],
      kanbans: ["v"],
      scalars: ["mtime", "wordcount"],
    });
  });
});
