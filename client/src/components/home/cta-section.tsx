import { useLocation } from "wouter";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyInfo } from "@/lib/data";

import workerImg from "@assets/generated_images/industrial_worker_portrait.png";

export function CTASection() {
  const [, setLocation] = useLocation();

  return (
    <section className="py-16 lg:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-xl blur-3xl" />
            <img
              src={workerImg}
              alt="Team Fratelli Vismara"
              className="relative z-10 rounded-xl shadow-2xl w-full max-w-md mx-auto lg:max-w-none"
              data-testid="img-cta-worker"
            />
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
              Sei pronto per una nuova sfida?
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Con Fratelli Vismara Srl hai l'opportunità di progettare e realizzare 
              il tuo ascensore. Una lunga esperienza nel settore si affiancherà al 
              tuo progetto, innovandolo e portando con sè soluzioni su misura 
              arricchite da elegante design, affidabilità ma soprattutto da sicurezza.
            </p>
            <p className="text-muted-foreground mb-8">
              Fratelli Vismara Srl sarà lieta di accompagnarti in ogni fase del 
              processo al fine di realizzare il progetto che solo tu hai in mente. 
              Un ascensore perfetto secondo le tue esigenze.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button 
                size="lg" 
                onClick={() => setLocation("/contatti")}
                data-testid="button-request-quote"
              >
                Richiedi un preventivo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                asChild
              >
                <a href={`tel:${companyInfo.phone.replace(/\s/g, '')}`} data-testid="button-call-us">
                  <Phone className="mr-2 h-4 w-4" />
                  Chiamaci ora
                </a>
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                Fidati di chi ci ha già scelto
              </p>
              <div className="flex items-center gap-6 flex-wrap">
                {["CE", "ISO 9001", "TUV"].map((cert) => (
                  <div 
                    key={cert} 
                    className="px-4 py-2 bg-muted rounded-md text-sm font-medium"
                  >
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
