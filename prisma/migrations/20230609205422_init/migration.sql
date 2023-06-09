/*
  Warnings:

  - You are about to drop the column `wordCount` on the `Entry` table. All the data in the column will be lost.
  - Added the required column `wordcount` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entryId" TEXT NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME,
    "day" BOOLEAN NOT NULL,
    CONSTRAINT "Event_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("day", "end", "entryId", "id", "start") SELECT "day", "end", "entryId", "id", "start" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_entryId_key" ON "Event"("entryId");
CREATE TABLE "new_Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mtime" REAL NOT NULL,
    "title" TEXT,
    "wordcount" INTEGER NOT NULL
);
INSERT INTO "new_Entry" ("id", "mtime", "title") SELECT "id", "mtime", "title" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
