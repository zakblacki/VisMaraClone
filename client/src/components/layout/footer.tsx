import { useLocation } from "wouter";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
  ExternalLink,
  Clock
} from "lucide-react";
import logoImage from "@assets/Logo_Prodlift_Colori_Negativo_1765061581364.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { companyInfo, navItems } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const [, setLocation] = useLocation();
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const honeypot = formData.get("website") as string;
    
    if (honeypot) {
      console.log("Bot detected");
      return;
    }
    
    if (!email || !email.includes("@")) {
      alert("Veuillez entrer une adresse e-mail valide");
      return;
    }
    
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: honeypot }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription");
      }

      alert("Merci de votre inscription à notre newsletter!");
      e.currentTarget.reset();
    } catch (error) {
      console.error("Newsletter error:", error);
      alert("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <button
      onClick={() => setLocation(href)}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-left"
    >
      {children}
    </button>
  );

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logoImage} 
                alt="Prodlift Logo" 
                className="h-12 w-auto object-contain"
              />
              <div>
                <h3 className="font-bold text-lg">{companyInfo.name}</h3>
                <p className="text-sm text-muted-foreground">Ascenseurs et Composants</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={companyInfo.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md bg-muted flex items-center justify-center hover-elevate transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={companyInfo.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md bg-muted flex items-center justify-center hover-elevate transition-colors"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={companyInfo.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md bg-muted flex items-center justify-center hover-elevate transition-colors"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.quick_links")}</h4>
            <ul className="space-y-2">
              {navItems.slice(0, 4).map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{t(item.label)}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/about-us">{t("footer.about_us")}</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.products")}</h4>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/catalog?category=limitatori">{t("footer.speed_limiters")}</FooterLink>
              </li>
              <li>
                <FooterLink href="/catalog?category=operatori">{t("footer.door_operators")}</FooterLink>
              </li>
              <li>
                <FooterLink href="/catalog?category=led">{t("footer.led_components")}</FooterLink>
              </li>
              <li>
                <FooterLink href="/catalog?category=sicurezza">{t("footer.safety_systems")}</FooterLink>
              </li>
              <li>
                <FooterLink href="/platform-configurator">{t("footer.lift_platforms")}</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.contacts")}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="footer-link-phone"
                >
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{companyInfo.phone} / {companyInfo.phone2}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="footer-link-email"
                >
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{companyInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address + ' ' + companyInfo.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="footer-link-address"
                >
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    {companyInfo.address}<br />
                    {companyInfo.city}
                  </span>
                </a>
              </li>
            </ul>

            <div className="mt-4">
              <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {t("footer.opening_hours")}
              </h5>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>{t("footer.sunday_thursday")}</li>
                <li>{t("footer.friday_saturday")}</li>
              </ul>
            </div>

            <div className="mt-6">
              <h5 className="font-medium text-sm mb-2">{t("footer.newsletter")}</h5>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 relative">
                <input
                  type="text"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  className="absolute -left-[9999px] opacity-0 h-0 w-0 overflow-hidden"
                  aria-hidden="true"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder={t("footer.email_placeholder")}
                  className="flex-1"
                  required
                  data-testid="input-newsletter-email"
                />
                <Button type="submit" size="icon" data-testid="button-newsletter-submit">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} {companyInfo.name}. {t("footer.rights_reserved")}</p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <FooterLink href="/privacy">{t("footer.privacy")}</FooterLink>
              <FooterLink href="/cookies">{t("footer.cookies")}</FooterLink>
              <FooterLink href="/terms">{t("footer.terms")}</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
