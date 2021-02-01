/*
  Warnings:

  - You are about to drop the column `companiesId` on the `invested_to` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `invested_to` DROP FOREIGN KEY `invested_to_ibfk_4`;

-- AlterTable
ALTER TABLE `invested_to` DROP COLUMN `companiesId`;
