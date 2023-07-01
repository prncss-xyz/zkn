/*
  Warnings:

  - You are about to alter the column `mtime` on the `Entry` table. The data in that column could be lost. The data in that column will be cast from `Float` to `DateTime`.
  - You are about to drop the column `day` on the `Event` table. All the data in the column will be lost.
  - Made the column `end` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mtime" DATETIME NOT NULL,
    "title" TEXT,
    "wordcount" INTEGER NOT NULL
);
INSERT INTO "new_Entry" ("id", "mtime", "title", "wordcount") SELECT "id", "mtime", "title", "wordcount" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entryId" TEXT NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    CONSTRAINT "Event_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("end", "entryId", "id", "start") SELECT "end", "entryId", "id", "start" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_entryId_key" ON "Event"("entryId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
