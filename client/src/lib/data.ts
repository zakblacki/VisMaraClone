import type { HeroSlide, ServiceCard, FeatureItem, NavItem, Product, Category } from "@shared/schema";

// Hero Carousel Slides
export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "NUOVI LIMITATORI DI VELOCITÀ BIDIREZIONALI",
    subtitle: "FRATELLI VISMARA SRL",
    description: "Fratelli Vismara, progetta in sicurezza impianti per ascensori – ascensori su misura – Ascensori Milano – MRL – Impianti Gearless standard – produzione ricambi e componenti per ascensori – piattaforme elettriche elevatrici ed elevatori per disabili",
    image: "speedGovernor",
    ctaText: "Scopri di più",
    ctaLink: "/prodotti/limitatori",
    secondaryCta: {
      text: "Configura la cabina",
      link: "/configuratore-ascensore"
    }
  },
  {
    id: 2,
    title: "NUOVI OPERATORI E SOSPENSIONI SLIM",
    subtitle: "APERTURA LATERALE",
    description: "Fratelli Vismara, progetta in sicurezza impianti per ascensori – ascensori su misura – Ascensori Milano – MRL – Impianti Gearless standard – produzione ricambi e componenti per ascensori – piattaforme elettriche elevatrici ed elevatori per disabili",
    image: "doorOperator",
    ctaText: "Richiedi informazioni",
    ctaLink: "/contatti",
    secondaryCta: {
      text: "Scarica il catalogo",
      link: "/download"
    }
  },
  {
    id: 3,
    title: "ELEVARSI VERSO IL FUTURO",
    subtitle: "ASCENSORI E COMPONENTI",
    description: "Fratelli Vismara, progetta in sicurezza impianti per ascensori – ascensori su misura – Ascensori Milano – MRL – Impianti Gearless standard – produzione ricambi e componenti per ascensori – piattaforme elettriche elevatrici ed elevatori per disabili",
    image: "elevatorCabin",
    ctaText: "Richiedi informazioni",
    ctaLink: "/contatti",
    secondaryCta: {
      text: "Configura il tuo ascensore",
      link: "/configuratore-ascensore"
    }
  }
];

// Service Cards
export const serviceCards: ServiceCard[] = [
  {
    id: 1,
    title: "Sviluppo e progettazione",
    description: "La progettazione di un ascensore è frutto di attenta analisi e creatività, dove forme, funzionalità ed estetica si fondono armoniosamente.",
    icon: "Compass",
    link: "/servizi/progettazione"
  },
  {
    id: 2,
    title: "Servizi di attrezzeria",
    description: "I servizi di attrezzeria e tranciatura offrono soluzioni precise e personalizzate per ogni esigenza produttiva.",
    icon: "Wrench",
    link: "/servizi/attrezzeria"
  },
  {
    id: 3,
    title: "Tranciatura e stampaggi",
    description: "I servizi di tranciatura e stampaggi offrono soluzioni versatili ed efficienti per la produzione di componenti.",
    icon: "Cog",
    link: "/servizi/stampaggi"
  },
  {
    id: 4,
    title: "Componenti e ricambi",
    description: "Il nostro catalogo di componenti per ascensori è un tesoro di soluzioni, con una vasta gamma di prodotti.",
    icon: "Package",
    link: "/catalogo"
  }
];

// Features for "Why Choose Us" section
export const features: FeatureItem[] = [
  {
    id: 1,
    title: "Collaborazione",
    description: "In un'azienda di successo, la forza di un team è inestimabile. Un insieme di individui che collaborano in modo encomiabile. Con competenze complementari e obiettivi condivisi, sono in grado di raggiungere risultati straordinari.",
    icon: "Users"
  },
  {
    id: 2,
    title: "Efficienza",
    description: "Processi innovativi e materiali di qualità contribuiscono a ridurre i tempi di produzione. L'automazione intelligente e l'attenzione ai dettagli massimizzano l'efficienza, migliorando gli ascensori nel complesso.",
    icon: "Zap"
  },
  {
    id: 3,
    title: "Progresso",
    description: "Il progresso tecnologico nella produzione di ascensori ha rivoluzionato l'industria, rendendo questi dispositivi sempre più efficienti, sicuri e convenienti.",
    icon: "TrendingUp"
  },
  {
    id: 4,
    title: "Rispetto dei tempi",
    description: "L'efficienza e la tempestività sono elementi chiave. Il rispetto dei tempi permette di soddisfare le aspettative dei clienti, offrendo prodotti di qualità e un servizio eccellente.",
    icon: "Clock"
  }
];

// Navigation Items
export const navItems: NavItem[] = [
  {
    label: "Prodotti",
    href: "/catalogo",
    children: [
      { label: "Limitatori di velocità", href: "/catalogo/limitatori" },
      { label: "Operatori porta", href: "/catalogo/operatori" },
      { label: "Componenti LED", href: "/catalogo/led" },
      { label: "Sistemi di sicurezza", href: "/catalogo/sicurezza" },
      { label: "Tutti i prodotti", href: "/catalogo" }
    ]
  },
  {
    label: "Impianti",
    href: "/impianti",
    children: [
      { label: "Ascensori Gearless MRL", href: "/impianti/gearless" },
      { label: "Piattaforme elevatrici", href: "/impianti/piattaforme" },
      { label: "Ascensori su misura", href: "/impianti/su-misura" }
    ]
  },
  {
    label: "Servizi",
    href: "/servizi",
    children: [
      { label: "Progettazione", href: "/servizi/progettazione" },
      { label: "Attrezzeria", href: "/servizi/attrezzeria" },
      { label: "Tranciatura e stampaggi", href: "/servizi/stampaggi" }
    ]
  },
  {
    label: "Configuratori",
    href: "/configuratori",
    children: [
      { label: "Configura ascensore", href: "/configuratore-ascensore" },
      { label: "Configura piattaforma", href: "/configuratore-piattaforma" }
    ]
  },
  {
    label: "Download",
    href: "/download"
  },
  {
    label: "Contatti",
    href: "/contatti"
  }
];

// Company Information
export const companyInfo = {
  name: "Fratelli Vismara Srl",
  phone: "+39 039 278 1193",
  email: "info@fratellivismara.it",
  address: "Via Padre Semeria, 12",
  city: "20851 Lissone (MB)",
  country: "Italia",
  vatNumber: "IT00123456789",
  socialMedia: {
    linkedin: "https://linkedin.com/company/fratelli-vismara",
    facebook: "https://facebook.com/fratellivismara",
    instagram: "https://instagram.com/fratellivismara"
  }
};

// Sample Products Data
export const sampleProducts: Omit<Product, "id">[] = [
  {
    code: "L0X-187",
    name: "Limitatore di Velocità Bidirezionale ø240mm",
    slug: "limitatore-velocita-bidirezionale-240mm",
    description: "Limitatore di velocità bidirezionale con diametro puleggia 240mm. Speed governor bi-directional per applicazioni ascensoristiche.",
    specifications: "Diametro puleggia: ø 240 mm\nVelocità nominale: configurabile\nCertificazione: CE",
    categoryId: null,
    image: "speedGovernor",
    featured: true
  },
  {
    code: "L0X-186",
    name: "Limitatore di Velocità Bidirezionale ø150mm",
    slug: "limitatore-velocita-bidirezionale-150mm",
    description: "Limitatore di velocità bidirezionale con diametro puleggia 150mm. Compact speed governor per spazi ridotti.",
    specifications: "Diametro puleggia: ø 150 mm\nVelocità nominale: configurabile\nCertificazione: CE",
    categoryId: null,
    image: "speedGovernor",
    featured: true
  },
  {
    code: "700052",
    name: "Connettore Tipo I per Striscia LED 220V AC",
    slug: "connettore-tipo-i-led-220v",
    description: "Connettore Tipo I per striscia LED 220V AC, larghezza 12mm, IP65, monocolore.",
    specifications: "Tensione: 220V AC\nLarghezza: 12mm\nProtezione: IP65\nTipo: Monocolore",
    categoryId: null,
    image: "ledConnector",
    featured: false
  },
  {
    code: "700056",
    name: "Connettore Striscia LED 220V AC IP65",
    slug: "connettore-striscia-led-ip65",
    description: "Pin per connettore di striscia LED 220V AC SMD2835 IP65, larghezza 12mm, monocolore.",
    specifications: "Tensione: 220V AC\nTipo LED: SMD2835\nProtezione: IP65\nLarghezza: 12mm",
    categoryId: null,
    image: "ledConnector",
    featured: false
  },
  {
    code: "700051",
    name: "Cavo Raddrizzatore per Striscia LED 220-240V",
    slug: "cavo-raddrizzatore-led-220v",
    description: "Cavo raddrizzatore per striscia LED 220-240V AC IP65, larghezza 12mm, certificazione CE, monocolore.",
    specifications: "Tensione: 220-240V AC\nProtezione: IP65\nLarghezza: 12mm\nCertificazione: CE",
    categoryId: null,
    image: "ledConnector",
    featured: false
  },
  {
    code: "700053",
    name: "Tappo Terminale per Striscia LED 220V AC",
    slug: "tappo-terminale-led-220v",
    description: "Tappo terminale trasparente per striscia LED 220V AC IP65, larghezza 12mm.",
    specifications: "Tensione: 220V AC\nProtezione: IP65\nLarghezza: 12mm\nColore: Trasparente",
    categoryId: null,
    image: "ledConnector",
    featured: false
  },
  {
    code: "OP-SLIM-01",
    name: "Operatore Porta Slim Apertura Laterale",
    slug: "operatore-porta-slim-laterale",
    description: "Nuovo operatore porta slim con apertura laterale. Design compatto per installazioni con spazio ridotto.",
    specifications: "Tipo apertura: Laterale\nAltezza soglia: 60mm\nMotore: Brushless DC",
    categoryId: null,
    image: "doorOperator",
    featured: true
  },
  {
    code: "SUSP-SLIM-01",
    name: "Sospensione Slim per Operatore",
    slug: "sospensione-slim-operatore",
    description: "Sistema di sospensione slim per operatori porta. Profilo ridotto per massimizzare lo spazio cabina.",
    specifications: "Tipo: Sospensione slim\nMateriale: Alluminio anodizzato\nPortata: fino a 300kg",
    categoryId: null,
    image: "doorOperator",
    featured: true
  }
];

// Sample Categories
export const sampleCategories: Omit<Category, "id">[] = [
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

// Elevator Configurator Options
export const elevatorConfigOptions = {
  cabinTypes: [
    { id: "standard", name: "Standard", description: "Cabina standard per edifici residenziali" },
    { id: "panoramic", name: "Panoramica", description: "Cabina con pareti in vetro" },
    { id: "freight", name: "Montacarichi", description: "Per trasporto merci" },
    { id: "hospital", name: "Ospedaliero", description: "Dimensioni maggiorate per barelle" }
  ],
  capacities: [
    { id: "4", name: "4 persone", kg: 320 },
    { id: "6", name: "6 persone", kg: 480 },
    { id: "8", name: "8 persone", kg: 630 },
    { id: "10", name: "10 persone", kg: 800 },
    { id: "13", name: "13 persone", kg: 1000 },
    { id: "16", name: "16 persone", kg: 1275 }
  ],
  doorTypes: [
    { id: "telescopic-2", name: "Telescopica 2 ante", description: "Apertura laterale" },
    { id: "telescopic-3", name: "Telescopica 3 ante", description: "Per passaggi ampi" },
    { id: "central-2", name: "Centrale 2 ante", description: "Apertura centrale" },
    { id: "central-4", name: "Centrale 4 ante", description: "Apertura rapida" }
  ],
  finishMaterials: [
    { id: "stainless-satin", name: "Acciaio inox satinato" },
    { id: "stainless-mirror", name: "Acciaio inox specchio" },
    { id: "laminate-wood", name: "Laminato effetto legno" },
    { id: "laminate-stone", name: "Laminato effetto pietra" },
    { id: "glass", name: "Vetro temperato" },
    { id: "custom", name: "Personalizzato" }
  ],
  lighting: [
    { id: "led-ceiling", name: "LED soffitto", description: "Illuminazione diffusa" },
    { id: "led-strips", name: "Strisce LED", description: "Illuminazione perimetrale" },
    { id: "spots", name: "Faretti", description: "Illuminazione puntuale" },
    { id: "backlit", name: "Retroilluminato", description: "Pannelli luminosi" }
  ],
  controlPanels: [
    { id: "standard", name: "Standard", description: "Pulsantiera base" },
    { id: "touch", name: "Touch screen", description: "Display interattivo" },
    { id: "premium", name: "Premium", description: "Finitura di pregio" }
  ]
};

// Platform Configurator Options
export const platformConfigOptions = {
  platformTypes: [
    { id: "vertical", name: "Piattaforma verticale", description: "Per superare dislivelli" },
    { id: "inclined", name: "Servoscala inclinato", description: "Segue la scala" },
    { id: "cabin", name: "Miniascensore", description: "Con cabina chiusa" }
  ],
  capacities: [
    { id: "250", name: "250 kg", description: "1 persona + carrozzina" },
    { id: "315", name: "315 kg", description: "1-2 persone" },
    { id: "400", name: "400 kg", description: "2 persone + carrozzina" }
  ],
  travelHeights: [
    { id: "1", name: "Fino a 1 metro" },
    { id: "3", name: "Fino a 3 metri" },
    { id: "6", name: "Fino a 6 metri" },
    { id: "12", name: "Fino a 12 metri" }
  ],
  rampTypes: [
    { id: "manual", name: "Rampa manuale", description: "Apertura manuale" },
    { id: "automatic", name: "Rampa automatica", description: "Apertura motorizzata" },
    { id: "none", name: "Senza rampa", description: "Accesso a livello" }
  ],
  safetyFeatures: [
    { id: "photocells", name: "Fotocellule" },
    { id: "emergency-stop", name: "Arresto di emergenza" },
    { id: "overload", name: "Sensore sovraccarico" },
    { id: "battery-backup", name: "Batteria di emergenza" },
    { id: "intercom", name: "Interfono" }
  ]
};
