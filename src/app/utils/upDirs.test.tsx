import { upDirs } from "./upDirs";

describe("upDirs", () => {
  it("should return the list of upper directories", () => {
    expect(upDirs("/", "")).toEqual([""]);
    expect(upDirs("/", "x")).toEqual(["", "x"]);
    expect(upDirs("/", "x/y/z")).toEqual(["", "x", "x/y", "x/y/z"]);
  });
});
