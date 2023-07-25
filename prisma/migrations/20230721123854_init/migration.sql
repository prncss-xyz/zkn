/*
  Warnings:

  - Added the required column `frecency` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mtime" DATETIME NOT NULL,
    "due" DATETIME,
    "since" DATETIME,
    "until" DATETIME,
    "title" TEXT,
    "asset" TEXT,
    "assetType" TEXT,
    "wordcount" INTEGER NOT NULL,
    "frecency" DATETIME NOT NULL
);
INSERT INTO "new_Entry" ("asset", "assetType", "due", "id", "mtime", "since", "title", "until", "wordcount") SELECT "asset", "assetType", "due", "id", "mtime", "since", "title", "until", "wordcount" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
