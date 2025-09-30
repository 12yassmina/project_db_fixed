import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Star, Trash2, Calendar, Download, Share2, Plus, Route } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ItineraryPage = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [itinerary, setItinerary] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [totalDuration, setTotalDuration] = useState(0);

  // Load itinerary from localStorage
  useEffect(() => {
    const savedItinerary = localStorage.getItem(`itinerary_${cityName}`);
    if (savedItinerary) {
      setItinerary(JSON.parse(savedItinerary));
    }
  }, [cityName]);

  // Cultural spots data (same as CulturalSpotsPage)
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
          durationHours: 2.5,
          rating: 4.8,
          bestTime: "Morning or sunset",
          entrance: "Free (mosque tour: 120 MAD)",
          location: "Casablanca Corniche"
        },
        {
          id: "royal-palace",
          title: "Royal Palace of Casablanca",
          description: "Historic royal residence with beautiful gardens and architecture",
          category: "Royal Heritage",
          duration: "1-2 hours",
          durationHours: 1.5,
          rating: 4.5,
          bestTime: "Afternoon",
          entrance: "External viewing only",
          location: "City Center"
        },
        {
          id: "old-medina",
          title: "Old Medina",
          description: "Traditional marketplace with authentic crafts and local atmosphere",
          category: "Traditional Markets",
          duration: "2-4 hours",
          durationHours: 3,
          rating: 4.3,
          bestTime: "Morning",
          entrance: "Free",
          location: "Old City"
        },
        {
          id: "corniche",
          title: "Corniche",
          description: "Beautiful coastal promenade perfect for walks and ocean views",
          category: "Waterfront",
          duration: "1-3 hours",
          durationHours: 2,
          rating: 4.6,
          bestTime: "Evening",
          entrance: "Free",
          location: "Atlantic Coast"
        },
        {
          id: "villa-des-arts",
          title: "Villa des Arts",
          description: "Contemporary art museum showcasing Moroccan and international artists",
          category: "Art & Culture",
          duration: "1-2 hours",
          durationHours: 1.5,
          rating: 4.4,
          bestTime: "Afternoon",
          entrance: "30 MAD",
          location: "City Center"
        },
        {
          id: "central-market",
          title: "Central Market",
          description: "Vibrant market for fresh produce, spices, and local specialties",
          category: "Local Markets",
          duration: "1-2 hours",
          durationHours: 1.5,
          rating: 4.2,
          bestTime: "Morning",
          entrance: "Free",
          location: "Downtown"
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
          durationHours: 3,
          rating: 4.9,
          bestTime: "Evening",
          entrance: "Free",
          location: "Medina Center"
        },
        {
          id: "bahia-palace",
          title: "Bahia Palace",
          description: "19th-century architectural marvel with stunning gardens and intricate details",
          category: "Royal Architecture",
          duration: "1-2 hours",
          durationHours: 1.5,
          rating: 4.7,
          bestTime: "Morning",
          entrance: "70 MAD",
          location: "Medina"
        },
        {
          id: "majorelle-garden",
          title: "Majorelle Garden",
          description: "Botanical garden and museum with exotic plants and vibrant blue buildings",
          category: "Gardens & Museums",
          duration: "1-2 hours",
          durationHours: 1.5,
          rating: 4.6,
          bestTime: "Morning",
          entrance: "150 MAD",
          location: "Gueliz"
        },
        {
          id: "koutoubia-mosque",
          title: "Koutoubia Mosque",
          description: "Iconic 12th-century minaret and largest mosque in Marrakech",
          category: "Religious Heritage",
          duration: "30-60 minutes",
          durationHours: 0.75,
          rating: 4.8,
          bestTime: "Sunset",
          entrance: "Free (external viewing)",
          location: "Near Jemaa el-Fnaa"
        },
        {
          id: "saadian-tombs",
          title: "Saadian Tombs",
          description: "Historic royal necropolis with beautiful marble and cedar decorations",
          category: "Historical Sites",
          duration: "45-90 minutes",
          durationHours: 1.25,
          rating: 4.5,
          bestTime: "Morning",
          entrance: "70 MAD",
          location: "Kasbah"
        },
        {
          id: "souks-marrakech",
          title: "Souks of Marrakech",
          description: "Traditional markets with leather goods, spices, textiles, and crafts",
          category: "Traditional Markets",
          duration: "2-4 hours",
          durationHours: 3,
          rating: 4.4,
          bestTime: "Morning or afternoon",
          entrance: "Free",
          location: "Medina"
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
          durationHours: 2.5,
          rating: 4.7,
          bestTime: "Afternoon",
          entrance: "Free (Gardens: 20 MAD)",
          location: "Atlantic Coast"
        },
        {
          id: "hassan-tower",
          title: "Hassan Tower",
          description: "Unfinished minaret and mausoleum of Mohammed V",
          category: "Historical Monuments",
          duration: "1-2 hours",
          durationHours: 1.5,
          rating: 4.6,
          bestTime: "Morning or late afternoon",
          entrance: "Free",
          location: "City Center"
        },
        {
          id: "royal-palace-rabat",
          title: "Royal Palace",
          description: "Official residence of the King with impressive gates and architecture",
          category: "Royal Heritage",
          duration: "30-60 minutes",
          durationHours: 0.75,
          rating: 4.3,
          bestTime: "Any time",
          entrance: "External viewing only",
          location: "Touarga"
        },
        {
          id: "archaeological-museum",
          title: "Archaeological Museum",
          description: "Museum showcasing prehistoric to Islamic art and artifacts",
          category: "Museums",
          duration: "1-2 hours",
          durationHours: 1.5,
          rating: 4.4,
          bestTime: "Afternoon",
          entrance: "20 MAD",
          location: "Hassan"
        },
        {
          id: "chellah",
          title: "Chellah",
          description: "Medieval fortified site with Roman and Islamic ruins",
          category: "Archaeological Sites",
          duration: "1-2 hours",
          durationHours: 1.5,
          rating: 4.5,
          bestTime: "Late afternoon",
          entrance: "70 MAD",
          location: "Chellah"
        },
        {
          id: "oudaias-beach",
          title: "Oudaias Beach",
          description: "Atlantic Ocean coastline perfect for walks and relaxation",
          category: "Beaches",
          duration: "1-3 hours",
          durationHours: 2,
          rating: 4.2,
          bestTime: "Sunset",
          entrance: "Free",
          location: "Oudaias"
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
          durationHours: 1.5,
          rating: 4.5,
          bestTime: "Morning",
          entrance: "30 MAD",
          location: "Kasbah"
        },
        {
          id: "caves-hercules",
          title: "Caves of Hercules",
          description: "Legendary coastal caves with stunning Atlantic Ocean views",
          category: "Natural Wonders",
          duration: "1-2 hours",
          durationHours: 1.5,
          rating: 4.6,
          bestTime: "Afternoon",
          entrance: "60 MAD",
          location: "Cap Spartel"
        },
        {
          id: "cap-spartel",
          title: "Cap Spartel",
          description: "Northwestern tip where Atlantic Ocean meets Mediterranean Sea",
          category: "Natural Landmarks",
          duration: "1-2 hours",
          durationHours: 1.5,
          rating: 4.7,
          bestTime: "Sunset",
          entrance: "Free",
          location: "Cap Spartel"
        },
        {
          id: "grand-socco",
          title: "Grand Socco",
          description: "Central market square connecting old and new parts of the city",
          category: "City Squares",
          duration: "1-2 hours",
          durationHours: 1.5,
          rating: 4.3,
          bestTime: "Afternoon",
          entrance: "Free",
          location: "City Center"
        },
        {
          id: "american-legation",
          title: "American Legation Museum",
          description: "Historic diplomatic building showcasing Morocco-US relations",
          category: "Historical Museums",
          duration: "1 hour",
          durationHours: 1,
          rating: 4.4,
          bestTime: "Morning",
          entrance: "20 MAD",
          location: "Medina"
        },
        {
          id: "old-medina-tangier",
          title: "Old Medina",
          description: "Winding streets and traditional shops in the historic quarter",
          category: "Historic Quarters",
          duration: "2-3 hours",
          durationHours: 2.5,
          rating: 4.4,
          bestTime: "Morning or afternoon",
          entrance: "Free",
          location: "Old City"
        }
      ]
    }
  };

  const city = culturalSpots[cityName?.toLowerCase() || ''] || culturalSpots.casablanca;
  const itinerarySpots = city.spots.filter((spot: any) => itinerary.includes(spot.id));

  // Calculate total duration
  useEffect(() => {
    const total = itinerarySpots.reduce((sum: number, spot: any) => sum + spot.durationHours, 0);
    setTotalDuration(total);
  }, [itinerarySpots]);

  const removeFromItinerary = (spotId: string) => {
    const newItinerary = itinerary.filter(id => id !== spotId);
    setItinerary(newItinerary);
    localStorage.setItem(`itinerary_${cityName}`, JSON.stringify(newItinerary));
  };

  const clearItinerary = () => {
    setItinerary([]);
    localStorage.removeItem(`itinerary_${cityName}`);
  };

  const exportItinerary = () => {
    const itineraryText = `
🏛️ ${city.name} Cultural Itinerary
${city.nickname}

📍 Total Spots: ${itinerarySpots.length}
⏱️ Total Duration: ${totalDuration.toFixed(1)} hours

${itinerarySpots.map((spot: any, index: number) => `
${index + 1}. ${spot.title}
   📍 ${spot.location}
   ⏱️ ${spot.duration}
   🎫 ${spot.entrance}
   ⭐ ${spot.rating}/5
   💡 Best Time: ${spot.bestTime}
   
`).join('')}

Generated by Morocco 2030 World Cup App
    `.trim();

    const blob = new Blob([itineraryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${city.name}-Cultural-Itinerary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareItinerary = async () => {
    const shareText = `Check out my ${city.name} cultural itinerary! ${itinerarySpots.length} amazing spots to visit. 🏛️✨`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${city.name} Cultural Itinerary`,
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      alert('Itinerary link copied to clipboard!');
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
              <Link to={`/city/${cityName}/cultural-spots`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Cultural Spots
                </Button>
              </Link>
            </div>
            
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                📅 My {city.name} Itinerary
              </h1>
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-2xl md:text-3xl font-bold text-red-600">{city.nickname}</span>
                <span className="text-lg text-muted-foreground">Cultural Journey</span>
              </div>
              
              {/* Itinerary Stats */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-lg border border-red-200">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span className="font-semibold">{itinerarySpots.length} Spots</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-lg border border-green-200">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">{totalDuration.toFixed(1)} Hours</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-lg border border-blue-200">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">{Math.ceil(totalDuration / 8)} Days</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  onClick={exportItinerary}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white"
                  disabled={itinerarySpots.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Itinerary
                </Button>
                <Button 
                  onClick={shareItinerary}
                  variant="outline" 
                  className="border-blue-500 text-blue-600 hover:bg-blue-50"
                  disabled={itinerarySpots.length === 0}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Itinerary
                </Button>
                <Button 
                  onClick={clearItinerary}
                  variant="outline" 
                  className="border-red-500 text-red-600 hover:bg-red-50"
                  disabled={itinerarySpots.length === 0}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Itinerary Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {itinerarySpots.length === 0 ? (
              /* Empty State */
              <Card className="p-12 text-center max-w-2xl mx-auto">
                <div className="space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-green-500 rounded-full flex items-center justify-center mx-auto">
                    <Plus className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Your Itinerary is Empty</h3>
                    <p className="text-muted-foreground mb-6">
                      Start building your perfect {city.name} cultural journey by adding spots from our curated list.
                    </p>
                    <Link to={`/city/${cityName}/cultural-spots`}>
                      <Button className="bg-gradient-to-r from-red-600 to-green-600 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Cultural Spots
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ) : (
              /* Itinerary List */
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-4">Your Cultural Journey</h2>
                  <p className="text-muted-foreground">
                    Here's your personalized itinerary for exploring {city.name}'s cultural treasures
                  </p>
                </div>

                <div className="grid gap-6">
                  {itinerarySpots.map((spot: any, index: number) => (
                    <Card
                      key={spot.id}
                      className="p-6 bg-white border-2 border-red-100 hover:border-green-300 transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Zellige-inspired corner */}
                      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-red-500 to-green-500 opacity-20"></div>
                      
                      <div className="flex items-start gap-6">
                        {/* Order Number */}
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {index + 1}
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-foreground mb-2">{spot.title}</h3>
                              <Badge className={`text-xs ${getCategoryColor(spot.category)} mb-2`}>
                                {spot.category}
                              </Badge>
                              <p className="text-muted-foreground">{spot.description}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromItinerary(spot.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Details Grid */}
                          <div className="grid md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{spot.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>{spot.rating}/5</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{spot.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{spot.bestTime}</span>
                            </div>
                          </div>

                          {/* Entrance Fee */}
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <span className="text-sm"><strong>Entrance:</strong> {spot.entrance}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Add More Spots */}
                <Card className="p-6 border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors">
                  <div className="text-center">
                    <Link to={`/city/${cityName}/cultural-spots`}>
                      <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                        <Plus className="w-4 h-4 mr-2" />
                        Add More Cultural Spots
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ItineraryPage;
