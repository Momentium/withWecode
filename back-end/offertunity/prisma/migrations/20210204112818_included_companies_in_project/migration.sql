-- AlterTable
ALTER TABLE `projects` ADD COLUMN     `company` INT;

-- CreateIndex
CREATE INDEX `FK_projects_company_companies_id` ON `projects`(`company`);

-- AddForeignKey
ALTER TABLE `projects` ADD FOREIGN KEY (`company`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
