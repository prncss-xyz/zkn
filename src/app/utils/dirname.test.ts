import { dirname } from "./dirname";

describe("dirname", () => {
  it("should return dirname of file", () => {
    expect(dirname("/", "toto")).toBe("");
    expect(dirname("/", "/toto")).toBe("");
    expect(dirname("/", "a/toto")).toBe("a");
    expect(dirname("/", "a/b/toto")).toBe("a/b");
  });
});
