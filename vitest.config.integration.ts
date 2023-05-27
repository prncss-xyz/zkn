import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/tests/int/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    globals: true,
    threads: false,
    setupFiles: ["src/tests/int/helpers/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
