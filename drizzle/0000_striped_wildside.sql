CREATE TABLE `chat_conversations` (
	`id` char(36) NOT NULL,
	`visitor_hash` char(64) NOT NULL,
	`day` date NOT NULL,
	`last_response_id` varchar(255),
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_conversations_id` PRIMARY KEY(`id`),
	CONSTRAINT `chat_visitor_day` UNIQUE(`visitor_hash`,`day`)
);
--> statement-breakpoint
CREATE TABLE `chat_daily_usage` (
	`day` date NOT NULL,
	`used_tokens` int unsigned NOT NULL DEFAULT 0,
	`reserved_tokens` int unsigned NOT NULL DEFAULT 0,
	CONSTRAINT `chat_daily_usage_day` PRIMARY KEY(`day`)
);
--> statement-breakpoint
CREATE TABLE `chat_turns` (
	`id` char(36) NOT NULL,
	`conversation_id` char(36) NOT NULL,
	`question` text NOT NULL,
	`answer` text,
	`status` enum('pending','completed','failed') NOT NULL DEFAULT 'pending',
	`error_message` varchar(255),
	`reserved_tokens` int unsigned NOT NULL,
	`input_tokens` int unsigned,
	`output_tokens` int unsigned,
	`charged_tokens` int unsigned NOT NULL DEFAULT 0,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_turns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `chat_turns` ADD CONSTRAINT `chat_turns_conversation_id_chat_conversations_id_fk` FOREIGN KEY (`conversation_id`) REFERENCES `chat_conversations`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `chat_conversation_turns` ON `chat_turns` (`conversation_id`,`created_at`);