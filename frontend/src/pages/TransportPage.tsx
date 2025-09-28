import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bus, 
  Train, 
  Car, 
  Plane, 
  MapPin, 
  Clock, 
  Users,
  Star,
  Phone,
  Navigation
} from "lucide-react";
import { Link } from "react-router-dom";

const TransportPage = () => {
  const transportOptions = [
    {
      icon: Bus,
      title: "Shuttle Buses",
      description: "Free shuttle service between stadiums and tourist areas",
      price: "Free for fans",
      time: "Every 15 minutes",
      rating: 4.8,
      color: "bg-green-500"
    },
    {
      icon: Train,
      title: "High-Speed Rail",
      description: "Morocco TGV - Fast connection between major cities",
      price: "From 150 MAD",
      time: "2 hours Casablanca-Rabat",
      rating: 4.9,
      color: "bg-blue-500"
    },
    {
      icon: Car,
      title: "Car Rental",
      description: "Latest technology vehicles with integrated GPS",
      price: "From 300 MAD/day",
      time: "Available 24/7",
      rating: 4.7,
      color: "bg-purple-500"
    },
    {
      icon: Plane,
      title: "Domestic Flights",
      description: "Quick flights between host city airports",
      price: "From 800 MAD",
      time: "1 hour",
      rating: 4.6,
      color: "bg-orange-500"
    }
  ];

  const routes = [
    { from: "Casablanca", to: "Rabat", duration: "45 minutes", transport: "Train" },
    { from: "Marrakech", to: "Casablanca", duration: "3 hours", transport: "Bus" },
    { from: "Tangier", to: "Fez", duration: "2 hours", transport: "Train" },
    { from: "Agadir", to: "Marrakech", duration: "3 hours", transport: "Bus" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4 text-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="mb-4">
                <Navigation className="w-4 h-4 mr-2" />
                Transport & Navigation
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Travel with Ease and Comfort
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Modern and comfortable transport services to ensure you reach all stadiums and events safely and on time
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/hotel">
                  <Button variant="hero" size="lg">
                    Book Your Transport Now
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  <MapPin className="w-4 h-4 mr-2" />
                  View Map
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Transport Options */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Transportation Options
              </h2>
              <p className="text-muted-foreground">
                Choose the best way to travel around
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {transportOptions.map((option, index) => (
                <Card
                  key={option.title}
                  className="p-6 hover:shadow-morocco transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <option.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {option.title}
                          </h3>
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-muted-foreground">{option.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {option.price}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground">
                      {option.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{option.time}</span>
                      </div>
                      <Button variant="hero" size="sm">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Routes */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Popular Routes
              </h2>
              <p className="text-muted-foreground">
                Most requested routes between host cities
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {routes.map((route, index) => (
                <Card key={index} className="p-6 bg-card">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-medium">{route.from}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-medium">{route.to}</span>
                      </div>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Clock className="w-4 h-4" />
                          <span>{route.duration}</span>
                        </div>
                        <Badge variant="secondary">
                          {route.transport}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Book
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Need Transportation Help?
              </h2>
              <p className="text-muted-foreground">
                Our team is available 24/7 to assist you with any transportation issues
              </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/emergency">
                    <Button variant="hero" size="lg">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Support
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    WhatsApp Help
                  </Button>
                </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TransportPage;