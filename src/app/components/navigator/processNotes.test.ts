import { processNotes } from "./processNotes";

describe("processNotes", () => {
  it("description", () => {
    expect(processNotes("", {}, "/", [])).toEqual([[], [], []]);
    expect(
      processNotes("v", { v: ["p", "z"], w: ["a"] }, "/", [
        { id: "a/1.md", tags: [{ tagId: "p" }] },
        { id: "a/b/c/1.md", tags: [{ tagId: "p" }, { tagId: "q" }] },
        { id: "b/1.md", tags: [{ tagId: "p" }] },
        { id: "c/1.md", tags: [{ tagId: "q" }] },
      ])
    ).toEqual([["", "a", "a/b", "a/b/c", "b"], ["p", "q"], ["v"]]);
  });
});
