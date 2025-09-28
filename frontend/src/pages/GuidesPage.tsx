import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  Search,
  MapPin, 
  Languages, 
  Star, 
  MessageCircle,
  Filter,
  Users,
  Globe,
  Award
} from "lucide-react";

// Mock guides data - replace with real API data
const MOCK_GUIDES = [
  {
    id: "ahmed-casablanca",
    name: "Ahmed Benali",
    nameAr: "أحمد بنعلي",
    photo: "/api/placeholder/120/120",
    city: "Casablanca",
    cityAr: "الدار البيضاء",
    languages: ["Arabic", "French", "English"],
    languagesAr: ["العربية", "الفرنسية", "الإنجليزية"],
    bio: "Professional tour guide with 8 years of experience in Casablanca.",
    bioAr: "مرشد سياحي محترف مع 8 سنوات من الخبرة في الدار البيضاء.",
    rating: 4.9,
    totalReviews: 127,
    yearsExperience: 8,
    specialties: ["Cultural Tours", "Stadium Visits", "Food Tours"],
    specialtiesAr: ["الجولات الثقافية", "زيارات الملاعب", "جولات الطعام"],
    isOnline: true,
    pricePerHour: 25
  },
  {
    id: "fatima-marrakech",
    name: "Fatima Zahra",
    nameAr: "فاطمة الزهراء",
    photo: "/api/placeholder/120/120",
    city: "Marrakech",
    cityAr: "مراكش",
    languages: ["Arabic", "French", "English", "Spanish"],
    languagesAr: ["العربية", "الفرنسية", "الإنجليزية", "الإسبانية"],
    bio: "Passionate guide from the Red City with deep knowledge of Berber culture.",
    bioAr: "مرشدة متحمسة من المدينة الحمراء مع معرفة عميقة بالثقافة الأمازيغية.",
    rating: 4.8,
    totalReviews: 89,
    yearsExperience: 6,
    specialties: ["Berber Culture", "Souk Tours", "Palace Visits"],
    specialtiesAr: ["الثقافة الأمازيغية", "جولات الأسواق", "زيارات القصور"],
    isOnline: false,
    pricePerHour: 22
  },
  {
    id: "youssef-rabat",
    name: "Youssef Alami",
    nameAr: "يوسف العلمي",
    photo: "/api/placeholder/120/120",
    city: "Rabat",
    cityAr: "الرباط",
    languages: ["Arabic", "French", "English"],
    languagesAr: ["العربية", "الفرنسية", "الإنجليزية"],
    bio: "History expert specializing in Morocco's capital and royal heritage.",
    bioAr: "خبير تاريخ متخصص في عاصمة المغرب والتراث الملكي.",
    rating: 4.7,
    totalReviews: 64,
    yearsExperience: 5,
    specialties: ["Historical Sites", "Royal Heritage", "Museums"],
    specialtiesAr: ["المواقع التاريخية", "التراث الملكي", "المتاحف"],
    isOnline: true,
    pricePerHour: 20
  },
  {
    id: "sara-tangier",
    name: "Sara Bennani",
    nameAr: "سارة بناني",
    photo: "/api/placeholder/120/120",
    city: "Tangier",
    cityAr: "طنجة",
    languages: ["Arabic", "French", "English", "Spanish"],
    languagesAr: ["العربية", "الفرنسية", "الإنجليزية", "الإسبانية"],
    bio: "Multilingual guide specializing in Tangier's unique Mediterranean culture.",
    bioAr: "مرشدة متعددة اللغات متخصصة في ثقافة طنجة المتوسطية الفريدة.",
    rating: 4.9,
    totalReviews: 156,
    yearsExperience: 7,
    specialties: ["Mediterranean Culture", "Coastal Tours", "Art Galleries"],
    specialtiesAr: ["الثقافة المتوسطية", "الجولات الساحلية", "المعارض الفنية"],
    isOnline: true,
    pricePerHour: 28
  }
];

const CITIES = [
  { value: "all", label: "All Cities", labelAr: "جميع المدن" },
  { value: "casablanca", label: "Casablanca", labelAr: "الدار البيضاء" },
  { value: "marrakech", label: "Marrakech", labelAr: "مراكش" },
  { value: "rabat", label: "Rabat", labelAr: "الرباط" },
  { value: "tangier", label: "Tangier", labelAr: "طنجة" }
];

const GuidesPage: React.FC = () => {
  const { t, language } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  // Filter and sort guides
  const filteredGuides = MOCK_GUIDES
    .filter(guide => {
      const matchesSearch = searchTerm === "" || 
        guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCity = selectedCity === "all" || 
        guide.city.toLowerCase() === selectedCity.toLowerCase();
      
      return matchesSearch && matchesCity;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "experience":
          return b.yearsExperience - a.yearsExperience;
        case "price":
          return a.pricePerHour - b.pricePerHour;
        case "reviews":
          return b.totalReviews - a.totalReviews;
        default:
          return 0;
      }
    });

  const handleWhatsAppClick = (guide: typeof MOCK_GUIDES[0]) => {
    const displayName = language === 'ar' ? guide.nameAr : guide.name;
    const displayCity = language === 'ar' ? guide.cityAr : guide.city;
    const message = encodeURIComponent(
      language === 'ar' 
        ? `مرحباً ${displayName}، أنا مهتم بجولة في ${displayCity} خلال كأس العالم. هل يمكنك مساعدتي؟`
        : `Hi ${displayName}, I'm interested in a tour in ${displayCity} during the World Cup. Can you help me?`
    );
    window.open(`https://wa.me/+212661234567?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center space-y-6">
            <Badge variant="secondary" className="mb-4">
              <Users className="w-4 h-4 mr-2" />
              {t('guides.badge')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
              {t('guides.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('guides.subtitle')}
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder={t('guides.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* City Filter */}
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder={t('guides.selectCity')} />
                  </SelectTrigger>
                  <SelectContent>
                    {CITIES.map((city) => (
                      <SelectItem key={city.value} value={city.value}>
                        {language === 'ar' ? city.labelAr : city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder={t('guides.sortBy')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">{t('guides.sortRating')}</SelectItem>
                    <SelectItem value="experience">{t('guides.sortExperience')}</SelectItem>
                    <SelectItem value="price">{t('guides.sortPrice')}</SelectItem>
                    <SelectItem value="reviews">{t('guides.sortReviews')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results count */}
              <div className="mt-4 text-sm text-muted-foreground">
                {t('guides.resultsCount', { count: filteredGuides.length })}
              </div>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {filteredGuides.length === 0 ? (
                <div className="text-center py-16">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{t('guides.noResults')}</h3>
                  <p className="text-muted-foreground">{t('guides.noResultsDesc')}</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredGuides.map((guide) => {
                    const displayName = language === 'ar' ? guide.nameAr : guide.name;
                    const displayCity = language === 'ar' ? guide.cityAr : guide.city;
                    const displayBio = language === 'ar' ? guide.bioAr : guide.bio;
                    const displayLanguages = language === 'ar' ? guide.languagesAr : guide.languages;
                    const displaySpecialties = language === 'ar' ? guide.specialtiesAr : guide.specialties;

                    return (
                      <Card key={guide.id} className="overflow-hidden hover:shadow-morocco transition-all duration-300 group">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="relative">
                              <Avatar className="w-16 h-16 border-2 border-primary/20">
                                <AvatarImage src={guide.photo} alt={displayName} />
                                <AvatarFallback className="bg-gradient-morocco text-white">
                                  {displayName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {/* Online Status */}
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                                guide.isOnline ? 'bg-green-500' : 'bg-gray-400'
                              }`} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg truncate">{displayName}</h3>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                                <MapPin className="w-3 h-3" />
                                <span>{displayCity}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">{guide.rating}</span>
                                  <span className="text-xs text-muted-foreground">
                                    ({guide.totalReviews})
                                  </span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {guide.yearsExperience} {t('guide.years')}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* Bio */}
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {displayBio}
                          </p>

                          {/* Languages */}
                          <div className="mb-4">
                            <div className="flex items-center gap-1 mb-2">
                              <Languages className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium">{t('guides.languages')}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {displayLanguages.slice(0, 3).map((lang, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {lang}
                                </Badge>
                              ))}
                              {displayLanguages.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{displayLanguages.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Specialties */}
                          <div className="mb-4">
                            <div className="flex items-center gap-1 mb-2">
                              <Award className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium">{t('guides.specialties')}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {displaySpecialties.slice(0, 2).map((specialty, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                              {displaySpecialties.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{displaySpecialties.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Price and Actions */}
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="text-sm">
                              <span className="font-semibold text-lg">${guide.pricePerHour}</span>
                              <span className="text-muted-foreground">/{t('guides.perHour')}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleWhatsAppClick(guide)}
                                className="text-green-600 border-green-600 hover:bg-green-50"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                              <Link to={`/guide/${guide.id}`}>
                                <Button size="sm">
                                  {t('guides.viewProfile')}
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('guides.cta.title')}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('guides.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/guide/login">
                <Button size="lg">
                  <Globe className="w-5 h-5 mr-2" />
                  {t('guides.cta.becomeGuide')}
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  {t('guides.cta.contact')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChat />
    </div>
  );
};

export default GuidesPage;
