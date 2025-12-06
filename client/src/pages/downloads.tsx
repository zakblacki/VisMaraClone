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
    title: "Catalogues Produits",
    icon: BookOpen,
    items: [
      { name: "Catalogue Général 2024", size: "15.2 MB", type: "PDF" },
      { name: "Limiteurs de Vitesse", size: "4.8 MB", type: "PDF" },
      { name: "Opérateurs et Suspensions", size: "6.2 MB", type: "PDF" },
      { name: "Composants LED", size: "2.1 MB", type: "PDF" },
    ]
  },
  {
    id: 2,
    title: "Fiches Techniques",
    icon: FileText,
    items: [
      { name: "Limiteur L0X-187", size: "1.2 MB", type: "PDF" },
      { name: "Limiteur L0X-186", size: "1.1 MB", type: "PDF" },
      { name: "Opérateur Slim", size: "0.8 MB", type: "PDF" },
      { name: "Connecteurs LED", size: "0.5 MB", type: "PDF" },
    ]
  },
  {
    id: 3,
    title: "Certifications",
    icon: Award,
    items: [
      { name: "Certification CE", size: "0.3 MB", type: "PDF" },
      { name: "ISO 9001:2015", size: "0.4 MB", type: "PDF" },
      { name: "Déclarations de Conformité", size: "1.5 MB", type: "PDF" },
    ]
  },
  {
    id: 4,
    title: "Manuels Techniques",
    icon: Folder,
    items: [
      { name: "Guide d'Installation Limiteurs", size: "3.2 MB", type: "PDF" },
      { name: "Manuel de Maintenance", size: "4.5 MB", type: "PDF" },
      { name: "Spécifications Techniques Générales", size: "2.8 MB", type: "PDF" },
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
            <h1 className="text-3xl lg:text-4xl font-bold">Espace Téléchargement</h1>
            <p className="text-muted-foreground mt-2">
              Téléchargez catalogues, fiches techniques et documentation
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
                      <CardDescription>{category.items.length} documents disponibles</CardDescription>
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
                    Vous ne trouvez pas ce que vous cherchez ?
                  </h3>
                  <p className="opacity-90">
                    Contactez-nous pour demander une documentation spécifique ou personnalisée pour votre projet.
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setLocation("/contatti")}
                  data-testid="button-contact-downloads"
                >
                  Contactez-nous
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
