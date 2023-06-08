/*
  Warnings:

  - You are about to drop the column `asset` on the `Entry` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mtime" REAL NOT NULL,
    "title" TEXT,
    "wordCount" INTEGER NOT NULL,
    "status" TEXT
);
INSERT INTO "new_Entry" ("id", "mtime", "title", "wordCount") SELECT "id", "mtime", "title", "wordCount" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
