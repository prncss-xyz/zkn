import resetDb from "./reset-db";

import { beforeEach } from "vitest";

beforeEach(async () => {
  console.log("database", process.env.DATABASE_URL);
  await resetDb();
});
