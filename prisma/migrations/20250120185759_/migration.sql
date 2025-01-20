/*
  Warnings:

  - A unique constraint covering the columns `[techName]` on the table `ProjectTechs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProjectTechs_techName_key" ON "ProjectTechs"("techName");
