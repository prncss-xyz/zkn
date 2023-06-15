import { hrefURL, processNotes, update } from "./utils";

describe("hrefURL", () => {
  it("should convert query object to search string", () => {
    expect(
      hrefURL({ pathname: "/notes", query: { tags: [], dir: "" } })
    ).toEqual("/notes");
    expect(
      hrefURL({
        pathname: "/kanban",
        query: { tags: ["a", "b"], dir: "b", kanban: "c" },
      })
    ).toEqual("/kanban?dir=b&tags=a+b&kanban=c");
  });
  it("should discard kanban parameter when pathname is not '/kanban'", () => {
    expect(
      hrefURL({
        pathname: "/notes",
        query: { tags: [], dir: "", kanban: "c" },
      })
    ).toEqual("/notes");
  });
});

describe("update", () => {
  it("should update query object", () => {
    expect(
      update(
        {
          pathname: "/notes",
          query: { tags: ["a"], dir: "tata", kanban: "p" },
        },
        {
          pathname: "/kanban",
          query: { tags: ["b"], dir: "toto", kanban: "q" },
        }
      )
    ).toEqual({
      pathname: "/kanban",
      query: { tags: ["b"], dir: "toto", kanban: "q" },
    });
  });
  it("should use empty string to erease", () => {
    expect(
      update(
        {
          pathname: "/notes",
          query: { tags: ["a"], dir: "tata", kanban: "p" },
        },
        {
          pathname: "",
          query: { tags: [], dir: "", kanban: "" },
        }
      )
    ).toEqual({
      pathname: "",
      query: { tags: [], dir: "", kanban: "" },
    });
  });
});

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
