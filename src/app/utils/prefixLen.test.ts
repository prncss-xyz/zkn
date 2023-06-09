import { getPrefixLen } from "./prefixLen";
describe("getprefixLen", () => {
  it("should return the longest common prefix subchain ending with '/'", () => {
    expect(getPrefixLen(["a/b", "a/v"])).toBe(2);
    expect(getPrefixLen(["a/b", "a/v", "c/v"])).toBe(0);
    expect(getPrefixLen(["a/b", "v/v"])).toBe(0);
  });
});
