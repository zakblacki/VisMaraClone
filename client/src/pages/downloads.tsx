import { useLocation } from "wouter";
import { ChevronRight, Download, FileText, BookOpen, Award, Folder } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const downloadCategories = [
  {
    id: 1,
    title: "Cataloghi Prodotti",
    icon: BookOpen,
    items: [
      { name: "Catalogo Generale 2024", size: "15.2 MB", type: "PDF" },
      { name: "Limitatori di Velocità", size: "4.8 MB", type: "PDF" },
      { name: "Operatori e Sospensioni", size: "6.2 MB", type: "PDF" },
      { name: "Componenti LED", size: "2.1 MB", type: "PDF" },
    ]
  },
  {
    id: 2,
    title: "Schede Tecniche",
    icon: FileText,
    items: [
      { name: "Limitatore L0X-187", size: "1.2 MB", type: "PDF" },
      { name: "Limitatore L0X-186", size: "1.1 MB", type: "PDF" },
      { name: "Operatore Slim", size: "0.8 MB", type: "PDF" },
      { name: "Connettori LED", size: "0.5 MB", type: "PDF" },
    ]
  },
  {
    id: 3,
    title: "Certificazioni",
    icon: Award,
    items: [
      { name: "Certificazione CE", size: "0.3 MB", type: "PDF" },
      { name: "ISO 9001:2015", size: "0.4 MB", type: "PDF" },
      { name: "Dichiarazioni di Conformità", size: "1.5 MB", type: "PDF" },
    ]
  },
  {
    id: 4,
    title: "Manuali Tecnici",
    icon: Folder,
    items: [
      { name: "Guida Installazione Limitatori", size: "3.2 MB", type: "PDF" },
      { name: "Manuale Manutenzione", size: "4.5 MB", type: "PDF" },
      { name: "Specifiche Tecniche Generali", size: "2.8 MB", type: "PDF" },
    ]
  }
];

export default function Downloads() {
  const [, setLocation] = useLocation();

  const handleDownload = (fileName: string) => {
    console.log(`Downloading ${fileName}`);
  };

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
              <span className="text-foreground">Download</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold">Area Download</h1>
            <p className="text-muted-foreground mt-2">
              Scarica cataloghi, schede tecniche e documentazione
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {downloadCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>{category.items.length} documenti disponibili</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover-elevate transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">{item.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Badge variant="outline" className="text-xs">
                                {item.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{item.size}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownload(item.name)}
                          data-testid={`button-download-${category.id}-${index}`}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-primary text-primary-foreground">
            <CardContent className="p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Non trovi quello che cerchi?
                  </h3>
                  <p className="opacity-90">
                    Contattaci per richiedere documentazione specifica o personalizzata per il tuo progetto.
                  </p>
                </div>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  onClick={() => setLocation("/contatti")}
                  data-testid="button-contact-downloads"
                >
                  Contattaci
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
