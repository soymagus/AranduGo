ALTER TABLE `contact_messages` ADD `timezone` text DEFAULT 'UTC' NOT NULL;--> statement-breakpoint
ALTER TABLE `contact_messages` ADD `delivered` integer DEFAULT false NOT NULL;