import { useLocation } from "wouter";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { companyInfo, navItems } from "@/lib/data";

export function Footer() {
  const [, setLocation] = useLocation();
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    
    if (!email || !email.includes("@")) {
      alert("Veuillez entrer une adresse e-mail valide");
      return;
    }
    
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
              <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">FV</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">{companyInfo.name}</h3>
                <p className="text-sm text-muted-foreground">Ascenseurs et Composants</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md">
              Depuis 1965, Prodlift conçoit et produit des ascenseurs, des plateformes élévatrices
              et des composants de haute qualité. Notre expérience et innovation nous rendent
              une référence dans le secteur des ascenseurs.
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
            <h4 className="font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {navItems.slice(0, 4).map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/chi-siamo">Qui sommes-nous</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Produits</h4>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/catalogo?categoria=limitatori">Limiteurs de vitesse</FooterLink>
              </li>
              <li>
                <FooterLink href="/catalogo?categoria=operatori">Opérateurs de porte</FooterLink>
              </li>
              <li>
                <FooterLink href="/catalogo?categoria=led">Composants LED</FooterLink>
              </li>
              <li>
                <FooterLink href="/catalogo?categoria=sicurezza">Systèmes de sécurité</FooterLink>
              </li>
              <li>
                <FooterLink href="/configuratore-piattaforma">Plateformes élévatrices</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contacts</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="footer-link-phone"
                >
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{companyInfo.phone}</span>
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

            <div className="mt-6">
              <h5 className="font-medium text-sm mb-2">Newsletter</h5>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Votre email"
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
            <p>© {currentYear} {companyInfo.name}. Tous droits réservés.</p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <FooterLink href="/privacy">Politique de confidentialité</FooterLink>
              <FooterLink href="/cookie">Politique des cookies</FooterLink>
              <FooterLink href="/termini">Termes et Conditions</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
