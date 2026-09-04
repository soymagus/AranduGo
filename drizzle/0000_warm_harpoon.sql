CREATE TABLE `site_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_email` text NOT NULL,
	`draft_json` text NOT NULL,
	`published_json` text NOT NULL,
	`updated_at` integer NOT NULL,
	`published_at` integer NOT NULL
);
