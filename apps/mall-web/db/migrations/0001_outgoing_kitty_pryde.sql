ALTER TABLE `mmall_user` ADD `createTime` timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE `mmall_user` ADD `updateTime` timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE `mmall_user` DROP COLUMN `create_time`;--> statement-breakpoint
ALTER TABLE `mmall_user` DROP COLUMN `update_time`;