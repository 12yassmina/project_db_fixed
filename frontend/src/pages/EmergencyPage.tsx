import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Phone, 
  MessageCircle, 
  Hospital, 
  Shield,
  MapPin,
  Clock,
  AlertTriangle,
  HeartHandshake,
  Car,
  Users,
  Info,
  ExternalLink,
  CheckCircle
} from "lucide-react";

const EmergencyPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [emergencyAction, setEmergencyAction] = useState<string | null>(null);
  
  const userRole = searchParams.get('role') || user?.role?.toLowerCase() || 'fan';
  
  // Role-specific emergency numbers and actions
  const getRoleSpecificActions = (role: string) => {
    switch (role) {
      case 'organizer':
      case 'staff':
        return {
          primaryNumber: '+212 6XX XX XX XX',
          primaryLabel: 'Operations Center',
          secondaryActions: [
            { label: 'Stadium Control', number: '+212 5XX XX XX XX' },
            { label: 'Security Coordinator', number: '+212 6XX XX XX XX' },
            { label: 'Medical Team Lead', number: '+212 6XX XX XX XX' }
          ]
        };
      case 'medical':
        return {
          primaryNumber: '141',
          primaryLabel: 'Medical Emergency',
          secondaryActions: [
            { label: 'Hospital Coordinator', number: '+212 522 48 20 20' },
            { label: 'Ambulance Dispatch', number: '+212 6XX XX XX XX' },
            { label: 'Medical Director', number: '+212 6XX XX XX XX' }
          ]
        };
      case 'security':
        return {
          primaryNumber: '19',
          primaryLabel: 'Security Command',
          secondaryActions: [
            { label: 'Stadium Security', number: '+212 6XX XX XX XX' },
            { label: 'Police Coordinator', number: '+212 5XX XX XX XX' },
            { label: 'Emergency Response', number: '+212 6XX XX XX XX' }
          ]
        };
      default: // fan
        return {
          primaryNumber: '190',
          primaryLabel: 'General Emergency',
          secondaryActions: [
            { label: 'Fan Support WhatsApp', number: '+212 6XX XX XX XX' },
            { label: 'Tourist Police', number: '+212 5XX XX XX XX' },
            { label: 'Embassy Contact', number: '+212 5XX XX XX XX' }
          ]
        };
    }
  };
  
  const roleActions = getRoleSpecificActions(userRole);
  
  const handleEmergencyCall = (number: string, label: string) => {
    setEmergencyAction(`Calling ${label}...`);
    // Open phone dialer
    window.location.href = `tel:${number}`;
    
    // Clear action after 3 seconds
    setTimeout(() => setEmergencyAction(null), 3000);
  };

  const handleSOSEmergency = () => {
    setEmergencyAction('🚨 SOS ACTIVATED - Calling Emergency Services...');
    
    // Call primary emergency number
    window.location.href = `tel:${roleActions.primaryNumber}`;
    
    setTimeout(() => setEmergencyAction(null), 5000);
  };
  
  const handleNearestHospital = () => {
    setEmergencyAction('Finding nearest hospital...');
    // In a real app, this would use geolocation
    setTimeout(() => {
      setEmergencyAction('Redirecting to hospital location...');
      // Simulate opening maps
      window.open('https://maps.google.com/?q=hospital+near+me', '_blank');
      setTimeout(() => setEmergencyAction(null), 2000);
    }, 1000);
  };
  
  const handleQuickAction = (action: string, index: number) => {
    setEmergencyAction(`Executing: ${action}`);
    
    switch (index) {
      case 0: // Call emergency immediately
        handleEmergencyCall(roleActions.primaryNumber, roleActions.primaryLabel);
        break;
      case 1: // Send location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const message = `Emergency location: https://maps.google.com/?q=${latitude},${longitude}`;
            // In real app, send via SMS or WhatsApp
            window.open(`https://wa.me/${roleActions.secondaryActions[0]?.number}?text=${encodeURIComponent(message)}`, '_blank');
          });
        }
        break;
      case 2: // Contact embassy
        handleEmergencyCall('+212 5XX XX XX XX', 'Embassy');
        break;
      case 3: // Request medical escort
        handleEmergencyCall('141', 'Medical Emergency');
        break;
    }
    
    setTimeout(() => setEmergencyAction(null), 3000);
  };
  
  const handleRequestHelp = () => {
    setEmergencyAction('Sending emergency alert...');
    // In real app, this would send alerts to multiple services
    setTimeout(() => {
      setEmergencyAction('Emergency services notified!');
      setTimeout(() => setEmergencyAction(null), 3000);
    }, 2000);
  };
  const emergencyServices = [
    {
      icon: Phone,
      title: "General Emergency",
      number: "190",
      description: "Official emergency service - Available 24/7",
      color: "bg-red-500",
      urgent: true
    },
    {
      icon: Hospital,
      title: "Ambulance & Medical Emergency",
      number: "141",
      description: "Fast ambulance services for all host cities",
      color: "bg-blue-500",
      urgent: true
    },
    {
      icon: Shield,
      title: "Security & Protection",
      number: "19",
      description: "National Security and Royal Gendarmerie",
      color: "bg-green-500",
      urgent: true
    },
    {
      icon: Car,
      title: "Traffic Accidents",
      number: "177",
      description: "Special service for traffic and road accidents",
      color: "bg-orange-500",
      urgent: false
    },
    {
      icon: MessageCircle,
      title: "Fan Support",
      number: "+212 6XX XX XX XX",
      description: "WhatsApp support special for foreign fans",
      color: "bg-purple-500",
      urgent: false
    }
  ];

  const hospitals = [
    {
      name: "Ibn Rushd University Hospital",
      city: "Casablanca",
      address: "Royal Army Street, Casablanca",
      phone: "+212 522 48 20 20",
      distance: "2.5 km from stadium",
      services: ["Emergency", "Surgery", "Cardiology"]
    },
    {
      name: "Rabat University Hospital",
      city: "Rabat",
      address: "Riad District, Rabat",
      phone: "+212 537 77 37 77",
      distance: "3 km from stadium",
      services: ["Emergency", "General Medicine", "Radiology"]
    },
    {
      name: "Mohammed VI Regional Hospital",
      city: "Tangier",
      address: "Tetouan Road, Tangier",
      phone: "+212 539 39 39 39",
      distance: "4 km from stadium",
      services: ["Emergency", "Surgery", "Intensive Care"]
    }
  ];

  const safetyTips = [
    {
      icon: Users,
      title: "At the Stadium",
      tips: [
        "Keep your personal information with you at all times",
        "Follow instructions from hosts and security",
        "Know the emergency exits near you",
        "Don't leave your belongings unattended"
      ]
    },
    {
      icon: Car,
      title: "On the Road",
      tips: [
        "Use designated routes for fans",
        "Respect traffic signals and driving laws",
        "Avoid driving when tired or after celebrating",
        "Keep your car insurance company number"
      ]
    },
    {
      icon: MapPin,
      title: "In the City",
      tips: [
        "Keep hotel address and important landmarks",
        "Avoid isolated areas at night",
        "Carry cash and multiple payment methods",
        "Know local emergency numbers"
      ]
    }
  ];

  const quickActions = [
    "Call emergency immediately",
    "Send your current location",
    "Contact embassy",
    "Request medical escort"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Role-specific Alert */}
        {userRole !== 'fan' && (
          <Alert className="mx-4 mt-4 border-blue-200 bg-blue-50">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Staff Mode:</strong> You're viewing emergency options for {userRole}. 
              Specialized contacts and procedures are available below.
            </AlertDescription>
          </Alert>
        )}
        
        {/* Emergency Action Status */}
        {emergencyAction && (
          <Alert className="mx-4 mt-4 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              {emergencyAction}
            </AlertDescription>
          </Alert>
        )}
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-red-50 to-muted">
          <div className="container mx-auto px-4 text-center">
            <div className="space-y-6">
              <Badge variant="destructive" className="mb-4">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency & Safety - {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Mode
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Your Safety is Our Top Priority
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {userRole === 'fan' 
                  ? 'Important information and emergency numbers for fans during Morocco World Cup 2030'
                  : `Specialized emergency procedures and contacts for ${userRole} personnel`
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="destructive" 
                  size="lg"
                  onClick={handleSOSEmergency}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold animate-pulse"
                >
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  🚨 SOS EMERGENCY 🚨
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => handleEmergencyCall(roleActions.primaryNumber, roleActions.primaryLabel)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call {roleActions.primaryLabel}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleNearestHospital}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Nearest Hospital
                </Button>
              </div>
              
              {/* Role-specific quick actions */}
              {roleActions.secondaryActions.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground mb-3">Quick Access:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {roleActions.secondaryActions.map((action, index) => (
                      <Button
                        key={action.label}
                        variant="outline"
                        size="sm"
                        onClick={() => handleEmergencyCall(action.number, action.label)}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Emergency Numbers */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Official Emergency Numbers
              </h2>
              <p className="text-muted-foreground">
                Save these numbers in your phone before attending any match
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyServices.map((service, index) => (
                <Card
                  key={service.title}
                  className={`p-6 hover:shadow-morocco transition-all duration-300 group ${
                    service.urgent ? 'border-red-200 bg-red-50/50' : 'bg-card'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {service.title}
                          </h3>
                          {service.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              Urgent
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-center p-3 bg-muted rounded-lg">
                        {service.number}
                      </div>
                      <Button 
                        variant={service.urgent ? "destructive" : "hero"} 
                        className="w-full"
                        asChild
                      >
                        <a href={`tel:${service.number}`}>
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Hospitals */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Hospitals Near Stadiums
              </h2>
              <p className="text-muted-foreground">
                Certified hospitals with trained emergency medical staff
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitals.map((hospital, index) => (
                <Card key={hospital.name} className="p-6 bg-card">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">
                          {hospital.city}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {hospital.distance}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-foreground">
                        {hospital.name}
                      </h3>
                      
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <MapPin className="w-4 h-4" />
                          <span>{hospital.address}</span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Phone className="w-4 h-4" />
                          <span>{hospital.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {hospital.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button variant="hero" className="flex-1" asChild>
                        <a href={`tel:${hospital.phone}`}>
                          Call
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => window.open(`https://maps.google.com/?q=${hospital.name}`, '_blank')}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Safety & Security Tips
              </h2>
              <p className="text-muted-foreground">
                Follow these tips to ensure a safe and enjoyable experience
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {safetyTips.map((category, index) => (
                <Card key={category.title} className="p-6 bg-card">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-12 h-12 bg-gradient-morocco rounded-lg flex items-center justify-center">
                        <category.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {category.title}
                      </h3>
                    </div>
                    
                    <ul className="space-y-3">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start space-x-3 rtl:space-x-reverse text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Quick Emergency Actions
              </h2>
              <p className="text-muted-foreground">
                Important steps to follow when needed
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {quickActions.map((action, index) => (
                <Card 
                  key={action} 
                  className="p-4 text-center bg-card hover:shadow-elegant transition-all duration-300 group cursor-pointer"
                  onClick={() => handleQuickAction(action, index)}
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <p className="font-medium text-foreground text-sm">
                      {action}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button 
                variant="destructive" 
                size="lg"
                onClick={handleRequestHelp}
              >
                <HeartHandshake className="w-4 h-4 mr-2" />
                Request Immediate Help
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EmergencyPage;