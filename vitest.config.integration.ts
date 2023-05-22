import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/tests/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    globals: true,
    threads: false,
    setupFiles: ["src/tests/helpers/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
