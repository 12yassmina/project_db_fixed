import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/contexts/AuthContext";
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Heart,
  Settings,
  Shield,
  LogOut,
  Edit3,
  Save,
  X,
  Camera,
  Star,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";

const ProfilePage: React.FC = () => {
  const { t, language } = useTranslation();
  const { user, logout, updateProfile, changePassword, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    preferredLanguage: 'en',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    },
    worldCupPreferences: {
      favoriteTeams: [] as string[],
      interestedCities: [] as string[],
      accommodationType: 'hotel',
      budgetRange: {
        min: 0,
        max: 1000
      }
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [newTeam, setNewTeam] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/signin', { state: { from: { pathname: '/profile' } } });
    }
  }, [user, isLoading, navigate]);

  // Initialize profile data when user is loaded
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
        nationality: user.nationality || '',
        preferredLanguage: user.preferredLanguage || 'en',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          country: user.address?.country || '',
          zipCode: user.address?.zipCode || ''
        },
        worldCupPreferences: {
          favoriteTeams: user.worldCupPreferences?.favoriteTeams || [],
          interestedCities: user.worldCupPreferences?.interestedCities || [],
          accommodationType: user.worldCupPreferences?.accommodationType || 'hotel',
          budgetRange: {
            min: user.worldCupPreferences?.budgetRange?.min || 0,
            max: user.worldCupPreferences?.budgetRange?.max || 1000
          }
        }
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        if (parent === 'address') {
          return {
            ...prev,
            address: {
              ...prev.address,
              [child]: value
            }
          };
        } else if (parent === 'worldCupPreferences') {
          return {
            ...prev,
            worldCupPreferences: {
              ...prev.worldCupPreferences,
              [child]: value
            }
          };
        }
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleSaveProfile = async () => {
    try {
      const result = await updateProfile(profileData);
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setIsEditing(false);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    }
    
    // Clear message after 5 seconds
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters long' });
      return;
    }
    
    setIsChangingPassword(true);
    
    try {
      const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to change password. Please try again.' });
    } finally {
      setIsChangingPassword(false);
    }
    
    // Clear message after 5 seconds
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const addFavoriteTeam = () => {
    if (newTeam.trim() && !profileData.worldCupPreferences.favoriteTeams.includes(newTeam.trim())) {
      handleInputChange('worldCupPreferences.favoriteTeams', [
        ...profileData.worldCupPreferences.favoriteTeams,
        newTeam.trim()
      ]);
      setNewTeam('');
    }
  };

  const removeFavoriteTeam = (team: string) => {
    handleInputChange('worldCupPreferences.favoriteTeams', 
      profileData.worldCupPreferences.favoriteTeams.filter(t => t !== team)
    );
  };

  const toggleInterestedCity = (city: string) => {
    const currentCities = profileData.worldCupPreferences.interestedCities;
    if (currentCities.includes(city)) {
      handleInputChange('worldCupPreferences.interestedCities', 
        currentCities.filter(c => c !== city)
      );
    } else {
      handleInputChange('worldCupPreferences.interestedCities', [...currentCities, city]);
    }
  };

  const moroccanCities = [
    { value: 'casablanca', label: 'Casablanca', labelAr: 'الدار البيضاء' },
    { value: 'rabat', label: 'Rabat', labelAr: 'الرباط' },
    { value: 'marrakech', label: 'Marrakech', labelAr: 'مراكش' },
    { value: 'tangier', label: 'Tangier', labelAr: 'طنجة' },
    { value: 'agadir', label: 'Agadir', labelAr: 'أكادير' },
    { value: 'fez', label: 'Fez', labelAr: 'فاس' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Profile Header */}
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
                          <AvatarImage src={user.avatar} alt={user.fullName || `${user.firstName} ${user.lastName}`} />
                          <AvatarFallback className="text-2xl bg-gradient-morocco text-white">
                            {user.firstName[0]}{user.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <Button
                          size="sm"
                          className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0"
                          variant="secondary"
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                          {user.firstName} {user.lastName}
                        </h1>
                        <div className="flex items-center gap-2 text-muted-foreground mb-3">
                          <Mail className="w-4 h-4" />
                          <span>{user.email}</span>
                          {user.isEmailVerified && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                          <Badge variant="secondary">
                            {user.role === 'user' ? 'Member' : user.role}
                          </Badge>
                          <Badge variant="outline">
                            {language === 'ar' ? 'عضو منذ' : 'Member since'} {new Date(user.createdAt || '').getFullYear()}
                          </Badge>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            {profileData.worldCupPreferences.favoriteTeams.length}
                          </div>
                          <div className="text-xs text-muted-foreground">Favorite Teams</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            {profileData.worldCupPreferences.interestedCities.length}
                          </div>
                          <div className="text-xs text-muted-foreground">Cities</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            {user.isEmailVerified ? '✓' : '⏳'}
                          </div>
                          <div className="text-xs text-muted-foreground">Verified</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            {user.preferredLanguage.toUpperCase()}
                          </div>
                          <div className="text-xs text-muted-foreground">Language</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <Button 
                          onClick={() => setIsEditing(!isEditing)}
                          variant={isEditing ? "outline" : "default"}
                        >
                          {isEditing ? (
                            <>
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </>
                          ) : (
                            <>
                              <Edit3 className="w-4 h-4 mr-2" />
                              Edit Profile
                            </>
                          )}
                        </Button>
                        {isEditing && (
                          <Button onClick={handleSaveProfile}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                        )}
                        <Button variant="outline" onClick={handleLogout}>
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Profile Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Messages */}
              {message.text && (
                <Alert 
                  variant={message.type === 'error' ? 'destructive' : 'default'}
                  className={`mb-6 ${message.type === 'success' ? 'border-green-200 bg-green-50 text-green-800' : ''}`}
                >
                  {message.type === 'error' ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}

              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    World Cup
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            disabled={true} // Email cannot be changed
                            className="bg-muted"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            disabled={!isEditing}
                            placeholder="+212 6XX XXX XXX"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={profileData.dateOfBirth}
                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nationality">Nationality</Label>
                          <Input
                            id="nationality"
                            value={profileData.nationality}
                            onChange={(e) => handleInputChange('nationality', e.target.value)}
                            disabled={!isEditing}
                            placeholder="e.g., Moroccan, French, etc."
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Address</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="street">Street Address</Label>
                            <Input
                              id="street"
                              value={profileData.address.street}
                              onChange={(e) => handleInputChange('address.street', e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={profileData.address.city}
                              onChange={(e) => handleInputChange('address.city', e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State/Province</Label>
                            <Input
                              id="state"
                              value={profileData.address.state}
                              onChange={(e) => handleInputChange('address.state', e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              value={profileData.address.country}
                              onChange={(e) => handleInputChange('address.country', e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">Zip Code</Label>
                            <Input
                              id="zipCode"
                              value={profileData.address.zipCode}
                              onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* World Cup Preferences Tab */}
                <TabsContent value="preferences" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>World Cup 2030 Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Favorite Teams */}
                      <div className="space-y-4">
                        <Label>Favorite Teams</Label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {profileData.worldCupPreferences.favoriteTeams.map((team, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {team}
                              {isEditing && (
                                <button
                                  onClick={() => removeFavoriteTeam(team)}
                                  className="ml-1 hover:text-destructive"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </Badge>
                          ))}
                        </div>
                        {isEditing && (
                          <div className="flex gap-2">
                            <Input
                              value={newTeam}
                              onChange={(e) => setNewTeam(e.target.value)}
                              placeholder="Add a team..."
                              onKeyPress={(e) => e.key === 'Enter' && addFavoriteTeam()}
                            />
                            <Button onClick={addFavoriteTeam} variant="outline">
                              Add
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Interested Cities */}
                      <div className="space-y-4">
                        <Label>Interested Cities</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {moroccanCities.map((city) => (
                            <Button
                              key={city.value}
                              variant={profileData.worldCupPreferences.interestedCities.includes(city.value) ? "default" : "outline"}
                              onClick={() => isEditing && toggleInterestedCity(city.value)}
                              disabled={!isEditing}
                              className="justify-start"
                            >
                              {language === 'ar' ? city.labelAr : city.label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Accommodation Type */}
                      <div className="space-y-2">
                        <Label>Preferred Accommodation</Label>
                        <Select
                          value={profileData.worldCupPreferences.accommodationType}
                          onValueChange={(value) => handleInputChange('worldCupPreferences.accommodationType', value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hotel">Hotel</SelectItem>
                            <SelectItem value="rental">Rental</SelectItem>
                            <SelectItem value="hostel">Hostel</SelectItem>
                            <SelectItem value="camping">Camping</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Budget Range */}
                      <div className="space-y-4">
                        <Label>Budget Range (USD per day)</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="budgetMin">Minimum</Label>
                            <Input
                              id="budgetMin"
                              type="number"
                              value={profileData.worldCupPreferences.budgetRange.min}
                              onChange={(e) => handleInputChange('worldCupPreferences.budgetRange.min', parseInt(e.target.value) || 0)}
                              disabled={!isEditing}
                              min="0"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="budgetMax">Maximum</Label>
                            <Input
                              id="budgetMax"
                              type="number"
                              value={profileData.worldCupPreferences.budgetRange.max}
                              onChange={(e) => handleInputChange('worldCupPreferences.budgetRange.max', parseInt(e.target.value) || 0)}
                              disabled={!isEditing}
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleChangePassword} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            required
                            minLength={6}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            required
                            minLength={6}
                          />
                        </div>
                        <Button type="submit" disabled={isChangingPassword}>
                          {isChangingPassword ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Changing Password...
                            </>
                          ) : (
                            'Change Password'
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label>Preferred Language</Label>
                        <Select
                          value={profileData.preferredLanguage}
                          onValueChange={(value) => handleInputChange('preferredLanguage', value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="ar">العربية</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="pt-6 border-t">
                        <h3 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h3>
                        <Button variant="destructive" className="w-full">
                          Delete Account
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          This action cannot be undone. Your account and all data will be permanently deleted.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChat />
    </div>
  );
};

export default ProfilePage;
