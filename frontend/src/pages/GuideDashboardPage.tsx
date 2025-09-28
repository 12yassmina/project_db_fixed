import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  User,
  Settings,
  MessageCircle,
  Calendar,
  Star,
  TrendingUp,
  Users,
  Globe,
  Phone,
  Mail,
  MapPin,
  Languages,
  Award,
  Eye,
  Edit3,
  Save,
  LogOut,
  Bell,
  Shield
} from "lucide-react";

interface GuideDashboardPageProps {
  guideId?: string;
  onLogout?: () => void;
}

const GuideDashboardPage: React.FC<GuideDashboardPageProps> = ({ 
  guideId: propGuideId,
  onLogout 
}) => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [guideData, setGuideData] = useState({
    name: "Ahmed Benali",
    nameAr: "أحمد بنعلي",
    email: "ahmed.benali@marhbabik.ma",
    phone: "+212661234567",
    whatsapp: "+212661234567",
    city: "Casablanca",
    cityAr: "الدار البيضاء",
    bio: "Professional tour guide with 8 years of experience in Casablanca.",
    bioAr: "مرشد سياحي محترف مع 8 سنوات من الخبرة في الدار البيضاء.",
    welcomeMessage: "Welcome to Casablanca! I'm here to make your World Cup 2030 experience unforgettable.",
    welcomeMessageAr: "أهلاً وسهلاً بكم في الدار البيضاء! أنا هنا لجعل تجربتكم في كأس العالم 2030 لا تُنسى.",
    languages: ["Arabic", "French", "English"],
    specialties: ["Cultural Tours", "Stadium Visits", "Food Tours"],
    isAvailable: true,
    notifications: true
  });

  const [stats] = useState({
    totalBookings: 127,
    rating: 4.9,
    responseRate: 98,
    monthlyEarnings: 2450
  });

  // Check authentication
  useEffect(() => {
    const authData = localStorage.getItem('guideAuth');
    if (!authData) {
      navigate('/guide/login');
      return;
    }
    
    const { guideId } = JSON.parse(authData);
    // Load guide data based on guideId
    // In real app, this would be an API call
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('guideAuth');
    if (onLogout) onLogout();
    navigate('/guide/login');
  };

  const handleSaveProfile = () => {
    // Save profile data to backend
    console.log('Saving profile:', guideData);
    setIsEditing(false);
    // Show success message
  };

  const handleViewProfile = () => {
    const authData = localStorage.getItem('guideAuth');
    if (authData) {
      const { guideId } = JSON.parse(authData);
      navigate(`/guide/${guideId}`);
    }
  };

  const displayName = language === 'ar' ? guideData.nameAr : guideData.name;
  const displayCity = language === 'ar' ? guideData.cityAr : guideData.city;
  const displayBio = language === 'ar' ? guideData.bioAr : guideData.bio;
  const displayWelcomeMessage = language === 'ar' ? guideData.welcomeMessageAr : guideData.welcomeMessage;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Header Section */}
        <section className="py-8 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 border-2 border-primary/20">
                  <AvatarImage src="/api/placeholder/64/64" alt={displayName} />
                  <AvatarFallback className="text-lg bg-gradient-morocco text-white">
                    {displayName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {t('guide.dashboard.welcome')}, {displayName}
                  </h1>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {displayCity}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleViewProfile}>
                  <Eye className="w-4 h-4 mr-2" />
                  {t('guide.dashboard.viewProfile')}
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('guide.dashboard.logout')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('guide.dashboard.totalBookings')}</p>
                      <p className="text-2xl font-bold">{stats.totalBookings}</p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('guide.dashboard.rating')}</p>
                      <div className="flex items-center gap-1">
                        <p className="text-2xl font-bold">{stats.rating}</p>
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('guide.dashboard.responseRate')}</p>
                      <p className="text-2xl font-bold">{stats.responseRate}%</p>
                    </div>
                    <MessageCircle className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('guide.dashboard.monthlyEarnings')}</p>
                      <p className="text-2xl font-bold">${stats.monthlyEarnings}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Content */}
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {t('guide.dashboard.profile')}
                </TabsTrigger>
                <TabsTrigger value="bookings" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {t('guide.dashboard.bookings')}
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  {t('guide.dashboard.messages')}
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  {t('guide.dashboard.settings')}
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{t('guide.dashboard.profileInfo')}</CardTitle>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                      {isEditing ? t('guide.dashboard.save') : t('guide.dashboard.edit')}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('guide.dashboard.name')}</Label>
                        <Input
                          id="name"
                          value={guideData.name}
                          onChange={(e) => setGuideData({...guideData, name: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('guide.dashboard.email')}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={guideData.email}
                          onChange={(e) => setGuideData({...guideData, email: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('guide.dashboard.phone')}</Label>
                        <Input
                          id="phone"
                          value={guideData.phone}
                          onChange={(e) => setGuideData({...guideData, phone: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="whatsapp">{t('guide.dashboard.whatsapp')}</Label>
                        <Input
                          id="whatsapp"
                          value={guideData.whatsapp}
                          onChange={(e) => setGuideData({...guideData, whatsapp: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">{t('guide.dashboard.bio')}</Label>
                      <Textarea
                        id="bio"
                        value={displayBio}
                        onChange={(e) => setGuideData({
                          ...guideData, 
                          [language === 'ar' ? 'bioAr' : 'bio']: e.target.value
                        })}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="welcomeMessage">{t('guide.dashboard.welcomeMessage')}</Label>
                      <Textarea
                        id="welcomeMessage"
                        value={displayWelcomeMessage}
                        onChange={(e) => setGuideData({
                          ...guideData, 
                          [language === 'ar' ? 'welcomeMessageAr' : 'welcomeMessage']: e.target.value
                        })}
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>

                    {isEditing && (
                      <div className="flex gap-2">
                        <Button onClick={handleSaveProfile}>
                          <Save className="w-4 h-4 mr-2" />
                          {t('guide.dashboard.saveChanges')}
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          {t('guide.dashboard.cancel')}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bookings Tab */}
              <TabsContent value="bookings">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('guide.dashboard.recentBookings')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        {t('guide.dashboard.noBookings')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Messages Tab */}
              <TabsContent value="messages">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('guide.dashboard.messages')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        {t('guide.dashboard.noMessages')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('guide.dashboard.settings')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>{t('guide.dashboard.availability')}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t('guide.dashboard.availabilityDesc')}
                        </p>
                      </div>
                      <Switch
                        checked={guideData.isAvailable}
                        onCheckedChange={(checked) => 
                          setGuideData({...guideData, isAvailable: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>{t('guide.dashboard.notifications')}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t('guide.dashboard.notificationsDesc')}
                        </p>
                      </div>
                      <Switch
                        checked={guideData.notifications}
                        onCheckedChange={(checked) => 
                          setGuideData({...guideData, notifications: checked})
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
      <AIChat />
    </div>
  );
};

export default GuideDashboardPage;
