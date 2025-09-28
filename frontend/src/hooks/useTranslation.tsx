import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'ar' | 'es';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const translations = {
  en: {
    // Header
    'header.home': 'Home',
    'header.transport': 'Transport',
    'header.restaurants': 'Restaurants',
    'header.hotels': 'Hotels',
    'header.rentals': 'Rentals',
    'header.events': 'Events',
    'header.emergency': 'Emergency',
    'header.news': 'News',
    'header.stadiums': 'Stadiums',
    'header.cities': 'Cities',
    'header.schedule': 'Schedule',
    'header.tickets': 'Tickets',
    'header.volunteers': 'Volunteers',
    'header.signin': 'Sign In',
    'header.signup': 'Sign Up',
    'header.title': 'Marhba Bik',
    'header.subtitle': 'Morocco 2030 FIFA World Cup',
    'header.guide': 'Guide',
    
    // Home Page
    'home.welcome': 'Welcome to Morocco 2030',
    'home.subtitle': 'FIFA World Cup Experience',
    'home.description': 'Join us for the most spectacular FIFA World Cup in history. Morocco welcomes the world with open arms.',
    'home.cta.main': 'Plan Your Journey',
    'home.cta.secondary': 'Watch Live',
    'home.countdown': 'Days until FIFA World Cup 2030',
    
    // Services
    'services.title': 'Essential Services',
    'services.transport.title': 'Transport',
    'services.transport.desc': 'Easy travel across Morocco',
    'services.hotels.title': 'Hotels',
    'services.hotels.desc': 'Comfortable accommodations',
    'services.events.title': 'Events',
    'services.events.desc': 'Cultural celebrations',
    'services.emergency.title': 'Emergency',
    'services.emergency.desc': '24/7 assistance services',

    // Guide System
    'guide.notFound': 'Guide Not Found',
    'guide.notFoundDesc': 'The guide profile you are looking for does not exist.',
    'guide.reviews': 'reviews',
    'guide.yearsExp': 'years experience',
    'guide.chatWhatsApp': 'Chat on WhatsApp',
    'guide.call': 'Call',
    'guide.email': 'Email',
    'guide.welcomeMessage': 'Welcome Message',
    'guide.welcomePlaceholder': 'Write your welcome message for visitors...',
    'guide.save': 'Save',
    'guide.cancel': 'Cancel',
    'guide.specialties': 'Specialties',
    'guide.availability': 'Availability',
    'guide.online': 'Online now',
    'guide.offline': 'Offline',
    'guide.lastSeen': 'Last seen',
    'guide.contact': 'Contact Information',
    'guide.stats': 'Statistics',
    'guide.rating': 'Rating',
    'guide.experience': 'Experience',
    'guide.years': 'years',

    // Guide Login
    'guide.login.title': 'Guide Login',
    'guide.login.subtitle': 'Access your guide dashboard',
    'guide.login.welcome': 'Welcome Back',
    'guide.login.email': 'Email Address',
    'guide.login.emailPlaceholder': 'Enter your email',
    'guide.login.password': 'Password',
    'guide.login.passwordPlaceholder': 'Enter your password',
    'guide.login.signIn': 'Sign In',
    'guide.login.signingIn': 'Signing in...',
    'guide.login.forgotPassword': 'Forgot your password?',
    'guide.login.notRegistered': 'Not registered yet?',
    'guide.login.register': 'Register as a guide',
    'guide.login.secureLogin': 'Your login is secure and encrypted',
    'guide.login.demoCredentials': 'Demo Credentials',

    // Guide Dashboard
    'guide.dashboard.welcome': 'Welcome back',
    'guide.dashboard.viewProfile': 'View Profile',
    'guide.dashboard.logout': 'Logout',
    'guide.dashboard.totalBookings': 'Total Bookings',
    'guide.dashboard.monthlyEarnings': 'Monthly Earnings',
    'guide.dashboard.responseRate': 'Response Rate',
    'guide.dashboard.profile': 'Profile',
    'guide.dashboard.bookings': 'Bookings',
    'guide.dashboard.messages': 'Messages',
    'guide.dashboard.settings': 'Settings',
    'guide.dashboard.profileInfo': 'Profile Information',
    'guide.dashboard.edit': 'Edit',
    'guide.dashboard.name': 'Full Name',
    'guide.dashboard.phone': 'Phone Number',
    'guide.dashboard.whatsapp': 'WhatsApp Number',
    'guide.dashboard.bio': 'Biography',
    'guide.dashboard.saveChanges': 'Save Changes',
    'guide.dashboard.recentBookings': 'Recent Bookings',
    'guide.dashboard.noBookings': 'No bookings yet',
    'guide.dashboard.noMessages': 'No messages yet',
    'guide.dashboard.availabilityDesc': 'Show as available to receive bookings',
    'guide.dashboard.notificationsDesc': 'Receive email and push notifications',

    // Guides Listing
    'guides.badge': 'Professional Guides',
    'guides.title': 'Meet Our Local Guides',
    'guides.subtitle': 'Connect with certified local guides who will make your Morocco 2030 World Cup experience unforgettable',
    'guides.searchPlaceholder': 'Search guides, cities, or specialties...',
    'guides.selectCity': 'Select City',
    'guides.sortBy': 'Sort By',
    'guides.sortRating': 'Highest Rated',
    'guides.sortExperience': 'Most Experienced',
    'guides.sortPrice': 'Lowest Price',
    'guides.sortReviews': 'Most Reviews',
    'guides.resultsCount': '{count} guides found',
    'guides.noResults': 'No guides found',
    'guides.noResultsDesc': 'Try adjusting your search criteria or filters',
    'guides.languages': 'Languages',
    'guides.specialties': 'Specialties',
    'guides.perHour': 'per hour',
    'guides.viewProfile': 'View Profile',
    'guides.cta.title': 'Want to become a guide?',
    'guides.cta.description': 'Join our community of professional guides and help visitors discover the beauty of Morocco during the 2030 World Cup',
    'guides.cta.becomeGuide': 'Become a Guide',
    'guides.cta.contact': 'Contact Us',
  },
  fr: {
    // Header
    'header.home': 'Accueil',
    'header.transport': 'Transport',
    'header.restaurants': 'Restaurants',
    'header.hotels': 'Hôtels',
    'header.rentals': 'Locations',
    'header.events': 'Événements',
    'header.emergency': 'Urgence',
    'header.news': 'Actualités',
    'header.stadiums': 'Stades',
    'header.cities': 'Villes',
    'header.schedule': 'Calendrier',
    'header.tickets': 'Billets',
    'header.volunteers': 'Bénévoles',
    'header.signin': 'Connexion',
    'header.signup': 'Inscription',
    'header.title': 'Marhba Bik',
    'header.subtitle': 'Maroc 2030 Coupe du Monde FIFA',
    'header.guide': 'Guide',
    
    // Home Page
    'home.welcome': 'Bienvenue au Maroc 2030',
    'home.subtitle': 'Expérience Coupe du Monde FIFA',
    'home.description': "Rejoignez-nous pour la Coupe du Monde FIFA la plus spectaculaire de l'histoire. Le Maroc accueille le monde à bras ouverts.",
    'home.cta.main': 'Planifiez Votre Voyage',
    'home.cta.secondary': 'Regarder en Direct',
    'home.countdown': 'Jours avant la Coupe du Monde FIFA 2030',
    
    // Services
    'services.title': 'Services Essentiels',
    'services.transport.title': 'Transport',
    'services.transport.desc': 'Voyage facile à travers le Maroc',
    'services.hotels.title': 'Hôtels',
    'services.hotels.desc': 'Hébergements confortables',
    'services.events.title': 'Événements',
    'services.events.desc': 'Célébrations culturelles',
    'services.emergency.title': 'Urgence',
    'services.emergency.desc': 'Services dassistance 24h/24',

    // Guide System
    'guide.notFound': 'Guide Introuvable',
    'guide.notFoundDesc': 'Le profil de guide que vous recherchez n\'existe pas.',
    'guide.reviews': 'avis',
    'guide.yearsExp': 'années d\'expérience',
    'guide.chatWhatsApp': 'Discuter sur WhatsApp',
    'guide.call': 'Appeler',
    'guide.email': 'Email',
    'guide.welcomeMessage': 'Message de Bienvenue',
    'guide.welcomePlaceholder': 'Écrivez votre message de bienvenue pour les visiteurs...',
    'guide.save': 'Enregistrer',
    'guide.cancel': 'Annuler',
    'guide.specialties': 'Spécialités',
    'guide.availability': 'Disponibilité',
    'guide.online': 'En ligne maintenant',
    'guide.offline': 'Hors ligne',
    'guide.lastSeen': 'Vu pour la dernière fois',
    'guide.contact': 'Informations de Contact',
    'guide.stats': 'Statistiques',
    'guide.rating': 'Note',
    'guide.experience': 'Expérience',
    'guide.years': 'années',

    // Guide Login
    'guide.login.title': 'Connexion Guide',
    'guide.login.subtitle': 'Accédez à votre tableau de bord',
    'guide.login.welcome': 'Bon Retour',
    'guide.login.email': 'Adresse Email',
    'guide.login.emailPlaceholder': 'Entrez votre email',
    'guide.login.password': 'Mot de Passe',
    'guide.login.passwordPlaceholder': 'Entrez votre mot de passe',
    'guide.login.signIn': 'Se Connecter',
    'guide.login.signingIn': 'Connexion en cours...',
    'guide.login.forgotPassword': 'Mot de passe oublié?',
    'guide.login.notRegistered': 'Pas encore inscrit?',
    'guide.login.register': 'S\'inscrire comme guide',
    'guide.login.secureLogin': 'Votre connexion est sécurisée et cryptée',
    'guide.login.demoCredentials': 'Identifiants de Démonstration',

    // Guide Dashboard
    'guide.dashboard.welcome': 'Bon retour',
    'guide.dashboard.viewProfile': 'Voir le Profil',
    'guide.dashboard.logout': 'Déconnexion',
    'guide.dashboard.totalBookings': 'Réservations Totales',
    'guide.dashboard.monthlyEarnings': 'Revenus Mensuels',
    'guide.dashboard.responseRate': 'Taux de Réponse',
    'guide.dashboard.profile': 'Profil',
    'guide.dashboard.bookings': 'Réservations',
    'guide.dashboard.messages': 'Messages',
    'guide.dashboard.settings': 'Paramètres',
    'guide.dashboard.profileInfo': 'Informations du Profil',
    'guide.dashboard.edit': 'Modifier',
    'guide.dashboard.name': 'Nom Complet',
    'guide.dashboard.phone': 'Numéro de Téléphone',
    'guide.dashboard.whatsapp': 'Numéro WhatsApp',
    'guide.dashboard.bio': 'Biographie',
    'guide.dashboard.saveChanges': 'Enregistrer les Modifications',
    'guide.dashboard.recentBookings': 'Réservations Récentes',
    'guide.dashboard.noBookings': 'Aucune réservation encore',
    'guide.dashboard.noMessages': 'Aucun message encore',
    'guide.dashboard.availabilityDesc': 'Apparaître comme disponible pour recevoir des réservations',
    'guide.dashboard.notificationsDesc': 'Recevoir des notifications par email et push',
  },
  ar: {
    // Header
    'header.home': 'الرئيسية',
    'header.transport': 'النقل',
    'header.restaurants': 'المطاعم',
    'header.hotels': 'الفنادق',
    'header.rentals': 'الإيجارات',
    'header.events': 'الأحداث',
    'header.emergency': 'الطوارئ',
    'header.news': 'الأخبار',
    'header.stadiums': 'الملاعب',
    'header.cities': 'المدن',
    'header.schedule': 'الجدولة',
    'header.tickets': 'التذاكر',
    'header.volunteers': 'المتطوعون',
    'header.signin': 'تسجيل الدخول',
    'header.signup': 'التسجيل',
    'header.title': 'مرحبا بك',
    'header.subtitle': 'المغرب 2030 كأس العالم فيفا',
    'header.guide': 'الدليل',
    
    // Home Page
    'home.welcome': 'مرحباً بكم في المغرب 2030',
    'home.subtitle': 'تجربة كأس العالم فيفا',
    'home.description': 'انضموا إلينا في أروع كأس عالم فيفا في التاريخ. المغرب يرحب بالعالم بأذرع مفتوحة.',
    'home.cta.main': 'خطط لرحلتك',
    'home.cta.secondary': 'شاهد مباشرة',
    'home.countdown': 'أيام حتى كأس العالم فيفا 2030',
    
    // Services
    'services.title': 'الخدمات الأساسية',
    'services.transport.title': 'النقل',
    'services.transport.desc': 'سفر سهل عبر المغرب',
    'services.hotels.title': 'الفنادق',
    'services.hotels.desc': 'إقامة مريحة',
    'services.events.title': 'الأحداث',
    'services.events.desc': 'احتفالات ثقافية',
    'services.emergency.title': 'الطوارئ',
    'services.emergency.desc': 'خدمات المساعدة على مدار الساعة',

    // Guide System
    'guide.notFound': 'المرشد غير موجود',
    'guide.notFoundDesc': 'ملف المرشد الذي تبحث عنه غير موجود.',
    'guide.reviews': 'تقييمات',
    'guide.yearsExp': 'سنوات خبرة',
    'guide.chatWhatsApp': 'محادثة عبر واتساب',
    'guide.call': 'اتصال',
    'guide.email': 'بريد إلكتروني',
    'guide.welcomeMessage': 'رسالة الترحيب',
    'guide.welcomePlaceholder': 'اكتب رسالة الترحيب للزوار...',
    'guide.save': 'حفظ',
    'guide.cancel': 'إلغاء',
    'guide.specialties': 'التخصصات',
    'guide.availability': 'التوفر',
    'guide.online': 'متصل الآن',
    'guide.offline': 'غير متصل',
    'guide.lastSeen': 'آخر ظهور',
    'guide.contact': 'معلومات الاتصال',
    'guide.stats': 'الإحصائيات',
    'guide.rating': 'التقييم',
    'guide.experience': 'الخبرة',
    'guide.years': 'سنوات',

    // Guide Login
    'guide.login.title': 'تسجيل دخول المرشد',
    'guide.login.subtitle': 'الوصول إلى لوحة التحكم',
    'guide.login.welcome': 'مرحباً بعودتك',
    'guide.login.email': 'عنوان البريد الإلكتروني',
    'guide.login.emailPlaceholder': 'أدخل بريدك الإلكتروني',
    'guide.login.password': 'كلمة المرور',
    'guide.login.passwordPlaceholder': 'أدخل كلمة المرور',
    'guide.login.signIn': 'تسجيل الدخول',
    'guide.login.signingIn': 'جاري تسجيل الدخول...',
    'guide.login.forgotPassword': 'نسيت كلمة المرور؟',
    'guide.login.notRegistered': 'لم تسجل بعد؟',
    'guide.login.register': 'التسجيل كمرشد',
    'guide.login.secureLogin': 'تسجيل دخولك آمن ومشفر',
    'guide.login.demoCredentials': 'بيانات تجريبية',

    // Guide Dashboard
    'guide.dashboard.welcome': 'مرحباً بعودتك',
    'guide.dashboard.viewProfile': 'عرض الملف الشخصي',
    'guide.dashboard.logout': 'تسجيل الخروج',
    'guide.dashboard.totalBookings': 'إجمالي الحجوزات',
    'guide.dashboard.monthlyEarnings': 'الأرباح الشهرية',
    'guide.dashboard.responseRate': 'معدل الاستجابة',
    'guide.dashboard.profile': 'الملف الشخصي',
    'guide.dashboard.bookings': 'الحجوزات',
    'guide.dashboard.messages': 'الرسائل',
    'guide.dashboard.settings': 'الإعدادات',
    'guide.dashboard.profileInfo': 'معلومات الملف الشخصي',
    'guide.dashboard.edit': 'تعديل',
    'guide.dashboard.name': 'الاسم الكامل',
    'guide.dashboard.phone': 'رقم الهاتف',
    'guide.dashboard.whatsapp': 'رقم واتساب',
    'guide.dashboard.bio': 'السيرة الذاتية',
    'guide.dashboard.saveChanges': 'حفظ التغييرات',
    'guide.dashboard.recentBookings': 'الحجوزات الأخيرة',
    'guide.dashboard.noBookings': 'لا توجد حجوزات بعد',
    'guide.dashboard.noMessages': 'لا توجد رسائل بعد',
    'guide.dashboard.availabilityDesc': 'إظهار كمتاح لتلقي الحجوزات',
    'guide.dashboard.notificationsDesc': 'تلقي إشعارات البريد الإلكتروني والدفع',
  },
  es: {
    // Header
    'header.home': 'Inicio',
    'header.transport': 'Transporte',
    'header.restaurants': 'Restaurantes',
    'header.hotels': 'Hoteles',
    'header.rentals': 'Alquileres',
    'header.events': 'Eventos',
    'header.emergency': 'Emergencia',
    'header.news': 'Noticias',
    'header.stadiums': 'Estadios',
    'header.cities': 'Ciudades',
    'header.schedule': 'Calendario',
    'header.tickets': 'Entradas',
    'header.volunteers': 'Voluntarios',
    'header.signin': 'Iniciar Sesión',
    'header.signup': 'Registrarse',
    'header.title': 'Marhba Bik',
    'header.subtitle': 'Marruecos 2030 Copa Mundial FIFA',
    'header.guide': 'Guía',
    
    // Home Page
    'home.welcome': 'Bienvenidos a Marruecos 2030',
    'home.subtitle': 'Experiencia Copa Mundial FIFA',
    'home.description': 'Únanse a nosotros para la Copa Mundial FIFA más espectacular de la historia. Marruecos recibe al mundo con los brazos abiertos.',
    'home.cta.main': 'Planifica Tu Viaje',
    'home.cta.secondary': 'Ver en Vivo',
    'home.countdown': 'Días hasta la Copa Mundial FIFA 2030',
    
    // Services
    'services.title': 'Servicios Esenciales',
    'services.transport.title': 'Transporte',
    'services.transport.desc': 'Viaje fácil por Marruecos',
    'services.hotels.title': 'Hoteles',
    'services.hotels.desc': 'Alojamientos cómodos',
    'services.events.title': 'Eventos',
    'services.events.desc': 'Celebraciones culturales',
    'services.emergency.title': 'Emergencia',
    'services.emergency.desc': 'Servicios de asistencia 24/7',
  },
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, params?: Record<string, any>): string => {
    let translation = translations[language][key as keyof typeof translations[typeof language]] || key;
    
    // Simple parameter replacement
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{${param}}`, String(params[param]));
      });
    }
    
    return translation;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};