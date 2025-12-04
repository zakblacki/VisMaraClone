import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleProducts } from "@/lib/data";

import speedGovernorImg from "@assets/generated_images/elevator_speed_governor_product.png";
import doorOperatorImg from "@assets/generated_images/elevator_door_operator_mechanism.png";
import ledConnectorImg from "@assets/generated_images/led_connector_component.png";
import catalogImg from "@assets/generated_images/elevator_control_panel_buttons.png";

const imageMap: Record<string, string> = {
  speedGovernor: speedGovernorImg,
  doorOperator: doorOperatorImg,
  ledConnector: ledConnectorImg,
};

export function ProductsSection() {
  const [, setLocation] = useLocation();
  const featuredProducts = sampleProducts.filter(p => p.featured).slice(0, 6);
  
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Ricambi e componenti per ascensori
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Un vasto catalogo tutto per te
            </h2>
            <p className="text-muted-foreground mb-6">
              Naviga nella sezione dei componenti e ricambi per ascensori di 
              Fratelli Vismara per trovare quello che fa al caso tuo. Siamo qui 
              per fornirti soluzioni su misura e assistenza professionale.
            </p>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6">
              <img 
                src={catalogImg}
                alt="Catalogo componenti ascensori"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <Badge variant="secondary" className="bg-white/90 text-foreground">
                  +500 prodotti
                </Badge>
              </div>
            </div>
            <Button 
              className="w-full" 
              onClick={() => setLocation("/catalogo")}
              data-testid="button-view-catalog"
            >
              Scopri il catalogo completo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {featuredProducts.map((product, index) => (
                <Card 
                  key={product.code} 
                  className="group h-full hover-elevate cursor-pointer transition-all overflow-visible"
                  onClick={() => setLocation(`/prodotto/${product.slug}`)}
                >
                  <div className="aspect-square relative bg-muted/50">
                    <img
                      src={imageMap[product.image || 'speedGovernor']}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      data-testid={`img-product-${index}`}
                    />
                    {product.featured && (
                      <Badge className="absolute top-3 right-3" variant="default">
                        In evidenza
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      {product.code}
                    </p>
                    <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
