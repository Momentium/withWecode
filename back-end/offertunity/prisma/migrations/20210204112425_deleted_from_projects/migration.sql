/*
  Warnings:

  - You are about to drop the column `companiesId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `sectorsId` on the `projects` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_ibfk_4`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_ibfk_6`;

-- AlterTable
ALTER TABLE `projects` DROP COLUMN `companiesId`,
    DROP COLUMN `sectorsId`;
