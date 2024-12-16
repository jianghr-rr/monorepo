CREATE TABLE `mmall_cart` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`productId` int,
	`quantity` int,
	`checked` int,
	`createTime` timestamp NOT NULL DEFAULT now(),
	`updateTime` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `mmall_cart_id` PRIMARY KEY(`id`),
	CONSTRAINT `mmall_cart__user_id__unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `mmall_category` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`parentId` int,
	`name` varchar(255),
	`status` tinyint DEFAULT 1,
	`sortOrder` int,
	`createTime` timestamp NOT NULL DEFAULT now(),
	`updateTime` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `mmall_category_id` PRIMARY KEY(`id`),
	CONSTRAINT `mmall_category_id__unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `mmall_order` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`orderNo` bigint,
	`userId` int,
	`shippingId` int,
	`payment` decimal(20,2),
	`paymentType` int,
	`postage` int,
	`status` int,
	`paymentTime` datetime,
	`sendTime` datetime,
	`endTime` datetime,
	`closeTime` datetime,
	`createTime` datetime,
	`updateTime` datetime,
	CONSTRAINT `mmall_order_id` PRIMARY KEY(`id`),
	CONSTRAINT `mmall_order_id__unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `mmall_order_item` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`orderNo` bigint,
	`productId` int,
	`productName` varchar(100),
	`productImage` varchar(500),
	`currentUnitPrice` decimal(20,2),
	`quantity` int,
	`totalPrice` decimal(20,2),
	`createTime` datetime,
	`updateTime` datetime,
	CONSTRAINT `mmall_order_item_id` PRIMARY KEY(`id`),
	CONSTRAINT `mmall_order_item_id__unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `mmall_pay_info` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` int,
	`orderNo` bigint,
	`payPlatform` int,
	`platformNumber` varchar(200),
	`platformStatus` varchar(20),
	`createTime` timestamp NOT NULL DEFAULT now(),
	`updateTime` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `mmall_pay_info_id` PRIMARY KEY(`id`),
	CONSTRAINT `mmall_pay_info_id__unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `mmall_product` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`categoryId` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`subtitle` varchar(200),
	`mainImage` varchar(500),
	`subImages` text,
	`detail` text,
	`price` decimal(20,2) NOT NULL,
	`stock` int NOT NULL,
	`status` int DEFAULT 1,
	`createTime` timestamp DEFAULT now(),
	`updateTime` timestamp DEFAULT now(),
	CONSTRAINT `mmall_product_id` PRIMARY KEY(`id`),
	CONSTRAINT `mmall_product_id__unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `mmall_shipping` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` int,
	`receiverName` varchar(20),
	`receiverPhone` varchar(20),
	`receiverMobile` varchar(20),
	`receiverProvince` varchar(20),
	`receiverCity` varchar(20),
	`receiverDistrict` varchar(20),
	`receiverAddress` varchar(200),
	`receiverZip` varchar(6),
	`createTime` timestamp DEFAULT now(),
	`updateTime` timestamp DEFAULT now(),
	CONSTRAINT `mmall_shipping_id` PRIMARY KEY(`id`),
	CONSTRAINT `mmall_shipping_id__unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `mmall_user` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(50) NOT NULL,
	`password` varchar(50) NOT NULL,
	`email` varchar(50),
	`phone` varchar(20),
	`question` varchar(100),
	`answer` varchar(100),
	`role` int NOT NULL,
	`create_time` timestamp NOT NULL DEFAULT now(),
	`update_time` timestamp NOT NULL DEFAULT now(),
	CONSTRAINT `mmall_user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_name_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE INDEX `mmall_cart__user_id__idx` ON `mmall_cart` (`userId`);--> statement-breakpoint
CREATE INDEX `mmall_category_id__idx` ON `mmall_category` (`id`);--> statement-breakpoint
CREATE INDEX `mmall_order_id__idx` ON `mmall_order` (`id`);--> statement-breakpoint
CREATE INDEX `mmall_order_item_id__idx__order_no` ON `mmall_order_item` (`id`,`orderNo`);--> statement-breakpoint
CREATE INDEX `mmall_pay_info_id__idx` ON `mmall_pay_info` (`id`);--> statement-breakpoint
CREATE INDEX `mmall_product_id__idx` ON `mmall_product` (`id`);--> statement-breakpoint
CREATE INDEX `mmall_shipping_id__idx` ON `mmall_shipping` (`id`);