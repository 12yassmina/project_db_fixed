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
  const [selectedCity, setSelectedCity] = useState("Casablanca");
  const [selectedTransportType, setSelectedTransportType] = useState("all");

  // Handle app downloads and transport bookings
  const handleAppDownload = (appName: string) => {
    const appUrls = {
      'InDrive': 'https://play.google.com/store/apps/details?id=sinet.startup.inDriver',
      'Yango': 'https://play.google.com/store/apps/details?id=ru.yandex.taxi',
      'Careem': 'https://play.google.com/store/apps/details?id=com.careem.acma',
      'Uber': 'https://play.google.com/store/apps/details?id=com.ubercab'
    };
    
    window.open(appUrls[appName as keyof typeof appUrls] || '#', '_blank');
  };

  const handleTransportBooking = (transportType: string, city: string) => {
    // In a real app, this would redirect to booking pages
    alert(`Booking ${transportType} in ${city}. This would redirect to the booking system.`);
  };

  const handleCallTaxi = (taxiType: string) => {
    const taxiNumbers = {
      'Petit Taxi': '+212 5XX XX XX XX',
      'Grand Taxi': '+212 6XX XX XX XX', 
      'Hotel Taxis': '+212 5XX XX XX XX',
      'Airport Taxis': '+212 5XX XX XX XX'
    };
    
    const number = taxiNumbers[taxiType as keyof typeof taxiNumbers];
    window.location.href = `tel:${number}`;
  };

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
                  Welcome to Morocco
                </Badge>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-green-600 to-red-600 bg-clip-text text-transparent">
                Travel with Ease and Comfort
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Explore Morocco's vibrant cities with safe, modern transport options designed for World Cup fans. 
                From high-speed trains to free stadium shuttles, we've got your journey covered.
              </p>
              
            </div>
          </div>
        </section>



        {/* Interactive Transport Map */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Interactive Transport Map
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select your city to discover available transport options, apps, taxis, and tramways
              </p>
            </div>

            {/* City Selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {["Casablanca", "Rabat", "Marrakech", "Fez", "Tangier", "Agadir"].map((city) => (
                <Button
                  key={city}
                  variant={selectedCity === city ? "default" : "outline"}
                  onClick={() => setSelectedCity(city)}
                  className="mb-2"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {city}
                </Button>
              ))}
            </div>

            {/* Transport Type Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Button
                variant={selectedTransportType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTransportType("all")}
              >
                All Transport
              </Button>
              <Button
                variant={selectedTransportType === "public" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTransportType("public")}
              >
                <Bus className="w-4 h-4 mr-1" />
                Public Transport
              </Button>
              <Button
                variant={selectedTransportType === "apps" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTransportType("apps")}
              >
                <Phone className="w-4 h-4 mr-1" />
                Ride Apps
              </Button>
              <Button
                variant={selectedTransportType === "taxi" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTransportType("taxi")}
              >
                <Car className="w-4 h-4 mr-1" />
                Taxis
              </Button>
            </div>

            {/* Map Display */}
            <Card className="relative overflow-hidden border-2 border-red-100">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-green-500 to-red-500" />
              
              <div className="p-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Map Area */}
                  <div className="lg:col-span-2">
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-green-50 rounded-xl relative overflow-hidden border-2 border-green-200 shadow-lg">
                      {/* Morocco Map Background */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full max-w-md max-h-80 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border-4 border-gray-300 shadow-inner">
                          {/* Morocco Map Shape with Google Maps style */}
                          <div className="absolute inset-4 bg-gradient-to-br from-green-200 to-green-300 rounded-lg relative overflow-hidden">
                            {/* Road Network Grid */}
                            <div className="absolute inset-0">
                              {/* Major highways - horizontal */}
                              <div className="absolute top-1/4 left-0 w-full h-0.5 bg-yellow-400 opacity-70"></div>
                              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-yellow-400 opacity-70"></div>
                              <div className="absolute top-3/4 left-0 w-full h-0.5 bg-yellow-400 opacity-70"></div>
                              
                              {/* Major highways - vertical */}
                              <div className="absolute left-1/4 top-0 w-0.5 h-full bg-yellow-400 opacity-70"></div>
                              <div className="absolute left-1/2 top-0 w-0.5 h-full bg-yellow-400 opacity-70"></div>
                              <div className="absolute left-3/4 top-0 w-0.5 h-full bg-yellow-400 opacity-70"></div>
                              
                              {/* Secondary roads */}
                              <div className="absolute top-1/3 left-0 w-full h-px bg-gray-400 opacity-40"></div>
                              <div className="absolute top-2/3 left-0 w-full h-px bg-gray-400 opacity-40"></div>
                              <div className="absolute left-1/3 top-0 w-px h-full bg-gray-400 opacity-40"></div>
                              <div className="absolute left-2/3 top-0 w-px h-full bg-gray-400 opacity-40"></div>
                            </div>
                            
                            {/* Atlas Mountains representation */}
                            <div className="absolute top-1/3 left-1/4 w-1/2 h-1/4 bg-amber-200 opacity-40 rounded-full shadow-inner"></div>
                            
                            {/* Coastline - Google Maps style */}
                            <div className="absolute top-0 left-0 w-full h-3 bg-blue-400 opacity-60 rounded-t-lg"></div>
                            <div className="absolute bottom-0 left-0 w-3/4 h-3 bg-blue-400 opacity-60 rounded-bl-lg"></div>
                            <div className="absolute left-0 top-0 w-3 h-3/4 bg-blue-400 opacity-60 rounded-tl-lg"></div>
                            
                            {/* Cities and Routes */}
                            {selectedCity && (
                              <>
                                {/* TGV Route: Casablanca - Rabat */}
                                {(selectedCity === "Casablanca" || selectedCity === "Rabat") && (
                                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    <path
                                      d="M 45% 60% Q 42% 52% 40% 45%"
                                      stroke="#3B82F6"
                                      strokeWidth="3"
                                      fill="none"
                                      strokeDasharray="5,5"
                                      className="animate-pulse"
                                    />
                                    <text x="42%" y="52%" className="text-xs font-bold fill-blue-600">TGV</text>
                                  </svg>
                                )}
                                
                                {/* Highway Route: Casablanca - Marrakech */}
                                {(selectedCity === "Casablanca" || selectedCity === "Marrakech") && (
                                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    <path
                                      d="M 45% 60% Q 40% 67% 35% 75%"
                                      stroke="#EF4444"
                                      strokeWidth="3"
                                      fill="none"
                                      strokeDasharray="8,4"
                                      className="animate-pulse"
                                    />
                                    <text x="38%" y="70%" className="text-xs font-bold fill-red-600">A7</text>
                                  </svg>
                                )}
                                
                                {/* Train Route: Fez - Casablanca */}
                                {(selectedCity === "Fez" || selectedCity === "Casablanca") && (
                                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    <path
                                      d="M 55% 35% Q 50% 47% 45% 60%"
                                      stroke="#10B981"
                                      strokeWidth="2"
                                      fill="none"
                                      strokeDasharray="6,3"
                                    />
                                    <text x="48%" y="48%" className="text-xs font-bold fill-green-600">Train</text>
                                  </svg>
                                )}
                                
                                {/* Highway Route: Tangier - Rabat */}
                                {(selectedCity === "Tangier" || selectedCity === "Rabat") && (
                                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    <path
                                      d="M 45% 15% Q 42% 30% 40% 45%"
                                      stroke="#F59E0B"
                                      strokeWidth="2"
                                      fill="none"
                                      strokeDasharray="4,2"
                                    />
                                    <text x="40%" y="32%" className="text-xs font-bold fill-amber-600">A1</text>
                                  </svg>
                                )}
                                
                                {/* Highway Route: Marrakech - Agadir */}
                                {(selectedCity === "Marrakech" || selectedCity === "Agadir") && (
                                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    <path
                                      d="M 35% 75% Q 30% 80% 25% 85%"
                                      stroke="#8B5CF6"
                                      strokeWidth="2"
                                      fill="none"
                                      strokeDasharray="5,3"
                                    />
                                    <text x="28%" y="82%" className="text-xs font-bold fill-purple-600">A8</text>
                                  </svg>
                                )}
                                
                                {/* Airport Routes */}
                                {selectedTransportType === "all" && (
                                  <>
                                    {/* Airport symbols */}
                                    <div className="absolute" style={{left: "43%", top: "58%"}}>
                                      <div className="w-3 h-3 bg-gray-600 rounded-full flex items-center justify-center">
                                        <span className="text-xs text-white">✈</span>
                                      </div>
                                    </div>
                                    <div className="absolute" style={{left: "38%", top: "43%"}}>
                                      <div className="w-3 h-3 bg-gray-600 rounded-full flex items-center justify-center">
                                        <span className="text-xs text-white">✈</span>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                          
                          {/* City Markers */}
                          {[
                            { name: "Casablanca", x: "45%", y: "60%", stadium: "Grand Stade Hassan II" },
                            { name: "Rabat", x: "40%", y: "45%", stadium: "Prince Moulay Abdellah" },
                            { name: "Marrakech", x: "35%", y: "75%", stadium: "Stade de Marrakech" },
                            { name: "Fez", x: "55%", y: "35%", stadium: "Complexe Sportif de Fès" },
                            { name: "Tangier", x: "45%", y: "15%", stadium: "Stade Ibn Batouta" },
                            { name: "Agadir", x: "25%", y: "85%", stadium: "Stade Adrar" }
                          ].map((city) => (
                            <div key={city.name} className="absolute" style={{ left: city.x, top: city.y }}>
                              {/* City Marker */}
                              <div
                                className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-300 border-2 border-white shadow-lg ${
                                  selectedCity === city.name 
                                    ? "bg-red-500 scale-150 shadow-xl animate-pulse" 
                                    : "bg-green-600 hover:scale-125 hover:bg-green-500"
                                }`}
                                onClick={() => setSelectedCity(city.name)}
                              >
                                {/* Stadium Icon */}
                                <div className="w-full h-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                              </div>
                              
                              {/* City Label */}
                              <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                                selectedCity === city.name ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                              }`}>
                                <div className="bg-white px-2 py-1 rounded-md shadow-lg border text-xs font-semibold text-center whitespace-nowrap">
                                  <div className="text-green-700">{city.name}</div>
                                  <div className="text-gray-500 text-xs">{city.stadium}</div>
                                </div>
                              </div>
                              
                              {/* Connection Lines for Selected City */}
                              {selectedCity === city.name && (
                                <div className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-red-300 rounded-full animate-ping opacity-30"></div>
                              )}
                            </div>
                          ))}
                          
                          {/* Transport Routes */}
                          {selectedCity === "Casablanca" && (
                            <>
                              <div className="absolute top-[45%] left-[40%] w-[5%] h-[15%] bg-blue-500 opacity-50 rounded-full transform rotate-45"></div>
                              <div className="absolute top-[60%] left-[35%] w-[10%] h-[15%] bg-blue-500 opacity-50 rounded-full transform rotate-12"></div>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Map Legend */}
                      <div className="absolute bottom-4 left-4 bg-white/95 p-3 rounded-lg shadow-lg border">
                        <div className="text-xs font-semibold mb-2">Legend</div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                            <span className="text-xs">Host Cities</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-xs">Selected</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-blue-500"></div>
                            <span className="text-xs">TGV Route</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-red-500"></div>
                            <span className="text-xs">Highway</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-green-500"></div>
                            <span className="text-xs">Train</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-0.5 bg-yellow-400"></div>
                            <span className="text-xs">Roads</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs">✈</span>
                            <span className="text-xs">Airports</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative Amazigh symbols */}
                      <div className="absolute top-4 right-4 text-3xl text-red-500 opacity-30">ⵣ</div>
                      <div className="absolute bottom-4 right-4 text-3xl text-green-500 opacity-30">ⴰ</div>
                      
                      {/* Morocco Flag Colors */}
                      <div className="absolute top-2 left-2 w-8 h-6 bg-red-500 rounded-sm shadow-md"></div>
                      <div className="absolute top-2 left-12 w-8 h-6 bg-green-500 rounded-sm shadow-md"></div>
                    </div>
                  </div>

                  {/* Transport Options Panel */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-red-500" />
                        {selectedCity}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        {selectedCity === "Casablanca" && "Morocco's economic capital with extensive transport network"}
                        {selectedCity === "Rabat" && "Capital city with modern public transport systems"}
                        {selectedCity === "Marrakech" && "Tourist hub with traditional and modern transport"}
                        {selectedCity === "Fez" && "Historic city with developing transport infrastructure"}
                        {selectedCity === "Tangier" && "Gateway to Europe with ferry and rail connections"}
                        {selectedCity === "Agadir" && "Coastal city with airport and bus connections"}
                      </p>
                    </div>

                    {/* Transport Options Based on Selected City and Type */}
                    {(selectedTransportType === "all" || selectedTransportType === "public") && (
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Bus className="w-4 h-4" />
                          Public Transport
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedCity === "Casablanca" && (
                            <>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-blue-50" onClick={() => handleTransportBooking('TGV High-Speed Train', selectedCity)}>
                                🚄 TGV Train
                              </Button>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-green-50" onClick={() => handleTransportBooking('Casa Tramway', selectedCity)}>
                                🚊 Tramway
                              </Button>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-yellow-50" onClick={() => handleTransportBooking('City Buses', selectedCity)}>
                                🚌 City Buses
                              </Button>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-red-50" onClick={() => handleTransportBooking('Stadium Shuttles', selectedCity)}>
                                🚐 Stadium Shuttles
                              </Button>
                            </>
                          )}
                          {selectedCity === "Rabat" && (
                            <>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-blue-50" onClick={() => handleTransportBooking('TGV Train', selectedCity)}>
                                🚄 TGV Train
                              </Button>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-green-50" onClick={() => handleTransportBooking('Rabat-Salé Tramway', selectedCity)}>
                                🚊 Tramway
                              </Button>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-purple-50" onClick={() => handleTransportBooking('Bus Rapid Transit', selectedCity)}>
                                🚌 Bus Rapid Transit
                              </Button>
                            </>
                          )}
                          {selectedCity === "Marrakech" && (
                            <>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-yellow-50" onClick={() => handleTransportBooking('City Buses', selectedCity)}>
                                🚌 City Buses
                              </Button>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-orange-50" onClick={() => handleTransportBooking('Tourist Shuttles', selectedCity)}>
                                🚐 Tourist Shuttles
                              </Button>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-amber-50" onClick={() => handleTransportBooking('Horse Carriages', selectedCity)}>
                                🏇 Caleche
                              </Button>
                            </>
                          )}
                          {selectedCity === "Fez" && (
                            <>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-blue-50" onClick={() => handleTransportBooking('Regional Trains', selectedCity)}>
                                🚂 Regional Trains
                              </Button>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-yellow-50" onClick={() => handleTransportBooking('Local Buses', selectedCity)}>
                                🚌 Local Buses
                              </Button>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-purple-50" onClick={() => handleTransportBooking('Medina Shuttles', selectedCity)}>
                                🚐 Medina Shuttles
                              </Button>
                            </>
                          )}
                          {selectedCity === "Tangier" && (
                            <>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-blue-50" onClick={() => handleTransportBooking('Train to Casablanca', selectedCity)}>
                                🚂 Train
                              </Button>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-cyan-50" onClick={() => handleTransportBooking('Ferry Terminal', selectedCity)}>
                                ⛴️ Ferry
                              </Button>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-yellow-50" onClick={() => handleTransportBooking('City Buses', selectedCity)}>
                                🚌 City Buses
                              </Button>
                            </>
                          )}
                          {selectedCity === "Agadir" && (
                            <>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-sky-50" onClick={() => handleTransportBooking('Airport Shuttles', selectedCity)}>
                                ✈️ Airport Shuttles
                              </Button>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-yellow-50" onClick={() => handleTransportBooking('Local Buses', selectedCity)}>
                                🚌 Local Buses
                              </Button>
                              <Button variant="outline" size="sm" className="justify-start hover:bg-teal-50" onClick={() => handleTransportBooking('Beach Shuttles', selectedCity)}>
                                🚐 Beach Shuttles
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {(selectedTransportType === "all" || selectedTransportType === "apps") && (
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Ride-sharing Apps
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="justify-start hover:bg-orange-50 hover:border-orange-300"
                            onClick={() => handleAppDownload('InDrive')}
                          >
                            🚗 InDrive
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="justify-start hover:bg-yellow-50 hover:border-yellow-300"
                            onClick={() => handleAppDownload('Yango')}
                          >
                            🚕 Yango
                          </Button>
                          {(selectedCity === "Casablanca" || selectedCity === "Rabat" || selectedCity === "Marrakech") && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="justify-start hover:bg-green-50 hover:border-green-300"
                                onClick={() => handleAppDownload('Careem')}
                              >
                                🚙 Careem
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="justify-start hover:bg-gray-50 hover:border-gray-300"
                                onClick={() => handleAppDownload('Uber')}
                              >
                                🚘 Uber
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {(selectedTransportType === "all" || selectedTransportType === "taxi") && (
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Car className="w-4 h-4" />
                          Traditional Taxis
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="justify-start hover:bg-yellow-50 hover:border-yellow-300"
                            onClick={() => handleCallTaxi('Petit Taxi')}
                          >
                            🚕 Petit Taxi
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="justify-start hover:bg-blue-50 hover:border-blue-300"
                            onClick={() => handleCallTaxi('Grand Taxi')}
                          >
                            🚐 Grand Taxi
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="justify-start hover:bg-purple-50 hover:border-purple-300"
                            onClick={() => handleCallTaxi('Hotel Taxis')}
                          >
                            🏨 Hotel Taxis
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="justify-start hover:bg-green-50 hover:border-green-300"
                            onClick={() => handleCallTaxi('Airport Taxis')}
                          >
                            ✈️ Airport Taxis
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
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


      </main>

      <Footer />
    </div>
  );
};

export default TransportPage;