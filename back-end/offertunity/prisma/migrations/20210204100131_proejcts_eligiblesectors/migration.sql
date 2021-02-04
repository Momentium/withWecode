/*
  Warnings:

  - You are about to drop the column `sector_id` on the `projects` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `FK_projects_host_companies_id` ON `projects`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_ibfk_2`;

-- AlterTable
ALTER TABLE `projects` DROP COLUMN `sector_id`,
    ADD COLUMN     `eligible_sector` INT,
    ADD COLUMN     `sectorsId` INT;

-- CreateTable
CREATE TABLE `eligible_sectors` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
UNIQUE INDEX `eligible_sectors.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `FK_projects_eligible_sector_eligible_sectors_id` ON `projects`(`eligible_sector`);

-- AddForeignKey
ALTER TABLE `projects` ADD FOREIGN KEY (`eligible_sector`) REFERENCES `eligible_sectors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD FOREIGN KEY (`sectorsId`) REFERENCES `sectors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterIndex
ALTER TABLE `projects` RENAME INDEX `eligibility` TO `FK_projects_eligibility_eligibilities_id`;
