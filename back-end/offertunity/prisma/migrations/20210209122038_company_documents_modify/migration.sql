/*
  Warnings:

  - Added the required column `name` to the `company_documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_type` to the `company_documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `company_documents` ADD COLUMN     `name` VARCHAR(191) NOT NULL,
    ADD COLUMN     `file_type` VARCHAR(191) NOT NULL;
