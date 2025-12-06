import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  users,
  products,
  categories,
  inquiries,
  elevatorConfigurations,
  platformConfigurations,
  pdfs,
  type User,
  type InsertUser,
  type Product,
  type InsertProduct,
  type Category,
  type InsertCategory,
  type Inquiry,
  type InsertInquiry,
  type ElevatorConfig,
  type InsertElevatorConfig,
  type PlatformConfig,
  type InsertPlatformConfig,
  type Pdf,
  type InsertPdf,
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
  
  createElevatorConfig(config: InsertElevatorConfig): Promise<ElevatorConfig>;
  createPlatformConfig(config: InsertPlatformConfig): Promise<PlatformConfig>;
  
  getPdfs(): Promise<Pdf[]>;
  getPdfsByProduct(productId: string): Promise<Pdf[]>;
  createPdf(pdf: InsertPdf): Promise<Pdf>;
  deletePdf(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    await db.insert(users).values(insertUser);
    const user = await this.getUserByUsername(insertUser.username);
    if (!user) throw new Error("Failed to create user");
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return db.select().from(products);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return db.select().from(products).where(eq(products.categoryId, categoryId));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return db.select().from(products).where(eq(products.featured, true));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    await db.insert(products).values(product);
    const created = await this.getProductBySlug(product.slug);
    if (!created) throw new Error("Failed to create product");
    return created;
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product> {
    await db.update(products).set(product).where(eq(products.id, id));
    const [updated] = await db.select().from(products).where(eq(products.id, id));
    if (!updated) throw new Error("Failed to update product");
    return updated;
  }

  async deleteProduct(id: string): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  async getCategories(): Promise<Category[]> {
    return db.select().from(categories);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    await db.insert(categories).values(category);
    const created = await this.getCategoryBySlug(category.slug);
    if (!created) throw new Error("Failed to create category");
    return created;
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const result = await db.insert(inquiries).values(inquiry);
    const insertId = result[0].insertId;
    const [created] = await db.select().from(inquiries).where(eq(inquiries.id, insertId.toString()));
    if (!created) throw new Error("Failed to create inquiry");
    return created;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return db.select().from(inquiries);
  }

  async createElevatorConfig(config: InsertElevatorConfig): Promise<ElevatorConfig> {
    const result = await db.insert(elevatorConfigurations).values(config);
    const insertId = result[0].insertId;
    const [created] = await db.select().from(elevatorConfigurations).where(eq(elevatorConfigurations.id, insertId.toString()));
    if (!created) throw new Error("Failed to create elevator config");
    return created;
  }

  async createPlatformConfig(config: InsertPlatformConfig): Promise<PlatformConfig> {
    const result = await db.insert(platformConfigurations).values(config);
    const insertId = result[0].insertId;
    const [created] = await db.select().from(platformConfigurations).where(eq(platformConfigurations.id, insertId.toString()));
    if (!created) throw new Error("Failed to create platform config");
    return created;
  }

  async getPdfs(): Promise<Pdf[]> {
    return db.select().from(pdfs);
  }

  async getPdfsByProduct(productId: string): Promise<Pdf[]> {
    return db.select().from(pdfs).where(eq(pdfs.productId, productId));
  }

  async createPdf(pdf: InsertPdf): Promise<Pdf> {
    const result = await db.insert(pdfs).values(pdf);
    const insertId = result[0].insertId;
    const [created] = await db.select().from(pdfs).where(eq(pdfs.id, insertId.toString()));
    if (!created) throw new Error("Failed to create pdf");
    return created;
  }

  async deletePdf(id: string): Promise<void> {
    await db.delete(pdfs).where(eq(pdfs.id, id));
  }
}

export const storage = new DatabaseStorage();
