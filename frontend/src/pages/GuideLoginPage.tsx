import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  UserCheck,
  AlertCircle,
  Loader2
} from "lucide-react";

// Mock authentication - replace with real auth service
const MOCK_GUIDES = {
  "ahmed.benali@marhbabik.ma": {
    password: "password123",
    guideId: "ahmed-casablanca",
    name: "Ahmed Benali"
  },
  "fatima.zahra@marhbabik.ma": {
    password: "password123",
    guideId: "fatima-marrakech",
    name: "Fatima Zahra"
  }
};

interface GuideLoginPageProps {
  onLogin?: (guideId: string, guideName: string) => void;
}

const GuideLoginPage: React.FC<GuideLoginPageProps> = ({ onLogin }) => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication
      const guide = MOCK_GUIDES[formData.email as keyof typeof MOCK_GUIDES];
      
      if (!guide || guide.password !== formData.password) {
        throw new Error(language === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password');
      }

      // Success - call onLogin callback and redirect
      if (onLogin) {
        onLogin(guide.guideId, guide.name);
      }
      
      // Store auth state (in real app, use proper auth state management)
      localStorage.setItem('guideAuth', JSON.stringify({
        guideId: guide.guideId,
        name: guide.name,
        email: formData.email,
        loginTime: new Date().toISOString()
      }));

      // Redirect to guide profile
      navigate(`/guide/${guide.guideId}`);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.email && formData.password;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-morocco rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {t('guide.login.title')}
                </h1>
                <p className="text-muted-foreground">
                  {t('guide.login.subtitle')}
                </p>
              </div>

              <Card className="bg-card/95 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <CardTitle className="text-center">
                    {t('guide.login.welcome')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        {t('guide.login.email')}
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t('guide.login.emailPlaceholder')}
                          className="pl-10"
                          required
                          disabled={isLoading}
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">
                        {t('guide.login.password')}
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder={t('guide.login.passwordPlaceholder')}
                          className="pl-10 pr-10"
                          required
                          disabled={isLoading}
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-gradient-morocco hover:opacity-90"
                      disabled={!isFormValid || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {t('guide.login.signingIn')}
                        </>
                      ) : (
                        t('guide.login.signIn')
                      )}
                    </Button>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium text-foreground mb-2">
                        {t('guide.login.demoCredentials')}:
                      </p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p><strong>Ahmed (Casablanca):</strong> ahmed.benali@marhbabik.ma / password123</p>
                        <p><strong>Fatima (Marrakech):</strong> fatima.zahra@marhbabik.ma / password123</p>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="text-center space-y-2">
                      <Link 
                        to="/guide/forgot-password" 
                        className="text-sm text-primary hover:underline"
                      >
                        {t('guide.login.forgotPassword')}
                      </Link>
                      <div className="text-sm text-muted-foreground">
                        {t('guide.login.notRegistered')}{' '}
                        <Link 
                          to="/guide/register" 
                          className="text-primary hover:underline"
                        >
                          {t('guide.login.register')}
                        </Link>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  {t('guide.login.secureLogin')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GuideLoginPage;
