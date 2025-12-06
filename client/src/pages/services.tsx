import { useParams, useLocation } from "wouter";
import { ChevronRight, ArrowRight, Check } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import manufacturingImg from "@assets/generated_images/elevator_manufacturing_facility.png";
import stampingImg from "@assets/generated_images/metal_stamping_machinery.png";
import cadImg from "@assets/generated_images/elevator_cad_design_screen.png";

const servicesData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  benefits: { title: string; description: string }[];
}> = {
  progettazione: {
    title: "Développement et Conception",
    subtitle: "Innovation et Design",
    description: "La conception d'un ascenseur est le fruit d'une analyse attentive et de créativité, où formes, fonctionnalités et esthétique se fondent harmonieusement. Notre équipe d'ingénieurs et de designers travaille pour créer des solutions sur mesure qui respectent les normes les plus rigoureuses.",
    image: cadImg,
    features: [
      "Conception CAO 3D avancée",
      "Analyse structurelle FEM",
      "Personnalisation complète",
      "Conformité normative CE",
      "Assistance technique dédiée"
    ],
    benefits: [
      {
        title: "Solutions sur mesure",
        description: "Chaque projet est unique et est développé selon les besoins spécifiques du client."
      },
      {
        title: "Technologie avancée",
        description: "Nous utilisons des logiciels de dernière génération pour les simulations et l'optimisation."
      },
      {
        title: "Expérience consolidée",
        description: "Plus de 50 ans d'expérience dans le secteur des ascenseurs."
      }
    ]
  },
  attrezzeria: {
    title: "Services d'Outillage",
    subtitle: "Précision et Qualité",
    description: "Les services d'outillage offrent des solutions précises et personnalisées pour chaque besoin de production. De la conception à la réalisation de moules et équipements, nous garantissons qualité et précision à chaque étape.",
    image: manufacturingImg,
    features: [
      "Construction de moules progressifs",
      "Équipements de découpe",
      "Masques de soudage",
      "Calibres de contrôle",
      "Maintenance des moules"
    ],
    benefits: [
      {
        title: "Qualité certifiée",
        description: "Tous nos moules sont réalisés avec des matériaux de premier choix et soumis à des contrôles rigoureux."
      },
      {
        title: "Délais rapides",
        description: "Grâce à notre organisation interne, nous garantissons des délais de livraison compétitifs."
      },
      {
        title: "Assistance complète",
        description: "Nous offrons des services de maintenance et de révision pour prolonger la vie des moules."
      }
    ]
  },
  stampaggi: {
    title: "Découpe et Emboutissage",
    subtitle: "Production Industrielle",
    description: "Les services de découpe et d'emboutissage offrent des solutions polyvalentes et efficaces pour la production de composants métalliques. Nous disposons de presses de différents tonnages pour satisfaire tous les besoins de production.",
    image: stampingImg,
    features: [
      "Découpe fine",
      "Emboutissage profond",
      "Pliage de précision",
      "Assemblage de composants",
      "Traitements de surface"
    ],
    benefits: [
      {
        title: "Capacité de production",
        description: "Parc machines moderne avec presses de 25 à 400 tonnes."
      },
      {
        title: "Flexibilité",
        description: "Productions du prototype à la grande série avec la même qualité."
      },
      {
        title: "Contrôle qualité",
        description: "Système de gestion de la qualité certifié ISO 9001."
      }
    ]
  }
};

export default function Services() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const serviceSlug = params.slug || "progettazione";
  const service = servicesData[serviceSlug] || servicesData.progettazione;

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
                onClick={() => setLocation("/services")}
                className="hover:text-foreground cursor-pointer"
              >
                Prestations
              </button>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{service.title}</span>
            </div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              {service.subtitle}
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold">{service.title}</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            <div>
              <p className="text-lg text-muted-foreground mb-6">
                {service.description}
              </p>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                onClick={() => setLocation("/contact")}
                data-testid="button-contact-service"
              >
                Demander des informations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  data-testid="img-service-main"
                />
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">
              Les avantages de notre service
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {service.benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-primary">{index + 1}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {Object.entries(servicesData).map(([slug, svc]) => (
              <Card
                key={slug}
                className={`h-full hover-elevate cursor-pointer overflow-visible ${serviceSlug === slug ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setLocation(`/services/${slug}`)}
              >
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{svc.title}</h3>
                  <p className="text-sm text-muted-foreground">{svc.subtitle}</p>
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
