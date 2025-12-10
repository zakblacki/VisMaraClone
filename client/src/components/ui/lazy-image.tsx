import { useState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  fallbackSrc?: string;
  "data-testid"?: string;
}

export function LazyImage({
  src,
  alt,
  className = "",
  placeholderClassName = "",
  fallbackSrc,
  "data-testid": testId,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    if (fallbackSrc) {
      setIsLoaded(true);
    }
  };

  const imageSrc = hasError && fallbackSrc ? fallbackSrc : src;

  return (
    <div ref={imgRef} className={`relative ${placeholderClassName}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}
      {isInView && (
        <img
          src={imageSrc}
          alt={alt}
          className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          data-testid={testId}
        />
      )}
    </div>
  );
}

export default LazyImage;
