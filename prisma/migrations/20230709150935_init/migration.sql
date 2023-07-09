-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sourceId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    CONSTRAINT "Link_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Entry" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Link_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Entry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("context", "id", "rank", "sourceId", "targetId") SELECT "context", "id", "rank", "sourceId", "targetId" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
