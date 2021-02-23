-- CreateTable
CREATE TABLE `applicant_documents` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `applicant_id` INT NOT NULL,
    `document_id` INT NOT NULL,
INDEX `FK_applicant_documents_applicants_id`(`applicant_id`),
INDEX `FK_applicant_documents_company_documents_id`(`document_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `applicant_documents` ADD FOREIGN KEY (`applicant_id`) REFERENCES `applicants`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applicant_documents` ADD FOREIGN KEY (`document_id`) REFERENCES `company_documents`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
