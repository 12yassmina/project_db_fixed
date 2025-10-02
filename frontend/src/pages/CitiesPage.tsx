import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import casablancaImage from "@/assets/cities/casablanca-real.jpeg";
import marrakechImage from "@/assets/cities/marrakech-real.jpg";
import rabatImage from "@/assets/cities/rabat-real.jpg";
import tangierImage from "@/assets/cities/tangier-real.jpg";
import fesImage from "@/assets/cities/citie fes.jpg";
import agadirImage from "@/assets/cities/citie-Agadir.jpg";

const CitiesPage = () => {
  const cities = [
    { 
      name: "Casablanca", 
      image: casablancaImage, 
      description: "Morocco's economic capital and largest city",
      population: "3.3 million",
      attractions: ["Hassan II Mosque", "Old Medina", "Corniche", "Mohammed V Square"]
    },
    { 
      name: "Marrakech", 
      image: marrakechImage, 
      description: "The Red City, famous for its historic medina",
      population: "1.4 million",
      attractions: ["Jemaa el-Fnaa", "Bahia Palace", "Saadian Tombs", "Majorelle Garden"]
    },
    { 
      name: "Rabat", 
      image: rabatImage, 
      description: "Morocco's capital and center of government",
      population: "1.8 million",
      attractions: ["Royal Palace", "Hassan Tower", "Kasbah of the Udayas", "Mohammed VI Museum"]
    },
    { 
      name: "Tangier", 
      image: tangierImage, 
      description: "Gateway between Africa and Europe",
      population: "1.1 million",
      attractions: ["Cap Spartel", "Hercules Caves", "Kasbah Museum", "Grand Socco"]
    },
    { 
      name: "Fès", 
      image: fesImage, 
      description: "Morocco's spiritual capital and cultural heart",
      population: "1.2 million",
      attractions: ["Al-Qarawiyyin University", "Bou Inania Madrasa", "Chouara Tannery", "Royal Palace"]
    },
    { 
      name: "Agadir", 
      image: agadirImage, 
      description: "Morocco's premier beach destination and resort city",
      population: "900,000",
      attractions: ["Agadir Beach", "Souk El Had", "Agadir Marina", "Kasbah Ruins"]
    }
  ];

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
            
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Host Cities
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the magnificent cities that will host the 2030 FIFA World Cup matches in Morocco
              </p>
            </div>
          </div>
        </section>

        {/* Cities Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {cities.map((city, index) => (
                <Card
                  key={city.name}
                  className="p-8 bg-gradient-card hover:shadow-morocco transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video mb-6 rounded-lg overflow-hidden">
                    <img 
                      src={city.image} 
                      alt={`${city.name} cityscape`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        {city.name}
                      </h2>
                      <p className="text-muted-foreground text-sm mb-3">
                        Population: {city.population}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {city.description}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Top Attractions:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {city.attractions.map((attraction) => (
                          <span
                            key={attraction}
                            className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                          >
                            {attraction}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Link to={`/city/${city.name.toLowerCase()}`}>
                      <Button 
                        variant="ghost" 
                        className="w-full mt-4 hover:bg-muted transition-colors"
                      >
                        Explore {city.name} →
                      </Button>
                    </Link>
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

export default CitiesPage;