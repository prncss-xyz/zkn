import { upTags } from "./upTags";

describe("upTags", () => {
  it("should return the list of upper directories", () => {
    expect(upTags([""])).toEqual([]);
    expect(upTags(["x"])).toEqual(["x"]);
    expect(upTags(["x", "y/z"])).toEqual(["x", "y", "y/z"]);
    expect(upTags(["x/y/z"])).toEqual(["x", "x/y", "x/y/z"]);
  });
});
