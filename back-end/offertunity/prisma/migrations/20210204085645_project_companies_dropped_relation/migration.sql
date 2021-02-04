-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_ibfk_1`;

-- AlterTable
ALTER TABLE `projects` ADD COLUMN     `companiesId` INT,
    MODIFY `host` VARCHAR(191);

-- AddForeignKey
ALTER TABLE `projects` ADD FOREIGN KEY (`companiesId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
