/*
  Warnings:

  - You are about to drop the column `hompage` on the `companies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `companies` DROP COLUMN `hompage`,
    ADD COLUMN     `homepage` VARCHAR(191);
