/*
  Warnings:

  - You are about to drop the column `is_required` on the `terms` table. All the data in the column will be lost.
  - Added the required column `required` to the `terms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `terms` DROP COLUMN `is_required`,
    ADD COLUMN     `required` BOOLEAN NOT NULL;
