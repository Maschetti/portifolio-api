/*
  Warnings:

  - You are about to drop the `_ProjectTechnologies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProjectTechnologies";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ProjectTechs" (
    "projectId" TEXT NOT NULL,
    "techId" TEXT NOT NULL,

    PRIMARY KEY ("projectId", "techId"),
    CONSTRAINT "ProjectTechs_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProjectTechs_techId_fkey" FOREIGN KEY ("techId") REFERENCES "techs" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
