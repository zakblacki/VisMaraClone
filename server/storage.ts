import { db } from "./db";
import { eq, inArray } from "drizzle-orm";
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
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
  
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category>;
  deleteCategory(id: number): Promise<void>;
  deleteCategories(ids: number[]): Promise<void>;
  
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
  
  createElevatorConfig(config: InsertElevatorConfig): Promise<ElevatorConfig>;
  createPlatformConfig(config: InsertPlatformConfig): Promise<PlatformConfig>;
  
  getPdfs(): Promise<Pdf[]>;
  getPdfsByProduct(productId: number): Promise<Pdf[]>;
  createPdf(pdf: InsertPdf): Promise<Pdf>;
  deletePdf(id: number): Promise<void>;
  deleteProducts(ids: number[]): Promise<void>;
  deletePdfs(ids: number[]): Promise<void>;
  createProducts(products: InsertProduct[]): Promise<Product[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).$returningId();
    const insertedId = result[0]?.id;
    if (!insertedId) throw new Error("Failed to create user");
    const [created] = await db.select().from(users).where(eq(users.id, insertedId));
    if (!created) throw new Error("Failed to retrieve created user");
    return created;
  }

  async getProducts(): Promise<Product[]> {
    return db.select().from(products);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return db.select().from(products).where(eq(products.categoryId, categoryId));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return db.select().from(products).where(eq(products.featured, true));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(product).$returningId();
    const insertedId = result[0]?.id;
    if (!insertedId) throw new Error("Failed to create product");
    const [created] = await db.select().from(products).where(eq(products.id, insertedId));
    if (!created) throw new Error("Failed to retrieve created product");
    return created;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product> {
    await db.update(products).set(product).where(eq(products.id, id));
    const [updated] = await db.select().from(products).where(eq(products.id, id));
    if (!updated) throw new Error("Failed to update product");
    return updated;
  }

  async deleteProduct(id: number): Promise<void> {
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
    const result = await db.insert(categories).values(category).$returningId();
    const insertedId = result[0]?.id;
    if (!insertedId) throw new Error("Failed to create category");
    const [created] = await db.select().from(categories).where(eq(categories.id, insertedId));
    if (!created) throw new Error("Failed to retrieve created category");
    return created;
  }

  async updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category> {
    await db.update(categories).set(category).where(eq(categories.id, id));
    const [updated] = await db.select().from(categories).where(eq(categories.id, id));
    if (!updated) throw new Error("Failed to update category");
    return updated;
  }

  async deleteCategory(id: number): Promise<void> {
    await db.delete(categories).where(eq(categories.id, id));
  }

  async deleteCategories(ids: number[]): Promise<void> {
    if (ids.length === 0) return;
    await db.delete(categories).where(inArray(categories.id, ids));
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const result = await db.insert(inquiries).values(inquiry).$returningId();
    const insertedId = result[0]?.id;
    if (!insertedId) throw new Error("Failed to create inquiry");
    const [created] = await db.select().from(inquiries).where(eq(inquiries.id, insertedId));
    if (!created) throw new Error("Failed to retrieve created inquiry");
    return created;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return db.select().from(inquiries);
  }

  async createElevatorConfig(config: InsertElevatorConfig): Promise<ElevatorConfig> {
    const result = await db.insert(elevatorConfigurations).values(config).$returningId();
    const insertedId = result[0]?.id;
    if (!insertedId) throw new Error("Failed to create elevator config");
    const [created] = await db.select().from(elevatorConfigurations).where(eq(elevatorConfigurations.id, insertedId));
    if (!created) throw new Error("Failed to retrieve created elevator config");
    return created;
  }

  async createPlatformConfig(config: InsertPlatformConfig): Promise<PlatformConfig> {
    const result = await db.insert(platformConfigurations).values(config).$returningId();
    const insertedId = result[0]?.id;
    if (!insertedId) throw new Error("Failed to create platform config");
    const [created] = await db.select().from(platformConfigurations).where(eq(platformConfigurations.id, insertedId));
    if (!created) throw new Error("Failed to retrieve created platform config");
    return created;
  }

  async getPdfs(): Promise<Pdf[]> {
    return db.select().from(pdfs);
  }

  async getPdfsByProduct(productId: number): Promise<Pdf[]> {
    return db.select().from(pdfs).where(eq(pdfs.productId, productId));
  }

  async createPdf(pdf: InsertPdf): Promise<Pdf> {
    const result = await db.insert(pdfs).values(pdf).$returningId();
    const insertedId = result[0]?.id;
    if (!insertedId) throw new Error("Failed to create pdf");
    const [created] = await db.select().from(pdfs).where(eq(pdfs.id, insertedId));
    if (!created) throw new Error("Failed to retrieve created pdf");
    return created;
  }

  async deletePdf(id: number): Promise<void> {
    await db.delete(pdfs).where(eq(pdfs.id, id));
  }

  async deleteProducts(ids: number[]): Promise<void> {
    if (ids.length === 0) return;
    await db.delete(products).where(inArray(products.id, ids));
  }

  async deletePdfs(ids: number[]): Promise<void> {
    if (ids.length === 0) return;
    await db.delete(pdfs).where(inArray(pdfs.id, ids));
  }

  async createProducts(productList: InsertProduct[]): Promise<Product[]> {
    if (productList.length === 0) return [];
    const result = await db.insert(products).values(productList).$returningId();
    const insertedIds = result.map(r => r.id);
    if (insertedIds.length === 0) return [];
    return db.select().from(products).where(inArray(products.id, insertedIds));
  }
}

export const storage = new DatabaseStorage();
