import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertElevatorConfigSchema, insertPlatformConfigSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendContactEmail, sendNewsletterEmail } from "./email";
import crypto from "crypto";

// Simple password hashing (for demo - in production use bcrypt)
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Simple token generation
function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// In-memory token store (in production use Redis or database)
const tokens: Map<string, { userId: number; expiresAt: Date }> = new Map();

// Auth middleware for protected routes
function requireAuth(req: any, res: any, next: any) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const session = tokens.get(token);
  if (!session || session.expiresAt < new Date()) {
    tokens.delete(token);
    return res.status(401).json({ message: "Session expired" });
  }

  req.userId = session.userId;
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const result = z.object({
        username: z.string(),
        password: z.string(),
      }).safeParse(req.body);

      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }

      const user = await storage.getUserByUsername(result.data.username);
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const hashedPassword = hashPassword(result.data.password);
      if (user.password !== hashedPassword) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const token = generateToken();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      tokens.set(token, { userId: user.id, expiresAt });

      res.json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      tokens.delete(token);
    }
    res.json({ message: "Logged out successfully" });
  });

  app.get("/api/auth/me", async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const session = tokens.get(token);
    if (!session || session.expiresAt < new Date()) {
      tokens.delete(token!);
      return res.status(401).json({ message: "Session expired" });
    }

    const user = await storage.getUser(session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({ user: { id: user.id, username: user.username } });
  });

  // Create default admin user if not exists
  app.post("/api/auth/setup", async (_req, res) => {
    try {
      const existingAdmin = await storage.getUserByUsername("admin");
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin user already exists" });
      }

      const hashedPassword = hashPassword("admin123");
      const user = await storage.createUser({
        username: "admin",
        password: hashedPassword,
      });

      res.status(201).json({ message: "Admin user created", user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error("Error creating admin user:", error);
      res.status(500).json({ message: "Failed to create admin user" });
    }
  });
  
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (_req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  app.get("/api/categories/:slug/products", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      const products = await storage.getProductsByCategory(category.id);
      res.json(products);
    } catch (error) {
      console.error("Error fetching category products:", error);
      res.status(500).json({ message: "Failed to fetch category products" });
    }
  });

  // Admin endpoints for categories (protected)
  app.post("/api/categories", requireAuth, async (req, res) => {
    try {
      const result = z.object({
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
      }).safeParse(req.body);

      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }

      const category = await storage.createCategory(result.data);
      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Failed to create category" });
    }
  });

  app.put("/api/categories/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      
      const result = z.object({
        name: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        icon: z.string().optional(),
      }).safeParse(req.body);

      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }

      const category = await storage.updateCategory(id, result.data);
      res.status(200).json(category);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ message: "Failed to update category" });
    }
  });

  app.delete("/api/categories/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      await storage.deleteCategory(id);
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ message: "Failed to delete category" });
    }
  });

  app.post("/api/categories/bulk-delete", requireAuth, async (req, res) => {
    try {
      const result = z.object({
        ids: z.array(z.number()),
      }).safeParse(req.body);

      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }

      await storage.deleteCategories(result.data.ids);
      res.status(200).json({ message: "Categories deleted successfully" });
    } catch (error) {
      console.error("Error deleting categories:", error);
      res.status(500).json({ message: "Failed to delete categories" });
    }
  });

  app.post("/api/inquiries", async (req, res) => {
    try {
      // Honeypot check - if website field is filled, it's likely a bot
      if (req.body.website) {
        console.log("Bot detected - honeypot field filled");
        return res.status(201).json({ message: "Inquiry submitted" });
      }
      
      const result = insertInquirySchema.safeParse(req.body);
      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }
      const inquiry = await storage.createInquiry(result.data);
      
      // Send email notification
      await sendContactEmail({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone ?? undefined,
        company: result.data.company ?? undefined,
        subject: result.data.subject,
        message: result.data.message,
      });
      
      res.status(201).json(inquiry);
    } catch (error) {
      console.error("Error creating inquiry:", error);
      res.status(500).json({ message: "Failed to create inquiry" });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      // Honeypot check - if website field is filled, it's likely a bot
      if (req.body.website) {
        console.log("Bot detected - honeypot field filled");
        return res.status(201).json({ message: "Subscription successful" });
      }
      
      const result = z.object({
        email: z.string().email(),
      }).safeParse(req.body);

      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }

      // Send email notification
      await sendNewsletterEmail(result.data.email);
      
      res.status(201).json({ message: "Subscription successful" });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ message: "Failed to subscribe" });
    }
  });

  app.post("/api/elevator-configurations", async (req, res) => {
    try {
      const result = insertElevatorConfigSchema.safeParse(req.body);
      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }
      const config = await storage.createElevatorConfig(result.data);
      res.status(201).json(config);
    } catch (error) {
      console.error("Error creating elevator configuration:", error);
      res.status(500).json({ message: "Failed to create elevator configuration" });
    }
  });

  app.post("/api/platform-configurations", async (req, res) => {
    try {
      const result = insertPlatformConfigSchema.safeParse(req.body);
      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }
      const config = await storage.createPlatformConfig(result.data);
      res.status(201).json(config);
    } catch (error) {
      console.error("Error creating platform configuration:", error);
      res.status(500).json({ message: "Failed to create platform configuration" });
    }
  });

  // Admin endpoints for products (protected)
  app.post("/api/products", requireAuth, async (req, res) => {
    try {
      const result = z.object({
        code: z.string(),
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        specifications: z.string().optional(),
        image: z.string().optional(),
        featured: z.boolean().optional(),
      }).safeParse(req.body);

      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }

      const product = await storage.createProduct(result.data);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.put("/api/products/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const result = z.object({
        code: z.string().optional(),
        name: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        specifications: z.string().optional(),
        image: z.string().optional(),
        featured: z.boolean().optional(),
        categoryId: z.number().optional(),
      }).safeParse(req.body);

      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }

      const product = await storage.updateProduct(id, result.data);
      res.status(200).json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      await storage.deleteProduct(id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  app.post("/api/products/bulk-delete", requireAuth, async (req, res) => {
    try {
      const result = z.object({
        ids: z.array(z.number()),
      }).safeParse(req.body);

      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }

      await storage.deleteProducts(result.data.ids);
      res.status(200).json({ message: "Products deleted successfully" });
    } catch (error) {
      console.error("Error deleting products:", error);
      res.status(500).json({ message: "Failed to delete products" });
    }
  });

  app.post("/api/products/bulk-import", requireAuth, async (req, res) => {
    try {
      const productSchema = z.object({
        code: z.string(),
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        specifications: z.string().optional(),
        image: z.string().optional(),
        featured: z.boolean().optional(),
        categoryId: z.number().optional(),
      });

      const result = z.object({
        products: z.array(productSchema),
      }).safeParse(req.body);

      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }

      const created = await storage.createProducts(result.data.products);
      res.status(201).json({ message: `${created.length} products imported successfully`, products: created });
    } catch (error) {
      console.error("Error importing products:", error);
      res.status(500).json({ message: "Failed to import products" });
    }
  });

  // PDF endpoints
  app.get("/api/pdfs", async (_req, res) => {
    try {
      const pdfs = await storage.getPdfs();
      res.json(pdfs);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
      res.status(500).json({ message: "Failed to fetch PDFs" });
    }
  });

  app.get("/api/products/:productId/pdfs", async (req, res) => {
    try {
      const productId = parseInt(req.params.productId, 10);
      if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const pdfs = await storage.getPdfsByProduct(productId);
      res.json(pdfs);
    } catch (error) {
      console.error("Error fetching product PDFs:", error);
      res.status(500).json({ message: "Failed to fetch product PDFs" });
    }
  });

  app.post("/api/pdfs", requireAuth, async (req, res) => {
    try {
      const result = z.object({
        name: z.string(),
        filename: z.string(),
        url: z.string(),
        productId: z.number().optional(),
        type: z.string(),
      }).safeParse(req.body);

      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }

      const pdf = await storage.createPdf(result.data);
      res.status(201).json(pdf);
    } catch (error) {
      console.error("Error creating PDF:", error);
      res.status(500).json({ message: "Failed to create PDF" });
    }
  });

  app.delete("/api/pdfs/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid PDF ID" });
      }
      await storage.deletePdf(id);
      res.status(200).json({ message: "PDF deleted successfully" });
    } catch (error) {
      console.error("Error deleting PDF:", error);
      res.status(500).json({ message: "Failed to delete PDF" });
    }
  });

  app.post("/api/pdfs/bulk-delete", requireAuth, async (req, res) => {
    try {
      const result = z.object({
        ids: z.array(z.number()),
      }).safeParse(req.body);

      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }

      await storage.deletePdfs(result.data.ids);
      res.status(200).json({ message: "PDFs deleted successfully" });
    } catch (error) {
      console.error("Error deleting PDFs:", error);
      res.status(500).json({ message: "Failed to delete PDFs" });
    }
  });

  // SEO endpoints
  app.get("/robots.txt", (req, res) => {
    const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
    const host = req.get("host") || "localhost:5000";
    const baseUrl = `${protocol}://${host}`;
    
    const robotsTxt = `# Robots.txt for Prodlift
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for politeness
Crawl-delay: 1

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
`;
    
    res.set("Content-Type", "text/plain");
    res.send(robotsTxt);
  });

  app.get("/sitemap.xml", async (req, res) => {
    try {
      const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
      const host = req.get("host") || "localhost:5000";
      const baseUrl = `${protocol}://${host}`;
      
      const products = await storage.getProducts();
      const categories = await storage.getCategories();
      
      const today = new Date().toISOString().split("T")[0];
      
      let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/products</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/elevator-configurator</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/platform-configurator</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

      // Add category pages
      for (const category of categories) {
        sitemap += `  <url>
    <loc>${baseUrl}/categories/${category.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
      }

      // Add product pages
      for (const product of products) {
        sitemap += `  <url>
    <loc>${baseUrl}/products/${product.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      }

      sitemap += `</urlset>`;
      
      res.set("Content-Type", "application/xml");
      res.send(sitemap);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  app.get("/llms.txt", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      const categories = await storage.getCategories();
      
      let llmsTxt = `# Prodlift - Industrial Elevator Components

## About
Prodlift is a leading manufacturer and supplier of industrial elevator components, safety devices, and lifting equipment. We specialize in elevator limiters, operators, safety systems, and platform lifts.

## Main Sections
- Home: Main landing page with company overview
- Products: Complete catalog of elevator components and safety devices
- Categories: Product categories organized by type
- Elevator Configurator: Interactive tool to configure elevator systems
- Platform Configurator: Interactive tool to configure platform lifts
- About: Company information and history
- Contact: Contact form and business information

## Product Categories
`;

      for (const category of categories) {
        llmsTxt += `- ${category.name}: ${category.description || "Category of products"}\n`;
      }

      llmsTxt += `
## Products (${products.length} total)
`;

      for (const product of products.slice(0, 20)) {
        llmsTxt += `- ${product.name} (${product.code}): ${product.description?.substring(0, 100) || "Industrial component"}...\n`;
      }

      if (products.length > 20) {
        llmsTxt += `... and ${products.length - 20} more products\n`;
      }

      llmsTxt += `
## Contact Information
Visit our contact page for inquiries and support.

## Technical Specifications
All products come with detailed technical specifications and PDF documentation available on individual product pages.
`;
      
      res.set("Content-Type", "text/plain");
      res.send(llmsTxt);
    } catch (error) {
      console.error("Error generating llms.txt:", error);
      res.status(500).send("Error generating llms.txt");
    }
  });

  return httpServer;
}
