import { toggle } from "./arrays";

describe("toggle", () => {
  it("should toggle the presence of element in a list", () => {
    expect(toggle([1, 2, 3], 2).sort()).toEqual([1, 3]);
    expect(toggle([1, 2, 3], 0).sort()).toEqual([0, 1, 2, 3]);
  });
});
