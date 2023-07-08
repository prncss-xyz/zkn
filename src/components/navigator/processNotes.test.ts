import { processNotes } from "./processNotes";

const entry0 = {
  title: null,
  mtime: new Date(),
  event: null,
  links: [],
  backlinks: [],
};

describe("processNotes", () => {
  it("description", () => {
    expect(processNotes("", {}, [])).toEqual({
      enabledDirs: [],
      enabledKanbans: [],
      enabledScalars: ["mtime", "wordcount"],
      enabledTags: [],
    });
    expect(
      processNotes("v", { v: ["p", "z"], w: ["a"] }, [
        { ...entry0, id: "a/1.md", tags: [{ tagId: "p" }] },
        { ...entry0, id: "a/b/c/1.md", tags: [{ tagId: "p" }, { tagId: "q" }] },
        { ...entry0, id: "b/1.md", tags: [{ tagId: "p" }] },
        { ...entry0, id: "c/1.md", tags: [{ tagId: "q" }] },
      ])
    ).toEqual({
      enabledDirs: ["", "a", "a/b", "a/b/c", "b"],
      enabledTags: ["p", "q"],
      enabledKanbans: ["v"],
      enabledScalars: ["mtime", "wordcount"],
    });
  });
});
