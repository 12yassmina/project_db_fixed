import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Users, Calendar } from "lucide-react";
import { STADIUMS as STADIUMS_LIST, StadiumMeta } from "@/assets/stadiums";

const StadiumDetailPage = () => {
  const { id } = useParams<{ id: StadiumMeta["id"] }>();

  const stadium = useMemo(() => STADIUMS_LIST.find(s => s.id === id), [id]);

  if (!stadium) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <section className="py-16">
            <div className="container mx-auto px-4">
              <Link to="/stadiums">
                <Button variant="ghost" size="sm" className="mb-6">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Stadiums
                </Button>
              </Link>
              <Card className="p-8 text-center">
                <h1 className="text-2xl font-bold mb-2">Stadium not found</h1>
                <p className="text-muted-foreground">The stadium you are looking for does not exist.</p>
              </Card>
            </div>
          </section>
        </main>
        <Footer />
        <AIChat />
      </div>
    );
  }

  // Comprehensive stadium information
  const getStadiumInfo = (id: string) => {
    switch (id) {
      case 'new-stadium-casablanca':
        return {
          features: ["World's Largest Stadium", "Retractable Roof", "LED Lighting", "VIP Suites", "Media Center", "Underground Parking", "Shopping Mall", "Hotel Complex"],
          description: "The world's largest football stadium, located in Benslimane, designed to host the opening ceremony and final match of FIFA World Cup 2030.",
          detailedInfo: "This magnificent stadium in Benslimane will be the crown jewel of Morocco's World Cup infrastructure. Strategically located between Casablanca and Rabat, it offers easy access from both major cities while providing cutting-edge technology and sustainable design.",
          matchTypes: ["Opening Ceremony", "Final Match", "Semi-Finals", "Quarter-Finals"],
          architect: "Foster + Partners",
          construction: "2025-2029",
          cost: "$1.2 Billion",
          parking: "15,000 spaces",
          accessibility: "Full wheelchair access, audio description, sign language interpretation"
        };
      case 'grand-stade-tanger':
        return {
          features: ["Natural Grass", "Modern Facilities", "Fan Zone", "Training Pitches", "Press Center", "Hospitality Suites", "Museum", "Gift Shop"],
          description: "Gateway stadium connecting Africa to Europe, hosting quarter-final matches and group stage games.",
          detailedInfo: "Located in the beautiful coastal city of Tangier, this stadium offers stunning views and world-class facilities for an unforgettable World Cup experience.",
          matchTypes: ["Quarter-Finals", "Round of 16", "Group Stage"],
          architect: "Populous",
          construction: "2018-2024",
          cost: "$400 Million",
          parking: "8,000 spaces",
          accessibility: "Fully accessible with dedicated seating areas and facilities"
        };
      case 'grand-stade-marrakesh':
        return {
          features: ["Traditional Design", "Climate Control", "Cultural Center", "Museum", "Moroccan Architecture", "Rooftop Garden", "Art Gallery", "Traditional Crafts Shop"],
          description: "Blending modern architecture with traditional Moroccan design elements in the heart of the Red City.",
          detailedInfo: "This stadium celebrates Morocco's rich cultural heritage while providing modern amenities. The design incorporates traditional Islamic patterns and local materials.",
          matchTypes: ["Round of 16", "Group Stage", "Third Place Play-off"],
          architect: "Tabanlioglu Architects",
          construction: "2020-2024",
          cost: "$350 Million",
          parking: "6,000 spaces",
          accessibility: "Barrier-free design with traditional Moroccan accessibility features"
        };
      default: // grand-stade-rabat
        return {
          features: ["Solar Panels", "Rain Water Collection", "Digital Screens", "Premium Seating", "Green Technology", "Eco-Friendly Design", "Wind Turbines", "Recycling Center"],
          description: "Eco-friendly stadium in Morocco's capital, showcasing sustainable technology and green innovation.",
          detailedInfo: "As the capital's premier stadium, it demonstrates Morocco's commitment to environmental sustainability while hosting world-class football matches.",
          matchTypes: ["Group Stage", "Round of 16"],
          architect: "Zaha Hadid Architects",
          construction: "2019-2024",
          cost: "$300 Million",
          parking: "7,000 spaces",
          accessibility: "Universal design principles with eco-friendly accessibility solutions"
        };
    }
  };

  const stadiumInfo = getStadiumInfo(stadium.id);
  const readyYear = stadium.status === 'Ready' ? '2024' : '2029';

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-10 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <Link to="/stadiums">
              <Button variant="ghost" size="sm" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Stadiums
              </Button>
            </Link>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="rounded-xl overflow-hidden shadow-sm border border-border">
                <img src={stadium.image} alt={stadium.name} className="w-full h-auto object-cover" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">{stadium.name}</h1>
                  <Badge variant="secondary">{stadium.status}</Badge>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{stadium.city}</span>
                </div>
                <p className="text-muted-foreground">{stadiumInfo.description}</p>
                <p className="text-sm text-muted-foreground italic">{stadiumInfo.detailedInfo}</p>

                <div className="grid grid-cols-2 gap-4 py-2">
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    <span className="font-medium">{stadium.capacity.toLocaleString()}</span>
                    <span className="text-muted-foreground ml-1">capacity</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    <span className="font-medium">{readyYear}</span>
                    <span className="text-muted-foreground ml-1">ready</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Match Types:</h4>
                    <div className="flex flex-wrap gap-2">
                      {stadiumInfo.matchTypes.map((type) => (
                        <Badge key={type} variant="default" className="text-xs">{type}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {stadiumInfo.features.map((f) => (
                        <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Architect:</span>
                      <span className="text-muted-foreground ml-2">{stadiumInfo.architect}</span>
                    </div>
                    <div>
                      <span className="font-medium">Construction:</span>
                      <span className="text-muted-foreground ml-2">{stadiumInfo.construction}</span>
                    </div>
                    <div>
                      <span className="font-medium">Investment:</span>
                      <span className="text-muted-foreground ml-2">{stadiumInfo.cost}</span>
                    </div>
                    <div>
                      <span className="font-medium">Parking:</span>
                      <span className="text-muted-foreground ml-2">{stadiumInfo.parking}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Accessibility:</h4>
                    <p className="text-xs text-muted-foreground">{stadiumInfo.accessibility}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <a 
                    href={`https://www.google.com/maps/search/${encodeURIComponent(stadium.name + ' ' + stadium.city + ' Morocco')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">Get Directions</Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-center mb-12">Stadium Information</h2>
            
            <div className="space-y-8">
              {/* Stadium Statistics */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Stadium Statistics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The {stadium.name} boasts a total capacity of {stadium.capacity.toLocaleString()} spectators, 
                  including {Math.floor(stadium.capacity * 0.05).toLocaleString()} VIP seats for premium experiences, 
                  {Math.floor(stadium.capacity * 0.15).toLocaleString()} premium seats with enhanced amenities, 
                  and {Math.floor(stadium.capacity * 0.8).toLocaleString()} general admission seats. 
                  The facility provides {stadiumInfo.parking} for visitors, ensuring convenient access to all events.
                </p>
              </div>

              {/* Nearby Attractions */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Nearby Attractions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {stadium.city === 'Tangier' && (
                    "Visitors to Tangier can explore the mystical Caves of Hercules, delve into history at the Kasbah Museum, enjoy panoramic views at Cap Spartel, and wander through the vibrant Medina of Tangier with its traditional markets and authentic Moroccan atmosphere."
                  )}
                  {stadium.city === 'Marrakesh' && (
                    "The Red City offers unforgettable experiences including the bustling Jemaa el-Fnaa Square with its street performers and food stalls, the serene Majorelle Garden with its exotic plants, the iconic Koutoubia Mosque towering over the city, and the magnificent Bahia Palace showcasing traditional Moroccan architecture."
                  )}
                  {stadium.city === 'Benslimane' && (
                    "Located between Casablanca and Rabat, Benslimane offers easy access to both cities' attractions. Visitors can explore the nearby Hassan II Mosque in Casablanca, one of the world's largest mosques, visit the Royal Palace, shop at Morocco Mall, or relax at Corniche Beach along the Atlantic coast."
                  )}
                  {stadium.city === 'Rabat' && (
                    "Morocco's capital city features the historic Hassan Tower, an incomplete minaret of a grand mosque, the impressive Royal Palace, the UNESCO World Heritage Kasbah of the Udayas overlooking the Atlantic Ocean, and the ancient Chellah Necropolis with its Roman and Islamic ruins."
                  )}
                </p>
              </div>

              {/* Transportation */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Transportation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Getting to the stadium is convenient with multiple transportation options available. 
                  Free shuttle buses operate on match days connecting major hotels and transport hubs to the venue. 
                  The stadium is well-connected through metro and tram networks, with regular taxi services available throughout the day. 
                  Car rental services are located nearby for those preferring private transportation, 
                  while dedicated airport transfer services ensure smooth connections for international visitors. 
                  Environmentally conscious fans can utilize the bicycle parking facilities provided at the stadium.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChat />
    </div>
  );
};

export default StadiumDetailPage;
