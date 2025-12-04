import { db } from "./db";
import { categories, products } from "@shared/schema";

const sampleCategories = [
  {
    name: "Limitatori di velocità",
    slug: "limitatori",
    description: "Limitatori di velocità bidirezionali e unidirezionali per ascensori",
    icon: "Gauge"
  },
  {
    name: "Operatori porta",
    slug: "operatori",
    description: "Operatori e sospensioni per porte ascensore",
    icon: "DoorOpen"
  },
  {
    name: "Componenti LED",
    slug: "led",
    description: "Connettori, strisce e accessori LED per illuminazione ascensori",
    icon: "Lightbulb"
  },
  {
    name: "Sistemi di sicurezza",
    slug: "sicurezza",
    description: "Componenti di sicurezza per impianti ascensoristici",
    icon: "Shield"
  },
  {
    name: "Pulsantiere",
    slug: "pulsantiere",
    description: "Pannelli di comando e pulsantiere per cabine ascensore",
    icon: "Keyboard"
  },
  {
    name: "Strutture e guide",
    slug: "strutture",
    description: "Guide, strutture e componenti meccanici per ascensori",
    icon: "Layers"
  }
];

const sampleProducts = [
  {
    code: "L0X-187",
    name: "Limitatore di Velocità Bidirezionale ø240mm",
    slug: "limitatore-velocita-bidirezionale-240mm",
    description: "Limitatore di velocità bidirezionale con diametro puleggia 240mm. Speed governor bi-directional per applicazioni ascensoristiche.",
    specifications: "Diametro puleggia: ø 240 mm\nVelocità nominale: configurabile\nCertificazione: CE",
    image: "speedGovernor",
    featured: true,
    categorySlug: "limitatori"
  },
  {
    code: "L0X-186",
    name: "Limitatore di Velocità Bidirezionale ø150mm",
    slug: "limitatore-velocita-bidirezionale-150mm",
    description: "Limitatore di velocità bidirezionale con diametro puleggia 150mm. Compact speed governor per spazi ridotti.",
    specifications: "Diametro puleggia: ø 150 mm\nVelocità nominale: configurabile\nCertificazione: CE",
    image: "speedGovernor",
    featured: true,
    categorySlug: "limitatori"
  },
  {
    code: "700052",
    name: "Connettore Tipo I per Striscia LED 220V AC",
    slug: "connettore-tipo-i-led-220v",
    description: "Connettore Tipo I per striscia LED 220V AC, larghezza 12mm, IP65, monocolore.",
    specifications: "Tensione: 220V AC\nLarghezza: 12mm\nProtezione: IP65\nTipo: Monocolore",
    image: "ledConnector",
    featured: false,
    categorySlug: "led"
  },
  {
    code: "700056",
    name: "Connettore Striscia LED 220V AC IP65",
    slug: "connettore-striscia-led-ip65",
    description: "Pin per connettore di striscia LED 220V AC SMD2835 IP65, larghezza 12mm, monocolore.",
    specifications: "Tensione: 220V AC\nTipo LED: SMD2835\nProtezione: IP65\nLarghezza: 12mm",
    image: "ledConnector",
    featured: false,
    categorySlug: "led"
  },
  {
    code: "700051",
    name: "Cavo Raddrizzatore per Striscia LED 220-240V",
    slug: "cavo-raddrizzatore-led-220v",
    description: "Cavo raddrizzatore per striscia LED 220-240V AC IP65, larghezza 12mm, certificazione CE, monocolore.",
    specifications: "Tensione: 220-240V AC\nProtezione: IP65\nLarghezza: 12mm\nCertificazione: CE",
    image: "ledConnector",
    featured: false,
    categorySlug: "led"
  },
  {
    code: "700053",
    name: "Tappo Terminale per Striscia LED 220V AC",
    slug: "tappo-terminale-led-220v",
    description: "Tappo terminale trasparente per striscia LED 220V AC IP65, larghezza 12mm.",
    specifications: "Tensione: 220V AC\nProtezione: IP65\nLarghezza: 12mm\nColore: Trasparente",
    image: "ledConnector",
    featured: false,
    categorySlug: "led"
  },
  {
    code: "OP-SLIM-01",
    name: "Operatore Porta Slim Apertura Laterale",
    slug: "operatore-porta-slim-laterale",
    description: "Nuovo operatore porta slim con apertura laterale. Design compatto per installazioni con spazio ridotto.",
    specifications: "Tipo apertura: Laterale\nAltezza soglia: 60mm\nMotore: Brushless DC",
    image: "doorOperator",
    featured: true,
    categorySlug: "operatori"
  },
  {
    code: "SUSP-SLIM-01",
    name: "Sospensione Slim per Operatore",
    slug: "sospensione-slim-operatore",
    description: "Sistema di sospensione slim per operatori porta. Profilo ridotto per massimizzare lo spazio cabina.",
    specifications: "Tipo: Sospensione slim\nMateriale: Alluminio anodizzato\nPortata: fino a 300kg",
    image: "doorOperator",
    featured: true,
    categorySlug: "operatori"
  },
  {
    code: "SB-001",
    name: "Freno di Sicurezza Progressivo",
    slug: "freno-sicurezza-progressivo",
    description: "Freno di sicurezza progressivo per cabine ascensore. Sistema affidabile per arresto controllato.",
    specifications: "Tipo: Progressivo\nCapacità: fino a 2000kg\nCertificazione: CE EN81-20",
    image: "speedGovernor",
    featured: true,
    categorySlug: "sicurezza"
  },
  {
    code: "COP-01",
    name: "Pulsantiera Cabina Standard",
    slug: "pulsantiera-cabina-standard",
    description: "Pulsantiera standard per cabina ascensore con pulsanti illuminati e display piano.",
    specifications: "Materiale: Acciaio inox\nPulsanti: LED\nDisplay: LCD 7 segmenti",
    image: "speedGovernor",
    featured: false,
    categorySlug: "pulsantiere"
  },
  {
    code: "GR-01",
    name: "Guida a Rullo per Cabina",
    slug: "guida-rullo-cabina",
    description: "Sistema di guide a rullo per cabine ascensore. Scorrimento silenzioso e manutenzione ridotta.",
    specifications: "Tipo: Rulli regolabili\nMateriale: Acciaio temperato\nPortata: fino a 1500kg",
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
    const insertedCategories = await db.insert(categories).values(sampleCategories).returning();
    console.log(`Inserted ${insertedCategories.length} categories`);

    const categoryMap = new Map(insertedCategories.map(c => [c.slug, c.id]));

    console.log("Seeding products...");
    const productsToInsert = sampleProducts.map(({ categorySlug, ...product }) => ({
      ...product,
      categoryId: categoryMap.get(categorySlug) || null
    }));
    
    const insertedProducts = await db.insert(products).values(productsToInsert).returning();
    console.log(`Inserted ${insertedProducts.length} products`);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seed().then(() => process.exit(0)).catch(() => process.exit(1));
