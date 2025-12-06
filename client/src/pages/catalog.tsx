import { useState, useMemo } from "react";
import { useSearch, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, Grid3X3, List, ChevronRight, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProducts, getCategories } from "@/lib/api";

import speedGovernorImg from "@assets/generated_images/elevator_speed_governor_product.png";
import doorOperatorImg from "@assets/generated_images/elevator_door_operator_mechanism.png";
import ledConnectorImg from "@assets/generated_images/led_connector_component.png";

const imageMap: Record<string, string> = {
  speedGovernor: speedGovernorImg,
  doorOperator: doorOperatorImg,
  ledConnector: ledConnectorImg,
};

export default function Catalog() {
  const [, setLocation] = useLocation();
  const searchParams = useSearch();
  const urlSearchQuery = new URLSearchParams(searchParams).get("search") || "";

  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("name");

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.code.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "all") {
      const category = categories.find((c) => c.slug === selectedCategory);
      if (category) {
        filtered = filtered.filter((p) => p.categoryId === category.id);
      }
    }

    filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "code") return a.code.localeCompare(b.code);
      return 0;
    });

    return filtered;
  }, [products, categories, searchQuery, selectedCategory, sortBy]);

  const isLoading = productsLoading || categoriesLoading;

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
              <span className="text-foreground">Catalogue</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold">Catalogue de produits</h1>
            <p className="text-muted-foreground mt-2">
              Découvrez notre gamme complète de composants et pièces de rechange pour ascenseurs
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher des produits par nom ou code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-catalog-search"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]" data-testid="select-category">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]" data-testid="select-sort">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom</SelectItem>
                  <SelectItem value="code">Code</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  data-testid="button-view-grid"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  data-testid="button-view-list"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  {filteredProducts.length} produits trouvés
                </p>
              </div>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => (
                    <Card
                      key={product.id}
                      className="group h-full hover-elevate cursor-pointer overflow-visible"
                      onClick={() => setLocation(`/prodotto/${product.slug}`)}
                    >
                      <div className="aspect-square relative bg-muted/50">
                        <img
                          src={imageMap[product.image || "speedGovernor"]}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          data-testid={`img-catalog-product-${index}`}
                        />
                        {product.featured && (
                          <Badge className="absolute top-3 right-3">
                            En vedette
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
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product, index) => (
                    <Card
                      key={product.id}
                      className="group hover-elevate cursor-pointer overflow-visible"
                      onClick={() => setLocation(`/prodotto/${product.slug}`)}
                    >
                      <CardContent className="p-4 flex gap-4">
                        <div className="w-24 h-24 flex-shrink-0 bg-muted/50 rounded-lg overflow-hidden">
                          <img
                            src={imageMap[product.image || "speedGovernor"]}
                            alt={product.name}
                            className="w-full h-full object-contain p-2"
                            data-testid={`img-catalog-list-product-${index}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">
                                {product.code}
                              </p>
                              <h3 className="font-medium group-hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                            </div>
                            {product.featured && (
                              <Badge className="flex-shrink-0">En vedette</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    Aucun produit trouvé pour la recherche "{searchQuery}"
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    data-testid="button-reset-filters"
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
