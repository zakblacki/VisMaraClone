import { db } from "./db";
import { categories, products } from "@shared/schema";

const sampleCategories = [
  {
    name: "Limiteurs de vitesse",
    slug: "limitatori",
    description: "Limiteurs de vitesse bidirectionnels et unidirectionnels pour ascenseurs",
    icon: "Gauge"
  },
  {
    name: "Opérateurs de porte",
    slug: "operatori",
    description: "Opérateurs et suspensions pour portes d'ascenseur",
    icon: "DoorOpen"
  },
  {
    name: "Composants LED",
    slug: "led",
    description: "Connecteurs, bandes et accessoires LED pour l'éclairage d'ascenseur",
    icon: "Lightbulb"
  },
  {
    name: "Systèmes de sécurité",
    slug: "sicurezza",
    description: "Composants de sécurité pour systèmes d'ascenseurs",
    icon: "Shield"
  },
  {
    name: "Panneaux de commande",
    slug: "pulsantiere",
    description: "Panneaux de commande et boutons pour cabines d'ascenseur",
    icon: "Keyboard"
  },
  {
    name: "Structures et guides",
    slug: "strutture",
    description: "Guides, structures et composants mécaniques pour ascenseurs",
    icon: "Layers"
  }
];

const sampleProducts = [
  {
    code: "L0X-187",
    name: "Limiteur de Vitesse Bidirectionnel ø240mm",
    slug: "limitatore-velocita-bidirezionale-240mm",
    description: "Limiteur de vitesse bidirectionnel avec diamètre de poulie 240mm. Speed governor bi-directional pour applications d'ascenseurs.",
    specifications: "Diamètre poulie: ø 240 mm\nVitesse nominale: configurable\nCertification: CE",
    image: "speedGovernor",
    featured: true,
    categorySlug: "limitatori"
  },
  {
    code: "L0X-186",
    name: "Limiteur de Vitesse Bidirectionnel ø150mm",
    slug: "limitatore-velocita-bidirezionale-150mm",
    description: "Limiteur de vitesse bidirectionnel avec diamètre de poulie 150mm. Compact speed governor pour espaces réduits.",
    specifications: "Diamètre poulie: ø 150 mm\nVitesse nominale: configurable\nCertification: CE",
    image: "speedGovernor",
    featured: true,
    categorySlug: "limitatori"
  },
  {
    code: "700052",
    name: "Connecteur Type I pour Bande LED 220V AC",
    slug: "connettore-tipo-i-led-220v",
    description: "Connecteur Type I pour bande LED 220V AC, largeur 12mm, IP65, monochrome.",
    specifications: "Tension: 220V AC\nLargeur: 12mm\nProtection: IP65\nType: Monochrome",
    image: "ledConnector",
    featured: false,
    categorySlug: "led"
  },
  {
    code: "700056",
    name: "Connecteur Bande LED 220V AC IP65",
    slug: "connettore-striscia-led-ip65",
    description: "Pin pour connecteur de bande LED 220V AC SMD2835 IP65, largeur 12mm, monochrome.",
    specifications: "Tension: 220V AC\nType LED: SMD2835\nProtection: IP65\nLargeur: 12mm",
    image: "ledConnector",
    featured: false,
    categorySlug: "led"
  },
  {
    code: "700051",
    name: "Câble Redresseur pour Bande LED 220-240V",
    slug: "cavo-raddrizzatore-led-220v",
    description: "Câble redresseur pour bande LED 220-240V AC IP65, largeur 12mm, certification CE, monochrome.",
    specifications: "Tension: 220-240V AC\nProtection: IP65\nLargeur: 12mm\nCertification: CE",
    image: "ledConnector",
    featured: false,
    categorySlug: "led"
  },
  {
    code: "700053",
    name: "Bouchon Terminal pour Bande LED 220V AC",
    slug: "tappo-terminale-led-220v",
    description: "Bouchon terminal transparent pour bande LED 220V AC IP65, largeur 12mm.",
    specifications: "Tension: 220V AC\nProtection: IP65\nLargeur: 12mm\nCouleur: Transparent",
    image: "ledConnector",
    featured: false,
    categorySlug: "led"
  },
  {
    code: "OP-SLIM-01",
    name: "Opérateur Porte Slim Ouverture Latérale",
    slug: "operatore-porta-slim-laterale",
    description: "Nouvel opérateur porte slim avec ouverture latérale. Design compact pour installations avec espace réduit.",
    specifications: "Type ouverture: Latérale\nHauteur seuil: 60mm\nMoteur: Brushless DC",
    image: "doorOperator",
    featured: true,
    categorySlug: "operatori"
  },
  {
    code: "SUSP-SLIM-01",
    name: "Suspension Slim pour Opérateur",
    slug: "sospensione-slim-operatore",
    description: "Système de suspension slim pour opérateurs de porte. Profil réduit pour maximiser l'espace cabine.",
    specifications: "Type: Suspension slim\nMatériau: Aluminium anodisé\nCharge: jusqu'à 300kg",
    image: "doorOperator",
    featured: true,
    categorySlug: "operatori"
  },
  {
    code: "SB-001",
    name: "Frein de Sécurité Progressif",
    slug: "freno-sicurezza-progressivo",
    description: "Frein de sécurité progressif pour cabines d'ascenseur. Système fiable pour arrêt contrôlé.",
    specifications: "Type: Progressif\nCapacité: jusqu'à 2000kg\nCertification: CE EN81-20",
    image: "speedGovernor",
    featured: true,
    categorySlug: "sicurezza"
  },
  {
    code: "COP-01",
    name: "Panneau Cabine Standard",
    slug: "pulsantiera-cabina-standard",
    description: "Panneau standard pour cabine d'ascenseur avec boutons illuminés et affichage d'étage.",
    specifications: "Matériau: Acier inoxydable\nBoutons: LED\nAffichage: LCD 7 segments",
    image: "speedGovernor",
    featured: false,
    categorySlug: "pulsantiere"
  },
  {
    code: "GR-01",
    name: "Guide à Rouleaux pour Cabine",
    slug: "guida-rullo-cabina",
    description: "Système de guides à rouleaux pour cabines d'ascenseur. Glissement silencieux et maintenance réduite.",
    specifications: "Type: Rouleaux réglables\nMatériau: Acier trempé\nCharge: jusqu'à 1500kg",
    image: "doorOperator",
    featured: false,
    categorySlug: "strutture"
  }
];

async function seed() {
  console.log("Starting database seed...");

  try {
    const existingCategories = await db.select().from(categories);
    if (existingCategories.length > 0) {
      console.log("Database already seeded, skipping...");
      return;
    }

    console.log("Seeding categories...");
    await db.insert(categories).values(sampleCategories);
    const insertedCategories = await db.select().from(categories);
    console.log(`Inserted ${insertedCategories.length} categories`);

    const categoryMap = new Map(insertedCategories.map((c) => [c.slug, c.id]));

    console.log("Seeding products...");
    const productsToInsert = sampleProducts.map(({ categorySlug, ...product }) => ({
      ...product,
      categoryId: categoryMap.get(categorySlug) ?? null
    }));

    await db.insert(products).values(productsToInsert);
    const insertedProducts = await db.select().from(products);
    console.log(`Inserted ${insertedProducts.length} products`);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seed().then(() => process.exit(0)).catch(() => process.exit(1));
