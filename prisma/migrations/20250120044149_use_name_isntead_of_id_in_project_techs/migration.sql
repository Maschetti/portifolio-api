/*
  Warnings:

  - The primary key for the `ProjectTechs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `projectId` on the `ProjectTechs` table. All the data in the column will be lost.
  - You are about to drop the column `techId` on the `ProjectTechs` table. All the data in the column will be lost.
  - Added the required column `projectName` to the `ProjectTechs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `techName` to the `ProjectTechs` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectTechs" (
    "projectName" TEXT NOT NULL,
    "techName" TEXT NOT NULL,

    PRIMARY KEY ("projectName", "techName"),
    CONSTRAINT "ProjectTechs_projectName_fkey" FOREIGN KEY ("projectName") REFERENCES "projects" ("name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProjectTechs_techName_fkey" FOREIGN KEY ("techName") REFERENCES "techs" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE "ProjectTechs";
ALTER TABLE "new_ProjectTechs" RENAME TO "ProjectTechs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
