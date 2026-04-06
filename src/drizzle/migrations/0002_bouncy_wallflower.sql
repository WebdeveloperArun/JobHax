ALTER TABLE `users` MODIFY COLUMN `username` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `role` enum('admin','employer','applicant') NOT NULL;