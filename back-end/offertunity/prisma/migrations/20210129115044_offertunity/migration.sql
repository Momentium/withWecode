/*
  Warnings:

  - You are about to alter the column `is_checked` on the `IR_requests` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `from_partner` on the `IR_requests` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `IR_requests` ADD COLUMN     `is_sent` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `is_checked` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `from_partner` BOOLEAN NOT NULL DEFAULT false;
