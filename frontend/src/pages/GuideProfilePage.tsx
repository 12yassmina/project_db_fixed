import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  MessageCircle, 
  MapPin, 
  Languages, 
  Star, 
  Edit3, 
  Save, 
  X,
  Phone,
  Mail,
  Calendar,
  Users,
  Award,
  Globe
} from "lucide-react";

// Mock guide data - replace with real data from API
const MOCK_GUIDES = {
  "ahmed-casablanca": {
    id: "ahmed-casablanca",
    name: "Ahmed Benali",
    nameAr: "أحمد بنعلي",
    email: "ahmed.benali@marhbabik.ma",
    phone: "+212661234567",
    whatsapp: "+212661234567",
    photo: "/api/placeholder/150/150",
    city: "Casablanca",
    cityAr: "الدار البيضاء",
    languages: ["Arabic", "French", "English"],
    languagesAr: ["العربية", "الفرنسية", "الإنجليزية"],
    bio: "Professional tour guide with 8 years of experience in Casablanca. Specialized in cultural tours, historical sites, and World Cup venue guidance.",
    bioAr: "مرشد سياحي محترف مع 8 سنوات من الخبرة في الدار البيضاء. متخصص في الجولات الثقافية والمواقع التاريخية وإرشاد أماكن كأس العالم.",
    welcomeMessage: "Welcome to Casablanca! I'm here to make your World Cup 2030 experience unforgettable. Let's explore the economic capital of Morocco together!",
    welcomeMessageAr: "أهلاً وسهلاً بكم في الدار البيضاء! أنا هنا لجعل تجربتكم في كأس العالم 2030 لا تُنسى. دعونا نستكشف العاصمة الاقتصادية للمغرب معاً!",
    rating: 4.9,
    totalReviews: 127,
    yearsExperience: 8,
    specialties: ["Cultural Tours", "Stadium Visits", "Food Tours", "Historical Sites"],
    specialtiesAr: ["الجولات الثقافية", "زيارات الملاعب", "جولات الطعام", "المواقع التاريخية"],
    availability: "Available during World Cup 2030",
    availabilityAr: "متاح خلال كأس العالم 2030",
    isOnline: true,
    lastSeen: new Date().toISOString()
  },
  "fatima-marrakech": {
    id: "fatima-marrakech",
    name: "Fatima Zahra",
    nameAr: "فاطمة الزهراء",
    email: "fatima.zahra@marhbabik.ma",
    phone: "+212662345678",
    whatsapp: "+212662345678",
    photo: "/api/placeholder/150/150",
    city: "Marrakech",
    cityAr: "مراكش",
    languages: ["Arabic", "French", "English", "Spanish"],
    languagesAr: ["العربية", "الفرنسية", "الإنجليزية", "الإسبانية"],
    bio: "Passionate guide from the Red City with deep knowledge of Berber culture and traditions. Expert in souks, palaces, and authentic Moroccan experiences.",
    bioAr: "مرشدة متحمسة من المدينة الحمراء مع معرفة عميقة بالثقافة والتقاليد الأمازيغية. خبيرة في الأسواق والقصور والتجارب المغربية الأصيلة.",
    welcomeMessage: "Ahlan wa sahlan to Marrakech! Let me show you the magic of the Red City and create memories that will last a lifetime during your World Cup journey.",
    welcomeMessageAr: "أهلاً وسهلاً بكم في مراكش! دعوني أريكم سحر المدينة الحمراء وأصنع ذكريات ستدوم مدى الحياة خلال رحلتكم في كأس العالم.",
    rating: 4.8,
    totalReviews: 89,
    yearsExperience: 6,
    specialties: ["Berber Culture", "Souk Tours", "Palace Visits", "Desert Excursions"],
    specialtiesAr: ["الثقافة الأمازيغية", "جولات الأسواق", "زيارات القصور", "رحلات الصحراء"],
    availability: "Available during World Cup 2030",
    availabilityAr: "متاحة خلال كأس العالم 2030",
    isOnline: false,
    lastSeen: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30 minutes ago
  }
};

interface GuideProfilePageProps {
  isAuthenticated?: boolean;
  currentGuideId?: string;
}

const GuideProfilePage: React.FC<GuideProfilePageProps> = ({ 
  isAuthenticated = false, 
  currentGuideId 
}) => {
  const { guideId } = useParams<{ guideId: string }>();
  const { t, language } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedWelcomeMessage, setEditedWelcomeMessage] = useState("");

  // Get guide data
  const guide = guideId ? MOCK_GUIDES[guideId as keyof typeof MOCK_GUIDES] : null;
  const isOwnProfile = isAuthenticated && currentGuideId === guideId;

  useEffect(() => {
    if (guide) {
      setEditedWelcomeMessage(
        language === 'ar' ? guide.welcomeMessageAr : guide.welcomeMessage
      );
    }
  }, [guide, language]);

  if (!guide) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {t('guide.notFound')}
            </h1>
            <p className="text-muted-foreground">
              {t('guide.notFoundDesc')}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      language === 'ar' 
        ? `مرحباً ${guide.nameAr}، أنا أزور ${guide.cityAr} خلال كأس العالم. هل يمكنك مساعدتي؟`
        : `Hi ${guide.name}, I'm visiting ${guide.city} during the World Cup. Can you help me?`
    );
    window.open(`https://wa.me/${guide.whatsapp.replace('+', '')}?text=${message}`, '_blank');
  };

  const handleSaveWelcomeMessage = () => {
    // Here you would save to your backend
    console.log('Saving welcome message:', editedWelcomeMessage);
    setIsEditing(false);
    // Update the guide data (in real app, this would be an API call)
  };

  const displayName = language === 'ar' ? guide.nameAr : guide.name;
  const displayCity = language === 'ar' ? guide.cityAr : guide.city;
  const displayBio = language === 'ar' ? guide.bioAr : guide.bio;
  const displayWelcomeMessage = language === 'ar' ? guide.welcomeMessageAr : guide.welcomeMessage;
  const displayLanguages = language === 'ar' ? guide.languagesAr : guide.languages;
  const displaySpecialties = language === 'ar' ? guide.specialtiesAr : guide.specialties;
  const displayAvailability = language === 'ar' ? guide.availabilityAr : guide.availability;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden bg-card/95 backdrop-blur-sm border-primary/20">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Profile Photo */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <Avatar className="w-32 h-32 border-4 border-primary/20">
                          <AvatarImage src={guide.photo} alt={displayName} />
                          <AvatarFallback className="text-2xl bg-gradient-morocco text-white">
                            {displayName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {/* Online Status */}
                        <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-background ${
                          guide.isOnline ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                      </div>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                          {displayName}
                        </h1>
                        <div className="flex items-center gap-2 text-muted-foreground mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{displayCity}</span>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{guide.rating}</span>
                            <span className="text-muted-foreground">
                              ({guide.totalReviews} {t('guide.reviews')})
                            </span>
                          </div>
                          <Badge variant="secondary">
                            {guide.yearsExperience} {t('guide.yearsExp')}
                          </Badge>
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <Languages className="w-4 h-4 text-primary" />
                        {displayLanguages.map((lang, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>

                      {/* Bio */}
                      <p className="text-muted-foreground leading-relaxed">
                        {displayBio}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <Button 
                          onClick={handleWhatsAppClick}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {t('guide.chatWhatsApp')}
                        </Button>
                        <Button variant="outline">
                          <Phone className="w-4 h-4 mr-2" />
                          {t('guide.call')}
                        </Button>
                        <Button variant="outline">
                          <Mail className="w-4 h-4 mr-2" />
                          {t('guide.email')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
              
              {/* Left Column - Welcome Message */}
              <div className="md:col-span-2 space-y-6">
                {/* Welcome Message Card */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-primary" />
                      {t('guide.welcomeMessage')}
                    </CardTitle>
                    {isOwnProfile && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-4">
                        <Textarea
                          value={editedWelcomeMessage}
                          onChange={(e) => setEditedWelcomeMessage(e.target.value)}
                          placeholder={t('guide.welcomePlaceholder')}
                          className="min-h-[120px]"
                        />
                        <div className="flex gap-2">
                          <Button onClick={handleSaveWelcomeMessage} size="sm">
                            <Save className="w-4 h-4 mr-2" />
                            {t('guide.save')}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setIsEditing(false)}
                          >
                            {t('guide.cancel')}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground leading-relaxed">
                        {displayWelcomeMessage}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Specialties */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      {t('guide.specialties')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {displaySpecialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Guide Details */}
              <div className="space-y-6">
                {/* Availability */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      {t('guide.availability')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          guide.isOnline ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                        <span className="text-sm">
                          {guide.isOnline ? t('guide.online') : t('guide.offline')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {displayAvailability}
                      </p>
                      {!guide.isOnline && (
                        <p className="text-xs text-muted-foreground">
                          {t('guide.lastSeen')}: {new Date(guide.lastSeen).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('guide.contact')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{guide.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="break-all">{guide.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MessageCircle className="w-4 h-4 text-green-600" />
                      <span>{guide.whatsapp}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('guide.stats')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{t('guide.rating')}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{guide.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{t('guide.reviews')}</span>
                      <span className="font-medium">{guide.totalReviews}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{t('guide.experience')}</span>
                      <span className="font-medium">{guide.yearsExperience} {t('guide.years')}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChat />
    </div>
  );
};

export default GuideProfilePage;
