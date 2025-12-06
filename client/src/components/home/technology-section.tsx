import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import techImg from "@assets/generated_images/elevator_cad_design_screen.png";
import stampingImg from "@assets/generated_images/metal_stamping_machinery.png";

export function TechnologySection() {
  const [, setLocation] = useLocation();

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={stampingImg}
          alt="Technologie de production"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Innovation continue
            </p>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
              Technologie de pointe
            </h2>
            <p className="text-white/80 mb-6 text-lg">
              Les meilleurs services de conception et de construction de moules de
              modélisation 3D pour les métaux et les plastiques. Nous utilisons des technologies
              CAD/CAM de dernière génération pour garantir précision et qualité
              dans chaque composant.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Conception CAO 3D avancée",
                "Prototypage rapide",
                "Usinage CNC de précision",
                "Contrôle qualité intégré"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-white/90">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-foreground"
              onClick={() => setLocation("/servizi/attrezzeria")}
              data-testid="button-learn-more-tech"
            >
              En savoir plus
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-3xl" />
              <img
                src={techImg}
                alt="Conception CAO"
                className="relative z-10 rounded-xl shadow-2xl w-full"
                data-testid="img-technology"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
