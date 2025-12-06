import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertElevatorConfigSchema, insertPlatformConfigSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendContactEmail, sendNewsletterEmail } from "./email";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
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

  app.post("/api/inquiries", async (req, res) => {
    try {
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

  // Admin endpoints for products
  app.post("/api/products", async (req, res) => {
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

  app.put("/api/products/:id", async (req, res) => {
    try {
      const result = z.object({
        code: z.string().optional(),
        name: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        specifications: z.string().optional(),
        image: z.string().optional(),
        featured: z.boolean().optional(),
        categoryId: z.string().optional(),
      }).safeParse(req.body);

      if (!result.success) {
        const error = fromZodError(result.error);
        return res.status(400).json({ message: error.message });
      }

      const product = await storage.updateProduct(req.params.id, result.data);
      res.status(200).json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      await storage.deleteProduct(req.params.id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
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
      const pdfs = await storage.getPdfsByProduct(req.params.productId);
      res.json(pdfs);
    } catch (error) {
      console.error("Error fetching product PDFs:", error);
      res.status(500).json({ message: "Failed to fetch product PDFs" });
    }
  });

  app.post("/api/pdfs", async (req, res) => {
    try {
      const result = z.object({
        name: z.string(),
        filename: z.string(),
        url: z.string(),
        productId: z.string().optional(),
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

  app.delete("/api/pdfs/:id", async (req, res) => {
    try {
      await storage.deletePdf(req.params.id);
      res.status(200).json({ message: "PDF deleted successfully" });
    } catch (error) {
      console.error("Error deleting PDF:", error);
      res.status(500).json({ message: "Failed to delete PDF" });
    }
  });

  return httpServer;
}
