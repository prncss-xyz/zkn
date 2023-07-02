-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TagsOnEntries" (
    "tagId" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,

    PRIMARY KEY ("tagId", "entryId"),
    CONSTRAINT "TagsOnEntries_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TagsOnEntries_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TagsOnEntries" ("entryId", "tagId") SELECT "entryId", "tagId" FROM "TagsOnEntries";
DROP TABLE "TagsOnEntries";
ALTER TABLE "new_TagsOnEntries" RENAME TO "TagsOnEntries";
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entryId" TEXT NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    CONSTRAINT "Event_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("end", "entryId", "id", "start") SELECT "end", "entryId", "id", "start" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_entryId_key" ON "Event"("entryId");
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sourceId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    CONSTRAINT "Link_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Entry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("context", "id", "rank", "sourceId", "targetId") SELECT "context", "id", "rank", "sourceId", "targetId" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
