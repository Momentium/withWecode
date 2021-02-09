/*
  Warnings:

  - You are about to drop the column `want_open` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `projects` DROP COLUMN `want_open`,
    ADD COLUMN     `request_open` INT;
