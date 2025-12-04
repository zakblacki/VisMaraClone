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
    title: "Impianti Gearless MRL",
    subtitle: "Tecnologia senza locale macchine",
    description: "Gli impianti Gearless MRL (Machine Room Less) rappresentano l'evoluzione tecnologica nel settore ascensoristico. Grazie all'assenza del locale macchine tradizionale, offrono maggiore flessibilità di installazione e risparmio energetico significativo.",
    image: gearlessMotorImg,
    features: [
      "Motore gearless ad alta efficienza",
      "Nessun locale macchine richiesto",
      "Risparmio energetico fino al 50%",
      "Funzionamento silenzioso",
      "Manutenzione ridotta",
      "Conformità normativa EN81-20/50"
    ],
    specs: [
      { label: "Portata", value: "320 - 2000 kg" },
      { label: "Velocità", value: "0.5 - 2.5 m/s" },
      { label: "Corsa massima", value: "100 m" },
      { label: "Fermate", value: "fino a 40" }
    ],
    benefits: [
      {
        title: "Efficienza Energetica",
        description: "Motori a magneti permanenti con classe energetica A, rigenerazione energia in frenata.",
        icon: Zap
      },
      {
        title: "Sicurezza Avanzata",
        description: "Sistemi di sicurezza multipli, freni ridondanti e controllo elettronico.",
        icon: Shield
      },
      {
        title: "Spazio Ottimizzato",
        description: "Testata e fossa ridotte, nessun locale macchine, massimizzazione spazio utile.",
        icon: Ruler
      }
    ]
  },
  piattaforme: {
    title: "Piattaforme Elevatrici",
    subtitle: "Accessibilità senza barriere",
    description: "Le piattaforme elevatrici per disabili sono progettate per garantire l'accessibilità e l'autonomia. Soluzioni versatili per superare dislivelli in edifici pubblici e privati, conformi alle normative sull'abbattimento delle barriere architettoniche.",
    image: platformLiftImg,
    features: [
      "Installazione interna ed esterna",
      "Struttura autoportante opzionale",
      "Comandi intuitivi e accessibili",
      "Fotocellule di sicurezza",
      "Batteria di emergenza",
      "Conformità DM 236/89"
    ],
    specs: [
      { label: "Portata", value: "250 - 400 kg" },
      { label: "Velocità", value: "0.15 m/s" },
      { label: "Corsa massima", value: "12 m" },
      { label: "Dimensioni", value: "personalizzabili" }
    ],
    benefits: [
      {
        title: "Accessibilità Garantita",
        description: "Progettate per persone con mobilità ridotta, carrozzine e deambulatori.",
        icon: Shield
      },
      {
        title: "Installazione Flessibile",
        description: "Adattabili a qualsiasi contesto architettonico, interno o esterno.",
        icon: Ruler
      },
      {
        title: "Funzionamento Sicuro",
        description: "Sistemi di sicurezza multipli e batteria di emergenza integrata.",
        icon: Zap
      }
    ]
  },
  "su-misura": {
    title: "Ascensori su Misura",
    subtitle: "Personalizzazione totale",
    description: "Realizziamo ascensori completamente personalizzati per rispondere a ogni esigenza architettonica e stilistica. Dal design della cabina alle finiture, ogni dettaglio è studiato per integrarsi perfettamente con l'ambiente circostante.",
    image: elevatorCabinImg,
    features: [
      "Design cabina personalizzato",
      "Finiture premium su richiesta",
      "Illuminazione LED regolabile",
      "Pannelli touch screen",
      "Materiali sostenibili",
      "Integrazione domotica"
    ],
    specs: [
      { label: "Configurazione", value: "completamente personalizzabile" },
      { label: "Materiali", value: "acciaio, vetro, legno, pietra" },
      { label: "Illuminazione", value: "LED RGB dinamica" },
      { label: "Controllo", value: "touch screen, app mobile" }
    ],
    benefits: [
      {
        title: "Design Esclusivo",
        description: "Ogni ascensore è un pezzo unico, progettato per le tue esigenze specifiche.",
        icon: Ruler
      },
      {
        title: "Materiali Premium",
        description: "Solo materiali di alta qualità per finiture eleganti e durature.",
        icon: Shield
      },
      {
        title: "Tecnologia Smart",
        description: "Integrazione con sistemi domotici e controllo da smartphone.",
        icon: Zap
      }
    ]
  }
};

export default function Impianti() {
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
                Impianti
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
                  Richiedi preventivo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setLocation("/configuratore-ascensore")}
                  data-testid="button-configure"
                >
                  Configura online
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
              Specifiche Tecniche
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
              Vantaggi Principali
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
