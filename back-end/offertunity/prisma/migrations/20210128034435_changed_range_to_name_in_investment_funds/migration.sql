/*
  Warnings:

  - You are about to drop the column `range` on the `investment_funds` table. All the data in the column will be lost.
  - Added the required column `name` to the `investment_funds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `investment_funds` DROP COLUMN `range`,
    ADD COLUMN     `name` VARCHAR(191) NOT NULL;
