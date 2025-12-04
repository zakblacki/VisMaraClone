import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { heroSlides } from "@/lib/data";

import speedGovernorImg from "@assets/generated_images/elevator_speed_governor_product.png";
import doorOperatorImg from "@assets/generated_images/elevator_door_operator_mechanism.png";
import elevatorCabinImg from "@assets/generated_images/luxury_elevator_cabin_interior.png";

const imageMap: Record<string, string> = {
  speedGovernor: speedGovernorImg,
  doorOperator: doorOperatorImg,
  elevatorCabin: elevatorCabinImg,
};

export function HeroCarousel() {
  const [, setLocation] = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="relative w-full min-h-[60vh] lg:min-h-[70vh] overflow-hidden bg-gradient-to-br from-primary/5 to-background">
      <div className="relative h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-all duration-700 ease-in-out",
              index === currentSlide 
                ? "opacity-100 translate-x-0" 
                : index < currentSlide 
                  ? "opacity-0 -translate-x-full" 
                  : "opacity-0 translate-x-full"
            )}
          >
            <div className="container mx-auto px-4 lg:px-8 h-full">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full py-12 lg:py-20">
                <div className="order-2 lg:order-1 text-center lg:text-left">
                  <p className="text-primary font-semibold text-sm lg:text-base uppercase tracking-wider mb-2 lg:mb-4">
                    {slide.subtitle}
                  </p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-4 lg:mb-6">
                    {slide.title}
                  </h2>
                  <p className="text-muted-foreground text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 max-w-xl mx-auto lg:mx-0">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 lg:gap-4">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto" 
                      onClick={() => setLocation(slide.ctaLink)}
                      data-testid={`button-hero-cta-${slide.id}`}
                    >
                      {slide.ctaText}
                    </Button>
                    {slide.secondaryCta && (
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full sm:w-auto"
                        onClick={() => setLocation(slide.secondaryCta!.link)}
                        data-testid={`button-hero-secondary-${slide.id}`}
                      >
                        {slide.secondaryCta.text}
                      </Button>
                    )}
                  </div>
                </div>

                <div className="order-1 lg:order-2 relative">
                  <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
                    <img
                      src={imageMap[slide.image]}
                      alt={slide.title}
                      className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                      data-testid={`img-hero-slide-${slide.id}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg flex items-center justify-center hover-elevate transition-all z-20"
        aria-label="Slide precedente"
        data-testid="button-hero-prev"
      >
        <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg flex items-center justify-center hover-elevate transition-all z-20"
        aria-label="Slide successivo"
        data-testid="button-hero-next"
      >
        <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>

      <div className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full transition-all",
              index === currentSlide 
                ? "bg-primary w-8 lg:w-10" 
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
            aria-label={`Vai alla slide ${index + 1}`}
            data-testid={`button-hero-dot-${index}`}
          />
        ))}
      </div>
    </section>
  );
}
