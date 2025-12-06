import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Download, FileText, BookOpen, Award, Folder, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n";
import type { Pdf } from "@shared/schema";

interface CategoryConfig {
  titleKey: string;
  icon: typeof BookOpen;
  types: string[];
}

const categoryConfigs: CategoryConfig[] = [
  {
    titleKey: "downloads.category.catalogs",
    icon: BookOpen,
    types: ["catalogue", "catalog"],
  },
  {
    titleKey: "downloads.category.datasheets",
    icon: FileText,
    types: ["fiche", "datasheet", "technique"],
  },
  {
    titleKey: "downloads.category.certifications",
    icon: Award,
    types: ["certification", "certificat", "certificate"],
  },
  {
    titleKey: "downloads.category.manuals",
    icon: Folder,
    types: ["manuel", "manual", "guide"],
  }
];

function getIconForType(type: string): typeof BookOpen {
  const lowerType = type.toLowerCase();
  for (const config of categoryConfigs) {
    if (config.types.some(t => lowerType.includes(t))) {
      return config.icon;
    }
  }
  return FileText;
}

function getCategoryKeyForPdf(pdf: Pdf): string {
  const lowerType = (pdf.type || "").toLowerCase();
  for (const config of categoryConfigs) {
    if (config.types.some(t => lowerType.includes(t))) {
      return config.titleKey;
    }
  }
  return "downloads.category.other";
}

function formatFileSize(bytes?: number): string {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export default function Downloads() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  const { data: pdfs = [], isLoading, error } = useQuery<Pdf[]>({
    queryKey: ["/api/pdfs"],
  });

  const handleDownload = (pdf: Pdf) => {
    if (pdf.url) {
      window.open(pdf.url, "_blank");
    }
  };

  const groupedPdfs = pdfs.reduce((acc, pdf) => {
    const categoryKey = getCategoryKeyForPdf(pdf);
    if (!acc[categoryKey]) {
      acc[categoryKey] = [];
    }
    acc[categoryKey].push(pdf);
    return acc;
  }, {} as Record<string, Pdf[]>);

  const categories = Object.entries(groupedPdfs).map(([titleKey, items]) => {
    const config = categoryConfigs.find(c => c.titleKey === titleKey);
    return {
      titleKey,
      icon: config?.icon || FileText,
      items,
    };
  });

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
                {t("common.home")}
              </button>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{t("nav.download")}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold">{t("downloads.title")}</h1>
            <p className="text-muted-foreground mt-2">
              {t("downloads.subtitle")}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                {t("downloads.error_loading")}
              </CardContent>
            </Card>
          ) : categories.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                {t("downloads.no_documents")}
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {categories.map((category, catIndex) => (
                <Card key={catIndex}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{t(category.titleKey)}</CardTitle>
                        <CardDescription>{category.items.length} {t("downloads.documents_available")}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.items.map((pdf) => (
                        <div
                          key={pdf.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover-elevate transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="font-medium text-sm truncate">{pdf.name}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <Badge variant="outline" className="text-xs">
                                  PDF
                                </Badge>
                                <span className="text-xs text-muted-foreground">{pdf.type}</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownload(pdf)}
                            data-testid={`button-download-pdf-${pdf.id}`}
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
          )}

          <Card className="mt-8 bg-primary text-primary-foreground">
            <CardContent className="p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("downloads.not_found")}
                  </h3>
                  <p className="opacity-90">
                    {t("downloads.contact_for_docs")}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setLocation("/contact")}
                  data-testid="button-contact-downloads"
                >
                  {t("downloads.contact_us")}
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
