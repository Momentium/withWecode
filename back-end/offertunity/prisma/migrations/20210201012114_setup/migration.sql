-- CreateTable
CREATE TABLE `answers` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `question_id` INT NOT NULL,
INDEX `FK_answers_question_id_questions_id`(`question_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applicants` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `company_id` INT NOT NULL,
    `project_id` INT NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
INDEX `FK_applicants_company_id_companies_id`(`company_id`),
INDEX `FK_applicants_project_id_projects_id`(`project_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business_types` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
UNIQUE INDEX `business_types.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companies` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `type_id` INT,
    `name` VARCHAR(191),
    `logo_img` VARCHAR(191),
    `established_date` DATE,
    `homepage` VARCHAR(191),
    `description` VARCHAR(191),
    `team_intro` VARCHAR(191),
    `member_count` INT,
    `is_saved` BOOLEAN NOT NULL DEFAULT false,
INDEX `FK_companies_type_id_company_types_id`(`type_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company_documents` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `company_id` INT NOT NULL,
    `doc_url` VARCHAR(191) NOT NULL,
    `type_id` INT NOT NULL,
INDEX `FK_company_documents_company_id_companies_id`(`company_id`),
INDEX `FK_company_documents_type_id_document_types_id`(`type_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company_members` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `company_id` INT,
    `name` VARCHAR(191),
    `img` VARCHAR(191),
    `position` VARCHAR(191),
INDEX `FK_company_members_company_id_companies_id`(`company_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company_news` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `company_id` INT NOT NULL,
    `URL` VARCHAR(191) NOT NULL,
INDEX `FK_company_news_company_id_companies_id`(`company_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company_types` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
UNIQUE INDEX `company_types.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `demodays` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191),
    `company_id` INT,
    `streaming_url` VARCHAR(191),
INDEX `FK_demodays_company_id_companies_id`(`company_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `document_types` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
UNIQUE INDEX `document_types.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `email_auth` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `auth_number` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invested_from` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `startup_id` INT NOT NULL,
    `date` DATE NOT NULL,
    `invested_institution` VARCHAR(191) NOT NULL,
    `invested_fund_id` INT NOT NULL,
    `corporate_value` INT NOT NULL,
    `series_id` INT NOT NULL,
INDEX `FK_invested_from_series_id_investment_series_id`(`series_id`),
INDEX `FK_invested_from_startup_id_startups_id`(`startup_id`),
INDEX `FK_invested_from_invested_fund_investment_funds_id`(`invested_fund_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invested_to` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `partner_id` INT NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `invested_startup` VARCHAR(191) NOT NULL,
    `invested_fund_id` INT NOT NULL,
    `corporate_value` INT NOT NULL,
    `series_id` INT NOT NULL,
    `companiesId` INT,
INDEX `FK_invested_to_partner_id_companies_id`(`partner_id`),
INDEX `FK_invested_to_series_id_investment_series_id`(`series_id`),
INDEX `FK_invested_from_invested_fund_investment_funds_id`(`invested_fund_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `investment_funds` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
UNIQUE INDEX `investment_funds.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `investment_portfolio` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `partner_id` INT NOT NULL,
    `img_url` VARCHAR(191) NOT NULL,
INDEX `FK_investment_portfolio_partner_id_partners_id`(`partner_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `investment_series` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IR_requests` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `startup_id` INT NOT NULL,
    `partner_id` INT NOT NULL,
    `document_id` INT,
    `is_checked` INT NOT NULL,
    `from_partner` INT NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `companiesId` INT,
INDEX `FK_IR_requests_document_id_company_documents_id`(`document_id`),
INDEX `FK_IR_requests_partner_id_companies_id`(`partner_id`),
INDEX `FK_IR_requests_startup_id_companies_id`(`startup_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `participants` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `demoday_id` INT NOT NULL,
    `order` INT NOT NULL,
    `company_id` INT NOT NULL,
INDEX `FK_participants_company_id_companies_id`(`company_id`),
INDEX `FK_participants_demoday_id_demodays_id`(`demoday_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `partners` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `company_id` INT NOT NULL,
    `interst_technology_id` INT,
    `invested_total_id` INT,
    `invested_counts` INT,
UNIQUE INDEX `partners.company_id_unique`(`company_id`),
INDEX `FK_partners_company_id_companies_id`(`company_id`),
INDEX `FK_partners_interst_technology_id_technologies_id`(`interst_technology_id`),
INDEX `FK_partners_invested_total_id_investment_funds_id`(`invested_total_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `partner_likes` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `company_likes_id` INT NOT NULL,
    `company_liked_id` INT NOT NULL,
    `is_liked` INT NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
INDEX `FK_partner_likes_company_liked_id_companies_id`(`company_liked_id`),
INDEX `FK_partner_likes_company_likes_id_companies_id`(`company_likes_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phone_auth` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `phone_number` VARCHAR(191) NOT NULL,
    `auth_number` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_images` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `project_id` INT NOT NULL,
    `img_url` VARCHAR(191) NOT NULL,
INDEX `FK_project_images_project_id_projects_id`(`project_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_likes` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `comapny_id` INT NOT NULL,
    `project_id` INT NOT NULL,
    `is_liked` INT NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
INDEX `FK_project_likes_comapny_id_companies_id`(`comapny_id`),
INDEX `FK_project_likes_project_id_projects_id`(`project_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191),
    `introduction` VARCHAR(191),
    `host` INT,
    `due_date` DATETIME(3),
    `sector_id` INT,
    `eligibility` VARCHAR(191),
    `outline` VARCHAR(191),
    `detail` VARCHAR(191),
    `application_method` VARCHAR(191),
    `caution` VARCHAR(191),
    `contact` VARCHAR(191),
    `is_opened` INT NOT NULL,
    `hit` INT NOT NULL,
    `created_at` DATETIME(3),
    `updated_at` DATETIME(3),
INDEX `FK_projects_host_companies_id`(`host`),
INDEX `FK_projects_sector_id_sectors_id`(`sector_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questions` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `company_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `demoday_id` INT NOT NULL,
INDEX `FK_questions_company_id_companies_id`(`company_id`),
INDEX `FK_questions_demoday_id_demodays_id`(`demoday_id`),
INDEX `FK_questions_user_id_users_id`(`user_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recent_views_project` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `project_id` INT NOT NULL,
    `company_id` INT NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
INDEX `FK_recent_views_project_company_id_companies_id`(`company_id`),
INDEX `FK_recent_views_project_project_id_projects_id`(`project_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `required_documents` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `project_id` INT NOT NULL,
    `document_id` INT NOT NULL,
INDEX `FK_required_documents_document_id_document_types_id`(`document_id`),
INDEX `FK_required_documents_project_id_projects_id`(`project_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sectors` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
UNIQUE INDEX `sectors.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_types` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
UNIQUE INDEX `service_types.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `signup_methods` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
UNIQUE INDEX `signup_methods.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `startup_images` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `startup_id` INT NOT NULL,
    `img_url` VARCHAR(191) NOT NULL,
INDEX `FK_startup_images_startup_id_startups_id`(`startup_id`),

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

-- CreateTable
CREATE TABLE `wish_investment_series` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `startup_id` INT NOT NULL,
    `investment_series_id` INT NOT NULL,
INDEX `FK_wish_investment_series_startups_id`(`startup_id`),
INDEX `FK_wish_investment_series_investment_series_id`(`investment_series_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `startup_likes` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `company_id` INT NOT NULL,
    `is_liked` INT NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
INDEX `FK_startup_likes_company_id_companies_id`(`company_id`),
INDEX `FK_startup_likes_user_id_users_id`(`user_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `technologies` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
UNIQUE INDEX `technologies.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `terms` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_agreements` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `term_id` INT NOT NULL,
INDEX `FK_user_agreements_term_id_terms_id`(`term_id`),
INDEX `FK_user_agreements_user_id_users_id`(`user_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_types` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
UNIQUE INDEX `user_types.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `sns_id` VARCHAR(191),
    `name` VARCHAR(191) NOT NULL,
    `type_id` INT,
    `profile_picture` VARCHAR(191),
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191),
    `signup_method_id` INT NOT NULL DEFAULT 1,
    `company_id` INT,
    `phone_number` VARCHAR(191),
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
UNIQUE INDEX `users.sns_id_unique`(`sns_id`),
UNIQUE INDEX `users.email_unique`(`email`),
INDEX `FK_users_company_id_companies_id`(`company_id`),
INDEX `FK_users_signup_method_id_signup_methods_id`(`signup_method_id`),
INDEX `FK_users_type_id_user_types_id`(`type_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `votes` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `participants_id` INT NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
INDEX `FK_votes_participants_id_participants_id`(`participants_id`),
INDEX `FK_votes_user_id_users_id`(`user_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `answers` ADD FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applicants` ADD FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applicants` ADD FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `companies` ADD FOREIGN KEY (`type_id`) REFERENCES `company_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `company_documents` ADD FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `company_documents` ADD FOREIGN KEY (`type_id`) REFERENCES `document_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `company_members` ADD FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `company_news` ADD FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `demodays` ADD FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invested_from` ADD FOREIGN KEY (`series_id`) REFERENCES `investment_series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invested_from` ADD FOREIGN KEY (`invested_fund_id`) REFERENCES `investment_funds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invested_from` ADD FOREIGN KEY (`startup_id`) REFERENCES `startups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invested_to` ADD FOREIGN KEY (`series_id`) REFERENCES `investment_series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invested_to` ADD FOREIGN KEY (`invested_fund_id`) REFERENCES `investment_funds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invested_to` ADD FOREIGN KEY (`partner_id`) REFERENCES `partners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invested_to` ADD FOREIGN KEY (`companiesId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `investment_portfolio` ADD FOREIGN KEY (`partner_id`) REFERENCES `partners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IR_requests` ADD FOREIGN KEY (`document_id`) REFERENCES `company_documents`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IR_requests` ADD FOREIGN KEY (`partner_id`) REFERENCES `partners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IR_requests` ADD FOREIGN KEY (`startup_id`) REFERENCES `startups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IR_requests` ADD FOREIGN KEY (`companiesId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participants` ADD FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participants` ADD FOREIGN KEY (`demoday_id`) REFERENCES `demodays`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partners` ADD FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partners` ADD FOREIGN KEY (`interst_technology_id`) REFERENCES `technologies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partners` ADD FOREIGN KEY (`invested_total_id`) REFERENCES `investment_funds`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partner_likes` ADD FOREIGN KEY (`company_liked_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partner_likes` ADD FOREIGN KEY (`company_likes_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_images` ADD FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_likes` ADD FOREIGN KEY (`comapny_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_likes` ADD FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD FOREIGN KEY (`host`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD FOREIGN KEY (`sector_id`) REFERENCES `sectors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questions` ADD FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questions` ADD FOREIGN KEY (`demoday_id`) REFERENCES `demodays`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questions` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recent_views_project` ADD FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recent_views_project` ADD FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `required_documents` ADD FOREIGN KEY (`document_id`) REFERENCES `document_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `required_documents` ADD FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `startup_images` ADD FOREIGN KEY (`startup_id`) REFERENCES `startups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE `wish_investment_series` ADD FOREIGN KEY (`startup_id`) REFERENCES `startups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wish_investment_series` ADD FOREIGN KEY (`investment_series_id`) REFERENCES `investment_series`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `startup_likes` ADD FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `startup_likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_agreements` ADD FOREIGN KEY (`term_id`) REFERENCES `terms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_agreements` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD FOREIGN KEY (`signup_method_id`) REFERENCES `signup_methods`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD FOREIGN KEY (`type_id`) REFERENCES `user_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `votes` ADD FOREIGN KEY (`participants_id`) REFERENCES `participants`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `votes` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
