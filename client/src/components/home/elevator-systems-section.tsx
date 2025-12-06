import { useLocation } from "wouter";
import { Building2, Keyboard, Settings2, Accessibility, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import elevatorImg from "@assets/generated_images/gearless_elevator_motor_system.png";

const systemFeatures = [
  {
    id: 1,
    title: "Structures solides et conformes",
    description: "Les structures des installations d'ascenseurs sont solides et robustes, conçues pour supporter des poids et des contraintes de manière supérieure. Matériaux de haute qualité et normes de sécurité rigoureuses.",
    icon: Building2
  },
  {
    id: 2,
    title: "Panneaux de commande haute efficacité",
    description: "Les panneaux de commande pour ascenseurs sont conçus avec précision, offrant une expérience utilisateur intuitive et efficace. Avec des boutons réactifs et un design ergonomique.",
    icon: Keyboard
  },
  {
    id: 3,
    title: "Installations GEARLESS à tête et fosse réduites",
    description: "La conception d'un ascenseur gearless est le fruit d'une analyse minutieuse et de créativité, où formes, fonctionnalité et esthétique se fondent harmonieusement.",
    icon: Settings2
  },
  {
    id: 4,
    title: "Plateformes élévatrices électriques",
    description: "Prodlift est spécialisée dans le développement et la conception de plateformes élévatrices électriques et d'élévateurs pour personnes handicapées.",
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
                alt="Installation d'ascenseur gearless"
                className="w-full h-full object-cover"
                data-testid="img-elevator-systems"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 bg-primary text-primary-foreground p-4 lg:p-6 rounded-xl shadow-xl">
              <p className="text-2xl lg:text-3xl font-bold">+50</p>
              <p className="text-sm opacity-90">Années d'expérience</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Ascenseurs standard et sur mesure
            </p>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
              La mobilité verticale à de nouveaux niveaux
            </h2>
            <p className="text-muted-foreground mb-8">
              L'une des principales innovations dans le secteur des installations d'ascenseurs
              est l'adoption de moteurs à haute efficacité énergétique. Les moteurs de
              traction modernes utilisent des technologies comme le contrôle à fréquence variable pour
              réduire la consommation d'énergie et les coûts d'exploitation.
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
              onClick={() => setLocation("/contact")}
              data-testid="button-request-info"
            >
              Demander plus d'informations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
