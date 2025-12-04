import { Users, Zap, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Zap,
  TrendingUp,
  Clock,
};

export function WhyChooseUsSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Perchè sceglierci?
          </p>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
            Una realtà in forte espansione
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            La nostra crescita costante è il risultato di valori solidi e un impegno 
            quotidiano verso l'eccellenza.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <Card key={feature.id} className="text-center h-full">
                <CardContent className="p-6 lg:p-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[
            { value: "50+", label: "Anni di esperienza" },
            { value: "500+", label: "Prodotti a catalogo" },
            { value: "1000+", label: "Clienti soddisfatti" },
            { value: "24/7", label: "Supporto tecnico" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl lg:text-4xl xl:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
