import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  ExternalLink
} from "lucide-react";

const EmergencyPage = () => {
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
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-red-50 to-muted">
          <div className="container mx-auto px-4 text-center">
            <div className="space-y-6">
              <Badge variant="destructive" className="mb-4">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency & Safety
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Your Safety is Our Top Priority
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Important information and emergency numbers you need to ensure your safety during Morocco World Cup 2030
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="destructive" size="lg">
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Call Now
                </Button>
                <Button variant="outline" size="lg">
                  <MapPin className="w-4 h-4 mr-2" />
                  Nearest Hospital
                </Button>
              </div>
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
                      <Button variant="outline" size="icon">
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
                <Card key={action} className="p-4 text-center bg-card hover:shadow-elegant transition-all duration-300 group cursor-pointer">
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
              <Button variant="destructive" size="lg">
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