/*
  Warnings:

  - The primary key for the `TagsOnEntries` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TagsOnEntries` table. All the data in the column will be lost.
  - The primary key for the `Link` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Link` table. All the data in the column will be lost.
  - Made the column `sourceId` on table `Link` required. This step will fail if there are existing NULL values in that column.
  - Made the column `targetId` on table `Link` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TagsOnEntries" (
    "tagId" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,

    PRIMARY KEY ("tagId", "entryId"),
    CONSTRAINT "TagsOnEntries_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TagsOnEntries_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TagsOnEntries" ("entryId", "tagId") SELECT "entryId", "tagId" FROM "TagsOnEntries";
DROP TABLE "TagsOnEntries";
ALTER TABLE "new_TagsOnEntries" RENAME TO "TagsOnEntries";
CREATE TABLE "new_Link" (
    "sourceId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,

    PRIMARY KEY ("sourceId", "targetId"),
    CONSTRAINT "Link_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Entry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Link_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Entry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("context", "rank", "sourceId", "targetId") SELECT "context", "rank", "sourceId", "targetId" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
