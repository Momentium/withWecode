/*
  Warnings:

  - You are about to drop the column `company_id` on the `startup_images` table. All the data in the column will be lost.
  - You are about to drop the `partner_infos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `startup_infos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `startup_id` to the `startup_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `partner_infos` DROP FOREIGN KEY `partner_infos_ibfk_1`;

-- DropForeignKey
ALTER TABLE `partner_infos` DROP FOREIGN KEY `partner_infos_ibfk_2`;

-- DropForeignKey
ALTER TABLE `partner_infos` DROP FOREIGN KEY `partner_infos_ibfk_3`;

-- DropForeignKey
ALTER TABLE `startup_infos` DROP FOREIGN KEY `startup_infos_ibfk_1`;

-- DropForeignKey
ALTER TABLE `startup_infos` DROP FOREIGN KEY `startup_infos_ibfk_2`;

-- DropForeignKey
ALTER TABLE `startup_infos` DROP FOREIGN KEY `startup_infos_ibfk_3`;

-- DropForeignKey
ALTER TABLE `startup_infos` DROP FOREIGN KEY `startup_infos_ibfk_7`;

-- DropForeignKey
ALTER TABLE `startup_infos` DROP FOREIGN KEY `startup_infos_ibfk_6`;

-- DropForeignKey
ALTER TABLE `startup_infos` DROP FOREIGN KEY `startup_infos_ibfk_4`;

-- DropForeignKey
ALTER TABLE `startup_infos` DROP FOREIGN KEY `startup_infos_ibfk_5`;

-- DropForeignKey
ALTER TABLE `invested_from` DROP FOREIGN KEY `invested_from_ibfk_2`;

-- DropForeignKey
ALTER TABLE `investment_portfolio` DROP FOREIGN KEY `investment_portfolio_ibfk_1`;

-- DropForeignKey
ALTER TABLE `IR_requests` DROP FOREIGN KEY `ir_requests_ibfk_2`;

-- DropForeignKey
ALTER TABLE `IR_requests` DROP FOREIGN KEY `ir_requests_ibfk_3`;

-- DropForeignKey
ALTER TABLE `startup_images` DROP FOREIGN KEY `startup_images_ibfk_1`;

-- DropForeignKey
ALTER TABLE `wish_investment_series` DROP FOREIGN KEY `wish_investment_series_ibfk_1`;

-- AlterTable
ALTER TABLE `IR_requests` ADD COLUMN     `companiesId` INT;

-- AlterTable
ALTER TABLE `startup_images` DROP COLUMN `company_id`,
    ADD COLUMN     `startup_id` INT NOT NULL;

-- CreateTable
CREATE TABLE `partners` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `company_id` INT NOT NULL,
    `interst_technology_id` INT,
    `invested_total_id` INT,
    `invested_counts` INT,
INDEX `FK_partners_company_id_companies_id`(`company_id`),
INDEX `FK_partners_interst_technology_id_technologies_id`(`interst_technology_id`),
INDEX `FK_partners_invested_total_id_investment_funds_id`(`invested_total_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `startups` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `company_id` INT NOT NULL,
    `rep` VARCHAR(191),
    `sector_id` INT,
    `core_technology_id` INT,
    `item_description` VARCHAR(191),
    `contact` VARCHAR(191),
    `investment_series_id` INT,
    `investment_fund_id` INT,
    `address_road` VARCHAR(191),
    `address_detail` VARCHAR(191),
    `service_type_id` INT,
    `business_type_id` INT,
    `business_license_number` VARCHAR(191),
    `email` VARCHAR(191),
    `instagram_url` VARCHAR(191),
    `facebook_url` VARCHAR(191),
    `thumbnail` VARCHAR(191),
UNIQUE INDEX `startups.company_id_unique`(`company_id`),
INDEX `FK_startups_business_type_id_business_types_id`(`business_type_id`),
INDEX `FK_startups_company_id_companies_id`(`company_id`),
INDEX `FK_startups_core_technology_id_technologies_id`(`core_technology_id`),
INDEX `FK_startups_sector_id_sectors_id`(`sector_id`),
INDEX `FK_startups_service_type_id_service_types_id`(`service_type_id`),
INDEX `FK_startups_investment_series_id`(`investment_series_id`),
INDEX `FK_startups_investment_funds_id`(`investment_fund_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- DropTable
DROP TABLE `partner_infos`;

-- DropTable
DROP TABLE `startup_infos`;

-- CreateIndex
CREATE INDEX `FK_startup_images_startup_id_startups_id` ON `startup_images`(`startup_id`);

-- AddForeignKey
ALTER TABLE `partners` ADD FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partners` ADD FOREIGN KEY (`interst_technology_id`) REFERENCES `technologies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partners` ADD FOREIGN KEY (`invested_total_id`) REFERENCES `investment_funds`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `startups` ADD FOREIGN KEY (`business_type_id`) REFERENCES `business_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `startups` ADD FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `startups` ADD FOREIGN KEY (`core_technology_id`) REFERENCES `technologies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `startups` ADD FOREIGN KEY (`sector_id`) REFERENCES `sectors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `startups` ADD FOREIGN KEY (`service_type_id`) REFERENCES `service_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `startups` ADD FOREIGN KEY (`investment_series_id`) REFERENCES `investment_series`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `startups` ADD FOREIGN KEY (`investment_fund_id`) REFERENCES `investment_funds`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invested_from` ADD FOREIGN KEY (`startup_id`) REFERENCES `startups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `investment_portfolio` ADD FOREIGN KEY (`partner_id`) REFERENCES `partners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IR_requests` ADD FOREIGN KEY (`partner_id`) REFERENCES `partners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IR_requests` ADD FOREIGN KEY (`startup_id`) REFERENCES `startups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IR_requests` ADD FOREIGN KEY (`companiesId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `startup_images` ADD FOREIGN KEY (`startup_id`) REFERENCES `startups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wish_investment_series` ADD FOREIGN KEY (`startup_id`) REFERENCES `startups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterIndex
ALTER TABLE `invested_from` RENAME INDEX `FK_invested_from_startup_id_startup_infos_id` TO `FK_invested_from_startup_id_startups_id`;

-- AlterIndex
ALTER TABLE `investment_portfolio` RENAME INDEX `FK_investment_portfolio_partner_id_partner_infos_id` TO `FK_investment_portfolio_partner_id_partners_id`;

-- AlterIndex
ALTER TABLE `IR_requests` RENAME INDEX `FK_IR_requests_partner_id_partner_infos_id` TO `FK_IR_requests_partner_id_companies_id`;

-- AlterIndex
ALTER TABLE `wish_investment_series` RENAME INDEX `FK_wish_investment_series_startup_infos_id` TO `FK_wish_investment_series_startups_id`;
