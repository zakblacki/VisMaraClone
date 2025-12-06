import { db } from "./db";
import { products, categories, pdfs } from "@shared/schema";
import { sampleProducts, sampleCategories } from "../client/src/lib/data";

async function seed() {
  console.log("Starting database seed...");

  try {
    console.log("Clearing existing data...");
    await db.delete(pdfs);
    await db.delete(products);
    await db.delete(categories);

    console.log("Inserting categories...");
    const insertedCategories = await db.insert(categories).values(sampleCategories).returning();
    console.log(`Inserted ${insertedCategories.length} categories`);

    const categoryMap = new Map<string, number>();
    insertedCategories.forEach((cat) => {
      categoryMap.set(cat.slug, cat.id);
    });

    const productsWithCategories = sampleProducts.map((product) => {
      let categoryId: number | null = null;
      
      if (product.slug.includes("limitatore") || product.slug.includes("velocita")) {
        categoryId = categoryMap.get("limitatori") || null;
      } else if (product.slug.includes("operatore") || product.slug.includes("sospensione")) {
        categoryId = categoryMap.get("operatori") || null;
      } else if (product.slug.includes("led") || product.slug.includes("connettore") || product.slug.includes("cavo") || product.slug.includes("tappo")) {
        categoryId = categoryMap.get("led") || null;
      }

      return {
        ...product,
        categoryId,
      };
    });

    console.log("Inserting products...");
    const insertedProducts = await db.insert(products).values(productsWithCategories).returning();
    console.log(`Inserted ${insertedProducts.length} products`);

    const productMap = new Map<string, number>();
    insertedProducts.forEach((prod) => {
      productMap.set(prod.slug, prod.id);
    });

    const samplePdfs = [
      {
        name: "Fiche technique - Limiteur de Vitesse 240mm",
        filename: "limitatore-240mm-datasheet.pdf",
        url: "/documents/limitatore-240mm-datasheet.pdf",
        productId: productMap.get("limitatore-velocita-bidirezionale-240mm") || null,
        type: "datasheet",
      },
      {
        name: "Manuel d'installation - Limiteur de Vitesse",
        filename: "limitatore-installation-guide.pdf",
        url: "/documents/limitatore-installation-guide.pdf",
        productId: productMap.get("limitatore-velocita-bidirezionale-240mm") || null,
        type: "manual",
      },
      {
        name: "Fiche technique - Opérateur Porte Slim",
        filename: "operatore-slim-datasheet.pdf",
        url: "/documents/operatore-slim-datasheet.pdf",
        productId: productMap.get("operatore-porta-slim-laterale") || null,
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
    const insertedPdfs = await db.insert(pdfs).values(samplePdfs).returning();
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
