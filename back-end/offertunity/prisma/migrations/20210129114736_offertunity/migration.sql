/*
  Warnings:

  - You are about to drop the column `user_typesId` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `startup_name` on the `invested_to` table. All the data in the column will be lost.
  - Added the required column `invested_startup` to the `invested_to` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `companies` DROP FOREIGN KEY `companies_ibfk_2`;

-- DropForeignKey
ALTER TABLE `invested_to` DROP FOREIGN KEY `invested_to_ibfk_1`;

-- AlterTable
ALTER TABLE `companies` DROP COLUMN `user_typesId`,
    MODIFY `established_date` DATE;

-- AlterTable
ALTER TABLE `invested_to` DROP COLUMN `startup_name`,
    ADD COLUMN     `invested_startup` VARCHAR(191) NOT NULL,
    ADD COLUMN     `companiesId` INT;

-- AddForeignKey
ALTER TABLE `invested_to` ADD FOREIGN KEY (`partner_id`) REFERENCES `partners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invested_to` ADD FOREIGN KEY (`companiesId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
