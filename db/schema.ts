import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const siteProfiles = sqliteTable("site_profiles", {
  id: text("id").primaryKey(),
  ownerEmail: text("owner_email").notNull(),
  draftJson: text("draft_json").notNull(),
  publishedJson: text("published_json").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  publishedAt: integer("published_at", { mode: "timestamp" }).notNull(),
});

export const contactMessages = sqliteTable("contact_messages", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  message: text("message").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
