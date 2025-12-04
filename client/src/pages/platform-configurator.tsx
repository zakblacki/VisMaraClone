import { useState } from "react";
import { useLocation } from "wouter";
import { ChevronRight, ChevronLeft, Check, ArrowRight, Home, TreePine } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { platformConfigOptions } from "@/lib/data";

import platformImg from "@assets/generated_images/accessibility_platform_lift.png";

interface ConfigState {
  platformType: string;
  capacity: string;
  travelHeight: string;
  indoor: boolean;
  rampType: string;
  safetyFeatures: string[];
}

const steps = [
  { id: 1, name: "Tipo Piattaforma", key: "platformType" },
  { id: 2, name: "Capacità", key: "capacity" },
  { id: 3, name: "Altezza", key: "travelHeight" },
  { id: 4, name: "Installazione", key: "indoor" },
  { id: 5, name: "Rampa", key: "rampType" },
  { id: 6, name: "Sicurezza", key: "safetyFeatures" },
  { id: 7, name: "Riepilogo", key: "summary" },
];

export default function PlatformConfigurator() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<ConfigState>({
    platformType: "",
    capacity: "",
    travelHeight: "",
    indoor: true,
    rampType: "",
    safetyFeatures: [],
  });

  const updateConfig = <K extends keyof ConfigState>(key: K, value: ConfigState[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSafetyFeature = (featureId: string) => {
    setConfig((prev) => ({
      ...prev,
      safetyFeatures: prev.safetyFeatures.includes(featureId)
        ? prev.safetyFeatures.filter((f) => f !== featureId)
        : [...prev.safetyFeatures, featureId],
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isStepComplete = (stepKey: string) => {
    if (stepKey === "summary") return true;
    if (stepKey === "indoor") return true;
    if (stepKey === "safetyFeatures") return config.safetyFeatures.length > 0;
    return config[stepKey as keyof ConfigState] !== "";
  };

  const canProceed = () => {
    const currentStepKey = steps[currentStep - 1].key;
    return isStepComplete(currentStepKey);
  };

  const getSelectedLabel = (key: keyof ConfigState) => {
    const value = config[key];
    
    switch (key) {
      case "platformType":
        return platformConfigOptions.platformTypes.find((o) => o.id === value)?.name || "Non selezionato";
      case "capacity":
        return platformConfigOptions.capacities.find((o) => o.id === value)?.name || "Non selezionato";
      case "travelHeight":
        return platformConfigOptions.travelHeights.find((o) => o.id === value)?.name || "Non selezionato";
      case "indoor":
        return value ? "Interno" : "Esterno";
      case "rampType":
        return platformConfigOptions.rampTypes.find((o) => o.id === value)?.name || "Non selezionato";
      case "safetyFeatures":
        if (Array.isArray(value) && value.length > 0) {
          return value
            .map((id) => platformConfigOptions.safetyFeatures.find((f) => f.id === id)?.name)
            .join(", ");
        }
        return "Nessuna";
      default:
        return String(value);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid sm:grid-cols-3 gap-4">
            {platformConfigOptions.platformTypes.map((type) => (
              <Card
                key={type.id}
                className={cn(
                  "cursor-pointer transition-all hover-elevate overflow-visible",
                  config.platformType === type.id && "ring-2 ring-primary"
                )}
                onClick={() => updateConfig("platformType", type.id)}
                data-testid={`option-platform-${type.id}`}
              >
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold mb-2">{type.name}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                  {config.platformType === type.id && (
                    <div className="mt-3">
                      <Badge>Selezionato</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="grid sm:grid-cols-3 gap-4">
            {platformConfigOptions.capacities.map((cap) => (
              <Card
                key={cap.id}
                className={cn(
                  "cursor-pointer transition-all hover-elevate overflow-visible",
                  config.capacity === cap.id && "ring-2 ring-primary"
                )}
                onClick={() => updateConfig("capacity", cap.id)}
                data-testid={`option-platform-capacity-${cap.id}`}
              >
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-primary mb-1">{cap.name}</p>
                  <p className="text-sm text-muted-foreground">{cap.description}</p>
                  {config.capacity === cap.id && (
                    <div className="mt-2">
                      <Badge>Selezionato</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformConfigOptions.travelHeights.map((height) => (
              <Card
                key={height.id}
                className={cn(
                  "cursor-pointer transition-all hover-elevate overflow-visible",
                  config.travelHeight === height.id && "ring-2 ring-primary"
                )}
                onClick={() => updateConfig("travelHeight", height.id)}
                data-testid={`option-platform-height-${height.id}`}
              >
                <CardContent className="p-4 text-center">
                  <p className="font-semibold">{height.name}</p>
                  {config.travelHeight === height.id && (
                    <div className="mt-2">
                      <Badge>Selezionato</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <Card
              className={cn(
                "cursor-pointer transition-all hover-elevate overflow-visible",
                config.indoor && "ring-2 ring-primary"
              )}
              onClick={() => updateConfig("indoor", true)}
              data-testid="option-indoor"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold">Interno</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Installazione in ambiente chiuso
                </p>
                {config.indoor && (
                  <div className="mt-3">
                    <Badge>Selezionato</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card
              className={cn(
                "cursor-pointer transition-all hover-elevate overflow-visible",
                !config.indoor && "ring-2 ring-primary"
              )}
              onClick={() => updateConfig("indoor", false)}
              data-testid="option-outdoor"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <TreePine className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold">Esterno</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Resistente agli agenti atmosferici
                </p>
                {!config.indoor && (
                  <div className="mt-3">
                    <Badge>Selezionato</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="grid sm:grid-cols-3 gap-4">
            {platformConfigOptions.rampTypes.map((ramp) => (
              <Card
                key={ramp.id}
                className={cn(
                  "cursor-pointer transition-all hover-elevate overflow-visible",
                  config.rampType === ramp.id && "ring-2 ring-primary"
                )}
                onClick={() => updateConfig("rampType", ramp.id)}
                data-testid={`option-ramp-${ramp.id}`}
              >
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold mb-2">{ramp.name}</h3>
                  <p className="text-sm text-muted-foreground">{ramp.description}</p>
                  {config.rampType === ramp.id && (
                    <div className="mt-3">
                      <Badge>Selezionato</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 6:
        return (
          <div className="max-w-lg mx-auto">
            <p className="text-muted-foreground mb-6 text-center">
              Seleziona le funzionalità di sicurezza desiderate (almeno una)
            </p>
            <div className="space-y-3">
              {platformConfigOptions.safetyFeatures.map((feature) => (
                <Card
                  key={feature.id}
                  className={cn(
                    "cursor-pointer transition-all hover-elevate overflow-visible",
                    config.safetyFeatures.includes(feature.id) && "ring-2 ring-primary"
                  )}
                  onClick={() => toggleSafetyFeature(feature.id)}
                  data-testid={`option-safety-${feature.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={config.safetyFeatures.includes(feature.id)}
                        className="pointer-events-none"
                      />
                      <span className="font-medium">{feature.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Riepilogo configurazione</h3>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Tipo piattaforma</span>
                    <span className="font-medium">{getSelectedLabel("platformType")}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Capacità</span>
                    <span className="font-medium">{getSelectedLabel("capacity")}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Altezza corsa</span>
                    <span className="font-medium">{getSelectedLabel("travelHeight")}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Installazione</span>
                    <span className="font-medium">{getSelectedLabel("indoor")}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Tipo rampa</span>
                    <span className="font-medium">{getSelectedLabel("rampType")}</span>
                  </div>
                  <div className="py-2">
                    <span className="text-muted-foreground">Sicurezza</span>
                    <p className="font-medium mt-1">{getSelectedLabel("safetyFeatures")}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="text-center">
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6">
                <img
                  src={platformImg}
                  alt="Anteprima piattaforma"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-muted-foreground mb-6">
                La tua configurazione è pronta! Invia una richiesta per ricevere un preventivo personalizzato.
              </p>
              <Button 
                size="lg" 
                className="w-full sm:w-auto" 
                onClick={() => setLocation("/contatti?subject=quote")}
                data-testid="button-request-quote-platform"
              >
                Richiedi preventivo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
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
              <span className="text-foreground">Configuratore Piattaforma</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold">Configura la tua Piattaforma</h1>
            <p className="text-muted-foreground mt-2">
              Progetta la soluzione perfetta per l'accessibilità in pochi passaggi
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="mb-8 overflow-x-auto">
            <div className="flex items-center justify-between min-w-max gap-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
                    disabled={step.id > currentStep}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                      step.id === currentStep && "bg-primary text-primary-foreground",
                      step.id < currentStep && "text-primary cursor-pointer hover-elevate",
                      step.id > currentStep && "text-muted-foreground cursor-not-allowed"
                    )}
                    data-testid={`platform-step-${step.id}`}
                  >
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium",
                        step.id === currentStep && "bg-primary-foreground text-primary",
                        step.id < currentStep && "bg-primary text-primary-foreground",
                        step.id > currentStep && "bg-muted"
                      )}
                    >
                      {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">{step.name}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "w-8 h-0.5 mx-2",
                      step.id < currentStep ? "bg-primary" : "bg-muted"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].name}</CardTitle>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              data-testid="button-platform-prev"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Indietro
            </Button>
            {currentStep < steps.length && (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                data-testid="button-platform-next"
              >
                Avanti
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
