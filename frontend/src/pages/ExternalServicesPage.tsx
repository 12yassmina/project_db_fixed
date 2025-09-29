import React, { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  useHotelSearch, 
  useRentalSearch, 
  useRestaurantSearch,
  useLocationSearch 
} from '@/hooks/useExternalServices';
import { HotelCard } from '@/components/external/HotelCard';
import { RentalCard } from '@/components/external/RentalCard';
import { RestaurantCard } from '@/components/external/RestaurantCard';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Filter,
  Hotel,
  Home,
  Utensils,
  Trophy,
  Star,
  DollarSign,
  AlertCircle,
  Loader2
} from "lucide-react";

const ExternalServicesPage: React.FC = () => {
  const { t } = useTranslation();
  const { searchNearStadium } = useLocationSearch();
  
  // Search state
  const [activeTab, setActiveTab] = useState<'hotels' | 'rentals' | 'restaurants'>('hotels');
  const [searchParams, setSearchParams] = useState({
    location: {
      latitude: 33.5731,
      longitude: -7.5898,
      city: 'Casablanca'
    },
    dateRange: {
      checkIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week from now
      checkOut: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 2 weeks from now
    },
    guests: 2,
    filters: {
      priceRange: { min: 0, max: 500 },
      rating: 0,
      worldCupFeatures: false
    }
  });

  // Search queries
  const hotelsQuery = useHotelSearch({
    location: searchParams.location,
    dateRange: searchParams.dateRange,
    guests: searchParams.guests,
    filters: {
      priceRange: searchParams.filters.priceRange,
      rating: searchParams.filters.rating,
      worldCupFeatures: searchParams.filters.worldCupFeatures
    }
  }, activeTab === 'hotels');

  const rentalsQuery = useRentalSearch({
    location: searchParams.location,
    dateRange: searchParams.dateRange,
    guests: searchParams.guests,
    filters: {
      priceRange: searchParams.filters.priceRange,
      worldCupFeatures: searchParams.filters.worldCupFeatures
    }
  }, activeTab === 'rentals');

  const restaurantsQuery = useRestaurantSearch({
    location: searchParams.location,
    rating: searchParams.filters.rating,
    features: searchParams.filters.worldCupFeatures ? ['match_viewing'] : undefined
  }, activeTab === 'restaurants');

  // Handle city selection
  const handleCityChange = (cityName: string) => {
    const location = searchNearStadium(cityName);
    setSearchParams(prev => ({
      ...prev,
      location
    }));
  };

  // Handle search parameter changes
  const updateSearchParams = (updates: Partial<typeof searchParams>) => {
    setSearchParams(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Morocco World Cup 2030 cities
  const worldCupCities = [
    { value: 'casablanca', label: 'Casablanca', labelAr: 'الدار البيضاء' },
    { value: 'rabat', label: 'Rabat', labelAr: 'الرباط' },
    { value: 'marrakech', label: 'Marrakech', labelAr: 'مراكش' },
    { value: 'tangier', label: 'Tangier', labelAr: 'طنجة' },
    { value: 'agadir', label: 'Agadir', labelAr: 'أكادير' },
    { value: 'fez', label: 'Fez', labelAr: 'فاس' }
  ];

  const getCurrentQuery = () => {
    switch (activeTab) {
      case 'hotels': return hotelsQuery;
      case 'rentals': return rentalsQuery;
      case 'restaurants': return restaurantsQuery;
      default: return hotelsQuery;
    }
  };

  const currentQuery = getCurrentQuery();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-8 h-8 text-primary" />
                <h1 className="text-4xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                  Morocco 2030 World Cup
                </h1>
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Find Your Perfect Stay & Dining
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Discover hotels, rentals, and restaurants near World Cup stadiums across Morocco
              </p>

              {/* Search Form */}
              <Card className="p-6 bg-card/95 backdrop-blur-sm border-primary/20">
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  {/* Location */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      City
                    </Label>
                    <Select
                      value={searchParams.location.city?.toLowerCase()}
                      onValueChange={handleCityChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {worldCupCities.map((city) => (
                          <SelectItem key={city.value} value={city.value}>
                            {city.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Check-in Date */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Check-in
                    </Label>
                    <Input
                      type="date"
                      value={searchParams.dateRange.checkIn}
                      onChange={(e) => updateSearchParams({
                        dateRange: { ...searchParams.dateRange, checkIn: e.target.value }
                      })}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Check-out Date */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Check-out
                    </Label>
                    <Input
                      type="date"
                      value={searchParams.dateRange.checkOut}
                      onChange={(e) => updateSearchParams({
                        dateRange: { ...searchParams.dateRange, checkOut: e.target.value }
                      })}
                      min={searchParams.dateRange.checkIn}
                    />
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Guests
                    </Label>
                    <Select
                      value={searchParams.guests.toString()}
                      onValueChange={(value) => updateSearchParams({ guests: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Filters */}
                <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Max Price (per night)
                    </Label>
                    <Select
                      value={searchParams.filters.priceRange.max.toString()}
                      onValueChange={(value) => updateSearchParams({
                        filters: {
                          ...searchParams.filters,
                          priceRange: { ...searchParams.filters.priceRange, max: parseInt(value) }
                        }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">$100</SelectItem>
                        <SelectItem value="200">$200</SelectItem>
                        <SelectItem value="300">$300</SelectItem>
                        <SelectItem value="500">$500</SelectItem>
                        <SelectItem value="1000">$1000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Min Rating
                    </Label>
                    <Select
                      value={searchParams.filters.rating.toString()}
                      onValueChange={(value) => updateSearchParams({
                        filters: { ...searchParams.filters, rating: parseFloat(value) }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Any Rating</SelectItem>
                        <SelectItem value="3">3+ Stars</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      World Cup Features
                    </Label>
                    <Button
                      variant={searchParams.filters.worldCupFeatures ? "default" : "outline"}
                      onClick={() => updateSearchParams({
                        filters: {
                          ...searchParams.filters,
                          worldCupFeatures: !searchParams.filters.worldCupFeatures
                        }
                      })}
                      className="w-full justify-start"
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      {searchParams.filters.worldCupFeatures ? 'Enabled' : 'Enable'}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              
              {/* Service Tabs */}
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                  <TabsTrigger value="hotels" className="flex items-center gap-2">
                    <Hotel className="w-4 h-4" />
                    Hotels
                  </TabsTrigger>
                  <TabsTrigger value="rentals" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Rentals
                  </TabsTrigger>
                  <TabsTrigger value="restaurants" className="flex items-center gap-2">
                    <Utensils className="w-4 h-4" />
                    Restaurants
                  </TabsTrigger>
                </TabsList>

                {/* Results Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">
                      {activeTab === 'hotels' && 'Hotels'}
                      {activeTab === 'rentals' && 'Home Rentals'}
                      {activeTab === 'restaurants' && 'Restaurants'}
                      {' '}in {searchParams.location.city}
                    </h3>
                    <p className="text-muted-foreground">
                      {currentQuery.isLoading ? (
                        'Searching...'
                      ) : currentQuery.data && Array.isArray(currentQuery.data) ? (
                        `${currentQuery.data.length} results found`
                      ) : (
                        'No results'
                      )}
                    </p>
                  </div>

                  {searchParams.filters.worldCupFeatures && (
                    <Badge className="bg-gradient-morocco text-white">
                      <Trophy className="w-3 h-3 mr-1" />
                      World Cup Features Enabled
                    </Badge>
                  )}
                </div>

                {/* Hotels Tab */}
                <TabsContent value="hotels" className="space-y-6">
                  {hotelsQuery.isLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                          <Skeleton className="h-48 w-full" />
                          <div className="p-4 space-y-3">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-1/2" />
                            <div className="flex gap-2">
                              <Skeleton className="h-8 flex-1" />
                              <Skeleton className="h-8 flex-1" />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : hotelsQuery.isError ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Failed to load hotels. Using sample data instead.
                      </AlertDescription>
                    </Alert>
                  ) : hotelsQuery.data && Array.isArray(hotelsQuery.data) && hotelsQuery.data.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {hotelsQuery.data.map((hotel) => (
                        <HotelCard
                          key={hotel.id}
                          hotel={hotel}
                          onBook={(hotel) => console.log('Book hotel:', hotel)}
                          onViewDetails={(hotel) => console.log('View hotel details:', hotel)}
                          showWorldCupFeatures={searchParams.filters.worldCupFeatures}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Hotel className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No hotels found</h3>
                      <p className="text-muted-foreground">Try adjusting your search criteria</p>
                    </div>
                  )}
                </TabsContent>

                {/* Rentals Tab */}
                <TabsContent value="rentals" className="space-y-6">
                  {rentalsQuery.isLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                          <Skeleton className="h-48 w-full" />
                          <div className="p-4 space-y-3">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-1/2" />
                            <div className="flex gap-2">
                              <Skeleton className="h-8 flex-1" />
                              <Skeleton className="h-8 flex-1" />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : rentalsQuery.isError ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Failed to load rentals. Using sample data instead.
                      </AlertDescription>
                    </Alert>
                  ) : rentalsQuery.data && rentalsQuery.data.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {rentalsQuery.data.map((rental) => (
                        <RentalCard
                          key={rental.id}
                          rental={rental}
                          onBook={(rental) => console.log('Book rental:', rental)}
                          onViewDetails={(rental) => console.log('View rental details:', rental)}
                          showWorldCupFeatures={searchParams.filters.worldCupFeatures}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No rentals found</h3>
                      <p className="text-muted-foreground">Try adjusting your search criteria</p>
                    </div>
                  )}
                </TabsContent>

                {/* Restaurants Tab */}
                <TabsContent value="restaurants" className="space-y-6">
                  {restaurantsQuery.isLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                          <Skeleton className="h-48 w-full" />
                          <div className="p-4 space-y-3">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-1/2" />
                            <div className="flex gap-2">
                              <Skeleton className="h-8 flex-1" />
                              <Skeleton className="h-8 flex-1" />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : restaurantsQuery.isError ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Failed to load restaurants. Using sample data instead.
                      </AlertDescription>
                    </Alert>
                  ) : restaurantsQuery.data && restaurantsQuery.data.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {restaurantsQuery.data.map((restaurant) => (
                        <RestaurantCard
                          key={restaurant.id}
                          restaurant={restaurant}
                          onReserve={(restaurant) => console.log('Reserve restaurant:', restaurant)}
                          onViewDetails={(restaurant) => console.log('View restaurant details:', restaurant)}
                          showWorldCupFeatures={searchParams.filters.worldCupFeatures}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Utensils className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No restaurants found</h3>
                      <p className="text-muted-foreground">Try adjusting your search criteria</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChat />
    </div>
  );
};

export default ExternalServicesPage;
