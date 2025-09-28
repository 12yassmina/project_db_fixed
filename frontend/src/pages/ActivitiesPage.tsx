import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Camera, 
  Mountain, 
  Utensils, 
  ShoppingBag,
  Music,
  Palette,
  Star,
  Heart
} from "lucide-react";

const ActivitiesPage = () => {
  const activitiesByCity = [
    {
      city: "Casablanca",
      activities: [
        {
          title: "Hassan II Mosque Visit",
          description: "Discover one of the largest mosques in the world with stunning oceanside views",
          duration: "2-3 hours",
          price: "Free",
          category: "Culture",
          icon: Camera,
          rating: 4.9
        },
        {
          title: "Old Medina Walking Tour", 
          description: "Explore the historic quarter with local guides and traditional markets",
          duration: "3-4 hours",
          price: "€15-25",
          category: "Heritage",
          icon: Users,
          rating: 4.7
        },
        {
          title: "Corniche Beach Day",
          description: "Relax at Morocco's most famous beach with cafes and entertainment",
          duration: "Half day",
          price: "Free",
          category: "Leisure",
          icon: Star,
          rating: 4.5
        }
      ]
    },
    {
      city: "Marrakech",
      activities: [
        {
          title: "Jemaa el-Fnaa Experience",
          description: "Immerse in the magical atmosphere of the famous square with storytellers and performers",
          duration: "Evening",
          price: "Free",
          category: "Culture",
          icon: Music,
          rating: 4.8
        },
        {
          title: "Atlas Mountains Day Trip",
          description: "Adventure in the High Atlas with Berber villages and stunning landscapes",
          duration: "Full day",
          price: "€35-50",
          category: "Adventure", 
          icon: Mountain,
          rating: 4.9
        },
        {
          title: "Traditional Cooking Class",
          description: "Learn to prepare authentic Moroccan tagines and pastries",
          duration: "4-5 hours",
          price: "€30-40",
          category: "Culinary",
          icon: Utensils,
          rating: 4.8
        }
      ]
    },
    {
      city: "Rabat",
      activities: [
        {
          title: "Royal Palace Gardens",
          description: "Stroll through magnificent royal gardens and historical monuments",
          duration: "2-3 hours",
          price: "€5-10",
          category: "Heritage",
          icon: Camera,
          rating: 4.6
        },
        {
          title: "Kasbah of the Udayas",
          description: "Explore the UNESCO World Heritage site overlooking the Atlantic",
          duration: "2-4 hours", 
          price: "€8-12",
          category: "Culture",
          icon: Star,
          rating: 4.7
        },
        {
          title: "Modern Art Museum",
          description: "Discover contemporary Moroccan and international art collections",
          duration: "2-3 hours",
          price: "€6-10",
          category: "Art",
          icon: Palette,
          rating: 4.4
        }
      ]
    },
    {
      city: "Tangier", 
      activities: [
        {
          title: "Cap Spartel & Hercules Caves",
          description: "Visit the northernmost point of Africa and ancient caves",
          duration: "Half day",
          price: "€20-30",
          category: "Nature",
          icon: Mountain,
          rating: 4.6
        },
        {
          title: "Kasbah Museum",
          description: "Explore Tangier's rich history at the former sultan's palace",
          duration: "2-3 hours",
          price: "€5-8",
          category: "Heritage",
          icon: Camera,
          rating: 4.5
        },
        {
          title: "Medina Shopping Tour",
          description: "Hunt for treasures in the vibrant souks with local guides",
          duration: "3-4 hours",
          price: "€10-20",
          category: "Shopping",
          icon: ShoppingBag,
          rating: 4.3
        }
      ]
    }
  ];

  const nonMatchDayPrograms = [
    {
      title: "Cultural Heritage Tour",
      description: "Full day exploring UNESCO World Heritage sites with certified guides",
      includes: ["Transportation", "Guide", "Lunch", "Entry tickets"],
      duration: "8 hours",
      price: "€45-65"
    },
    {
      title: "Moroccan Cooking Workshop", 
      description: "Learn traditional recipes and enjoy a feast with local families",
      includes: ["Ingredients", "Recipe book", "Traditional meal", "Certificate"],
      duration: "6 hours", 
      price: "€35-50"
    },
    {
      title: "Desert Adventure",
      description: "Day trip to nearby Sahara dunes with camel riding and traditional music",
      includes: ["4x4 transport", "Camel ride", "Traditional lunch", "Music show"],
      duration: "10 hours",
      price: "€80-120"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Culture: "bg-primary/10 text-primary",
      Heritage: "bg-secondary/10 text-secondary", 
      Adventure: "bg-accent/10 text-accent",
      Culinary: "bg-orange-100 text-orange-700",
      Art: "bg-purple-100 text-purple-700",
      Nature: "bg-green-100 text-green-700",
      Leisure: "bg-blue-100 text-blue-700",
      Shopping: "bg-pink-100 text-pink-700"
    };
    return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Activities & Experiences
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Discover Morocco's rich culture, stunning landscapes, and unique experiences during your World Cup journey. 
                Perfect activities for non-match days in each host city.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Available all tournament dates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Group & individual options</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Non-Match Day Programs */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Special Non-Match Day Programs
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Curated full-day experiences perfect for days between matches
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {nonMatchDayPrograms.map((program, index) => (
                <Card
                  key={program.title}
                  className="p-6 bg-gradient-card hover:shadow-morocco transition-all duration-300 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {program.title}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {program.duration}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {program.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground text-sm">Includes:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {program.includes.map((item) => (
                          <li key={item} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4">
                      <div className="text-lg font-semibold text-primary">
                        {program.price}
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

        {/* Activities by City */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Activities by Host City
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore unique experiences in each World Cup host city
              </p>
            </div>

            <div className="space-y-12">
              {activitiesByCity.map((cityData) => (
                <div key={cityData.city} className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-morocco rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {cityData.city}
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {cityData.activities.map((activity, index) => (
                      <Card
                        key={activity.title}
                        className="p-6 bg-card hover:shadow-elegant transition-all duration-300 group animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-morocco rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <activity.icon className="w-5 h-5 text-primary-foreground" />
                              </div>
                              <Badge className={getCategoryColor(activity.category)}>
                                {activity.category}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Star className="w-4 h-4 fill-accent text-accent" />
                              <span>{activity.rating}</span>
                            </div>
                          </div>
                          
                          <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {activity.title}
                          </h4>
                          
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {activity.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>{activity.duration}</span>
                            </div>
                            <div className="font-semibold text-primary">
                              {activity.price}
                            </div>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            className="w-full group-hover:bg-muted transition-colors"
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            Add to Wishlist
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChat />
    </div>
  );
};

export default ActivitiesPage;