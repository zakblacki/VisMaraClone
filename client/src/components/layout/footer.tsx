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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
                <p className="text-sm text-muted-foreground">Ascensori e Componenti</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md">
              Dal 1965, Fratelli Vismara progetta e produce ascensori, piattaforme elevatrici 
              e componenti di alta qualità. La nostra esperienza e innovazione ci rendono 
              un punto di riferimento nel settore ascensoristico italiano.
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
            <h4 className="font-semibold mb-4">Link Rapidi</h4>
            <ul className="space-y-2">
              {navItems.slice(0, 4).map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/chi-siamo">Chi Siamo</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Prodotti</h4>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/catalogo?categoria=limitatori">Limitatori di velocità</FooterLink>
              </li>
              <li>
                <FooterLink href="/catalogo?categoria=operatori">Operatori porta</FooterLink>
              </li>
              <li>
                <FooterLink href="/catalogo?categoria=led">Componenti LED</FooterLink>
              </li>
              <li>
                <FooterLink href="/catalogo?categoria=sicurezza">Sistemi di sicurezza</FooterLink>
              </li>
              <li>
                <FooterLink href="/configuratore-piattaforma">Piattaforme elevatrici</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contatti</h4>
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
                  placeholder="La tua email" 
                  className="flex-1"
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
            <p>© {currentYear} {companyInfo.name}. Tutti i diritti riservati.</p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/cookie">Cookie Policy</FooterLink>
              <FooterLink href="/termini">Termini e Condizioni</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
