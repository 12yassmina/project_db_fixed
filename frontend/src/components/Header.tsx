import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, Utensils, Hotel, Car, Ticket, Calendar, Building, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [clickedDropdown, setClickedDropdown] = useState<string | null>(null);
  const { language, setLanguage, t } = useTranslation();

  const handleDropdownClick = (dropdown: string) => {
    if (clickedDropdown === dropdown) {
      setClickedDropdown(null);
      setOpenDropdown(null);
    } else {
      setClickedDropdown(dropdown);
      setOpenDropdown(dropdown);
    }
  };

  const languages = [
    { code: "ar" as const, name: "العربية", flag: "🇲🇦" },
    { code: "fr" as const, name: "Français", flag: "🇫🇷" },
    { code: "en" as const, name: "English", flag: "🇬🇧" },
    { code: "es" as const, name: "Español", flag: "🇪🇸" },
  ];

  const currentLangName = languages.find((lang) => lang.code === language)?.name || "English";

  // Mega menu groups
  const group1 = [
    { name: t("header.restaurants"), href: "/restaurant", icon: Utensils },
    { name: t("header.hotels"), href: "/hotel", icon: Hotel },
    { name: t("header.rentals"), href: "/rental", icon: Car },
  ];

  const group2 = [
    
    { name: t("header.stadiums"), href: "/stadiums", icon: Landmark },
    { name: t("header.tickets"), href: "/tickets", icon: Ticket },
    { name: t("header.schedule"), href: "/schedule", icon: Calendar },
    { name: t("header.cities"), href: "/cities", icon: Building },
  ];

  const priorityLinks = [
    { name: t("header.guide"), href: "/guide" },
    { name: t("header.news"), href: "/news" },
    { name: t("header.emergency"), href: "/emergency" },
  ];

  const otherLinks = [
    { name: t("header.transport"), href: "/transport" },
    { name: t("header.events"), href: "/events" },
    { name: t("header.volunteers"), href: "/volunteers" },
    { name: "Carte", href: "/map" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse hover:opacity-90 transition-opacity">
            <div className="w-12 h-12 bg-gradient-morocco rounded-full flex items-center justify-center shadow-morocco">
              <span className="text-2xl">⚽</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                {t("header.title")}
              </h1>
              <p className="text-xs text-muted-foreground">{t("header.subtitle")}</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse relative">
            {/* Home Link */}
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium"
            >
              {t("header.home")}
            </Link>

            {/* Group 2 Dropdown - Matches */}
            <div
              className="relative"
              onMouseEnter={() => !clickedDropdown && setOpenDropdown("group2")}
              onMouseLeave={() => !clickedDropdown && setOpenDropdown(null)}
            >
              <button 
                className="text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium flex items-center"
                onClick={() => handleDropdownClick("group2")}
              >
                {t("matches")}
              </button>
              {(openDropdown === "group2" || clickedDropdown === "group2") && (
                <div className="absolute top-full left-0 mt-2 grid grid-cols-2 gap-4 p-4 bg-card border border-border rounded-xl shadow-elegant min-w-[400px]">
                  {group2.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center gap-3 hover:bg-muted p-2 rounded-lg transition"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Group 1 Dropdown - Services */}
            <div
              className="relative"
              onMouseEnter={() => !clickedDropdown && setOpenDropdown("group1")}
              onMouseLeave={() => !clickedDropdown && setOpenDropdown(null)}
            >
              <button 
                className="text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium flex items-center"
                onClick={() => handleDropdownClick("group1")}
              >
                {t("services")}
              </button>
              {(openDropdown === "group1" || clickedDropdown === "group1") && (
                <div className="absolute top-full left-0 mt-2 grid grid-cols-3 gap-4 p-4 bg-card border border-border rounded-xl shadow-elegant min-w-[400px]">
                  {group1.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center gap-3 hover:bg-muted p-2 rounded-lg transition"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Priority Links */}
            {priorityLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}

            {/* Other Links */}
            {otherLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* Language Selector */}
            <div className="relative group">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 rtl:space-x-reverse">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{currentLangName}</span>
              </Button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-elegant opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className="w-full px-4 py-2 text-left hover:bg-muted transition-colors duration-200 flex items-center space-x-3 rtl:space-x-reverse first:rounded-t-lg last:rounded-b-lg"
                  >
                    <span>{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Auth */}
            <Link to="/signin">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                {t("header.signin")}
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="sm">
                {t("header.signup")}
              </Button>
            </Link>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden mt-4 overflow-hidden transition-all duration-300",
            isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col space-y-3 pb-4">
            {/* Home Link */}
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium py-2 px-4 rounded-lg hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("header.home")}
            </Link>

            {/* Group 2 - Matches */}
            <div>
              <p className="px-4 pt-2 text-sm font-semibold">{t("matches")}</p>
              {group2.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-6 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Group 1 - Services */}
            <div>
              <p className="px-4 pt-2 text-sm font-semibold">{t("services")}</p>
              {group1.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-6 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Priority Links */}
            {priorityLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium py-2 px-4 rounded-lg hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Other Links */}
            {otherLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium py-2 px-4 rounded-lg hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="flex flex-col space-y-2 pt-3 border-t border-border">
              <Link to="/signin">
                <Button variant="ghost" size="sm" className="justify-start w-full">
                  {t("header.signin")}
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="hero" size="sm" className="w-full">
                  {t("header.signup")}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
