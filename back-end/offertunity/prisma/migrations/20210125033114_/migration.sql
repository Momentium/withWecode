/*
  Warnings:

  - You are about to drop the column `invested_fund` on the `invested_from` table. All the data in the column will be lost.
  - You are about to drop the column `invested_fund` on the `invested_to` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[company_id]` on the table `startup_infos`. If there are existing duplicate values, the migration will fail.
  - Added the required column `invested_fund_id` to the `invested_from` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invested_fund_id` to the `invested_to` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invested_from` DROP COLUMN `invested_fund`,
    ADD COLUMN     `invested_fund_id` INT NOT NULL;

-- AlterTable
ALTER TABLE `invested_to` DROP COLUMN `invested_fund`,
    ADD COLUMN     `invested_fund_id` INT NOT NULL;

-- AlterTable
ALTER TABLE `startup_infos` ADD COLUMN     `investment_series_id` INT,
    ADD COLUMN     `investment_fund_id` INT,
    ADD COLUMN     `is_saved` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `wish_investment_series` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `startup_id` INT NOT NULL,
    `investment_series_id` INT NOT NULL,
INDEX `FK_wish_investment_series_startup_infos_id`(`startup_id`),
INDEX `FK_wish_investment_series_investment_series_id`(`investment_series_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `FK_invested_from_invested_fund_investment_funds_id` ON `invested_from`(`invested_fund_id`);

-- CreateIndex
CREATE INDEX `FK_invested_from_invested_fund_investment_funds_id` ON `invested_to`(`invested_fund_id`);

-- CreateIndex
CREATE UNIQUE INDEX `startup_infos.company_id_unique` ON `startup_infos`(`company_id`);

-- CreateIndex
CREATE INDEX `FK_startup_infos_investment_series_id` ON `startup_infos`(`investment_series_id`);

-- CreateIndex
CREATE INDEX `FK_startup_infos_investment_funds_id` ON `startup_infos`(`investment_fund_id`);

-- AddForeignKey
ALTER TABLE `wish_investment_series` ADD FOREIGN KEY (`startup_id`) REFERENCES `startup_infos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wish_investment_series` ADD FOREIGN KEY (`investment_series_id`) REFERENCES `investment_series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invested_from` ADD FOREIGN KEY (`invested_fund_id`) REFERENCES `investment_funds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invested_to` ADD FOREIGN KEY (`invested_fund_id`) REFERENCES `investment_funds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `startup_infos` ADD FOREIGN KEY (`investment_series_id`) REFERENCES `investment_series`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `startup_infos` ADD FOREIGN KEY (`investment_fund_id`) REFERENCES `investment_funds`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
