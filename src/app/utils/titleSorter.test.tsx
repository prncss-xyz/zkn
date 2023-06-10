import { titleSorter } from "./titleSorter";

describe("titleSorter", () => {
  const a = {
    id: "a.md",
    title: null,
  };
  const b = {
    id: "b.md",
    title: null,
  };
  const c = {
    id: "c.md",
    title: "c",
  };
  const d = {
    id: "d.md",
    title: "d",
  };
  it("description", () => {
    // TODO: property testing
    expect([a, b, c, d].sort(titleSorter)).toEqual([a, b, c, d]);
    expect([a, b, d, c].sort(titleSorter)).toEqual([a, b, c, d]);
    expect([a, c, b, d].sort(titleSorter)).toEqual([a, b, c, d]);
    expect([a, c, d, b].sort(titleSorter)).toEqual([a, b, c, d]);
    expect([a, d, b, c].sort(titleSorter)).toEqual([a, b, c, d]);
    expect([a, d, c, b].sort(titleSorter)).toEqual([a, b, c, d]);
  });
});
