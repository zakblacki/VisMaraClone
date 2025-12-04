import { Link } from "wouter";
import { Settings, Accessibility, Download, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ctaItems = [
  {
    id: 1,
    title: "Configura la cabina",
    description: "Personalizza il tuo ascensore con il nostro configuratore interattivo",
    icon: Settings,
    href: "/configuratore-ascensore",
    color: "bg-primary/10 text-primary"
  },
  {
    id: 2,
    title: "Configura la piattaforma",
    description: "Progetta la soluzione perfetta per l'accessibilità",
    icon: Accessibility,
    href: "/configuratore-piattaforma",
    color: "bg-chart-2/20 text-chart-2"
  },
  {
    id: 3,
    title: "Scarica i cataloghi",
    description: "Accedi alla nostra documentazione tecnica completa",
    icon: Download,
    href: "/download",
    color: "bg-chart-3/20 text-chart-3"
  }
];

export function QuickCTAs() {
  return (
    <section className="py-8 lg:py-12 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {ctaItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <Card className="group h-full hover-elevate cursor-pointer transition-all border-transparent hover:border-primary/20">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
