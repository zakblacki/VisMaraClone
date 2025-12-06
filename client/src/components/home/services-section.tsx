import { Link } from "wouter";
import { Compass, Wrench, Cog, Package, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { serviceCards } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Compass,
  Wrench,
  Cog,
  Package,
};

export function ServicesSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Nos services
          </p>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
            Solutions complètes pour ascenseurs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            De la conception à la production, nous offrons des services intégrés pour répondre
            à tous les besoins dans le secteur des ascenseurs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCards.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <Link key={service.id} href={service.link}>
                <Card className="group h-full hover-elevate cursor-pointer transition-all">
                  <CardContent className="p-6 lg:p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                      <IconComponent className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      En savoir plus
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
