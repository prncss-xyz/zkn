import { searchToQuery } from "./search";

describe("searchToQuery", () => {
  it("skip ", () => {
    expect(
      searchToQuery({ a: "asdf", dir: "/notes", tags: "a b", kanban: "w" })
    ).toEqual({ dir: "/notes", tags: ["a", "b"], kanban: "w" });
  });
  it("should have default values", () => {
    expect(searchToQuery({})).toEqual({
      dir: "",
      tags: [],
      kanban: "",
    });
  });
});
