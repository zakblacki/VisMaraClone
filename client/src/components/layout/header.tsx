import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Phone,
  MapPin,
  Search,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { navItems, companyInfo } from "@/lib/data";
import { useTheme } from "@/components/theme-provider";
import { LanguageSelector, useLanguage } from "@/lib/i18n";

export function Header() {
  const [location, setLocation] = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/catalog?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const navigateTo = (href: string) => {
    setLocation(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-6 flex-wrap">
              <a
                href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                data-testid="link-phone"
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{companyInfo.phone}</span>
              </a>
              <a
                href={`tel:${companyInfo.phone2?.replace(/\s/g, '') || ''}`}
                className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity"
                data-testid="link-phone-2"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{companyInfo.phone2}</span>
              </a>
              <div className="hidden md:flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                <span>{companyInfo.address}, {companyInfo.city}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                data-testid="button-theme-toggle"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setLocation("/")}
              data-testid="link-logo"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg lg:text-xl">FV</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-base lg:text-lg text-foreground leading-tight">
                  Prodlift
                </h1>
                <p className="text-xs text-muted-foreground">
                  Ascenseurs et Composants
                </p>
              </div>
            </div>

            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-1">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger
                          className={cn(
                            "h-10 px-4 text-sm font-medium",
                            location.startsWith(item.href) && "bg-accent"
                          )}
                        >
                          {t(item.label)}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="left-0">
                          <ul className="grid w-[280px] gap-1 p-3">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <div
                                  onClick={() => navigateTo(child.href)}
                                  className={cn(
                                    "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate cursor-pointer",
                                    location === child.href && "bg-accent"
                                  )}
                                  data-testid={`link-nav-${child.label.toLowerCase().replace(/\s/g, '-')}`}
                                >
                                  <div className="text-sm font-medium leading-none">
                                    {t(child.label)}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <div
                        onClick={() => navigateTo(item.href)}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover-elevate focus:outline-none cursor-pointer",
                          location === item.href && "bg-accent"
                        )}
                        data-testid={`link-nav-${item.label.toLowerCase()}`}
                      >
                        {t(item.label)}
                      </div>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-2">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <Input
                    type="search"
                    placeholder={t("header.search_placeholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 lg:w-64"
                    autoFocus
                    data-testid="input-search"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    data-testid="button-close-search"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  data-testid="button-open-search"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}

              <div className="hidden lg:flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLocation("/elevator-configurator")}
                  data-testid="button-configure-elevator"
                >
                  {t("header.configure_elevator")}
                </Button>
              </div>

              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    data-testid="button-mobile-menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                  <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="mt-6 flex flex-col gap-2">
                    {navItems.map((item) => (
                      <div key={item.label}>
                        {item.children ? (
                          <Collapsible>
                            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-md hover-elevate">
                              <span className="font-medium">{t(item.label)}</span>
                              <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div className="ml-4 mt-1 flex flex-col gap-1">
                                {item.children.map((child) => (
                                  <button
                                    key={child.label}
                                    onClick={() => navigateTo(child.href)}
                                    className="text-left p-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover-elevate"
                                  >
                                    {t(child.label)}
                                  </button>
                                ))}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <button
                            onClick={() => navigateTo(item.href)}
                            className="text-left w-full p-3 rounded-md font-medium hover-elevate"
                          >
                            {t(item.label)}
                          </button>
                        )}
                      </div>
                    ))}
                    <div className="mt-4 pt-4 border-t flex flex-col gap-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => navigateTo("/elevator-configurator")}
                      >
                        {t("header.configure_elevator")}
                      </Button>
                      <Button
                        className="w-full"
                        onClick={() => navigateTo("/contact")}
                      >
                        {t("nav.contact")}
                      </Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
