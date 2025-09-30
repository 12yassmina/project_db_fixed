import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Star, Camera, Heart, Plus, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const CulturalSpotsPage = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [itinerary, setItinerary] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const culturalSpots: Record<string, any> = {
    casablanca: {
      name: "Casablanca",
      nickname: "The White City",
      spots: [
        {
          id: "hassan-ii-mosque",
          title: "Hassan II Mosque",
          description: "One of the world's largest mosques with stunning oceanfront location",
          category: "Religious Heritage",
          duration: "2-3 hours",
          rating: 4.8,
          highlights: ["Minaret views", "Ocean location", "Guided tours", "Architecture"],
          bestTime: "Morning or sunset",
          entrance: "Free (mosque tour: 120 MAD)",
          tips: "Dress modestly, remove shoes, guided tours available in multiple languages"
        },
        {
          id: "royal-palace",
          title: "Royal Palace of Casablanca",
          description: "Historic royal residence with beautiful gardens and architecture",
          category: "Royal Heritage",
          duration: "1-2 hours",
          rating: 4.5,
          highlights: ["Royal gardens", "Architecture", "Historical significance", "Photo spots"],
          bestTime: "Afternoon",
          entrance: "External viewing only",
          tips: "Best viewed from outside, great for photography"
        },
        {
          id: "old-medina",
          title: "Old Medina",
          description: "Traditional marketplace with authentic crafts and local atmosphere",
          category: "Traditional Markets",
          duration: "2-4 hours",
          rating: 4.3,
          highlights: ["Local crafts", "Traditional food", "Authentic atmosphere", "Shopping"],
          bestTime: "Morning",
          entrance: "Free",
          tips: "Bargain for prices, try local street food, watch for pickpockets"
        },
        {
          id: "corniche",
          title: "Corniche",
          description: "Beautiful coastal promenade perfect for walks and ocean views",
          category: "Waterfront",
          duration: "1-3 hours",
          rating: 4.6,
          highlights: ["Ocean views", "Beach clubs", "Restaurants", "Sunset walks"],
          bestTime: "Evening",
          entrance: "Free",
          tips: "Perfect for sunset, many cafes and restaurants along the way"
        },
        {
          id: "villa-des-arts",
          title: "Villa des Arts",
          description: "Contemporary art museum showcasing Moroccan and international artists",
          category: "Art & Culture",
          duration: "1-2 hours",
          rating: 4.4,
          highlights: ["Contemporary art", "Local artists", "Exhibitions", "Cultural events"],
          bestTime: "Afternoon",
          entrance: "30 MAD",
          tips: "Check current exhibitions, photography may be restricted"
        },
        {
          id: "central-market",
          title: "Central Market",
          description: "Vibrant market for fresh produce, spices, and local specialties",
          category: "Local Markets",
          duration: "1-2 hours",
          rating: 4.2,
          highlights: ["Fresh produce", "Spices", "Local interaction", "Authentic experience"],
          bestTime: "Morning",
          entrance: "Free",
          tips: "Best selection in the morning, bring cash, practice basic French/Arabic"
        }
      ]
    },
    marrakech: {
      name: "Marrakech",
      nickname: "The Red City",
      spots: [
        {
          id: "jemaa-el-fnaa",
          title: "Jemaa el-Fnaa",
          description: "UNESCO World Heritage square that comes alive with performers and food stalls",
          category: "UNESCO Heritage",
          duration: "2-4 hours",
          rating: 4.9,
          highlights: ["Street performers", "Food stalls", "Snake charmers", "Sunset views"],
          bestTime: "Evening",
          entrance: "Free",
          tips: "Visit at sunset, try fresh orange juice, negotiate prices, watch belongings"
        },
        {
          id: "bahia-palace",
          title: "Bahia Palace",
          description: "19th-century architectural marvel with stunning gardens and intricate details",
          category: "Royal Architecture",
          duration: "1-2 hours",
          rating: 4.7,
          highlights: ["Islamic architecture", "Beautiful gardens", "Intricate tilework", "Historical rooms"],
          bestTime: "Morning",
          entrance: "70 MAD",
          tips: "Early morning for best light, audio guide recommended"
        },
        {
          id: "majorelle-garden",
          title: "Majorelle Garden",
          description: "Botanical garden and museum with exotic plants and vibrant blue buildings",
          category: "Gardens & Museums",
          duration: "1-2 hours",
          rating: 4.6,
          highlights: ["Exotic plants", "Majorelle blue", "Berber Museum", "Photography"],
          bestTime: "Morning",
          entrance: "150 MAD (Garden + Museum: 200 MAD)",
          tips: "Book online to skip lines, best light in morning, museum extra fee"
        },
        {
          id: "koutoubia-mosque",
          title: "Koutoubia Mosque",
          description: "Iconic 12th-century minaret and largest mosque in Marrakech",
          category: "Religious Heritage",
          duration: "30-60 minutes",
          rating: 4.8,
          highlights: ["Historic minaret", "Islamic architecture", "Gardens", "Landmark views"],
          bestTime: "Sunset",
          entrance: "Free (external viewing)",
          tips: "Non-Muslims cannot enter, beautiful at sunset, great photo spot"
        },
        {
          id: "saadian-tombs",
          title: "Saadian Tombs",
          description: "Historic royal necropolis with beautiful marble and cedar decorations",
          category: "Historical Sites",
          duration: "45-90 minutes",
          rating: 4.5,
          highlights: ["Royal tombs", "Marble work", "Cedar decorations", "Historical significance"],
          bestTime: "Morning",
          entrance: "70 MAD",
          tips: "Can get crowded, early morning recommended, combine with other sites"
        },
        {
          id: "souks-marrakech",
          title: "Souks of Marrakech",
          description: "Traditional markets with leather goods, spices, textiles, and crafts",
          category: "Traditional Markets",
          duration: "2-4 hours",
          rating: 4.4,
          highlights: ["Leather goods", "Spices", "Textiles", "Traditional crafts"],
          bestTime: "Morning or afternoon",
          entrance: "Free",
          tips: "Bargain expected, easy to get lost, hire a guide if needed"
        }
      ]
    },
    rabat: {
      name: "Rabat",
      nickname: "The Capital of Lights",
      spots: [
        {
          id: "kasbah-udayas",
          title: "Kasbah of the Udayas",
          description: "Historic fortress and gardens overlooking the Atlantic Ocean",
          category: "UNESCO Heritage",
          duration: "2-3 hours",
          rating: 4.7,
          highlights: ["Ocean views", "Andalusian gardens", "Historic walls", "Blue and white streets"],
          bestTime: "Afternoon",
          entrance: "Free (Gardens: 20 MAD)",
          tips: "Great for sunset, explore the blue streets, visit the gardens"
        },
        {
          id: "hassan-tower",
          title: "Hassan Tower",
          description: "Unfinished minaret and mausoleum of Mohammed V",
          category: "Historical Monuments",
          duration: "1-2 hours",
          rating: 4.6,
          highlights: ["Historic minaret", "Royal mausoleum", "Architecture", "Historical significance"],
          bestTime: "Morning or late afternoon",
          entrance: "Free",
          tips: "Respectful dress required, beautiful architecture, historical importance"
        },
        {
          id: "royal-palace-rabat",
          title: "Royal Palace",
          description: "Official residence of the King with impressive gates and architecture",
          category: "Royal Heritage",
          duration: "30-60 minutes",
          rating: 4.3,
          highlights: ["Royal gates", "Architecture", "Guards ceremony", "Photo opportunities"],
          bestTime: "Any time",
          entrance: "External viewing only",
          tips: "Cannot enter, great for photos, watch changing of guards"
        },
        {
          id: "archaeological-museum",
          title: "Archaeological Museum",
          description: "Museum showcasing prehistoric to Islamic art and artifacts",
          category: "Museums",
          duration: "1-2 hours",
          rating: 4.4,
          highlights: ["Ancient artifacts", "Islamic art", "Prehistoric items", "Educational"],
          bestTime: "Afternoon",
          entrance: "20 MAD",
          tips: "Good for rainy days, educational, air-conditioned"
        },
        {
          id: "chellah",
          title: "Chellah",
          description: "Medieval fortified site with Roman and Islamic ruins",
          category: "Archaeological Sites",
          duration: "1-2 hours",
          rating: 4.5,
          highlights: ["Roman ruins", "Islamic architecture", "Gardens", "Storks nesting"],
          bestTime: "Late afternoon",
          entrance: "70 MAD",
          tips: "Peaceful atmosphere, great for photography, watch for storks"
        },
        {
          id: "oudaias-beach",
          title: "Oudaias Beach",
          description: "Atlantic Ocean coastline perfect for walks and relaxation",
          category: "Beaches",
          duration: "1-3 hours",
          rating: 4.2,
          highlights: ["Ocean views", "Beach walks", "Surfing", "Relaxation"],
          bestTime: "Sunset",
          entrance: "Free",
          tips: "Can be windy, great for sunset, some surf spots available"
        }
      ]
    },
    tangier: {
      name: "Tangier",
      nickname: "The Gateway City",
      spots: [
        {
          id: "kasbah-museum",
          title: "Kasbah Museum",
          description: "Traditional palace housing artifacts and showcasing Tangier's history",
          category: "Museums",
          duration: "1-2 hours",
          rating: 4.5,
          highlights: ["Traditional palace", "Historical artifacts", "City views", "Cultural exhibits"],
          bestTime: "Morning",
          entrance: "30 MAD",
          tips: "Great city views from terrace, learn about local history"
        },
        {
          id: "caves-hercules",
          title: "Caves of Hercules",
          description: "Legendary coastal caves with stunning Atlantic Ocean views",
          category: "Natural Wonders",
          duration: "1-2 hours",
          rating: 4.6,
          highlights: ["Natural caves", "Ocean views", "Mythology", "Photo opportunities"],
          bestTime: "Afternoon",
          entrance: "60 MAD",
          tips: "Bring camera, can be slippery, great for photos"
        },
        {
          id: "cap-spartel",
          title: "Cap Spartel",
          description: "Northwestern tip where Atlantic Ocean meets Mediterranean Sea",
          category: "Natural Landmarks",
          duration: "1-2 hours",
          rating: 4.7,
          highlights: ["Two seas meeting", "Lighthouse", "Scenic views", "Sunset spot"],
          bestTime: "Sunset",
          entrance: "Free",
          tips: "Perfect for sunset, bring jacket (can be windy), lighthouse visits"
        },
        {
          id: "grand-socco",
          title: "Grand Socco",
          description: "Central market square connecting old and new parts of the city",
          category: "City Squares",
          duration: "1-2 hours",
          rating: 4.3,
          highlights: ["Central location", "Local life", "Architecture", "Gateway to medina"],
          bestTime: "Afternoon",
          entrance: "Free",
          tips: "Good starting point for medina exploration, busy area"
        },
        {
          id: "american-legation",
          title: "American Legation Museum",
          description: "Historic diplomatic building showcasing Morocco-US relations",
          category: "Historical Museums",
          duration: "1 hour",
          rating: 4.4,
          highlights: ["Diplomatic history", "Art collection", "Historical documents", "Architecture"],
          bestTime: "Morning",
          entrance: "20 MAD",
          tips: "Unique historical perspective, small but interesting collection"
        },
        {
          id: "old-medina-tangier",
          title: "Old Medina",
          description: "Winding streets and traditional shops in the historic quarter",
          category: "Historic Quarters",
          duration: "2-3 hours",
          rating: 4.4,
          highlights: ["Traditional architecture", "Local shops", "Authentic atmosphere", "Narrow streets"],
          bestTime: "Morning or afternoon",
          entrance: "Free",
          tips: "Easy to get lost, hire local guide, bargain in shops"
        }
      ]
    }
  };

  const city = culturalSpots[cityName?.toLowerCase() || ''] || culturalSpots.casablanca;

  // Load itinerary from localStorage on component mount
  useEffect(() => {
    const savedItinerary = localStorage.getItem(`itinerary_${cityName}`);
    if (savedItinerary) {
      setItinerary(JSON.parse(savedItinerary));
    }
  }, [cityName]);

  const addToItinerary = (spotId: string) => {
    if (!itinerary.includes(spotId)) {
      const newItinerary = [...itinerary, spotId];
      setItinerary(newItinerary);
      localStorage.setItem(`itinerary_${cityName}`, JSON.stringify(newItinerary));
    }
  };

  const removeFromItinerary = (spotId: string) => {
    const newItinerary = itinerary.filter(id => id !== spotId);
    setItinerary(newItinerary);
    localStorage.setItem(`itinerary_${cityName}`, JSON.stringify(newItinerary));
  };

  const toggleFavorite = (spotId: string) => {
    if (favorites.includes(spotId)) {
      setFavorites(favorites.filter(id => id !== spotId));
    } else {
      setFavorites([...favorites, spotId]);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'UNESCO Heritage': 'bg-purple-100 text-purple-700 border-purple-300',
      'Religious Heritage': 'bg-blue-100 text-blue-700 border-blue-300',
      'Royal Heritage': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Traditional Markets': 'bg-orange-100 text-orange-700 border-orange-300',
      'Art & Culture': 'bg-pink-100 text-pink-700 border-pink-300',
      'Gardens & Museums': 'bg-green-100 text-green-700 border-green-300',
      'Historical Sites': 'bg-indigo-100 text-indigo-700 border-indigo-300',
      'Natural Wonders': 'bg-teal-100 text-teal-700 border-teal-300',
      'Beaches': 'bg-cyan-100 text-cyan-700 border-cyan-300',
      'Museums': 'bg-gray-100 text-gray-700 border-gray-300'
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-red-50 via-green-50 to-red-50 relative overflow-hidden">
          {/* Moroccan Pattern Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 text-6xl text-red-500">ⵣ</div>
            <div className="absolute top-20 right-20 text-4xl text-green-500">ⴰ</div>
            <div className="absolute bottom-20 left-20 text-5xl text-red-500">ⵎ</div>
            <div className="absolute bottom-10 right-10 text-6xl text-green-500">ⴰ</div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center mb-6">
              <Link to={`/city/${cityName}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to {city.name}
                </Button>
              </Link>
            </div>
            
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                🏛️ Cultural & Tourist Spots
              </h1>
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-2xl md:text-3xl font-bold text-red-600">{city.name}</span>
                <span className="text-lg text-muted-foreground">-</span>
                <span className="text-lg md:text-xl text-green-600 italic">{city.nickname}</span>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the cultural treasures and must-visit attractions that define the soul of {city.name}
              </p>
            </div>

            {/* Itinerary Summary */}
            {itinerary.length > 0 && (
              <div className="mb-8">
                <Card className="p-4 bg-green-50 border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Plus className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-700">
                        {itinerary.length} spots in your itinerary
                      </span>
                    </div>
                    <Link to={`/city/${cityName}/itinerary`}>
                      <Button variant="outline" size="sm" className="border-green-500 text-green-600">
                        View Full Itinerary
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </section>

        {/* Cultural Spots Grid */}
        <section className="py-16 bg-background relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {city.spots.map((spot: any, index: number) => (
                <Card
                  key={spot.id}
                  className="p-6 bg-white border-2 border-red-100 hover:border-green-300 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Zellige-inspired corner */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-red-500 to-green-500 opacity-20"></div>
                  
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground mb-1">{spot.title}</h3>
                          <Badge className={`text-xs ${getCategoryColor(spot.category)}`}>
                            {spot.category}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(spot.id)}
                        className="p-1"
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(spot.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                      </Button>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {spot.description}
                    </p>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span>{spot.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span>{spot.rating}/5</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground">Highlights:</h4>
                      <div className="flex flex-wrap gap-1">
                        {spot.highlights.slice(0, 3).map((highlight: string) => (
                          <Badge key={highlight} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                        {spot.highlights.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{spot.highlights.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Entrance & Best Time */}
                    <div className="space-y-1 text-xs">
                      <div><strong>Best Time:</strong> {spot.bestTime}</div>
                      <div><strong>Entrance:</strong> {spot.entrance}</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-green-500 text-green-600 hover:bg-green-50"
                        onClick={() => {/* Handle learn more */}}
                      >
                        <BookOpen className="w-3 h-3 mr-1" />
                        Learn More
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={`flex-1 ${
                          itinerary.includes(spot.id) 
                            ? 'border-red-500 text-red-600 hover:bg-red-50' 
                            : 'border-red-500 text-red-600 hover:bg-red-50'
                        }`}
                        onClick={() => itinerary.includes(spot.id) ? removeFromItinerary(spot.id) : addToItinerary(spot.id)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {itinerary.includes(spot.id) ? 'Remove' : 'Add to Itinerary'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Cultural Tips */}
            <div className="mt-16 text-center">
              <Card className="p-8 bg-gradient-to-r from-red-50 to-green-50 border-2 border-red-200 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-foreground mb-4">🎭 Cultural Experience Tips</h3>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">🕌 Visiting Religious Sites:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Dress modestly (cover shoulders and knees)</li>
                      <li>• Remove shoes when required</li>
                      <li>• Be respectful during prayer times</li>
                      <li>• Photography rules vary by location</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-700">🛍️ Market & Souk Etiquette:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Bargaining is expected and part of culture</li>
                      <li>• Start at 30-50% of asking price</li>
                      <li>• Bring cash (MAD) for better deals</li>
                      <li>• Learn basic Arabic/French greetings</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CulturalSpotsPage;
