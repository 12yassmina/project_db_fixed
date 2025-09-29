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
  
  // Map city names to stadium IDs
  const getStadiumId = (city: string) => {
    const stadiumMap: Record<string, string> = {
      'casablanca': 'new-stadium-casablanca',
      'marrakech': 'grand-stade-marrakesh', 
      'rabat': 'grand-stade-rabat',
      'tangier': 'grand-stade-tanger'
    };
    return stadiumMap[city?.toLowerCase() || ''] || '';
  };
  
  const cityData: Record<string, any> = {
    casablanca: {
      name: "Casablanca",
      nickname: "The White City",
      vibe: "rhythm, business, and stadium lights",
      description: "Morocco's economic capital and largest city, known for its modern architecture, bustling business district, and the magnificent Hassan II Mosque.",
      greeting: {
        darija: "Marhba bik f Casa",
        tamazight: "ⴰⵣⵓⵍ ⴰⵏⴰⵎⵎⴰⵍⵉⵏ ⴳ ⴰⵏⴼⴰ",
        translation: "Welcome to Casa"
      },
      image: casablancaImage,
      history: "Founded by Berber fishermen in the 7th century, Casablanca transformed from a small port called Anfa into Morocco's economic powerhouse. Under French protectorate (1912-1956), it became a major Atlantic port and commercial center. Today, it's Morocco's largest city and economic capital, contributing over 20% of the country's GDP while hosting World Cup 2030 matches.",
      culturalIdentity: "Casablanca embodies modern Morocco - a dynamic blend of Art Deco architecture, Islamic heritage, and contemporary business culture. Known for its entrepreneurial spirit, cosmopolitan atmosphere, and the iconic Hassan II Mosque, the city represents Morocco's ambitious vision while maintaining its authentic Moroccan soul.",
      neighborhoods: [
        { name: "Old Medina", description: "Historic walled city with traditional souks and authentic atmosphere" },
        { name: "Centre Ville", description: "Art Deco downtown with colonial architecture and business district" },
        { name: "Ain Diab", description: "Modern coastal area with beaches, restaurants, and nightlife" }
      ],
      gallery: [
        { url: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&h=400&fit=crop", caption: "Hassan II Mosque" },
        { url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop", caption: "Art Deco Architecture" },
        { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop", caption: "Corniche Coastline" }
      ],
      stadium: {
        name: "Grand Stadium Casablanca",
        capacity: "80,000",
        status: "Under Construction",
        features: ["Opening Ceremony", "Final Match", "Retractable Roof", "VIP Suites"]
      },
      attractions: [
        {
          title: "Hassan II Mosque",
          description: "World's 3rd largest mosque on Atlantic coastline - Casablanca's iconic landmark",
          image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&h=300&fit=crop"
        },
        {
          title: "Casablanca Cathedral (Sacré-Cœur)",
          description: "Neo-Gothic cathedral, now cultural center - unique architecture in Casablanca",
          image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop"
        },
        {
          title: "Old Medina of Casablanca",
          description: "Historic walled city with traditional souks and authentic Moroccan atmosphere",
          image: "https://images.unsplash.com/photo-1517821362941-f7f753200fef?w=400&h=300&fit=crop"
        },
        {
          title: "Ain Diab Corniche", 
          description: "Modern beachfront promenade with restaurants, cafes and Atlantic Ocean views",
          image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop"
        },
        {
          title: "Rick's Café",
          description: "Famous movie-themed restaurant recreating Casablanca film atmosphere",
          image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop"
        },
        {
          title: "Central Market (Marché Central)",
          description: "Art Deco market building with fresh produce, flowers and local specialties",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
        }
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
      nickname: "The Red City",
      vibe: "spice, rhythm, and stadium lights",
      description: "The Red City, famous for its vibrant souks, historic palaces, and the iconic Jemaa el-Fnaa square that comes alive every evening.",
      greeting: {
        darija: "Marhba bik f Marrakech",
        tamazight: "ⴰⵣⵓⵍ ⴰⵏⴰⵎⵎⴰⵍⵉⵏ ⴳ ⵎⵕⵕⴰⴽⵛ",
        translation: "Welcome to Marrakech"
      },
      image: marrakechImage,
      history: "Founded in 1062 by the Almoravids, Marrakech served as the capital of several Moroccan dynasties. The city's red sandstone walls and buildings earned it the nickname 'The Red City.' A major trading post on trans-Saharan caravan routes, Marrakech became a center of Islamic learning and culture. Today, it's a UNESCO World Heritage site and Morocco's fourth-largest city, preparing to welcome World Cup 2030 visitors.",
      culturalIdentity: "Marrakech is the soul of Morocco - where ancient traditions meet modern tourism. The city pulses with the rhythm of Gnawa music, the colors of Berber carpets, and the aromas of tagines. From the bustling Jemaa el-Fnaa square to the tranquil Majorelle Gardens, Marrakech offers an authentic Moroccan experience steeped in imperial history.",
      neighborhoods: [
        { name: "Medina", description: "UNESCO World Heritage old city with souks, palaces, and Jemaa el-Fnaa" },
        { name: "Gueliz", description: "Modern district with European architecture, shops, and restaurants" },
        { name: "Hivernage", description: "Upscale area with luxury hotels, gardens, and entertainment venues" }
      ],
      gallery: [
        { url: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&h=400&fit=crop", caption: "Jemaa el-Fnaa Square" },
        { url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop", caption: "Bahia Palace" },
        { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop", caption: "Majorelle Garden" }
      ],
      stadium: {
        name: "Marrakech Red City Stadium",
        capacity: "45,000",
        status: "Planning Phase",
        features: ["Traditional Design", "Climate Control", "Cultural Center", "Heritage Museum"]
      },
      attractions: [
        {
          title: "Jemaa el-Fnaa Square",
          description: "UNESCO World Heritage main square - heart of Marrakech with street performers and food stalls",
          image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&h=300&fit=crop"
        },
        {
          title: "Bahia Palace",
          description: "19th-century palace with stunning Islamic architecture and beautiful gardens",
          image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop"
        },
        {
          title: "Majorelle Garden & YSL Museum",
          description: "Exotic botanical garden with cobalt blue villa and Yves Saint Laurent Museum",
          image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop"
        },
        {
          title: "Koutoubia Mosque",
          description: "Marrakech's largest mosque with iconic 77m minaret - symbol of the city",
          image: "https://images.unsplash.com/photo-1517821362941-f7f753200fef?w=400&h=300&fit=crop"
        },
        {
          title: "Saadian Tombs",
          description: "16th-century royal necropolis with intricate marble and cedar decorations",
          image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop"
        },
        {
          title: "Marrakech Souks",
          description: "Labyrinthine traditional markets - leather, spices, carpets, and handicrafts",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
        }
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
      nickname: "The Capital of Lights",
      vibe: "heritage, power, and stadium glory",
      description: "Morocco's capital city, a UNESCO World Heritage site combining historic monuments with modern government buildings and beautiful Atlantic coastline.",
      greeting: {
        darija: "Marhba bik f Rbat",
        tamazight: "ⴰⵣⵓⵍ ⴰⵏⴰⵎⵎⴰⵍⵉⵏ ⴳ ⵔⴱⴰⵟ",
        translation: "Welcome to Rabat"
      },
      image: rabatImage,
      history: "Founded in the 12th century by the Almohads, Rabat became Morocco's capital in 1912. The city combines the historic Kasbah of the Udayas with modern administrative buildings. As the political center of Morocco, Rabat houses the royal palace, government institutions, and diplomatic missions. The entire city is a UNESCO World Heritage site, representing Morocco's rich history and its role as a modern African capital.",
      culturalIdentity: "Rabat is Morocco's refined capital - a city of gardens, wide boulevards, and political significance. Less touristy than other imperial cities, it offers an authentic glimpse into contemporary Moroccan life. The city balances its role as a seat of power with cultural institutions, universities, and a relaxed Atlantic coast atmosphere.",
      neighborhoods: [
        { name: "Kasbah of Udayas", description: "UNESCO fortress with Andalusian gardens and ocean views" },
        { name: "Hassan", description: "Administrative center with government buildings and Hassan Tower" },
        { name: "Agdal", description: "Modern residential and business district with embassies" }
      ],
      gallery: [
        { url: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&h=400&fit=crop", caption: "Kasbah of Udayas" },
        { url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop", caption: "Hassan Tower" },
        { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop", caption: "Royal Palace Gates" }
      ],
      stadium: {
        name: "Rabat National Stadium",
        capacity: "52,000",
        status: "Complete",
        features: ["Solar Powered", "Rain Water Collection", "Digital Screens", "Eco-Friendly"]
      },
      attractions: [
        {
          title: "Kasbah of the Udayas",
          description: "UNESCO World Heritage 12th-century fortress with Andalusian gardens and ocean views",
          image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&h=300&fit=crop"
        },
        {
          title: "Hassan Tower & Mausoleum of Mohammed V",
          description: "Iconic 44m minaret and royal mausoleum - symbols of modern Morocco",
          image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop"
        },
        {
          title: "Royal Palace of Rabat",
          description: "Official residence of King Mohammed VI with impressive Mechouar gates",
          image: "https://images.unsplash.com/photo-1517821362941-f7f753200fef?w=400&h=300&fit=crop"
        },
        {
          title: "National Archaeological Museum",
          description: "Morocco's premier museum with prehistoric, Roman and Islamic artifacts",
          image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop"
        },
        {
          title: "Chellah Necropolis",
          description: "Medieval ruins on Roman foundations with gardens and nesting storks",
          image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop"
        },
        {
          title: "Rabat Medina",
          description: "UNESCO World Heritage old city with traditional souks and Andalusian influence",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
        }
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
      nickname: "The Gateway City",
      vibe: "crossroads, culture, and stadium dreams",
      description: "Gateway between Africa and Europe, a cosmopolitan port city known for its rich cultural history, stunning Mediterranean views, and vibrant arts scene.",
      greeting: {
        darija: "Marhba bik f Tanja",
        tamazight: "ⴰⵣⵓⵍ ⴰⵏⴰⵎⵎⴰⵍⵉⵏ ⴳ ⵟⴰⵏⵊⴰ",
        translation: "Welcome to Tangier"
      },
      image: tangierImage,
      history: "Tangier's strategic location at the Strait of Gibraltar has made it a crossroads of civilizations for millennia. Phoenicians, Romans, Arabs, and Europeans all left their mark. From 1923-1956, it was an International Zone, creating a unique cosmopolitan culture. Today, Tangier is Morocco's gateway to Europe, with major port developments and growing importance as a World Cup 2030 host city.",
      culturalIdentity: "Tangier is Morocco's most international city - a melting pot where Africa meets Europe. The city has inspired countless artists and writers with its bohemian atmosphere, stunning coastal views, and cultural diversity. From the historic Kasbah to modern port facilities, Tangier embodies Morocco's connection to the wider world.",
      neighborhoods: [
        { name: "Medina", description: "Historic old city with traditional architecture and the famous Kasbah" },
        { name: "Ville Nouvelle", description: "Modern city center with European-style boulevards and shops" },
        { name: "Malabata", description: "Coastal area with beaches and new urban developments" }
      ],
      gallery: [
        { url: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&h=400&fit=crop", caption: "Kasbah Museum" },
        { url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop", caption: "Caves of Hercules" },
        { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop", caption: "Cap Spartel Lighthouse" }
      ],
      stadium: {
        name: "Tangier International Stadium",
        capacity: "65,000",
        status: "Renovation",
        features: ["Mediterranean View", "Fan Zone", "Training Pitches", "Media Center"]
      },
      attractions: [
        {
          title: "Kasbah Museum (Dar el Makhzen)",
          description: "17th-century sultan's palace with Moroccan artifacts and panoramic city views",
          image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&h=300&fit=crop"
        },
        {
          title: "Caves of Hercules",
          description: "Legendary caves where Hercules rested - natural wonder with Atlantic Ocean opening",
          image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop"
        },
        {
          title: "Cap Spartel Lighthouse",
          description: "Northwestern tip of Africa where Atlantic Ocean meets Mediterranean Sea",
          image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop"
        },
        {
          title: "Grand Socco (Place 9 Avril 1947)",
          description: "Main square connecting Medina to Ville Nouvelle - gateway to old Tangier",
          image: "https://images.unsplash.com/photo-1517821362941-f7f753200fef?w=400&h=300&fit=crop"
        },
        {
          title: "American Legation Museum",
          description: "First American public property abroad - unique diplomatic and cultural history",
          image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop"
        },
        {
          title: "Tangier Medina & Petit Socco",
          description: "Historic old city with narrow alleys, traditional cafes and authentic atmosphere",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
        }
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
        <section className="py-16 bg-gradient-to-br from-red-50 via-green-50 to-red-50 relative overflow-hidden">
          {/* Moroccan Pattern Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 text-6xl text-red-500">ⵣ</div>
            <div className="absolute top-20 right-20 text-4xl text-green-500">ⴰ</div>
            <div className="absolute bottom-20 left-20 text-5xl text-red-500">ⵎ</div>
            <div className="absolute bottom-10 right-10 text-6xl text-green-500">ⴰ</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl text-red-300">ⵣ</div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center mb-6">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            {/* City Introduction */}
            <div className="text-center mb-12">
              <div className="inline-block p-4 bg-white/80 rounded-xl border-2 border-red-200 mb-6">
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-green-700">{city.greeting.darija}</p>
                  <p className="text-sm text-red-600">{city.greeting.tamazight}</p>
                  <p className="text-xs text-muted-foreground italic">({city.greeting.translation})</p>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Welcome to <span className="bg-gradient-to-r from-red-600 via-green-600 to-red-600 bg-clip-text text-transparent">{city.name}</span>
              </h1>
              
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-2xl md:text-3xl font-bold text-red-600">{city.nickname}</span>
                <span className="text-lg text-muted-foreground">of</span>
                <span className="text-lg md:text-xl text-green-600 italic">{city.vibe}</span>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {city.description}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-red-500 text-red-600 hover:bg-red-50"
                    onClick={() => {
                      const gallerySection = document.getElementById('gallery-section');
                      gallerySection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    View Gallery
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                {/* Zellige-inspired border */}
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500 via-green-500 to-red-500 rounded-2xl opacity-20 blur-sm"></div>
                
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src={city.image} 
                    alt={city.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay with Moroccan pattern */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-red-500 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-green-500 rounded-full opacity-40 animate-bounce"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stadium Information */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-red-50 relative">
          {/* Zellige pattern background */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 gap-4 h-full">
              {Array.from({length: 64}).map((_, i) => (
                <div key={i} className={`${i % 2 === 0 ? 'bg-red-500' : 'bg-green-500'} opacity-20`}></div>
              ))}
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground">🏟️ World Cup Stadium</h2>
              <p className="text-muted-foreground">The magnificent venue that will host World Cup matches in {city.name}</p>
            </div>

            <Card className="max-w-4xl mx-auto p-8 bg-white/90 backdrop-blur-sm border-2 border-red-200 shadow-2xl">
              {/* Zellige-inspired top border */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-green-500 to-red-500"></div>
              
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
                      <Users className="w-5 h-5 mr-2 text-red-600" />
                      <span className="font-semibold text-2xl text-green-600">{city.stadium.capacity}</span>
                      <span className="text-muted-foreground ml-1">capacity</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      ⚡ Stadium Features:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {city.stadium.features.map((feature: string) => (
                        <Badge key={feature} variant="secondary" className="justify-start bg-green-100 text-green-700 border border-green-300">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Link to={`/stadiums/${getStadiumId(cityName || '')}`}>
                      <Button className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white hover:opacity-90">
                        🏟️ View Stadium Details
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="relative">
                    <div className="w-48 h-48 bg-gradient-to-br from-red-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                      <Building className="w-24 h-24 text-white" />
                    </div>
                    {/* Decorative Amazigh symbols around stadium */}
                    <div className="absolute -top-4 -right-4 text-2xl text-red-500 opacity-60">ⵣ</div>
                    <div className="absolute -bottom-4 -left-4 text-2xl text-green-500 opacity-60">ⴰ</div>
                    <div className="absolute top-1/2 -left-8 text-xl text-red-400 opacity-40">ⵎ</div>
                    <div className="absolute top-1/2 -right-8 text-xl text-green-400 opacity-40">ⴰ</div>
                  </div>
                  <p className="text-muted-foreground font-medium">Stadium of {city.nickname}</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* City Overview Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Discover {city.name}</h2>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Historical Background</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {city.history}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Cultural Identity</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {city.culturalIdentity}
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <img 
                      src={city.image} 
                      alt={`${city.name} architecture`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full opacity-30"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-500 rounded-full opacity-40"></div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Cultural Tips Section */}
        <section className="py-20 bg-gradient-to-br from-red-50 via-white to-green-50 relative overflow-hidden">
          {/* Moroccan Pattern Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 text-6xl text-red-500 animate-pulse">ⵣ</div>
            <div className="absolute top-32 right-20 text-4xl text-green-500 animate-bounce">ⴰ</div>
            <div className="absolute bottom-32 left-32 text-5xl text-red-500 animate-pulse">ⵎ</div>
            <div className="absolute bottom-10 right-10 text-6xl text-green-500 animate-bounce">ⴰ</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl text-red-200">ⵣ</div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-red-200 mb-6">
                  <span className="text-2xl">🤝</span>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
                    Cultural Tips & Local Lifestyle
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Embrace the warmth of Moroccan hospitality and connect authentically with local culture in {city.name}
                </p>
              </div>

              {/* Main Content - Essential Phrases Only */}
              <div className="max-w-4xl mx-auto">
                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                  <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full"></div>
                  
                  <div className="p-12 relative z-10">
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-4xl">💬</span>
                        <h3 className="text-3xl font-bold">Essential Phrases</h3>
                      </div>
                      <p className="text-green-100 text-lg">Connect with locals using these helpful Arabic phrases</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Main Greeting */}
                      <div className="md:col-span-2 p-6 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                        <p className="font-bold text-2xl mb-2 text-center">{city.greeting.darija}</p>
                        <p className="text-green-100 text-center text-lg">{city.greeting.translation}</p>
                      </div>
                      
                      {/* Basic Phrases Grid */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-white/15 rounded-xl">
                          <span className="font-medium text-lg">Thank you:</span>
                          <span className="bg-white/25 px-4 py-2 rounded-full font-semibold">Shukran شكرا</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/15 rounded-xl">
                          <span className="font-medium text-lg">Please:</span>
                          <span className="bg-white/25 px-4 py-2 rounded-full font-semibold">Min fadlik من فضلك</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/15 rounded-xl">
                          <span className="font-medium text-lg">Excuse me:</span>
                          <span className="bg-white/25 px-4 py-2 rounded-full font-semibold">Smehli سمحلي</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/15 rounded-xl">
                          <span className="font-medium text-lg">Yes:</span>
                          <span className="bg-white/25 px-4 py-2 rounded-full font-semibold">Na'am نعم</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/15 rounded-xl">
                          <span className="font-medium text-lg">No:</span>
                          <span className="bg-white/25 px-4 py-2 rounded-full font-semibold">La لا</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-white/15 rounded-xl">
                          <span className="font-medium text-lg">How much?:</span>
                          <span className="bg-white/25 px-4 py-2 rounded-full font-semibold">Bekam? بكام؟</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/15 rounded-xl">
                          <span className="font-medium text-lg">Where is?:</span>
                          <span className="bg-white/25 px-4 py-2 rounded-full font-semibold">Fin? فين؟</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/15 rounded-xl">
                          <span className="font-medium text-lg">I don't understand:</span>
                          <span className="bg-white/25 px-4 py-2 rounded-full font-semibold">Ma fhemtsh ما فهمتش</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/15 rounded-xl">
                          <span className="font-medium text-lg">Help:</span>
                          <span className="bg-white/25 px-4 py-2 rounded-full font-semibold">Mosa'ada مساعدة</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/15 rounded-xl">
                          <span className="font-medium text-lg">Goodbye:</span>
                          <span className="bg-white/25 px-4 py-2 rounded-full font-semibold">Bslama بسلامة</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Cultural Note */}
                    <div className="mt-8 p-4 bg-white/10 rounded-xl border border-white/20 text-center">
                      <p className="text-green-100 text-sm">
                        💡 <strong>Tip:</strong> Moroccans appreciate when visitors make an effort to speak Arabic, even just a few words!
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Bottom Decorative Element */}
              <div className="mt-16 text-center">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-red-200">
                  <span className="text-red-500">❤️</span>
                  <p className="text-sm font-medium text-muted-foreground">
                    Experience the legendary Moroccan hospitality - <span className="text-green-600 font-semibold">Ahlan wa Sahlan!</span>
                  </p>
                  <span className="text-green-500">🇲🇦</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Promotional Media Gallery */}
        <section id="gallery-section" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">📸 Discover {city.name}</h2>
              <p className="text-muted-foreground">Experience the beauty and culture through images</p>
            </div>

            <div className="max-w-6xl mx-auto">
              {/* Photo Gallery */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {city.gallery?.map((photo: any, index: number) => (
                  <div key={index} className="aspect-square rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src={photo.url} 
                      alt={photo.caption}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>

              {/* Social Media Integration */}
              <Card className="p-6 text-center bg-gradient-card">
                <h3 className="text-xl font-semibold text-foreground mb-4">Share Your Experience</h3>
                <p className="text-muted-foreground mb-4">Tag your photos with #{city.name.toLowerCase()}2030</p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" className="border-blue-500 text-blue-600">
                    📱 Instagram
                  </Button>
                  <Button variant="outline" className="border-green-500 text-green-600">
                    📤 Share
                  </Button>
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

export default CityPage;