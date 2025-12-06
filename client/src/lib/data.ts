import type { HeroSlide, ServiceCard, FeatureItem, NavItem, Product, Category } from "@shared/schema";

// Hero Carousel Slides
export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "NOUVEAUX LIMITEURS DE VITESSE BIDIRECTIONNELS",
    subtitle: "Prodlift",
    description: "Prodlift, conçoit en toute sécurité des systèmes d'ascenseurs – ascenseurs sur mesure – Ascenseurs Alger – MRL – Systèmes Gearless standard – production de pièces de rechange et composants pour ascenseurs – plateformes élévatrices électriques et élévateurs pour personnes handicapées",
    image: "speedGovernor",
    ctaText: "En savoir plus",
    ctaLink: "/prodotti/limitatori",
    secondaryCta: {
      text: "Configurer la cabine",
      link: "/configuratore-ascensore"
    }
  },
  {
    id: 2,
    title: "NOUVEAUX OPÉRATEURS ET SUSPENSIONS SLIM",
    subtitle: "OUVERTURE LATÉRALE",
    description: "Prodlift, conçoit en toute sécurité des systèmes d'ascenseurs – ascenseurs sur mesure – Ascenseurs Alger – MRL – Systèmes Gearless standard – production de pièces de rechange et composants pour ascenseurs – plateformes élévatrices électriques et élévateurs pour personnes handicapées",
    image: "doorOperator",
    ctaText: "Demander des informations",
    ctaLink: "/contatti",
    secondaryCta: {
      text: "Télécharger le catalogue",
      link: "/download"
    }
  },
  {
    id: 3,
    title: "S'ÉLEVER VERS LE FUTUR",
    subtitle: "ASCENSEURS ET COMPOSANTS",
    description: "Prodlift, conçoit en toute sécurité des systèmes d'ascenseurs – ascenseurs sur mesure – Ascenseurs Alger – MRL – Systèmes Gearless standard – production de pièces de rechange et composants pour ascenseurs – plateformes élévatrices électriques et élévateurs pour personnes handicapées",
    image: "elevatorCabin",
    ctaText: "Demander des informations",
    ctaLink: "/contatti",
    secondaryCta: {
      text: "Configurer votre ascenseur",
      link: "/configuratore-ascensore"
    }
  }
];

// Service Cards
export const serviceCards: ServiceCard[] = [
  {
    id: 1,
    title: "Développement et conception",
    description: "La conception d'un ascenseur est le fruit d'une analyse minutieuse et de créativité, où formes, fonctionnalité et esthétique se fondent harmonieusement.",
    icon: "Compass",
    link: "/servizi/progettazione"
  },
  {
    id: 2,
    title: "Services d'outillage",
    description: "Les services d'outillage et de découpage offrent des solutions précises et personnalisées pour chaque exigence de production.",
    icon: "Wrench",
    link: "/servizi/attrezzeria"
  },
  {
    id: 3,
    title: "Découpage et moulage",
    description: "Les services de découpage et de moulage offrent des solutions polyvalentes et efficaces pour la production de composants.",
    icon: "Cog",
    link: "/servizi/stampaggi"
  },
  {
    id: 4,
    title: "Composants et pièces de rechange",
    description: "Notre catalogue de composants pour ascenseurs est un trésor de solutions, avec une vaste gamme de produits.",
    icon: "Package",
    link: "/catalogo"
  }
];

// Features for "Why Choose Us" section
export const features: FeatureItem[] = [
  {
    id: 1,
    title: "Collaboration",
    description: "Dans une entreprise prospère, la force d'une équipe est inestimable. Un ensemble d'individus qui collaborent de manière louable. Avec des compétences complémentaires et des objectifs partagés, ils sont capables d'atteindre des résultats extraordinaires.",
    icon: "Users"
  },
  {
    id: 2,
    title: "Efficacité",
    description: "Des processus innovants et des matériaux de qualité contribuent à réduire les temps de production. L'automatisation intelligente et l'attention aux détails maximisent l'efficacité, améliorant les ascenseurs dans leur ensemble.",
    icon: "Zap"
  },
  {
    id: 3,
    title: "Progrès",
    description: "Le progrès technologique dans la production d'ascenseurs a révolutionné l'industrie, rendant ces dispositifs de plus en plus efficaces, sûrs et pratiques.",
    icon: "TrendingUp"
  },
  {
    id: 4,
    title: "Respect des délais",
    description: "L'efficacité et la rapidité sont des éléments clés. Le respect des délais permet de satisfaire les attentes des clients, offrant des produits de qualité et un excellent service.",
    icon: "Clock"
  }
];

// Navigation Items
export const navItems: NavItem[] = [
  {
    label: "Produits",
    href: "/catalogo",
    children: [
      { label: "Limiteurs de vitesse", href: "/catalogo/limitatori" },
      { label: "Opérateurs de porte", href: "/catalogo/operatori" },
      { label: "Composants LED", href: "/catalogo/led" },
      { label: "Systèmes de sécurité", href: "/catalogo/sicurezza" },
      { label: "Tous les produits", href: "/catalogo" }
    ]
  },
  {
    label: "Installations",
    href: "/impianti",
    children: [
      { label: "Ascenseurs Gearless MRL", href: "/impianti/gearless" },
      { label: "Plateformes élévatrices", href: "/impianti/piattaforme" },
      { label: "Ascenseurs sur mesure", href: "/impianti/su-misura" }
    ]
  },
  {
    label: "Services",
    href: "/servizi",
    children: [
      { label: "Conception", href: "/servizi/progettazione" },
      { label: "Outillage", href: "/servizi/attrezzeria" },
      { label: "Découpage et moulage", href: "/servizi/stampaggi" }
    ]
  },
  {
    label: "Configurateurs",
    href: "/configuratori",
    children: [
      { label: "Configurer ascenseur", href: "/configuratore-ascensore" },
      { label: "Configurer plateforme", href: "/configuratore-piattaforma" }
    ]
  },
  {
    label: "Téléchargement",
    href: "/download"
  },
  {
    label: "Contacts",
    href: "/contatti"
  }
];

// Company Information
export const companyInfo = {
  name: "Prodlift",
  phone: "0770 52 54 64",
  phone2: "0770 25 77 77",
  email: "prodlift.dc@gmail.com",
  address: "P6F9+F88",
  city: "Dar El Beïda",
  country: "Algérie",
  vatNumber: "DZ00123456789",
  socialMedia: {
    linkedin: "https://linkedin.com/company/prodlift",
    facebook: "https://www.facebook.com/profile.php?id=61584695818350",
    instagram: "https://instagram.com/prodlift"
  }
};

// Sample Products Data
export const sampleProducts: Omit<Product, "id">[] = [
  {
    code: "L0X-187",
    name: "Limiteur de Vitesse Bidirectionnel ø240mm",
    slug: "limitatore-velocita-bidirezionale-240mm",
    description: "Limiteur de vitesse bidirectionnel avec diamètre de poulie 240mm. Speed governor bi-directional pour applications d'ascenseurs.",
    specifications: "Diamètre poulie: ø 240 mm\nVitesse nominale: configurable\nCertification: CE",
    categoryId: null,
    image: "speedGovernor",
    featured: true
  },
  {
    code: "L0X-186",
    name: "Limiteur de Vitesse Bidirectionnel ø150mm",
    slug: "limitatore-velocita-bidirezionale-150mm",
    description: "Limiteur de vitesse bidirectionnel avec diamètre de poulie 150mm. Compact speed governor pour espaces réduits.",
    specifications: "Diamètre poulie: ø 150 mm\nVitesse nominale: configurable\nCertification: CE",
    categoryId: null,
    image: "speedGovernor",
    featured: true
  },
  {
    code: "700052",
    name: "Connecteur Type I pour Bande LED 220V AC",
    slug: "connettore-tipo-i-led-220v",
    description: "Connecteur Type I pour bande LED 220V AC, largeur 12mm, IP65, monochrome.",
    specifications: "Tension: 220V AC\nLargeur: 12mm\nProtection: IP65\nType: Monochrome",
    categoryId: null,
    image: "ledConnector",
    featured: false
  },
  {
    code: "700056",
    name: "Connecteur Bande LED 220V AC IP65",
    slug: "connettore-striscia-led-ip65",
    description: "Pin pour connecteur de bande LED 220V AC SMD2835 IP65, largeur 12mm, monochrome.",
    specifications: "Tension: 220V AC\nType LED: SMD2835\nProtection: IP65\nLargeur: 12mm",
    categoryId: null,
    image: "ledConnector",
    featured: false
  },
  {
    code: "700051",
    name: "Câble Redresseur pour Bande LED 220-240V",
    slug: "cavo-raddrizzatore-led-220v",
    description: "Câble redresseur pour bande LED 220-240V AC IP65, largeur 12mm, certification CE, monochrome.",
    specifications: "Tension: 220-240V AC\nProtection: IP65\nLargeur: 12mm\nCertification: CE",
    categoryId: null,
    image: "ledConnector",
    featured: false
  },
  {
    code: "700053",
    name: "Bouchon Terminal pour Bande LED 220V AC",
    slug: "tappo-terminale-led-220v",
    description: "Bouchon terminal transparent pour bande LED 220V AC IP65, largeur 12mm.",
    specifications: "Tension: 220V AC\nProtection: IP65\nLargeur: 12mm\nCouleur: Transparent",
    categoryId: null,
    image: "ledConnector",
    featured: false
  },
  {
    code: "OP-SLIM-01",
    name: "Opérateur Porte Slim Ouverture Latérale",
    slug: "operatore-porta-slim-laterale",
    description: "Nouvel opérateur porte slim avec ouverture latérale. Design compact pour installations avec espace réduit.",
    specifications: "Type ouverture: Latérale\nHauteur seuil: 60mm\nMoteur: Brushless DC",
    categoryId: null,
    image: "doorOperator",
    featured: true
  },
  {
    code: "SUSP-SLIM-01",
    name: "Suspension Slim pour Opérateur",
    slug: "sospensione-slim-operatore",
    description: "Système de suspension slim pour opérateurs de porte. Profil réduit pour maximiser l'espace cabine.",
    specifications: "Type: Suspension slim\nMatériau: Aluminium anodisé\nCharge: jusqu'à 300kg",
    categoryId: null,
    image: "doorOperator",
    featured: true
  }
];

// Sample Categories
export const sampleCategories: Omit<Category, "id">[] = [
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

// Elevator Configurator Options
export const elevatorConfigOptions = {
  cabinTypes: [
    { id: "standard", name: "Standard", description: "Cabine standard pour bâtiments résidentiels" },
    { id: "panoramic", name: "Panoramique", description: "Cabine avec parois en verre" },
    { id: "freight", name: "Monte-charge", description: "Pour transport de marchandises" },
    { id: "hospital", name: "Hospitalier", description: "Dimensions majorées pour brancards" }
  ],
  capacities: [
    { id: "4", name: "4 personnes", kg: 320 },
    { id: "6", name: "6 personnes", kg: 480 },
    { id: "8", name: "8 personnes", kg: 630 },
    { id: "10", name: "10 personnes", kg: 800 },
    { id: "13", name: "13 personnes", kg: 1000 },
    { id: "16", name: "16 personnes", kg: 1275 }
  ],
  doorTypes: [
    { id: "telescopic-2", name: "Télescopique 2 vantaux", description: "Ouverture latérale" },
    { id: "telescopic-3", name: "Télescopique 3 vantaux", description: "Pour passages larges" },
    { id: "central-2", name: "Centrale 2 vantaux", description: "Ouverture centrale" },
    { id: "central-4", name: "Centrale 4 vantaux", description: "Ouverture rapide" }
  ],
  finishMaterials: [
    { id: "stainless-satin", name: "Acier inox satiné" },
    { id: "stainless-mirror", name: "Acier inox miroir" },
    { id: "laminate-wood", name: "Stratifié effet bois" },
    { id: "laminate-stone", name: "Stratifié effet pierre" },
    { id: "glass", name: "Verre trempé" },
    { id: "custom", name: "Personnalisé" }
  ],
  lighting: [
    { id: "led-ceiling", name: "LED plafond", description: "Éclairage diffus" },
    { id: "led-strips", name: "Bandes LED", description: "Éclairage périmétrique" },
    { id: "spots", name: "Spots", description: "Éclairage ponctuel" },
    { id: "backlit", name: "Rétroéclairé", description: "Panneaux lumineux" }
  ],
  controlPanels: [
    { id: "standard", name: "Standard", description: "Panneau de base" },
    { id: "touch", name: "Écran tactile", description: "Affichage interactif" },
    { id: "premium", name: "Premium", description: "Finition de prestige" }
  ]
};

// Platform Configurator Options
export const platformConfigOptions = {
  platformTypes: [
    { id: "vertical", name: "Plateforme verticale", description: "Pour franchir des dénivelés" },
    { id: "inclined", name: "Servoscala incliné", description: "Suit l'escalier" },
    { id: "cabin", name: "Mini-ascenseur", description: "Avec cabine fermée" }
  ],
  capacities: [
    { id: "250", name: "250 kg", description: "1 personne + fauteuil roulant" },
    { id: "315", name: "315 kg", description: "1-2 personnes" },
    { id: "400", name: "400 kg", description: "2 personnes + fauteuil roulant" }
  ],
  travelHeights: [
    { id: "1", name: "Jusqu'à 1 mètre" },
    { id: "3", name: "Jusqu'à 3 mètres" },
    { id: "6", name: "Jusqu'à 6 mètres" },
    { id: "12", name: "Jusqu'à 12 mètres" }
  ],
  rampTypes: [
    { id: "manual", name: "Rampe manuelle", description: "Ouverture manuelle" },
    { id: "automatic", name: "Rampe automatique", description: "Ouverture motorisée" },
    { id: "none", name: "Sans rampe", description: "Accès au niveau" }
  ],
  safetyFeatures: [
    { id: "photocells", name: "Photocellules" },
    { id: "emergency-stop", name: "Arrêt d'urgence" },
    { id: "overload", name: "Capteur de surcharge" },
    { id: "battery-backup", name: "Batterie de secours" },
    { id: "intercom", name: "Interphone" }
  ]
};
