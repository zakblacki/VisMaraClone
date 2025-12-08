import { useState } from "react";
import { useLocation } from "wouter";
import { ChevronRight, ChevronLeft, Check, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { elevatorConfigOptions } from "@/lib/data";

import elevatorCabinImg from "@assets/generated_images/luxury_elevator_cabin_interior.png";
import cabinTypesImg from "@assets/generated_images/four_elevator_cabin_types.png";
import finishMaterialsImg from "@assets/generated_images/elevator_finish_material_samples.png";
import lightingOptionsImg from "@assets/generated_images/elevator_lighting_options.png";
import doorOperatorImg from "@assets/generated_images/elevator_door_operator_mechanism.png";
import controlPanelImg from "@assets/generated_images/elevator_control_panel_buttons.png";

interface ConfigState {
  cabinType: string;
  capacity: string;
  doorType: string;
  finishMaterial: string;
  lighting: string;
  controlPanel: string;
}

export default function ElevatorConfigurator() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<ConfigState>({
    cabinType: "",
    capacity: "",
    doorType: "",
    finishMaterial: "",
    lighting: "",
    controlPanel: "",
  });

  const steps = [
    { id: 1, name: t("elevator.step.cabin_type"), key: "cabinType" },
    { id: 2, name: t("elevator.step.capacity"), key: "capacity" },
    { id: 3, name: t("elevator.step.door"), key: "doorType" },
    { id: 4, name: t("elevator.step.finish"), key: "finishMaterial" },
    { id: 5, name: t("elevator.step.lighting"), key: "lighting" },
    { id: 6, name: t("elevator.step.control_panel"), key: "controlPanel" },
    { id: 7, name: t("configurator.summary"), key: "summary" },
  ];

  const updateConfig = (key: keyof ConfigState, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
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
    return config[stepKey as keyof ConfigState] !== "";
  };

  const canProceed = () => {
    const currentStepKey = steps[currentStep - 1].key;
    return isStepComplete(currentStepKey);
  };

  const getSelectedLabel = (key: keyof ConfigState) => {
    const value = config[key];
    if (!value) return t("configurator.not_selected");

    switch (key) {
      case "cabinType":
        return elevatorConfigOptions.cabinTypes.find((o) => o.id === value)?.name;
      case "capacity":
        return elevatorConfigOptions.capacities.find((o) => o.id === value)?.name;
      case "doorType":
        return elevatorConfigOptions.doorTypes.find((o) => o.id === value)?.name;
      case "finishMaterial":
        return elevatorConfigOptions.finishMaterials.find((o) => o.id === value)?.name;
      case "lighting":
        return elevatorConfigOptions.lighting.find((o) => o.id === value)?.name;
      case "controlPanel":
        return elevatorConfigOptions.controlPanels.find((o) => o.id === value)?.name;
      default:
        return value;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden">
              <img src={cabinTypesImg} alt={t("elevator.step.cabin_type")} className="w-full h-48 object-cover" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {elevatorConfigOptions.cabinTypes.map((type) => (
                <Card
                  key={type.id}
                  className={cn(
                    "cursor-pointer transition-all hover-elevate overflow-visible",
                    config.cabinType === type.id && "ring-2 ring-primary"
                  )}
                  onClick={() => updateConfig("cabinType", type.id)}
                  data-testid={`option-cabin-${type.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{type.name}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                      {config.cabinType === type.id && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {elevatorConfigOptions.capacities.map((cap) => (
              <Card
                key={cap.id}
                className={cn(
                  "cursor-pointer transition-all hover-elevate overflow-visible",
                  config.capacity === cap.id && "ring-2 ring-primary"
                )}
                onClick={() => updateConfig("capacity", cap.id)}
                data-testid={`option-capacity-${cap.id}`}
              >
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-primary mb-1">{cap.name}</p>
                  <p className="text-sm text-muted-foreground">{cap.kg} kg</p>
                  {config.capacity === cap.id && (
                    <div className="mt-2">
                      <Badge>{t("configurator.selected")}</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden">
              <img src={doorOperatorImg} alt={t("elevator.step.door")} className="w-full h-48 object-cover" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {elevatorConfigOptions.doorTypes.map((door) => (
                <Card
                  key={door.id}
                  className={cn(
                    "cursor-pointer transition-all hover-elevate overflow-visible",
                    config.doorType === door.id && "ring-2 ring-primary"
                  )}
                  onClick={() => updateConfig("doorType", door.id)}
                  data-testid={`option-door-${door.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{door.name}</h3>
                        <p className="text-sm text-muted-foreground">{door.description}</p>
                      </div>
                      {config.doorType === door.id && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden">
              <img src={finishMaterialsImg} alt={t("elevator.step.finish")} className="w-full h-48 object-cover" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {elevatorConfigOptions.finishMaterials.map((finish) => (
                <Card
                  key={finish.id}
                  className={cn(
                    "cursor-pointer transition-all hover-elevate overflow-visible",
                    config.finishMaterial === finish.id && "ring-2 ring-primary"
                  )}
                  onClick={() => updateConfig("finishMaterial", finish.id)}
                  data-testid={`option-finish-${finish.id}`}
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-muted to-muted-foreground/20" />
                    <h3 className="font-medium text-sm">{finish.name}</h3>
                    {config.finishMaterial === finish.id && (
                      <div className="mt-2">
                        <Badge>{t("configurator.selected")}</Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden">
              <img src={lightingOptionsImg} alt={t("elevator.step.lighting")} className="w-full h-48 object-cover" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {elevatorConfigOptions.lighting.map((light) => (
                <Card
                  key={light.id}
                  className={cn(
                    "cursor-pointer transition-all hover-elevate overflow-visible",
                    config.lighting === light.id && "ring-2 ring-primary"
                  )}
                  onClick={() => updateConfig("lighting", light.id)}
                  data-testid={`option-lighting-${light.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{light.name}</h3>
                        <p className="text-sm text-muted-foreground">{light.description}</p>
                      </div>
                      {config.lighting === light.id && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden">
              <img src={controlPanelImg} alt={t("elevator.step.control_panel")} className="w-full h-48 object-cover" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {elevatorConfigOptions.controlPanels.map((panel) => (
                <Card
                  key={panel.id}
                  className={cn(
                    "cursor-pointer transition-all hover-elevate overflow-visible",
                    config.controlPanel === panel.id && "ring-2 ring-primary"
                  )}
                  onClick={() => updateConfig("controlPanel", panel.id)}
                  data-testid={`option-panel-${panel.id}`}
                >
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold">{panel.name}</h3>
                    <p className="text-sm text-muted-foreground">{panel.description}</p>
                    {config.controlPanel === panel.id && (
                      <div className="mt-2">
                        <Badge>{t("configurator.selected")}</Badge>
                      </div>
                    )}
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
              <h3 className="font-semibold text-lg mb-4">{t("configurator.config_summary")}</h3>
              <Card>
                <CardContent className="p-4 space-y-3">
                  {Object.entries(config).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b last:border-0">
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="font-medium">{getSelectedLabel(key as keyof ConfigState)}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="text-center">
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6">
                <img
                  src={elevatorCabinImg}
                  alt={t("elevator.config_preview")}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-muted-foreground mb-6">
                {t("configurator.config_ready")}
              </p>
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => setLocation("/contact?subject=quote")}
                data-testid="button-request-quote-config"
              >
                {t("configurator.request_quote")}
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
                {t("common.home")}
              </button>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{t("elevator.configurator")}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold">{t("elevator.configure_title")}</h1>
            <p className="text-muted-foreground mt-2">
              {t("elevator.configure_subtitle")}
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
                    data-testid={`step-${step.id}`}
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
              data-testid="button-prev-step"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              {t("configurator.back")}
            </Button>
            {currentStep < steps.length && (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                data-testid="button-next-step"
              >
                {t("configurator.next")}
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
