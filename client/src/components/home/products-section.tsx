import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getFeaturedProducts } from "@/lib/api";

import speedGovernorImg from "@assets/generated_images/elevator_speed_governor_product.png";
import doorOperatorImg from "@assets/generated_images/elevator_door_operator_mechanism.png";
import ledConnectorImg from "@assets/generated_images/led_connector_component.png";

const imageMap: Record<string, string> = {
  speedGovernor: speedGovernorImg,
  doorOperator: doorOperatorImg,
  ledConnector: ledConnectorImg,
};

export function ProductsSection() {
  const [, setLocation] = useLocation();

  const { data: featuredProducts = [], isLoading } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: getFeaturedProducts,
  });

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Produits en vedette
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Découvrez nos produits phares
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Une sélection de nos meilleurs composants et systèmes pour ascenseurs,
            conçus avec précision et qualité.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product, index) => (
              <Card
                key={product.id}
                className="group h-full hover-elevate cursor-pointer transition-all overflow-visible border-0 shadow-sm"
                onClick={() => setLocation(`/product/${product.slug}`)}
                data-testid={`card-product-${product.id}`}
              >
                <div className="aspect-square relative bg-muted/30 rounded-t-lg overflow-hidden">
                  <img
                    src={imageMap[product.image || 'speedGovernor']}
                    alt={product.name}
                    className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                    data-testid={`img-product-${index}`}
                  />
                  {product.featured && (
                    <Badge className="absolute top-3 left-3" variant="default">
                      Nouveau
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-primary font-medium mb-1">
                    {product.code}
                  </p>
                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2">
                    {product.name}
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary"
                    data-testid={`button-view-product-${product.id}`}
                  >
                    Voir détails
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            size="lg"
            onClick={() => setLocation("/catalog")}
            data-testid="button-view-catalog"
          >
            Voir tous les produits
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
