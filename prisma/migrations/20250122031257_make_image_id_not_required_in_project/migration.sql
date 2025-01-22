-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "lastTime" DATETIME NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "imageId" TEXT
);
INSERT INTO "new_projects" ("description", "id", "imageId", "isMain", "lastTime", "link", "name") SELECT "description", "id", "imageId", "isMain", "lastTime", "link", "name" FROM "projects";
DROP TABLE "projects";
ALTER TABLE "new_projects" RENAME TO "projects";
CREATE UNIQUE INDEX "projects_name_key" ON "projects"("name");
CREATE UNIQUE INDEX "projects_link_key" ON "projects"("link");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
