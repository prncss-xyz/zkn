import { upDirs, dirname, headDir } from "./path";

describe("upDirs", () => {
  it("should return the list of upper directories", () => {
    expect(upDirs("/", "")).toEqual([""]);
    expect(upDirs("/", "x")).toEqual(["", "x"]);
    expect(upDirs("/", "x/y/z")).toEqual(["", "x", "x/y", "x/y/z"]);
  });
});

describe("dirname", () => {
  it("should return dirname of file", () => {
    expect(dirname("/", "toto")).toBe("");
    expect(dirname("/", "/toto")).toBe("");
    expect(dirname("/", "a/toto")).toBe("a");
    expect(dirname("/", "a/b/toto")).toBe("a/b");
  });
});

describe("headDir", () => {
  it("should return first level dir of path (after position) if it exists", () => {
    expect(headDir("/", "a/b/c")).toBe("a");
    expect(headDir("/", "a/b/c", 2)).toBe("b");
    expect(headDir("/", "a")).toBe(null);
  });
});
