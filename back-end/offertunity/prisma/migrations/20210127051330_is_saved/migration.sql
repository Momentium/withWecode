/*
  Warnings:

  - You are about to drop the column `is_saved` on the `startup_infos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `companies` ADD COLUMN     `is_saved` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `startup_infos` DROP COLUMN `is_saved`;
