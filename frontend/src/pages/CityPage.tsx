import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Users, Calendar, Camera, Utensils, Building, Plane } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import casablancaImage from "@/assets/cities/casablanca-real.jpeg";
import marrakechImage from "@/assets/cities/marrakech-real.jpg";
import rabatImage from "@/assets/cities/rabat-real.jpg";
import tangierImage from "@/assets/cities/tangier-real.jpg";

const CityPage = () => {
  const { cityName } = useParams<{ cityName: string }>();
  
  const cityData: Record<string, any> = {
    casablanca: {
      name: "Casablanca",
      description: "Morocco's economic capital and largest city, known for its modern architecture, bustling business district, and the magnificent Hassan II Mosque.",
      image: casablancaImage,
      stadium: {
        name: "Grand Stadium Casablanca",
        capacity: "80,000",
        status: "Under Construction",
        features: ["Opening Ceremony", "Final Match", "Retractable Roof", "VIP Suites"]
      },
      attractions: [
        "Hassan II Mosque - One of the world's largest mosques",
        "Royal Palace of Casablanca - Historic royal residence",
        "Old Medina - Traditional marketplace and crafts",
        "Corniche - Beautiful coastal promenade",
        "Villa des Arts - Contemporary art museum",
        "Central Market - Local food and goods"
      ],
      hotels: [
        "Four Seasons Hotel Casablanca - Luxury oceanfront",
        "Hyatt Regency Casablanca - Business district",
        "Sofitel Casablanca Tour Blanche - City center",
        "Movenpick Hotel Casablanca - Modern amenities"
      ],
      restaurants: [
        "La Sqala - Traditional Moroccan cuisine",
        "Rick's Cafe - Famous movie-themed restaurant", 
        "Le Cabestan - Seafood with ocean view",
        "Brasserie La Tour - French-Moroccan fusion"
      ]
    },
    marrakech: {
      name: "Marrakech",
      description: "The Red City, famous for its vibrant souks, historic palaces, and the iconic Jemaa el-Fnaa square that comes alive every evening.",
      image: marrakechImage,
      stadium: {
        name: "Marrakech Red City Stadium",
        capacity: "45,000",
        status: "Planning Phase",
        features: ["Traditional Design", "Climate Control", "Cultural Center", "Heritage Museum"]
      },
      attractions: [
        "Jemaa el-Fnaa - UNESCO World Heritage square",
        "Bahia Palace - 19th-century architectural marvel",
        "Majorelle Garden - Botanical garden and museum",
        "Koutoubia Mosque - Iconic 12th-century minaret",
        "Saadian Tombs - Historic royal necropolis",
        "Souks of Marrakech - Traditional markets"
      ],
      hotels: [
        "La Mamounia - Palace hotel with gardens",
        "Royal Mansour - Luxury riad experience",
        "Four Seasons Resort Marrakech - Resort-style",
        "Amanjena - Peaceful pavilion resort"
      ],
      restaurants: [
        "Dar Yacout - Rooftop traditional dining",
        "Le Foundouk - Modern Moroccan cuisine",
        "Comptoir Darna - Entertainment and dining",
        "Al Fassia - Authentic women-run restaurant"
      ]
    },
    rabat: {
      name: "Rabat",
      description: "Morocco's capital city, a UNESCO World Heritage site combining historic monuments with modern government buildings and beautiful Atlantic coastline.",
      image: rabatImage,
      stadium: {
        name: "Rabat National Stadium",
        capacity: "52,000",
        status: "Complete",
        features: ["Solar Powered", "Rain Water Collection", "Digital Screens", "Eco-Friendly"]
      },
      attractions: [
        "Kasbah of the Udayas - Historic fortress and gardens",
        "Hassan Tower - Unfinished minaret and mausoleum",
        "Royal Palace - Official residence of the King",
        "Archaeological Museum - Prehistoric to Islamic art",
        "Chellah - Medieval fortified site",
        "Oudaias Beach - Atlantic Ocean coastline"
      ],
      hotels: [
        "Sofitel Rabat Jardin des Roses - Luxury garden hotel",
        "Villa Mandarine - Boutique hotel experience",
        "The Westin Rabat - Modern business hotel",
        "Hotel Belere Rabat - Contemporary comfort"
      ],
      restaurants: [
        "Dinarjat - Traditional palace dining",
        "Le Dhow - Boat restaurant on river",
        "Matsuri - Japanese cuisine",
        "Villa Mandarine Restaurant - Garden dining"
      ]
    },
    tangier: {
      name: "Tangier",
      description: "Gateway between Africa and Europe, a cosmopolitan port city known for its rich cultural history, stunning Mediterranean views, and vibrant arts scene.",
      image: tangierImage,
      stadium: {
        name: "Tangier International Stadium",
        capacity: "65,000",
        status: "Renovation",
        features: ["Mediterranean View", "Fan Zone", "Training Pitches", "Media Center"]
      },
      attractions: [
        "Kasbah Museum - Traditional palace and artifacts",
        "Caves of Hercules - Legendary coastal caves",
        "Cap Spartel - Where Atlantic meets Mediterranean",
        "Grand Socco - Central market square",
        "American Legation Museum - Diplomatic history",
        "Old Medina - Winding streets and shops"
      ],
      hotels: [
        "Hotel Continental - Historic oceanfront",
        "Hilton Garden Inn Tanger City Center - Modern",
        "Movenpick Hotel & Residence Tanger - Luxury",
        "InterContinental Tanger - Business district"
      ],
      restaurants: [
        "El Morocco Club - Rooftop terrace dining",
        "Le Saveur du Poisson - Fresh seafood",
        "Restaurant Riad Tanja - Traditional atmosphere",
        "Cafe Hafa - Historic cliff-top cafe"
      ]
    }
  };

  const city = cityData[cityName?.toLowerCase() || ''] || cityData.casablanca;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete": return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "Under Construction": return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "Renovation": return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "Planning Phase": return "bg-purple-500/10 text-purple-700 dark:text-purple-400";
      default: return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-6">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                  {city.name}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {city.description}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="lg">
                    Plan Your Visit
                  </Button>
                  <Button variant="outline" size="lg">
                    <Camera className="w-4 h-4 mr-2" />
                    View Gallery
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-morocco">
                  <img 
                    src={city.image} 
                    alt={city.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-full animate-float blur-sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Stadium Information */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground">World Cup Stadium</h2>
              <p className="text-muted-foreground">The venue that will host World Cup matches in {city.name}</p>
            </div>

            <Card className="max-w-4xl mx-auto p-8 bg-gradient-card">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-foreground">{city.stadium.name}</h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(city.stadium.status)}`}>
                      {city.stadium.status}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center text-lg">
                      <Users className="w-5 h-5 mr-2 text-primary" />
                      <span className="font-semibold">{city.stadium.capacity}</span>
                      <span className="text-muted-foreground ml-1">capacity</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-foreground">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {city.stadium.features.map((feature: string) => (
                        <Badge key={feature} variant="secondary" className="justify-start">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Stadium Details & Tours
                  </Button>
                </div>
                
                <div className="text-center">
                  <div className="w-40 h-40 bg-gradient-morocco rounded-full flex items-center justify-center mx-auto mb-4 shadow-morocco">
                    <Building className="w-20 h-20 text-primary-foreground" />
                  </div>
                  <p className="text-muted-foreground">Stadium illustration</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Top Attractions */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground">Top Attractions</h2>
              <p className="text-muted-foreground">Must-visit places in {city.name}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {city.attractions.map((attraction: string, index: number) => (
                <Card
                  key={index}
                  className="p-6 bg-gradient-card hover:shadow-morocco transition-all duration-300 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 bg-gradient-morocco rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <p className="text-foreground font-medium leading-relaxed">
                      {attraction}
                    </p>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Learn More →
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Hotels & Restaurants */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Hotels */}
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Recommended Hotels</h2>
                  <p className="text-muted-foreground">Premium accommodations for your stay</p>
                </div>
                
                <div className="space-y-4">
                  {city.hotels.map((hotel: string, index: number) => (
                    <Card key={index} className="p-4 bg-gradient-card hover:shadow-morocco transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-morocco rounded-lg flex items-center justify-center">
                          <Building className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{hotel}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Book Now
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Restaurants */}
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Top Restaurants</h2>
                  <p className="text-muted-foreground">Taste the authentic flavors of {city.name}</p>
                </div>
                
                <div className="space-y-4">
                  {city.restaurants.map((restaurant: string, index: number) => (
                    <Card key={index} className="p-4 bg-gradient-card hover:shadow-morocco transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-morocco rounded-lg flex items-center justify-center">
                          <Utensils className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{restaurant}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Reserve
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Getting There */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold text-foreground">Getting to {city.name}</h2>
                <p className="text-muted-foreground">Transportation options and travel tips</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="p-6 text-center bg-gradient-card">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-gradient-morocco rounded-full flex items-center justify-center mx-auto">
                      <Plane className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">By Air</h3>
                    <p className="text-muted-foreground text-sm">
                      International flights available with connections to major cities
                    </p>
                    <Button variant="outline" size="sm">
                      Find Flights
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 text-center bg-gradient-card">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-gradient-morocco rounded-full flex items-center justify-center mx-auto">
                      <Calendar className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">By Train</h3>
                    <p className="text-muted-foreground text-sm">
                      High-speed rail connections between all host cities
                    </p>
                    <Button variant="outline" size="sm">
                      Train Schedule
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 text-center bg-gradient-card">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-gradient-morocco rounded-full flex items-center justify-center mx-auto">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">By Road</h3>
                    <p className="text-muted-foreground text-sm">
                      Modern highway network with shuttle services available
                    </p>
                    <Button variant="outline" size="sm">
                      Route Planner
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CityPage;