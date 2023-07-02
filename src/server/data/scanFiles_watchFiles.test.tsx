import FakeTimers from "@sinonjs/fake-timers";
import { watchFiles } from "./scanFiles";
import { WatchEventType } from "node:fs";

import prisma from "./__mocks__/prisma";

describe("watchFiles", () => {
  it("should dedupe calls", async () => {
    const clock = FakeTimers.install();
    beforeEach(() => {
      vi.mock("./prisma");
      vi.mock("node:fs/promises", () => ({
        watch: async function* (..._: any[]) {
          const eventType: WatchEventType = "rename";
          yield { filename: "1.md", eventType };
          // clock.tick(5);
          yield { filename: "1.md", eventType };
        },

        stat: async function (_: string) {
          return { mtimeMs: 0 };
        },

        readFile: function (_: string) {
          return "";
        },
      }));
    });
    afterEach(() => {
      vi.restoreAllMocks();
    });
    afterAll(() => {
      clock.uninstall();
    });
    watchFiles("./notes");
    await clock.runAllAsync();
    expect(prisma.entry.upsert).toHaveBeenCalledTimes(1);
  });
});
