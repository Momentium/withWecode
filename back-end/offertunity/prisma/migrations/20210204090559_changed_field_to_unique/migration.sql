/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name]` on the table `eligibilities`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `eligibilities.name_unique` ON `eligibilities`(`name`);
