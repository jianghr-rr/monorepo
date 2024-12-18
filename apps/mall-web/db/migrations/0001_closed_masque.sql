CREATE TABLE `sessions` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`session_token` text NOT NULL,
	`expires_at` datetime NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`ip_address` varchar(45),
	`user_agent` text,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `sessions_session_token_unique` UNIQUE(`session_token`)
);
--> statement-breakpoint
ALTER TABLE `mmall_cart` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `mmall_cart` MODIFY COLUMN `userId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `mmall_cart` MODIFY COLUMN `productId` int;--> statement-breakpoint
ALTER TABLE `mmall_cart` MODIFY COLUMN `quantity` int;--> statement-breakpoint
ALTER TABLE `mmall_cart` MODIFY COLUMN `checked` int;--> statement-breakpoint
ALTER TABLE `mmall_category` MODIFY COLUMN `id` bigint AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `mmall_category` MODIFY COLUMN `parentId` int;--> statement-breakpoint
ALTER TABLE `mmall_category` MODIFY COLUMN `sortOrder` int;--> statement-breakpoint
ALTER TABLE `mmall_order` MODIFY COLUMN `id` bigint AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `mmall_order` MODIFY COLUMN `orderNo` bigint;--> statement-breakpoint
ALTER TABLE `mmall_order` MODIFY COLUMN `userId` int;--> statement-breakpoint
ALTER TABLE `mmall_order` MODIFY COLUMN `shippingId` int;--> statement-breakpoint
ALTER TABLE `mmall_order` MODIFY COLUMN `paymentType` int;--> statement-breakpoint
ALTER TABLE `mmall_order` MODIFY COLUMN `postage` int;--> statement-breakpoint
ALTER TABLE `mmall_order` MODIFY COLUMN `status` int;--> statement-breakpoint
ALTER TABLE `mmall_order_item` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `mmall_order_item` MODIFY COLUMN `userId` int;--> statement-breakpoint
ALTER TABLE `mmall_order_item` MODIFY COLUMN `orderNo` bigint;--> statement-breakpoint
ALTER TABLE `mmall_order_item` MODIFY COLUMN `productId` int;--> statement-breakpoint
ALTER TABLE `mmall_order_item` MODIFY COLUMN `quantity` int;--> statement-breakpoint
ALTER TABLE `mmall_pay_info` MODIFY COLUMN `id` bigint AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `mmall_pay_info` MODIFY COLUMN `userId` int;--> statement-breakpoint
ALTER TABLE `mmall_pay_info` MODIFY COLUMN `orderNo` bigint;--> statement-breakpoint
ALTER TABLE `mmall_pay_info` MODIFY COLUMN `payPlatform` int;--> statement-breakpoint
ALTER TABLE `mmall_product` MODIFY COLUMN `id` bigint AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `mmall_product` MODIFY COLUMN `categoryId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `mmall_product` MODIFY COLUMN `stock` int NOT NULL;--> statement-breakpoint
ALTER TABLE `mmall_product` MODIFY COLUMN `status` int DEFAULT 1;--> statement-breakpoint
ALTER TABLE `mmall_shipping` MODIFY COLUMN `id` bigint AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `mmall_shipping` MODIFY COLUMN `userId` int;--> statement-breakpoint
ALTER TABLE `mmall_user` MODIFY COLUMN `id` bigint AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `mmall_user` MODIFY COLUMN `role` int NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_mmall_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `mmall_user`(`id`) ON DELETE no action ON UPDATE no action;