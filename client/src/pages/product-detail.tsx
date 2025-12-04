import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Download, Share2, Heart, ArrowRight, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProductBySlug, getProducts } from "@/lib/api";

import speedGovernorImg from "@assets/generated_images/elevator_speed_governor_product.png";
import doorOperatorImg from "@assets/generated_images/elevator_door_operator_mechanism.png";
import ledConnectorImg from "@assets/generated_images/led_connector_component.png";

const imageMap: Record<string, string> = {
  speedGovernor: speedGovernorImg,
  doorOperator: doorOperatorImg,
  ledConnector: ledConnectorImg,
};

export default function ProductDetail() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const slug = params.slug;
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug!),
    enabled: !!slug,
  });

  const { data: allProducts = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const relatedProducts = allProducts.filter((p) => p.slug !== slug).slice(0, 4);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Prodotto non trovato</h1>
            <Button onClick={() => setLocation("/catalogo")}>
              Torna al catalogo
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <button 
                onClick={() => setLocation("/")}
                className="hover:text-foreground cursor-pointer"
              >
                Home
              </button>
              <ChevronRight className="h-4 w-4" />
              <button 
                onClick={() => setLocation("/catalogo")}
                className="hover:text-foreground cursor-pointer"
              >
                Catalogo
              </button>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground truncate">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted/50 relative">
                    <img
                      src={imageMap[product.image || "speedGovernor"]}
                      alt={product.name}
                      className="w-full h-full object-contain p-8"
                      data-testid="img-product-main"
                    />
                    {product.featured && (
                      <Badge className="absolute top-4 right-4">In evidenza</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-muted/50 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer transition-colors"
                  >
                    <img
                      src={imageMap[product.image || "speedGovernor"]}
                      alt={`${product.name} - vista ${index + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-6">
                <Badge variant="outline" className="mb-3">
                  {product.code}
                </Badge>
                <h1 className="text-2xl lg:text-3xl font-bold mb-4" data-testid="text-product-name">
                  {product.name}
                </h1>
                <p className="text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <Tabs defaultValue="specs" className="mb-8">
                <TabsList className="w-full">
                  <TabsTrigger value="specs" className="flex-1">Specifiche</TabsTrigger>
                  <TabsTrigger value="docs" className="flex-1">Documentazione</TabsTrigger>
                </TabsList>
                <TabsContent value="specs" className="mt-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {product.specifications?.split("\n").map((spec, index) => {
                          const [label, value] = spec.split(":");
                          return (
                            <div key={index} className="flex justify-between py-2 border-b last:border-0">
                              <span className="text-muted-foreground">{label}</span>
                              <span className="font-medium">{value?.trim()}</span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="docs" className="mt-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Scheda tecnica (PDF)
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Manuale di installazione (PDF)
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Certificazione CE (PDF)
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button 
                  className="flex-1" 
                  size="lg" 
                  onClick={() => setLocation(`/contatti?product=${product.code}`)}
                  data-testid="button-request-info-product"
                >
                  Richiedi informazioni
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" data-testid="button-share">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" data-testid="button-favorite">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <Card className="bg-muted/50 border-0">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Hai bisogno di assistenza? Contattaci al{" "}
                    <a href="tel:+390392781193" className="text-primary font-medium">
                      +39 039 278 1193
                    </a>{" "}
                    o inviaci un'email a{" "}
                    <a href="mailto:info@fratellivismara.it" className="text-primary font-medium">
                      info@fratellivismara.it
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Prodotti correlati</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relProduct, index) => (
                  <Card 
                    key={relProduct.id} 
                    className="group h-full hover-elevate cursor-pointer overflow-visible"
                    onClick={() => setLocation(`/prodotto/${relProduct.slug}`)}
                  >
                    <div className="aspect-square relative bg-muted/50">
                      <img
                        src={imageMap[relProduct.image || "speedGovernor"]}
                        alt={relProduct.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        data-testid={`img-related-product-${index}`}
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">
                        {relProduct.code}
                      </p>
                      <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {relProduct.name}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
