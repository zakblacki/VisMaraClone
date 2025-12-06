import { useParams, useLocation } from "wouter";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const legalContent: Record<string, { title: string; content: string }> = {
  "termini": {
    title: "Termes et Conditions",
    content: `
# Termes et Conditions

## 1. Acceptation des Conditions

En accédant et en utilisant ce site web, vous acceptez d'être lié par ces termes et conditions. Si vous n'acceptez pas ces termes, veuillez ne pas utiliser ce site.

## 2. Utilisation Autorisée

Vous acceptez d'utiliser ce site uniquement à des fins légales et de ne pas utiliser ce site d'une manière qui pourrait endommager, désactiver, surcharger ou altérer le site.

## 3. Propriété Intellectuelle

Tout le contenu de ce site, y compris les textes, les graphiques, les logos, les images et les logiciels, est la propriété de Prodlift ou de ses fournisseurs de contenu et est protégé par les lois internationales sur les droits d'auteur.

## 4. Limitation de Responsabilité

Prodlift ne sera pas responsable des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser ce site ou le contenu.

## 5. Modifications des Conditions

Prodlift se réserve le droit de modifier ces conditions à tout moment. Les modifications seront effectives immédiatement après leur publication sur le site.

## 6. Loi Applicable

Ces conditions sont régies par les lois applicables et vous acceptez la juridiction exclusive des tribunaux compétents.

## 7. Contact

Pour toute question concernant ces conditions, veuillez nous contacter à contact@prodlift.com
    `
  },
  "privacy": {
    title: "Politique de Confidentialité",
    content: `
# Politique de Confidentialité

## 1. Introduction

Prodlift s'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles.

## 2. Collecte de Données

Nous collectons les informations que vous nous fournissez volontairement, notamment :
- Nom et adresse e-mail
- Numéro de téléphone et adresse
- Informations sur l'entreprise
- Messages et demandes de renseignements

## 3. Utilisation des Données

Vos données sont utilisées pour :
- Répondre à vos demandes
- Améliorer nos services
- Vous envoyer des informations pertinentes
- Respecter les obligations légales

## 4. Protection des Données

Nous utilisons des mesures de sécurité appropriées pour protéger vos données contre l'accès non autorisé, la modification ou la destruction.

## 5. Partage des Données

Nous ne partageons pas vos données personnelles avec des tiers sans votre consentement, sauf si la loi l'exige.

## 6. Droits de l'Utilisateur

Vous avez le droit d'accéder, de corriger ou de supprimer vos données personnelles. Contactez-nous pour exercer ces droits.

## 7. Cookies

Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez contrôler les cookies via les paramètres de votre navigateur.

## 8. Contact

Pour toute question concernant cette politique, contactez-nous à privacy@prodlift.com
    `
  },
  "cookie": {
    title: "Politique des Cookies",
    content: `
# Politique des Cookies

## 1. Qu'est-ce qu'un Cookie ?

Un cookie est un petit fichier texte stocké sur votre appareil qui nous aide à vous reconnaître et à améliorer votre expérience.

## 2. Types de Cookies Utilisés

### Cookies Essentiels
Nécessaires au fonctionnement du site (authentification, sécurité).

### Cookies de Performance
Nous aident à comprendre comment vous utilisez le site pour l'améliorer.

### Cookies de Fonctionnalité
Mémorisent vos préférences (langue, thème).

### Cookies de Marketing
Utilisés pour vous montrer des publicités pertinentes.

## 3. Consentement aux Cookies

En utilisant notre site, vous consentez à l'utilisation de cookies conformément à cette politique.

## 4. Gestion des Cookies

Vous pouvez contrôler les cookies via :
- Les paramètres de votre navigateur
- Les outils de gestion des cookies du site
- Les paramètres de confidentialité de votre appareil

## 5. Cookies Tiers

Certains cookies peuvent être définis par des tiers (Google Analytics, etc.). Consultez leur politique de confidentialité.

## 6. Durée de Conservation

Les cookies sont généralement conservés pendant une période définie ou jusqu'à ce que vous les supprimiez.

## 7. Contact

Pour des questions sur les cookies, contactez-nous à cookies@prodlift.com
    `
  },
  "about-us": {
    title: "Qui Sommes-Nous",
    content: `
## Notre Histoire

PRODLIFT est une entreprise Algéro-Italienne née de l'alliance stratégique entre des acteurs expérimentés du secteur des ascenseurs en Algérie et en Italie. Fondée avec la volonté de répondre aux besoins croissants du marché algérien et africain en matière de solutions verticales, PRODLIFT incarne une nouvelle génération d'industriels engagés dans le développement local, l'innovation technologique et la formation des compétences.

Face à une demande nationale en forte croissance – estimée à plusieurs centaines de milliers d'unités d'ici 2026 en lien avec les vastes programmes de logements, d'infrastructures et de bâtiments publics –, PRODLIFT se positionne comme un acteur central de la filière ascensoriste en Algérie, avec une vision industrielle et durable.

## Notre Mission

Notre mission est de fournir des solutions d'ascenseurs innovantes, sûres et fiables qui améliorent la mobilité et l'accessibilité pour tous.

## Notre Vision

Nous envisageons un monde où les ascenseurs et les plateformes élévatrices sont accessibles, efficaces et durables, contribuant à une meilleure qualité de vie.

## Nos Valeurs

### Qualité
Nous nous engageons à fournir des produits de la plus haute qualité, testés rigoureusement et conformes aux normes internationales.

### Innovation
Nous investissons continuellement dans la recherche et le développement pour offrir des solutions avant-gardistes.

### Sécurité
La sécurité est notre priorité absolue. Tous nos produits respectent les normes de sécurité les plus strictes.

### Durabilité
Nous nous engageons à minimiser notre impact environnemental et à promouvoir des pratiques durables.

### Service Client
Nous fournissons un support client exceptionnel et des solutions personnalisées pour chaque client.

## Notre Équipe

Notre équipe est composée d'ingénieurs expérimentés, de techniciens qualifiés et de professionnels du service client dédiés à votre satisfaction.

## Nos Installations

Nous disposons d'installations de fabrication modernes équipées de la dernière technologie pour assurer la qualité et l'efficacité de la production.

## Certifications

Nos produits sont certifiés selon les normes internationales :
- CE EN81-20
- ISO 9001
- ISO 14001

## Contactez-Nous

Pour en savoir plus sur Prodlift, veuillez nous contacter à prodlift.dc@gmail.com ou appeler 0770 52 54 64 / 0770 25 77 77
    `
  }
};

export default function LegalPages() {
  const [location, setLocation] = useLocation();
  const params = useParams();
  
  // Determine page from URL path
  let pageKey: keyof typeof legalContent = "termini";
  
  if (location.includes("/terms")) pageKey = "termini";
  else if (location.includes("/privacy")) pageKey = "privacy";
  else if (location.includes("/cookies")) pageKey = "cookie";
  else if (location.includes("/about-us")) pageKey = "about-us";
  else if (params.page) pageKey = params.page as keyof typeof legalContent;
  
  const page = legalContent[pageKey];

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Page non trouvée</h1>
            <Button onClick={() => setLocation("/")}>
              Retour à l'accueil
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <button
                onClick={() => setLocation("/")}
                className="hover:text-foreground cursor-pointer"
              >
                Home
              </button>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{page.title}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
            
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {page.content.split('\n').map((line, idx) => {
                if (line.startsWith('# ')) {
                  return <h1 key={idx} className="text-3xl font-bold mt-8 mb-4">{line.replace('# ', '')}</h1>;
                }
                if (line.startsWith('## ')) {
                  return <h2 key={idx} className="text-2xl font-bold mt-6 mb-3">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                  return <h3 key={idx} className="text-xl font-semibold mt-4 mb-2">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                  return <li key={idx} className="ml-6 mb-2">{line.replace('- ', '')}</li>;
                }
                if (line.trim() === '') {
                  return <div key={idx} className="mb-4" />;
                }
                return <p key={idx} className="mb-4 text-muted-foreground leading-relaxed">{line}</p>;
              })}
            </div>

            <div className="mt-12 pt-8 border-t">
              <Button
                variant="outline"
                onClick={() => setLocation("/")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
