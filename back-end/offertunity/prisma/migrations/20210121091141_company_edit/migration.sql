-- DropForeignKey
ALTER TABLE `companies` DROP FOREIGN KEY `companies_ibfk_1`;

-- AlterTable
ALTER TABLE `companies` ADD COLUMN     `user_typesId` INT;

-- AddForeignKey
ALTER TABLE `companies` ADD FOREIGN KEY (`type_id`) REFERENCES `company_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `companies` ADD FOREIGN KEY (`user_typesId`) REFERENCES `user_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterIndex
ALTER TABLE `companies` RENAME INDEX `FK_companies_type_id_user_types_id` TO `FK_companies_type_id_company_types_id`;
