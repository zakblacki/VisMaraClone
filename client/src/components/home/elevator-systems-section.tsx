import { useLocation } from "wouter";
import { Building2, Keyboard, Settings2, Accessibility, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import elevatorImg from "@assets/generated_images/gearless_elevator_motor_system.png";

const systemFeatures = [
  {
    id: 1,
    title: "Strutture Solide e Conformi",
    description: "Le strutture degli impianti per ascensori sono solide e robuste, progettate per sopportare pesi e stress in modo superiore. Materiali di alta qualità e rigorosi standard di sicurezza.",
    icon: Building2
  },
  {
    id: 2,
    title: "Pulsantiere alta efficienza",
    description: "Le pulsantiere per ascensori sono progettate con precisione, offrendo un'esperienza utente intuitiva ed efficiente. Con pulsanti reattivi e un design ergonomico.",
    icon: Keyboard
  },
  {
    id: 3,
    title: "Impianti GEARLESS testata e fossa ridotta",
    description: "La progettazione di un ascensore gearless è frutto di attenta analisi e creatività, dove forme, funzionalità ed estetica si fondono armoniosamente.",
    icon: Settings2
  },
  {
    id: 4,
    title: "Piattaforme elettriche elevatrici",
    description: "Fratelli Vismara Srl è specializzata in sviluppo e progettazione di piattaforme elettriche elevatrici ed elevatori per disabili.",
    icon: Accessibility
  }
];

export function ElevatorSystemsSection() {
  const [, setLocation] = useLocation();

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-xl overflow-hidden">
              <img
                src={elevatorImg}
                alt="Impianto ascensore gearless"
                className="w-full h-full object-cover"
                data-testid="img-elevator-systems"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 bg-primary text-primary-foreground p-4 lg:p-6 rounded-xl shadow-xl">
              <p className="text-2xl lg:text-3xl font-bold">+50</p>
              <p className="text-sm opacity-90">Anni di esperienza</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Ascensori standard e su misura
            </p>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
              La mobilità verticale a nuovi livelli
            </h2>
            <p className="text-muted-foreground mb-8">
              Una delle principali innovazioni nel settore degli impianti per ascensori 
              è l'adozione di motori ad alta efficienza energetica. I moderni motori a 
              trazione utilizzano tecnologie come il controllo a frequenza variabile per 
              ridurre i consumi energetici e i costi operativi.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {systemFeatures.map((feature) => (
                <Card key={feature.id} className="bg-muted/50 border-0">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button 
              size="lg" 
              onClick={() => setLocation("/contatti")}
              data-testid="button-request-info"
            >
              Richiedi maggiori informazioni
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
