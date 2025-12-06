import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Language = "fr" | "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    "nav.products": "Produits",
    "nav.installations": "Installations",
    "nav.services": "Services",
    "nav.configurators": "Configurateurs",
    "nav.download": "Téléchargement",
    "nav.contact": "Contacts",
    "nav.speed_limiters": "Limiteurs de vitesse",
    "nav.door_operators": "Opérateurs de porte",
    "nav.led_components": "Composants LED",
    "nav.safety_systems": "Systèmes de sécurité",
    "nav.all_products": "Tous les produits",
    "nav.gearless_elevators": "Ascenseurs Gearless MRL",
    "nav.lift_platforms": "Plateformes élévatrices",
    "nav.custom_elevators": "Ascenseurs sur mesure",
    "nav.design": "Conception",
    "nav.tooling": "Outillage",
    "nav.stamping": "Découpage et moulage",
    "nav.configure_elevator": "Configurer ascenseur",
    "nav.configure_platform": "Configurer plateforme",
    "header.configure_elevator": "Configurer Ascenseur",
    "header.search_placeholder": "Rechercher des produits...",
    "footer.quick_links": "Liens rapides",
    "footer.products": "Produits",
    "footer.contacts": "Contacts",
    "footer.newsletter": "Newsletter",
    "footer.email_placeholder": "Votre email",
    "footer.about_us": "Qui sommes-nous",
    "footer.privacy": "Politique de confidentialité",
    "footer.cookies": "Politique des cookies",
    "footer.terms": "Termes et Conditions",
    "footer.rights_reserved": "Tous droits réservés.",
    "footer.description": "Depuis 1965, Prodlift conçoit et produit des ascenseurs, des plateformes élévatrices et des composants de haute qualité. Notre expérience et innovation nous rendent une référence dans le secteur des ascenseurs.",
    "footer.opening_hours": "Heures d'ouverture",
    "footer.sunday_thursday": "Dimanche - Jeudi: 8h00 - 17h00",
    "footer.friday_saturday": "Vendredi et Samedi: Fermé",
    "catalog.title": "Catalogue de produits",
    "catalog.subtitle": "Découvrez notre gamme complète de composants et pièces de rechange pour ascenseurs",
    "catalog.search_placeholder": "Rechercher des produits par nom ou code...",
    "catalog.all_categories": "Toutes les catégories",
    "catalog.sort_by": "Trier par",
    "catalog.name": "Nom",
    "catalog.code": "Code",
    "catalog.products_found": "produits trouvés",
    "catalog.no_products": "Aucun produit trouvé pour la recherche",
    "catalog.reset_filters": "Réinitialiser les filtres",
    "catalog.view_details": "Voir détails",
    "contact.title": "Contactez-nous",
    "contact.subtitle": "Nous sommes là pour vous aider",
    "downloads.title": "Espace Téléchargement",
    "downloads.subtitle": "Téléchargez catalogues, fiches techniques et documentation",
    "downloads.no_documents": "Aucun document disponible pour le moment.",
    "home.hero.title": "NOUVEAUX LIMITEURS DE VITESSE BIDIRECTIONNELS",
    "home.hero.subtitle": "Prodlift",
    "home.hero.description": "Prodlift, conçoit en toute sécurité des systèmes d'ascenseurs",
    "home.hero.learn_more": "En savoir plus",
    "home.hero.configure_cabin": "Configurer la cabine",
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.back": "Retour",
    "common.submit": "Envoyer",
    "common.cancel": "Annuler",
    "common.save": "Enregistrer",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.view": "Voir",
    "common.close": "Fermer",
    "admin.login": "Se connecter",
    "admin.username": "Nom d'utilisateur",
    "admin.password": "Mot de passe",
    "admin.login_success": "Connexion réussie",
    "admin.login_error": "Erreur de connexion",
  },
  en: {
    "nav.products": "Products",
    "nav.installations": "Installations",
    "nav.services": "Services",
    "nav.configurators": "Configurators",
    "nav.download": "Download",
    "nav.contact": "Contact",
    "nav.speed_limiters": "Speed Limiters",
    "nav.door_operators": "Door Operators",
    "nav.led_components": "LED Components",
    "nav.safety_systems": "Safety Systems",
    "nav.all_products": "All Products",
    "nav.gearless_elevators": "Gearless MRL Elevators",
    "nav.lift_platforms": "Lift Platforms",
    "nav.custom_elevators": "Custom Elevators",
    "nav.design": "Design",
    "nav.tooling": "Tooling",
    "nav.stamping": "Stamping & Molding",
    "nav.configure_elevator": "Configure Elevator",
    "nav.configure_platform": "Configure Platform",
    "header.configure_elevator": "Configure Elevator",
    "header.search_placeholder": "Search products...",
    "footer.quick_links": "Quick Links",
    "footer.products": "Products",
    "footer.contacts": "Contact",
    "footer.newsletter": "Newsletter",
    "footer.email_placeholder": "Your email",
    "footer.about_us": "About Us",
    "footer.privacy": "Privacy Policy",
    "footer.cookies": "Cookie Policy",
    "footer.terms": "Terms & Conditions",
    "footer.rights_reserved": "All rights reserved.",
    "footer.description": "Since 1965, Prodlift has been designing and producing elevators, lift platforms and high-quality components. Our experience and innovation make us a reference in the elevator sector.",
    "footer.opening_hours": "Opening Hours",
    "footer.sunday_thursday": "Sunday - Thursday: 8:00 AM - 5:00 PM",
    "footer.friday_saturday": "Friday & Saturday: Closed",
    "catalog.title": "Product Catalog",
    "catalog.subtitle": "Discover our complete range of elevator components and spare parts",
    "catalog.search_placeholder": "Search products by name or code...",
    "catalog.all_categories": "All Categories",
    "catalog.sort_by": "Sort by",
    "catalog.name": "Name",
    "catalog.code": "Code",
    "catalog.products_found": "products found",
    "catalog.no_products": "No products found for search",
    "catalog.reset_filters": "Reset Filters",
    "catalog.view_details": "View Details",
    "contact.title": "Contact Us",
    "contact.subtitle": "We're here to help",
    "downloads.title": "Download Center",
    "downloads.subtitle": "Download catalogs, datasheets and documentation",
    "downloads.no_documents": "No documents available at this time.",
    "home.hero.title": "NEW BIDIRECTIONAL SPEED LIMITERS",
    "home.hero.subtitle": "Prodlift",
    "home.hero.description": "Prodlift designs elevator systems safely",
    "home.hero.learn_more": "Learn More",
    "home.hero.configure_cabin": "Configure Cabin",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.back": "Back",
    "common.submit": "Submit",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.view": "View",
    "common.close": "Close",
    "admin.login": "Login",
    "admin.username": "Username",
    "admin.password": "Password",
    "admin.login_success": "Login successful",
    "admin.login_error": "Login error",
  },
  ar: {
    "nav.products": "المنتجات",
    "nav.installations": "التركيبات",
    "nav.services": "الخدمات",
    "nav.configurators": "المُكوِّنات",
    "nav.download": "التحميل",
    "nav.contact": "اتصل بنا",
    "nav.speed_limiters": "محددات السرعة",
    "nav.door_operators": "مشغلات الأبواب",
    "nav.led_components": "مكونات LED",
    "nav.safety_systems": "أنظمة السلامة",
    "nav.all_products": "جميع المنتجات",
    "nav.gearless_elevators": "مصاعد Gearless MRL",
    "nav.lift_platforms": "منصات الرفع",
    "nav.custom_elevators": "مصاعد مخصصة",
    "nav.design": "التصميم",
    "nav.tooling": "الأدوات",
    "nav.stamping": "الختم والقولبة",
    "nav.configure_elevator": "تكوين المصعد",
    "nav.configure_platform": "تكوين المنصة",
    "header.configure_elevator": "تكوين المصعد",
    "header.search_placeholder": "البحث عن المنتجات...",
    "footer.quick_links": "روابط سريعة",
    "footer.products": "المنتجات",
    "footer.contacts": "اتصل بنا",
    "footer.newsletter": "النشرة الإخبارية",
    "footer.email_placeholder": "بريدك الإلكتروني",
    "footer.about_us": "من نحن",
    "footer.privacy": "سياسة الخصوصية",
    "footer.cookies": "سياسة ملفات تعريف الارتباط",
    "footer.terms": "الشروط والأحكام",
    "footer.rights_reserved": "جميع الحقوق محفوظة.",
    "footer.description": "منذ عام 1965، تقوم Prodlift بتصميم وإنتاج المصاعد ومنصات الرفع والمكونات عالية الجودة. خبرتنا وابتكارنا يجعلاننا مرجعاً في قطاع المصاعد.",
    "footer.opening_hours": "ساعات العمل",
    "footer.sunday_thursday": "الأحد - الخميس: 8:00 ص - 5:00 م",
    "footer.friday_saturday": "الجمعة والسبت: مغلق",
    "catalog.title": "كتالوج المنتجات",
    "catalog.subtitle": "اكتشف مجموعتنا الكاملة من مكونات المصاعد وقطع الغيار",
    "catalog.search_placeholder": "البحث عن المنتجات بالاسم أو الرمز...",
    "catalog.all_categories": "جميع الفئات",
    "catalog.sort_by": "ترتيب حسب",
    "catalog.name": "الاسم",
    "catalog.code": "الرمز",
    "catalog.products_found": "منتجات موجودة",
    "catalog.no_products": "لم يتم العثور على منتجات للبحث",
    "catalog.reset_filters": "إعادة تعيين الفلاتر",
    "catalog.view_details": "عرض التفاصيل",
    "contact.title": "اتصل بنا",
    "contact.subtitle": "نحن هنا لمساعدتك",
    "downloads.title": "مركز التحميل",
    "downloads.subtitle": "تحميل الكتالوجات والمواصفات والوثائق",
    "downloads.no_documents": "لا توجد مستندات متاحة في الوقت الحالي.",
    "home.hero.title": "محددات سرعة ثنائية الاتجاه جديدة",
    "home.hero.subtitle": "برودليفت",
    "home.hero.description": "تصمم Prodlift أنظمة المصاعد بأمان",
    "home.hero.learn_more": "اعرف المزيد",
    "home.hero.configure_cabin": "تكوين الكابينة",
    "common.loading": "جاري التحميل...",
    "common.error": "خطأ",
    "common.back": "رجوع",
    "common.submit": "إرسال",
    "common.cancel": "إلغاء",
    "common.save": "حفظ",
    "common.delete": "حذف",
    "common.edit": "تعديل",
    "common.view": "عرض",
    "common.close": "إغلاق",
    "admin.login": "تسجيل الدخول",
    "admin.username": "اسم المستخدم",
    "admin.password": "كلمة المرور",
    "admin.login_success": "تم تسجيل الدخول بنجاح",
    "admin.login_error": "خطأ في تسجيل الدخول",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("prodlift-language");
      if (saved && (saved === "fr" || saved === "en" || saved === "ar")) {
        return saved as Language;
      }
    }
    return "fr";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("prodlift-language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: "fr", name: "Français", flag: "FR" },
    { code: "en", name: "English", flag: "EN" },
    { code: "ar", name: "العربية", flag: "AR" },
  ];

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
            language === lang.code
              ? "bg-primary-foreground/20 text-primary-foreground"
              : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
          }`}
          data-testid={`button-lang-${lang.code}`}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
}
