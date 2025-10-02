import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Menu, 
  X, 
  Globe, 
  Calendar,
  Landmark,
  Ticket,
  Building,
  User,
  LogOut
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/contexts/AuthContext";
import moroccoLogo from "@/assets/logoworld.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [clickedDropdown, setClickedDropdown] = useState<string | null>(null);
  const { language, setLanguage, t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDropdownClick = (dropdown: string) => {
    if (clickedDropdown === dropdown) {
      setClickedDropdown(null);
      setOpenDropdown(null);
    } else {
      setClickedDropdown(dropdown);
      setOpenDropdown(dropdown);
    }
  };

  // Helper function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  // Helper function to get active link classes
  const getLinkClasses = (href: string, baseClasses: string = "text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium") => {
    const isActive = isActiveLink(href);
    return isActive 
      ? `${baseClasses} text-primary font-semibold border-b-2 border-primary pb-1`
      : baseClasses;
  };

  // Helper function to check if any route in a group is active
  const isGroupActive = (routes: string[]) => {
    return routes.some(route => isActiveLink(route));
  };

  const languages = [
    { code: "ar" as const, name: "العربية", flag: "🇲🇦" },
    { code: "fr" as const, name: "Français", flag: "🇫🇷" },
    { code: "en" as const, name: "English", flag: "🇬🇧" },
    { code: "es" as const, name: "Español", flag: "🇪🇸" },
  ];

  const currentLangName = languages.find((lang) => lang.code === language)?.name || "English";

  // Mega menu groups

  const group2 = [
    
    { name: t("header.stadiums"), href: "/stadiums", icon: Landmark },
    { name: t("header.tickets"), href: "/tickets", icon: Ticket },
    { name: t("header.schedule"), href: "/schedule", icon: Calendar },
    { name: t("header.cities"), href: "/cities", icon: Building },
  ];

  const priorityLinks = [
    { name: t("header.guide"), href: "/guide" },
    { name: t("header.news"), href: "/news" },
    // emergency handled separately to add role-based routing
  ];

  const handleEmergencyClick = () => {
    const role = user?.role?.toLowerCase();
    // Route with role as query param so EmergencyPage can customize UI by role
    if (role) {
      navigate(`/emergency?role=${encodeURIComponent(role)}`);
    } else {
      navigate('/emergency');
    }
  };

  const otherLinks = [
    { name: t("header.transport"), href: "/transport" },
    { name: t("header.events"), href: "/events" },
    { name: t("header.volunteers"), href: "/volunteers" },
    { name: "Map", href: "/map" },
    { name: t("header.emergency"), href: "/emergency", isButton: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[1100] bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse hover:opacity-90 transition-opacity">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img 
                src={moroccoLogo} 
                alt="Morocco 2030 World Cup Logo" 
                className="w-full h-full object-cover"
              />
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
              className={getLinkClasses("/")}
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
                className={`${isGroupActive(["/stadiums", "/tickets", "/schedule", "/cities"]) 
                  ? "text-primary font-semibold border-b-2 border-primary pb-1 transition-colors duration-200 text-sm font-medium" 
                  : "text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium"} flex items-center`}
                onClick={() => handleDropdownClick("group2")}
              >
                {t("matches")}
              </button>
              {(openDropdown === "group2" || clickedDropdown === "group2") && (
                <div className="absolute top-full left-0 mt-2 grid grid-cols-2 gap-4 p-4 bg-card border border-border rounded-xl shadow-elegant min-w-[400px] z-[1200]">
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

            {/* External Services Link */}
            <Link
              to="/external-services"
              className={getLinkClasses("/external-services")}
            >
              External Services
            </Link>

            {/* Priority Links */}
            {priorityLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={getLinkClasses(item.href)}
              >
                {item.name}
              </Link>
            ))}

            {/* Other Links */}
            {otherLinks.map((item) => (
              item.isButton ? (
                <button
                  key={item.name}
                  onClick={handleEmergencyClick}
                  className={getLinkClasses(item.href)}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={getLinkClasses(item.href)}
                >
                  {item.name}
                </Link>
              )
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
              <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-elegant opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[1200]">
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
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-2 hover:opacity-80">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.avatar} alt={user?.firstName} />
                    <AvatarFallback className="bg-gradient-morocco text-white text-xs">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden md:block">
                    {user?.firstName}
                  </span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/signin">
                  <Button variant="ghost" size="sm">
                    {t("header.signin")}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="hero" size="sm">
                    {t("header.signup")}
                  </Button>
                </Link>
              </div>
            )}

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
          className={`lg:hidden mt-4 overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col space-y-3 pb-4">
            {/* Home Link */}
            <Link
              to="/"
              className={`${getLinkClasses("/", "text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium")} py-2 px-4 rounded-lg hover:bg-muted`}
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

            {/* External Services Link */}
            <Link
              to="/external-services"
              className={`${getLinkClasses("/external-services", "text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium")} py-2 px-4 rounded-lg hover:bg-muted`}
              onClick={() => setIsMenuOpen(false)}
            >
              External Services
            </Link>

            {/* Priority Links */}
            {priorityLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${getLinkClasses(item.href, "text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium")} py-2 px-4 rounded-lg hover:bg-muted`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Other Links */}
            {otherLinks.map((item) => (
              item.isButton ? (
                <button
                  key={item.name}
                  onClick={() => { handleEmergencyClick(); setIsMenuOpen(false); }}
                  className={`text-left w-full ${getLinkClasses(item.href, "text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium")} py-2 px-4 rounded-lg hover:bg-muted`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${getLinkClasses(item.href, "text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium")} py-2 px-4 rounded-lg hover:bg-muted`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}

            <div className="flex flex-col space-y-2 pt-3 border-t border-border">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="justify-start w-full">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={user?.avatar} alt={user?.firstName} />
                          <AvatarFallback className="bg-gradient-morocco text-white text-xs">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span>My Profile</span>
                      </div>
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="justify-start w-full" 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
