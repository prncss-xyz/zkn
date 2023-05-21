/*
  Warnings:

  - You are about to drop the column `endColumn` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `endOffset` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `line` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `startColumn` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `startOffset` on the `Link` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rank" INTEGER NOT NULL,
    "sourceId" TEXT,
    "targetId" TEXT,
    "context" TEXT NOT NULL,
    CONSTRAINT "Link_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Entry" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Link_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Entry" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("context", "id", "rank", "sourceId", "targetId") SELECT "context", "id", "rank", "sourceId", "targetId" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
