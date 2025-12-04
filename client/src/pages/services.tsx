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
    title: "Sviluppo e Progettazione",
    subtitle: "Innovazione e Design",
    description: "La progettazione di un ascensore è frutto di attenta analisi e creatività, dove forme, funzionalità ed estetica si fondono armoniosamente. Il nostro team di ingegneri e designer lavora per creare soluzioni su misura che rispettano le normative più rigorose.",
    image: cadImg,
    features: [
      "Progettazione CAD 3D avanzata",
      "Analisi strutturale FEM",
      "Personalizzazione completa",
      "Conformità normativa CE",
      "Assistenza tecnica dedicata"
    ],
    benefits: [
      {
        title: "Soluzioni su misura",
        description: "Ogni progetto è unico e viene sviluppato secondo le specifiche esigenze del cliente."
      },
      {
        title: "Tecnologia avanzata",
        description: "Utilizziamo software di ultima generazione per simulazioni e ottimizzazione."
      },
      {
        title: "Esperienza consolidata",
        description: "Oltre 50 anni di esperienza nel settore ascensoristico."
      }
    ]
  },
  attrezzeria: {
    title: "Servizi di Attrezzeria",
    subtitle: "Precisione e Qualità",
    description: "I servizi di attrezzeria offrono soluzioni precise e personalizzate per ogni esigenza produttiva. Dalla progettazione alla realizzazione di stampi e attrezzature, garantiamo qualità e precisione in ogni fase.",
    image: manufacturingImg,
    features: [
      "Costruzione stampi progressivi",
      "Attrezzature di tranciatura",
      "Maschere di saldatura",
      "Calibri di controllo",
      "Manutenzione stampi"
    ],
    benefits: [
      {
        title: "Qualità certificata",
        description: "Tutti i nostri stampi sono realizzati con materiali di prima scelta e sottoposti a rigidi controlli."
      },
      {
        title: "Tempi rapidi",
        description: "Grazie alla nostra organizzazione interna, garantiamo tempi di consegna competitivi."
      },
      {
        title: "Assistenza completa",
        description: "Offriamo servizi di manutenzione e revisione per prolungare la vita degli stampi."
      }
    ]
  },
  stampaggi: {
    title: "Tranciatura e Stampaggi",
    subtitle: "Produzione Industriale",
    description: "I servizi di tranciatura e stampaggi offrono soluzioni versatili ed efficienti per la produzione di componenti metallici. Disponiamo di presse di varia tonnellaggio per soddisfare ogni esigenza produttiva.",
    image: stampingImg,
    features: [
      "Tranciatura fine",
      "Stampaggio profondo",
      "Piegatura di precisione",
      "Assemblaggio componenti",
      "Trattamenti superficiali"
    ],
    benefits: [
      {
        title: "Capacità produttiva",
        description: "Parco macchine moderno con presse da 25 a 400 tonnellate."
      },
      {
        title: "Flessibilità",
        description: "Produzioni dal prototipo alla grande serie con la stessa qualità."
      },
      {
        title: "Controllo qualità",
        description: "Sistema di gestione qualità certificato ISO 9001."
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
                onClick={() => setLocation("/servizi")}
                className="hover:text-foreground cursor-pointer"
              >
                Servizi
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
                onClick={() => setLocation("/contatti")}
                data-testid="button-contact-service"
              >
                Richiedi informazioni
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
              I vantaggi del nostro servizio
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
                onClick={() => setLocation(`/servizi/${slug}`)}
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
