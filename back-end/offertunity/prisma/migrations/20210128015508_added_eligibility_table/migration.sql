/*
  Warnings:

  - You are about to alter the column `eligibility` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- AlterTable
ALTER TABLE `projects` MODIFY `eligibility` INT;

-- CreateTable
CREATE TABLE `eligibilities` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `projects` ADD FOREIGN KEY (`eligibility`) REFERENCES `eligibilities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
