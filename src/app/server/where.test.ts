import { searchToWhere } from "./where";

describe("searchToWhere", () => {
  it("it should create 'where' argument (prisma query) from seach object", () => {
    expect(searchToWhere({ dir: "", tags: [] })).toEqual({
      id: undefined,
      AND: [],
    });
    expect(searchToWhere({ dir: "a", tags: ["p", "q"] })).toEqual({
      id: { startsWith: "a/" },
      AND: [
        {
          tags: { some: { tagId: "p" } },
        },
        {
          tags: { some: { tagId: "q" } },
        },
      ],
    });
  });
});
