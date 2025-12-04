import { useLocation } from "wouter";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-muted/30">
        <div className="container mx-auto px-4 text-center py-16">
          <div className="mb-8">
            <p className="text-8xl font-bold text-primary mb-4">404</p>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Pagina non trovata
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              La pagina che stai cercando non esiste o è stata spostata. 
              Torna alla home page o esplora il nostro catalogo prodotti.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => setLocation("/")}
              data-testid="button-go-home"
            >
              <Home className="mr-2 h-4 w-4" />
              Torna alla home
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setLocation("/catalogo")}
              data-testid="button-go-catalog"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Vai al catalogo
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
