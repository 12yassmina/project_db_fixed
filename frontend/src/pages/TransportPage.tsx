import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Navigation,
  Download,
  MessageCircle,
  Globe,
  Filter,
  Route,
  Calendar,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";

const TransportPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeLanguage, setActiveLanguage] = useState("en");

  const transportModes = [
    {
      id: "shuttle",
      icon: Bus,
      title: "Shuttle Buses",
      subtitle: "🚌 Free for fans, every 15 min",
      description: "Connects stadiums and tourist zones with comfortable, air-conditioned buses",
      features: ["Free for ticket holders", "Every 15 minutes", "Stadium direct routes", "Tourist zone stops"],
      cta: "Book Shuttle",
      color: "bg-green-500",
      gradient: "from-green-400 to-green-600"
    },
    {
      id: "rail",
      icon: Train,
      title: "High-Speed Rail",
      subtitle: "🚄 TGV between major cities (2h Casa-Rabat)",
      description: "Morocco's modern TGV network connecting all host cities with comfort and speed",
      features: ["Casablanca-Rabat: 45min", "Air conditioning", "WiFi onboard", "Food service"],
      cta: "View Schedule",
      color: "bg-blue-500",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      id: "rental",
      icon: Car,
      title: "Car Rental",
      subtitle: "🚗 GPS-equipped vehicles, 24/7 availability",
      description: "Modern vehicles with GPS navigation and 24/7 roadside assistance",
      features: ["GPS navigation", "24/7 support", "Insurance included", "Multiple pickup points"],
      cta: "Reserve Car",
      color: "bg-purple-500",
      gradient: "from-purple-400 to-purple-600"
    },
    {
      id: "flights",
      icon: Plane,
      title: "Domestic Flights",
      subtitle: "✈️ 1h flights between host cities",
      description: "Quick domestic connections between Agadir, Tangier, and other host cities",
      features: ["Agadir-Tangier: 1h", "Multiple daily flights", "Stadium transfers", "Baggage included"],
      cta: "Compare Flights",
      color: "bg-orange-500",
      gradient: "from-orange-400 to-orange-600"
    }
  ];

  const popularRoutes = [
    { from: "Casablanca", to: "Rabat", duration: "45 min", transport: "Train", price: "150 MAD", frequency: "Every 30min" },
    { from: "Marrakech", to: "Casablanca", duration: "3h", transport: "Bus", price: "80 MAD", frequency: "Every hour" },
    { from: "Tangier", to: "Fez", duration: "2h", transport: "Train", price: "120 MAD", frequency: "4 times/day" },
    { from: "Agadir", to: "Marrakech", duration: "3h", transport: "Bus", price: "100 MAD", frequency: "Every 2h" }
  ];

  const testimonials = [
    { text: "I got from Fez to Rabat in 2 hours—super smooth!", author: "Sarah M.", country: "🇫🇷 France" },
    { text: "The shuttle buses made stadium access so easy!", author: "Ahmed K.", country: "🇲🇦 Morocco" },
    { text: "Car rental with GPS was perfect for exploring!", author: "John D.", country: "🇺🇸 USA" }
  ];

  const languages = [
    { code: "ar", name: "العربية", greeting: "مرحبا بك في المغرب" },
    { code: "ber", name: "ⵜⴰⵎⴰⵣⵉⵖⵜ", greeting: "ⴰⵣⵓⵍ ⵓⵎⴰⵣⵖⵉⴱ" },
    { code: "fr", name: "Français", greeting: "Bienvenue au Maroc" },
    { code: "en", name: "English", greeting: "Welcome to Morocco" },
    { code: "es", name: "Español", greeting: "Bienvenido a Marruecos" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Welcome Banner */}
        <section className="relative py-20 bg-gradient-to-br from-red-50 via-green-50 to-red-50 overflow-hidden">
          {/* Moroccan Pattern Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c41e3a' fill-opacity='0.4'%3E%3Cpath d='M30 30l15-15v30l-15-15zm-15 0L0 15v30l15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="space-y-8">
              {/* Cultural Greeting */}
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4 border-2 border-red-200 bg-white/80">
                  <Globe className="w-4 h-4 mr-2" />
                  {languages.find(l => l.code === activeLanguage)?.greeting || "Welcome to Morocco"}
                </Badge>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-green-600 to-red-600 bg-clip-text text-transparent">
                Travel with Ease and Comfort
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Explore Morocco's vibrant cities with safe, modern transport options designed for World Cup fans. 
                From high-speed trains to free stadium shuttles, we've got your journey covered.
              </p>
              
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" className="bg-gradient-morocco text-white">
                  <Route className="w-5 h-5 mr-2" />
                  Plan Your Journey Now
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download Transport Guide PDF
                </Button>
                <Button variant="outline" size="lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  Interactive Map
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Transport Modes */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Transportation Modes
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose your perfect way to explore Morocco during the World Cup
              </p>
            </div>

            <Tabs defaultValue="shuttle" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-12">
                {transportModes.map((mode) => (
                  <TabsTrigger key={mode.id} value={mode.id} className="flex items-center gap-2">
                    <mode.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{mode.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {transportModes.map((mode) => (
                <TabsContent key={mode.id} value={mode.id}>
                  <Card className="relative overflow-hidden border-2 border-red-100">
                    {/* Zellige-inspired border pattern */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-green-500 to-red-500" />
                    
                    <div className="p-8">
                      <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 bg-gradient-to-br ${mode.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                              <mode.icon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-foreground">{mode.title}</h3>
                              <p className="text-muted-foreground">{mode.subtitle}</p>
                            </div>
                          </div>
                          
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            {mode.description}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4">
                            {mode.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          <Button size="lg" className={`bg-gradient-to-r ${mode.gradient} text-white hover:opacity-90`}>
                            {mode.cta}
                          </Button>
                        </div>
                        
                        <div className="relative">
                          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                            <mode.icon className="w-24 h-24 text-gray-400" />
                          </div>
                          {/* Decorative Amazigh pattern */}
                          <div className="absolute -top-4 -right-4 w-8 h-8 text-red-500 opacity-20">
                            ⵣ
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Popular Routes */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Popular Routes
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Most requested routes between Morocco's World Cup host cities
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {popularRoutes.map((route, index) => (
                <Card key={index} className="relative overflow-hidden border-2 border-green-100 hover:shadow-xl transition-all duration-300 group">
                  {/* Zellige border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-red-500" />
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-lg font-bold">
                            <span>{route.from}</span>
                            <span className="text-muted-foreground">→</span>
                            <span>{route.to}</span>
                          </div>
                          <Badge variant="secondary" className="mt-1">
                            {route.transport}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{route.price}</div>
                        <div className="text-sm text-muted-foreground">per person</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{route.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{route.frequency}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:opacity-90">
                      Book This Route
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Interactive Transport Map
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore stadiums, transport hubs, and routes with our interactive map
              </p>
            </div>

            <Card className="relative overflow-hidden border-2 border-red-100">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-green-500 to-red-500" />
              
              <div className="p-8">
                {/* Map Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button
                    variant={selectedFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("all")}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    All Routes
                  </Button>
                  <Button
                    variant={selectedFilter === "trains" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("trains")}
                  >
                    <Train className="w-4 h-4 mr-2" />
                    Show Only Trains
                  </Button>
                  <Button
                    variant={selectedFilter === "shuttles" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("shuttles")}
                  >
                    <Bus className="w-4 h-4 mr-2" />
                    Stadium Shuttles
                  </Button>
                  <Button
                    variant={selectedFilter === "walking" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("walking")}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Walking Paths
                  </Button>
                </div>
                
                {/* Placeholder Map */}
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center relative">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Interactive Map Coming Soon</p>
                    <p className="text-gray-400 text-sm">Zoomable map with stadiums, transport hubs, and routes</p>
                  </div>
                  
                  {/* Decorative Amazigh symbols */}
                  <div className="absolute top-4 left-4 text-2xl text-red-500 opacity-20">ⵣ</div>
                  <div className="absolute bottom-4 right-4 text-2xl text-green-500 opacity-20">ⴰ</div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                What Travelers Say
              </h2>
              <p className="text-lg text-muted-foreground">
                Real experiences from World Cup fans
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 bg-card border-2 border-green-100">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-morocco rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {testimonial.author[0]}
                      </div>
                      <div>
                        <div className="font-medium">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.country}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Accessibility & Support */}
        <section className="py-20 bg-gradient-to-br from-red-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Accessibility & Support
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're here to help 24/7 with multilingual support and emergency transport
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Multilingual Support */}
              <Card className="p-8 text-center border-2 border-red-100">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Multilingual Support</h3>
                <p className="text-muted-foreground mb-6">
                  Available in Arabic, Tamazight, French, English, and Spanish
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {languages.map((lang) => (
                    <Badge key={lang.code} variant="outline" className="text-xs">
                      {lang.name}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* WhatsApp Help */}
              <Card className="p-8 text-center border-2 border-green-100">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">WhatsApp Help</h3>
                <p className="text-muted-foreground mb-6">
                  Instant support via WhatsApp for quick transport questions
                </p>
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat Now
                </Button>
              </Card>

              {/* Emergency Transport */}
              <Card className="p-8 text-center border-2 border-orange-100">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Emergency Transport</h3>
                <p className="text-muted-foreground mb-6">
                  Night buses, safe zones, and emergency transport services
                </p>
                <Link to="/emergency">
                  <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency Info
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-red-600 via-green-600 to-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Amazigh decorative elements */}
              <div className="flex justify-center gap-8 text-4xl opacity-30 mb-8">
                <span>ⵣ</span>
                <span>ⴰ</span>
                <span>ⵎ</span>
                <span>ⴰ</span>
                <span>ⵣ</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Explore Morocco?
              </h2>
              
              <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
                Join thousands of fans who trust our transport network. 
                Plan your journey today and experience Morocco with confidence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-bold">
                  <Route className="w-5 h-5 mr-2" />
                  Plan Your Journey Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                  <Download className="w-5 h-5 mr-2" />
                  Download Transport Guide PDF
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Subscribe for Route Alerts
                </Button>
              </div>
              
              {/* Gamification Element */}
              <div className="mt-12 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">🏆 Collect City Stamps!</h3>
                <p className="opacity-90 mb-4">
                  Visit all host cities and collect digital stamps in your travel passport!
                </p>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                  Start Collecting
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