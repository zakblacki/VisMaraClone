import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n";
import Home from "@/pages/home";
import Catalog from "@/pages/catalog";
import ProductDetail from "@/pages/product-detail";
import Contact from "@/pages/contact";
import ElevatorConfigurator from "@/pages/elevator-configurator";
import PlatformConfigurator from "@/pages/platform-configurator";
import Downloads from "@/pages/downloads";
import Services from "@/pages/services";
import Installations from "@/pages/installations";
import LegalPages from "@/pages/legal-pages";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/catalog/:category" component={Catalog} />
      <Route path="/product/:slug" component={ProductDetail} />
      <Route path="/contact" component={Contact} />
      <Route path="/elevator-configurator" component={ElevatorConfigurator} />
      <Route path="/configurators" component={ElevatorConfigurator} />
      <Route path="/platform-configurator" component={PlatformConfigurator} />
      <Route path="/download" component={Downloads} />
      <Route path="/services" component={Services} />
      <Route path="/services/:slug" component={Services} />
      <Route path="/installations" component={Installations} />
      <Route path="/installations/:slug" component={Installations} />
      <Route path="/terms" component={() => <LegalPages />} />
      <Route path="/privacy" component={() => <LegalPages />} />
      <Route path="/cookies" component={() => <LegalPages />} />
      <Route path="/about-us" component={() => <LegalPages />} />
      <Route path="/legal/:page" component={LegalPages} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vismara-theme">
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ScrollToTop />
            <Toaster />
            <Router />
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
