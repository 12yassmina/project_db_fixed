import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
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
import casablancaImage from "@/assets/casablanca-city.jpg";
import marrakechImage from "@/assets/marrakech-city .jpg";
import rabatImage from "@/assets/rabat-city.jpg";
import tangierImage from "@/assets/cities/tangier-real.jpg";
import fesImage from "@/assets/cities/citie fes.jpg";
import agadirImage from "@/assets/cities/citie-Agadir.jpg";

const HomePage = () => {
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full mt-4"
                      onClick={() => window.location.href = `/city/${city.name.toLowerCase()}`}
                    >
                      Explore City
                    </Button>
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
                    >
                      {action.action}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-accent/10 px-4 py-2 rounded-full">
                    <Heart className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-accent">Discover Morocco</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Welcome to Authentic
                    <span className="block bg-gradient-morocco bg-clip-text text-transparent">
                      Moroccan Hospitality
                    </span>
                  </h2>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Enjoy a unique cultural experience that combines the richness of Moroccan history with the excitement of world football. 
                    From couscous and tagine to Gnawa music and traditional arts.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Traditional Dishes", value: "50+" },
                    { label: "Heritage Sites", value: "12" },
                    { label: "Cultural Events", value: "100+" },
                    { label: "Local Languages", value: "3" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="lg">
                    Discover Moroccan Culture
                  </Button>
                  <Button variant="outline" size="lg">
                    Moroccan Food Guide
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-morocco rounded-2xl p-8 text-center flex items-center justify-center shadow-morocco">
                  <div className="text-6xl md:text-8xl">🇲🇦</div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full animate-float blur-sm" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full animate-float animation-delay-1000 blur-sm" />
              </div>
            </div>
          </div>
        </section>
        {/* Cities Section */}
        <section id="cities" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-morocco bg-clip-text text-transparent mb-4">
                Host Cities
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore the magnificent cities that will host the 2030 World Cup matches in Morocco
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Casablanca", image: casablancaImage, description: "Morocco's economic capital" },
                { name: "Marrakech", image: marrakechImage, description: "The Red City" },
                { name: "Rabat", image: rabatImage, description: "The capital city" },
                { name: "Tangier", image: tangierImage, description: "Gateway to Europe" }
              ].map((city, index) => (
                <Link
                  key={city.name}
                  to={`/city/${city.name.toLowerCase()}`}
                  className="group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="p-6 bg-gradient-card hover:shadow-morocco transition-all duration-300">
                    <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={city.image} 
                        alt={`${city.name} cityscape`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">{city.description}</p>
                    <Button variant="ghost" className="w-full group-hover:bg-muted">
                      Explore City →
                    </Button>
                  </Card>
                </Link>
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
                  icon: "🚌"
                },
                {
                  title: "Hotels & Accommodation",
                  description: "Find perfect stays from luxury hotels to budget-friendly options",
                  link: "/hotels",
                  icon: "🏨"
                },
                {
                  title: "Car Rentals",
                  description: "Rent vehicles for convenient travel across Morocco",
                  link: "/car-rentals",
                  icon: "🚗"
                },
                {
                  title: "Restaurants",
                  description: "Discover authentic Moroccan cuisine and international dining",
                  link: "/restaurants",
                  icon: "🍽️"
                },
                {
                  title: "Events & Activities",
                  description: "Cultural events and activities happening during the World Cup",
                  link: "/events",
                  icon: "🎉"
                },
                {
                  title: "Emergency Services",
                  description: "Important contacts and emergency information for your safety",
                  link: "/emergency",
                  icon: "🚨"
                }
              ].map((service, index) => (
                <Link
                  key={service.title}
                  to={service.link}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="p-6 h-full bg-gradient-card hover:shadow-morocco transition-all duration-300">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 flex-1">
                      {service.description}
                    </p>
                    <Button variant="ghost" className="w-full group-hover:bg-muted">
                      Learn More →
                    </Button>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default HomePage;