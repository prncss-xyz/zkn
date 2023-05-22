/*
  Warnings:

  - You are about to alter the column `mtime` on the `Entry` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mtime" BIGINT NOT NULL,
    "title" TEXT,
    "wordCount" INTEGER NOT NULL,
    "asset" TEXT
);
INSERT INTO "new_Entry" ("asset", "id", "mtime", "title", "wordCount") SELECT "asset", "id", "mtime", "title", "wordCount" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
