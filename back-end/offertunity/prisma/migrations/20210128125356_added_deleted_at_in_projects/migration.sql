-- AlterTable
ALTER TABLE `project_images` MODIFY `img_url` VARCHAR(191);

-- AlterTable
ALTER TABLE `projects` ADD COLUMN     `deleted_at` DATETIME(3);
