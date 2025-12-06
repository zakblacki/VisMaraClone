import { sql } from "drizzle-orm";
import { mysqlTable, text, varchar, int, boolean, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Product Categories
export const categories = mysqlTable("categories", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
});

export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Products
export const products = mysqlTable("products", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  code: text("code").notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  specifications: text("specifications"),
  categoryId: varchar("category_id", { length: 36 }).references(() => categories.id),
  image: text("image"),
  featured: boolean("featured").default(false),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Contact Inquiries
export const inquiries = mysqlTable("inquiries", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  productId: varchar("product_id", { length: 36 }).references(() => products.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true, createdAt: true });
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;

// Elevator Configuration Options
export const elevatorConfigurations = mysqlTable("elevator_configurations", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  sessionId: text("session_id").notNull(),
  cabinType: text("cabin_type"),
  capacity: int("capacity"),
  floors: int("floors"),
  doorType: text("door_type"),
  finishMaterial: text("finish_material"),
  lighting: text("lighting"),
  controlPanel: text("control_panel"),
  additionalFeatures: text("additional_features"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertElevatorConfigSchema = createInsertSchema(elevatorConfigurations).omit({ id: true, createdAt: true });
export type InsertElevatorConfig = z.infer<typeof insertElevatorConfigSchema>;
export type ElevatorConfig = typeof elevatorConfigurations.$inferSelect;

// Platform Configuration Options
export const platformConfigurations = mysqlTable("platform_configurations", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  sessionId: text("session_id").notNull(),
  platformType: text("platform_type"),
  capacity: int("capacity"),
  travelHeight: int("travel_height"),
  indoor: boolean("indoor").default(true),
  rampType: text("ramp_type"),
  safetyFeatures: text("safety_features"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPlatformConfigSchema = createInsertSchema(platformConfigurations).omit({ id: true, createdAt: true });
export type InsertPlatformConfig = z.infer<typeof insertPlatformConfigSchema>;
export type PlatformConfig = typeof platformConfigurations.$inferSelect;

// Users (keeping existing)
export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// PDFs
export const pdfs = mysqlTable("pdfs", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  name: text("name").notNull(),
  filename: text("filename").notNull(),
  url: text("url").notNull(),
  productId: varchar("product_id", { length: 36 }).references(() => products.id),
  type: text("type").notNull(), // 'datasheet', 'manual', 'certificate', 'general'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPdfSchema = createInsertSchema(pdfs).omit({ id: true, createdAt: true });
export type InsertPdf = z.infer<typeof insertPdfSchema>;
export type Pdf = typeof pdfs.$inferSelect;

// Frontend Types for static data
export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  secondaryCta?: {
    text: string;
    link: string;
  };
}

export interface ServiceCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
}

export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
