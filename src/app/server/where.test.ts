import { query0 } from "../utils/search";
import { searchToWhere } from "./where";

describe("searchToWhere", () => {
  it("it should create 'where' argument (prisma query) from seach object", () => {
    expect(searchToWhere(query0)).toEqual({
      id: undefined,
      AND: [],
      wordcount: {},
      mtime: {},
    });
    expect(searchToWhere({ ...query0, dir: "a", tags: ["p", "q"] })).toEqual({
      id: { startsWith: "a/" },
      AND: [
        {
          tags: { some: { tagId: "p" } },
        },
        {
          tags: { some: { tagId: "q" } },
        },
      ],
      wordcount: {},
      mtime: {},
    });
  });
});
