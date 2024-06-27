CREATE TABLE `task` (
	`id` varchar(255) NOT NULL,
	`content` text,
	`createdAt` timestamp NOT NULL DEFAULT now(),
	`completed` boolean DEFAULT false,
	CONSTRAINT `task_id` PRIMARY KEY(`id`)
);
