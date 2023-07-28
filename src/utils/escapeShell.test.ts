import { escapeShell } from "./escapeShell";

describe("escape", () => {
  it("should escape shell special characters", () => {
    expect(escapeShell("")).toBe("");
    expect(escapeShell('\\ca ca*"')).toBe('\\\\ca\\ ca\\*\\"');
  });
});
