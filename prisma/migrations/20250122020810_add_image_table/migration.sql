/*
  Warnings:

  - Added the required column `imageId` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ProjectTechs_techName_key";

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filePath" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "Image_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "imageId" TEXT NOT NULL
);
INSERT INTO "new_projects" ("description", "id", "isMain", "lastTime", "link", "name") SELECT "description", "id", "isMain", "lastTime", "link", "name" FROM "projects";
DROP TABLE "projects";
ALTER TABLE "new_projects" RENAME TO "projects";
CREATE UNIQUE INDEX "projects_name_key" ON "projects"("name");
CREATE UNIQUE INDEX "projects_link_key" ON "projects"("link");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Image_filePath_key" ON "Image"("filePath");

-- CreateIndex
CREATE UNIQUE INDEX "Image_projectId_key" ON "Image"("projectId");
