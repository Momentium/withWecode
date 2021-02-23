/*
  Warnings:

  - You are about to drop the column `company` on the `projects` table. All the data in the column will be lost.
  - You are about to alter the column `is_opened` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - Made the column `request_open` on table `projects` required. The migration will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_ibfk_6`;

-- AlterTable
ALTER TABLE `projects` DROP COLUMN `company`,
    ADD COLUMN     `company_id` INT,
    MODIFY `is_opened` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `request_open` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX `FK_projects_company_companies_id` ON `projects`(`company_id`);

-- AddForeignKey
ALTER TABLE `projects` ADD FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
