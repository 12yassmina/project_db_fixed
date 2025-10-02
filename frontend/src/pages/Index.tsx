import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Button } from "@/components/ui/button";
import { ReservationModal } from "@/components/ReservationModal";
import { useEffect, useState } from "react";
import { fetchEvents } from "@/lib/api";
import eventLogo from "@/assets/coupe-du-monde-2030.jpg";
import grandStade from "@/assets/stadiums/stadium-construction.jpg";
import stadiumBuild from "@/assets/stadiums/stadium-construction.jpg";

import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Newspaper, 
  Building2, 
  Calendar, 
  Ticket, 
  Users, 
  Heart,
  MessageCircle,
  Phone,
  Globe
} from "lucide-react";
import casablancaImage from "@/assets/cities/casablanca-real.jpeg";
import marrakechImage from "@/assets/cities/marrakech-real.jpg";
import rabatImage from "@/assets/cities/rabat-real.jpg";
import tangierImage from "@/assets/cities/tangier-real.jpg";
import fesImage from "@/assets/cities/citie fes.jpg";
import agadirImage from "@/assets/cities/citie-Agadir.jpg";
import hotelImage from "@/assets/morocco-luxury-hotel.jpg";
import restaurantImage from "@/assets/morocco-restaurant.jpg";
import rentalImage from "@/assets/morocco-villa-rental.jpg";
import eventImage from "@/assets/morocco-cultural-event.jpeg";

const Index = () => {
  const [showReservation, setShowReservation] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const handleServiceReservation = (service: any) => {
    setSelectedService(service);
    setShowReservation(true);
  };

  const featuredSections = [
    {
      icon: Newspaper,
      title: "Latest News",
      description: "Follow the latest updates on preparations and events",
      color: "primary",
      href: "/news"
    },
    {
      icon: Building2,
      title: "Stadiums",
      description: "Discover the modern stadiums that will host the matches",
      color: "secondary",
      href: "/stadiums"
    },
    {
      icon: Calendar,
      title: "Match Schedule",
      description: "All match times and live results",
      color: "primary",
      href: "/schedule"
    },
    {
      icon: Ticket,
      title: "Tickets",
      description: "Book your ticket now and enjoy the experience",
      color: "secondary",
      href: "/tickets"
    },
    {
      icon: Users,
      title: "Volunteering",
      description: "Be part of this historic event",
      color: "accent",
      href: "/volunteers"
    },
  ];

  const hostCities = [
    {
      name: "Casablanca",
      description: "Morocco's economic capital with the iconic Hassan II Mosque",
      image: casablancaImage,
      stadium: "Grand Stadium - 80,000 capacity"
    },
    {
      name: "Marrakech",
      description: "The Red City with its famous Jemaa el-Fnaa square",
      image: marrakechImage,
      stadium: "Marrakech Stadium - 45,000 capacity"
    },
    {
      name: "Rabat",
      description: "Morocco's capital city with rich historical heritage",
      image: rabatImage,
      stadium: "Rabat National Stadium - 52,000 capacity"
    },
    {
      name: "Tangier",
      description: "Gateway to Africa with stunning Mediterranean views",
      image: tangierImage,
      stadium: "Tangier Stadium - 65,000 capacity"
    },
    {
      name: "Fès",
      description: "Morocco's spiritual capital and cultural heart",
      image: fesImage,
      stadium: "Stade de Fès - 40,000 capacity"
    },
    {
      name: "Agadir",
      description: "Morocco's premier beach destination",
      image: agadirImage,
      stadium: "Stade Adrar - 45,000 capacity"
    }
  ];

  const quickActions = [
    {
      icon: MessageCircle,
      title: "AI Assistant",
      description: "Ask any question about the World Cup",
      action: "Start Chat",
      variant: "hero" as const
    },
    {
      icon: Phone,
      title: "Instant Support",
      description: "Contact us for urgent assistance",
      action: "Call Us",
      variant: "gold" as const
    },
    {
      icon: Globe,
      title: "Tour Guide",
      description: "Book a certified tour guide",
      action: "Choose Guide",
      variant: "secondary" as const
    },
  ];

  const [events, setEvents] = useState<any[]>([]);
const imagesMap: Record<string,string> = {
  'coupe-du-monde-2030.jpg': eventLogo,
  'stadium-construction.jpg': stadiumBuild,
  'grand-stade-de-casa.jpg': grandStade,
};

useEffect(() => {
  let mounted = true;
  (async () => {
    const data = await fetchEvents();
    if (mounted && Array.isArray(data)) setEvents(data);
    else setEvents([]);
  })();
  return () => { mounted = false; };
}, []);

return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Countdown Section */}
        <section className="py-16 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4">
            <CountdownTimer />
          </div>
        </section>

        {/* Featured Sections */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Explore Morocco World Cup 2030
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about the tournament in one place
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredSections.map((section, index) => (
                <Link key={section.title} to={section.href}>
                  <Card
                    className="p-6 bg-gradient-card hover:shadow-morocco transition-all duration-300 group cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="w-12 h-12 bg-gradient-morocco rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-morocco">
                          <section.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {section.title}
                        </h3>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {section.description}
                      </p>
                      
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start group-hover:bg-muted transition-colors"
                      >
                        Discover More →
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Host Cities Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Host Cities
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the beautiful Moroccan cities that will host the World Cup 2030
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {hostCities.map((city, index) => (
                <Card
                  key={city.name}
                  className="overflow-hidden bg-card hover:shadow-morocco transition-all duration-300 group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={city.image} 
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      {city.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {city.description}
                    </p>
                    <div className="text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full inline-block">
                      {city.stadium}
                    </div>
                    <Link to={`/city/${city.name.toLowerCase()}`}>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full mt-4"
                      >
                        Explore City
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="py-16 bg-gradient-to-b from-muted to-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                How Can We Help You?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Various services to ensure a smooth and memorable experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {quickActions.map((action, index) => (
                <Card
                  key={action.title}
                  className="p-8 text-center bg-gradient-card hover:shadow-elegant transition-all duration-300 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-gradient-morocco rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-morocco">
                      <action.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-foreground">
                        {action.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                    
                    <Button
                      variant={action.variant}
                      size="lg"
                      className="w-full"
                      onClick={() => handleServiceReservation({
                        name: action.title,
                        type: action.title.toLowerCase().includes('guide') ? 'guide' : 'service',
                        price: action.title.includes('Guide') ? '350 MAD/heure' : 'Variable'
                      })}
                    >
                      {action.action}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-morocco bg-clip-text text-transparent mb-4">
                Essential Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need for an amazing World Cup 2030 experience in Morocco
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Transportation",
                  description: "Easy travel between cities and stadiums with our comprehensive transport network",
                  link: "/transport",
                  image: hotelImage
                },
                {
                  title: "Hotels & Accommodation",
                  description: "Find perfect stays from luxury hotels to budget-friendly options",
                  link: "/hotel",
                  image: hotelImage
                },
                {
                  title: "Car Rentals",
                  description: "Rent vehicles for convenient travel across Morocco",
                  link: "/rental",
                  image: rentalImage
                },
                {
                  title: "Restaurants",
                  description: "Discover authentic Moroccan cuisine and international dining",
                  link: "/restaurant",
                  image: restaurantImage
                },
                {
                  title: "Activities & Experiences",
                  description: "Discover unique Moroccan activities and cultural experiences during non-match days",
                  link: "/activities",
                  image: eventImage
                },
                {
                  title: "Local Guides",
                  description: "Connect with certified local guides for authentic experiences",
                  link: "/guide",
                  image: hotelImage
                }
              ].map((service, index) => (
                <Link
                  key={service.title}
                  to={service.link}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="p-6 h-full bg-gradient-card hover:shadow-morocco transition-all duration-300">
                    <div className="space-y-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden mb-4">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                      <Button variant="ghost" className="w-full group-hover:bg-muted">
                        Learn More →
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      
        {/* Upcoming Events (fetched from backend /api/events or fallback) */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">Upcoming Events</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Live events, city festivals and match-day activities you can join.</p>
            </div>
            <div id="events-root" className="grid md:grid-cols-3 gap-6">
              {events.map(e => (
                <div key={e.id} className="bg-card rounded-lg overflow-hidden border p-4">
                  <img src={imagesMap[e.stadiumImageName] || eventLogo} alt={e.title} className="w-full h-48 object-cover mb-4" />
                  <h3 className="text-lg font-semibold">{e.title}</h3>
                  <p className="text-sm text-muted-foreground">{e.city} — {e.date}</p>
                  <p className="text-sm mt-2 text-muted-foreground">{e.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <AIChat />
      
      {/* Modal de réservation */}
      {selectedService && (
        <ReservationModal
          isOpen={showReservation}
          onClose={() => {
            setShowReservation(false);
            setSelectedService(null);
          }}
          itemName={selectedService.name}
          itemType={selectedService.type as any}
          itemPrice={selectedService.price}
        />
      )}
    </div>
  );
};

export default Index;
