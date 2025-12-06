import { useParams, useLocation } from "wouter";
import { ChevronRight, ArrowRight, Check, Zap, Shield, Ruler } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import gearlessMotorImg from "@assets/generated_images/gearless_elevator_motor_system.png";
import platformLiftImg from "@assets/generated_images/accessibility_platform_lift.png";
import elevatorCabinImg from "@assets/generated_images/luxury_elevator_cabin_interior.png";
import glassElevatorImg from "@assets/generated_images/building_with_glass_elevator.png";

const impiantiData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  specs: { label: string; value: string }[];
  benefits: { title: string; description: string; icon: typeof Zap }[];
}> = {
  gearless: {
    title: "Systèmes Gearless MRL",
    subtitle: "Technologie sans local machine",
    description: "Les systèmes Gearless MRL (Machine Room Less) représentent l'évolution technologique dans le secteur des ascenseurs. Grâce à l'absence du local machine traditionnel, ils offrent une plus grande flexibilité d'installation et des économies d'énergie significatives.",
    image: gearlessMotorImg,
    features: [
      "Moteur gearless à haute efficacité",
      "Aucun local machine requis",
      "Économie d'énergie jusqu'à 50%",
      "Fonctionnement silencieux",
      "Maintenance réduite",
      "Conformité normative EN81-20/50"
    ],
    specs: [
      { label: "Charge", value: "320 - 2000 kg" },
      { label: "Vitesse", value: "0.5 - 2.5 m/s" },
      { label: "Course maximale", value: "100 m" },
      { label: "Arrêts", value: "jusqu'à 40" }
    ],
    benefits: [
      {
        title: "Efficacité Énergétique",
        description: "Moteurs à aimants permanents avec classe énergétique A, régénération d'énergie au freinage.",
        icon: Zap
      },
      {
        title: "Sécurité Avancée",
        description: "Systèmes de sécurité multiples, freins redondants et contrôle électronique.",
        icon: Shield
      },
      {
        title: "Espace Optimisé",
        description: "Tête et fosse réduites, aucun local machine, maximisation de l'espace utile.",
        icon: Ruler
      }
    ]
  },
  piattaforme: {
    title: "Plateformes Élévatrices",
    subtitle: "Accessibilité sans barrières",
    description: "Les plateformes élévatrices pour personnes handicapées sont conçues pour garantir l'accessibilité et l'autonomie. Solutions polyvalentes pour franchir les dénivelés dans les bâtiments publics et privés, conformes aux normes sur la suppression des barrières architecturales.",
    image: platformLiftImg,
    features: [
      "Installation intérieure et extérieure",
      "Structure autoportante optionnelle",
      "Commandes intuitives et accessibles",
      "Cellules photoélectriques de sécurité",
      "Batterie de secours",
      "Conformité DM 236/89"
    ],
    specs: [
      { label: "Charge", value: "250 - 400 kg" },
      { label: "Vitesse", value: "0.15 m/s" },
      { label: "Course maximale", value: "12 m" },
      { label: "Dimensions", value: "personnalisables" }
    ],
    benefits: [
      {
        title: "Accessibilité Garantie",
        description: "Conçues pour les personnes à mobilité réduite, fauteuils roulants et déambulateurs.",
        icon: Shield
      },
      {
        title: "Installation Flexible",
        description: "Adaptables à tout contexte architectural, intérieur ou extérieur.",
        icon: Ruler
      },
      {
        title: "Fonctionnement Sécurisé",
        description: "Systèmes de sécurité multiples et batterie de secours intégrée.",
        icon: Zap
      }
    ]
  },
  "su-misura": {
    title: "Ascenseurs sur Mesure",
    subtitle: "Personnalisation totale",
    description: "Nous réalisons des ascenseurs entièrement personnalisés pour répondre à tous les besoins architecturaux et stylistiques. Du design de la cabine aux finitions, chaque détail est étudié pour s'intégrer parfaitement à l'environnement.",
    image: elevatorCabinImg,
    features: [
      "Design cabine personnalisé",
      "Finitions premium sur demande",
      "Éclairage LED réglable",
      "Panneaux écran tactile",
      "Matériaux durables",
      "Intégration domotique"
    ],
    specs: [
      { label: "Configuration", value: "entièrement personnalisable" },
      { label: "Matériaux", value: "acier, verre, bois, pierre" },
      { label: "Éclairage", value: "LED RGB dynamique" },
      { label: "Contrôle", value: "écran tactile, app mobile" }
    ],
    benefits: [
      {
        title: "Design Exclusif",
        description: "Chaque ascenseur est une pièce unique, conçue pour vos besoins spécifiques.",
        icon: Ruler
      },
      {
        title: "Matériaux Premium",
        description: "Uniquement des matériaux de haute qualité pour des finitions élégantes et durables.",
        icon: Shield
      },
      {
        title: "Technologie Smart",
        description: "Intégration avec systèmes domotiques et contrôle depuis smartphone.",
        icon: Zap
      }
    ]
  }
};

export default function Installations() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const impiantoSlug = params.slug || "gearless";
  const impianto = impiantiData[impiantoSlug] || impiantiData.gearless;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <button
                onClick={() => setLocation("/")}
                className="hover:text-foreground cursor-pointer"
              >
                Home
              </button>
              <ChevronRight className="h-4 w-4" />
              <button
                onClick={() => setLocation("/impianti")}
                className="hover:text-foreground cursor-pointer"
              >
                Installations
              </button>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{impianto.title}</span>
            </div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              {impianto.subtitle}
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold">{impianto.title}</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            <div>
              <p className="text-lg text-muted-foreground mb-6">
                {impianto.description}
              </p>
              <ul className="space-y-3 mb-8">
                {impianto.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={() => setLocation("/contatti?subject=quote")}
                  data-testid="button-request-quote"
                >
                  Demander un devis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setLocation("/configuratore-ascensore")}
                  data-testid="button-configure"
                >
                  Configurer en ligne
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={impianto.image}
                  alt={impianto.title}
                  className="w-full h-full object-cover"
                  data-testid="img-impianto-main"
                />
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">
              Spécifications Techniques
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {impianto.specs.map((spec, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">{spec.label}</p>
                    <p className="text-lg font-bold text-primary">{spec.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">
              Avantages Principaux
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {impianto.benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {Object.entries(impiantiData).map(([slug, imp]) => (
              <Card
                key={slug}
                className={`h-full hover-elevate cursor-pointer overflow-visible ${impiantoSlug === slug ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setLocation(`/impianti/${slug}`)}
              >
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{imp.title}</h3>
                  <p className="text-sm text-muted-foreground">{imp.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
