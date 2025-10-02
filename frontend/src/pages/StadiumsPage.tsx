import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { STADIUMS } from "@/assets/stadiums";

const StadiumsPage = () => {
  const stadiums = STADIUMS.map(s => ({
    ...s,
    features: s.id === 'new-stadium-casablanca' 
      ? ["World's Largest Stadium", "Retractable Roof", "LED Lighting", "VIP Suites", "Media Center"]
      : s.id === 'grand-stade-tanger'
      ? ["Natural Grass", "Modern Facilities", "Fan Zone", "Training Pitches"]
      : s.id === 'grand-stade-marrakesh'
      ? ["Traditional Design", "Climate Control", "Cultural Center", "Museum"]
      : ["Solar Panels", "Rain Water Collection", "Digital Screens", "Premium Seating"],
    description: s.id === 'new-stadium-casablanca'
      ? "The world's largest football stadium, designed to host the opening ceremony and final match."
      : s.id === 'grand-stade-tanger'
      ? "Gateway stadium connecting Africa to Europe, hosting quarter-final matches."
      : s.id === 'grand-stade-marrakesh'
      ? "Blending modern architecture with traditional Moroccan design elements."
      : "Eco-friendly stadium in Morocco's capital, ready to host group stage matches.",
    completion: s.status === 'Ready' ? '2024' : '2029'
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready": return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "Under Construction": return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
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
            
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                World Cup Stadiums
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the modern stadiums that will host the World Cup 2030 matches across Morocco
              </p>
            </div>
          </div>
        </section>

        {/* Stadium Stats */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <div className="text-sm text-muted-foreground">Host Stadiums</div>
              </div>
              <div className="text-center">
        <div className="text-3xl font-bold text-primary mb-2">442K</div>
        <div className="text-sm text-muted-foreground">Total Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">64</div>
                <div className="text-sm text-muted-foreground">Total Matches</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2030</div>
                <div className="text-sm text-muted-foreground">Tournament Year</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stadiums Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {stadiums.map((stadium, index) => (
                <Card
                  key={stadium.id}
                  className="overflow-hidden bg-card hover:shadow-morocco transition-all duration-300 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={stadium.image} 
                      alt={stadium.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {stadium.name}
                        </h3>
                        <div className="flex items-center text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{stadium.city}</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(stadium.status)}`}>
                        {stadium.status}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {stadium.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 py-3">
                      <div className="flex items-center text-sm">
                        <Users className="w-4 h-4 mr-2 text-primary" />
                        <span className="font-medium">{stadium.capacity.toLocaleString()}</span>
                        <span className="text-muted-foreground ml-1">capacity</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        <span className="font-medium">{stadium.completion}</span>
                        <span className="text-muted-foreground ml-1">ready</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">Key Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {stadium.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Link to={`/stadiums/${stadium.id}`}>
                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                      >
                        View Stadium Details
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
      <AIChat />
    </div>
  );
};

export default StadiumsPage;