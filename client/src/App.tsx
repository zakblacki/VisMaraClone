import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
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
      <Route path="/catalogo" component={Catalog} />
      <Route path="/catalogo/:category" component={Catalog} />
      <Route path="/prodotto/:slug" component={ProductDetail} />
      <Route path="/contatti" component={Contact} />
      <Route path="/configuratore-ascensore" component={ElevatorConfigurator} />
      <Route path="/configuratori" component={ElevatorConfigurator} />
      <Route path="/configuratore-piattaforma" component={PlatformConfigurator} />
      <Route path="/download" component={Downloads} />
      <Route path="/servizi" component={Services} />
      <Route path="/servizi/:slug" component={Services} />
      <Route path="/impianti" component={Installations} />
      <Route path="/impianti/:slug" component={Installations} />
      <Route path="/termini" component={() => <LegalPages />} />
      <Route path="/privacy" component={() => <LegalPages />} />
      <Route path="/cookie" component={() => <LegalPages />} />
      <Route path="/chi-siamo" component={() => <LegalPages />} />
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
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ScrollToTop />
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
