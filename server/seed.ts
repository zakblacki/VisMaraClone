import { db } from "./db";
import { products, categories, pdfs, type Category, type Product, type Pdf } from "@shared/schema";
import { sampleProducts, sampleCategories } from "../client/src/lib/data";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("Starting database seed...");

  try {
    console.log("Clearing existing data...");
    await db.delete(pdfs);
    await db.delete(products);
    await db.delete(categories);

    console.log("Inserting categories...");
    await db.insert(categories).values(sampleCategories);
    const insertedCategories: Category[] = await db.select().from(categories);
    console.log(`Inserted ${insertedCategories.length} categories`);

    const categoryMap = new Map<string, number>();
    insertedCategories.forEach((cat: Category) => {
      categoryMap.set(cat.slug, cat.id);
    });

    const productsWithCategories = sampleProducts.map((product) => {
      let categoryId: number | null = null;
      
      if (product.slug.includes("speed-limiter")) {
        categoryId = categoryMap.get("speed-limiters") || null;
      } else if (product.slug.includes("door-operator") || product.slug.includes("suspension")) {
        categoryId = categoryMap.get("door-operators") || null;
      } else if (product.slug.includes("led-")) {
        categoryId = categoryMap.get("led") || null;
      }

      return {
        ...product,
        categoryId,
      };
    });

    console.log("Inserting products...");
    await db.insert(products).values(productsWithCategories);
    const insertedProducts: Product[] = await db.select().from(products);
    console.log(`Inserted ${insertedProducts.length} products`);

    const productMap = new Map<string, number>();
    insertedProducts.forEach((prod: Product) => {
      productMap.set(prod.slug, prod.id);
    });

    const samplePdfs = [
      {
        name: "Fiche technique - Limiteur de Vitesse 240mm",
        filename: "speed-limiter-240mm-datasheet.pdf",
        url: "/documents/speed-limiter-240mm-datasheet.pdf",
        productId: productMap.get("speed-limiter-bidirectional-240mm") || null,
        type: "datasheet",
      },
      {
        name: "Manuel d'installation - Limiteur de Vitesse",
        filename: "speed-limiter-installation-guide.pdf",
        url: "/documents/speed-limiter-installation-guide.pdf",
        productId: productMap.get("speed-limiter-bidirectional-240mm") || null,
        type: "manual",
      },
      {
        name: "Fiche technique - Opérateur Porte Slim",
        filename: "door-operator-slim-datasheet.pdf",
        url: "/documents/door-operator-slim-datasheet.pdf",
        productId: productMap.get("slim-door-operator-lateral") || null,
        type: "datasheet",
      },
      {
        name: "Catalogue Composants LED",
        filename: "led-components-catalog.pdf",
        url: "/documents/led-components-catalog.pdf",
        productId: null,
        type: "catalog",
      },
      {
        name: "Catalogue Général Prodlift 2024",
        filename: "prodlift-catalog-2024.pdf",
        url: "/documents/prodlift-catalog-2024.pdf",
        productId: null,
        type: "catalog",
      },
      {
        name: "Certificat CE - Limiteurs de Vitesse",
        filename: "ce-certificate-speed-governors.pdf",
        url: "/documents/ce-certificate-speed-governors.pdf",
        productId: null,
        type: "certificate",
      },
    ];

    console.log("Inserting PDFs...");
    await db.insert(pdfs).values(samplePdfs);
    const insertedPdfs: Pdf[] = await db.select().from(pdfs);
    console.log(`Inserted ${insertedPdfs.length} PDFs`);

    console.log("\nSeed completed successfully!");
    console.log(`Summary:`);
    console.log(`  - Categories: ${insertedCategories.length}`);
    console.log(`  - Products: ${insertedProducts.length}`);
    console.log(`  - PDFs: ${insertedPdfs.length}`);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }

  process.exit(0);
}

seed();
