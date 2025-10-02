import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import MapComponent from "@/components/MapComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search, MapPin, Hotel, Utensils, Car, Building2, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const MapPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const cities = [
    { value: 'all', label: 'All Cities' },
    { value: 'casablanca', label: 'Casablanca' },
    { value: 'marrakech', label: 'Marrakech' },
    { value: 'rabat', label: 'Rabat' },
    { value: 'tangier', label: 'Tangier' },
    { value: 'fes', label: 'Fes' },
    { value: 'agadir', label: 'Agadir' }
  ];

  const filterButtons = [
    { key: 'all', label: 'All', icon: MapPin, color: '#10B981' },
    { key: 'hotel', label: 'Hotels', icon: Hotel, color: '#3B82F6' },
    { key: 'restaurant', label: 'Restaurants', icon: Utensils, color: '#EF4444' },
    { key: 'event', label: 'Events', icon: Calendar, color: '#8B5CF6' },
    { key: 'stadium', label: 'Stadiums', icon: Building2, color: '#F59E0B' },
    { key: 'transport', label: 'Transport', icon: Car, color: '#06B6D4' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-8 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Interactive Map of Morocco 2030
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore all important locations for the 2030 World Cup: hotels, restaurants, stadiums, events and transport
              </p>
            </div>
          </div>
        </section>

        {/* Search Section - Above Map */}
        <section className="py-4 bg-gradient-to-br from-red-50 via-green-50 to-red-50">
          <div className="container mx-auto px-4">
            <Card className="p-4 bg-white/95 backdrop-blur-sm border-2 border-red-200 shadow-lg">
              <div className="flex gap-3 mb-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search hotels, restaurants, stadiums..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-200"
                  />
                </div>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-3 py-2 border border-green-200 rounded-lg focus:border-green-400 focus:ring-green-200"
                >
                  {cities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {filterButtons.map((filter) => (
                  <Button
                    key={filter.key}
                    variant={selectedFilter === filter.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter.key)}
                    className={`text-xs ${
                      selectedFilter === filter.key 
                        ? 'text-white' 
                        : 'border-red-200 hover:border-red-300 hover:bg-red-50'
                    }`}
                    style={selectedFilter === filter.key ? { backgroundColor: filter.color } : {}}
                  >
                    <filter.icon className="w-3 h-3 mr-1" />
                    {filter.label}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-[600px] mb-8">
          <div className="container mx-auto px-4 h-full">
            <div className="h-full rounded-lg overflow-hidden shadow-lg border-2 border-red-200">
              <MapComponent 
                searchQuery={searchQuery}
                selectedCity={selectedCity}
                selectedFilter={selectedFilter}
              />
            </div>
          </div>
        </section>

        {/* Additional Content for Better Scrolling */}
        <section className="py-8 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Discover Morocco 2030
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore all the iconic locations of the 2030 World Cup in Morocco. 
                Click on the markers for more information about each location.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MapPage;
