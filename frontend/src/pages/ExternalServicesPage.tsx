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
import { HotelCard } from '@/components/external/HotelCard';
import { RentalCard } from '@/components/external/RentalCard';
import { RestaurantCard } from '@/components/external/RestaurantCard';
import { 
  Search, MapPin, Calendar, Users, Filter,
  Hotel, Home, Utensils, Trophy, Star, DollarSign, AlertCircle
} from "lucide-react";
import { hotelService } from '@/services/hotelService';
import { rentalService } from '@/services/rentalService';
import { restaurantService } from '@/services/restaurantService';

// ----------------------
// Type-safe search result
interface ExternalSearchResult<T> {
  isLoading: boolean;
  isError: boolean;
  data: T[];
}

// ----------------------
// Hooks
function useHotelSearch(params, enabled: boolean): ExternalSearchResult<any> {
  const [result, setResult] = useState<ExternalSearchResult<any>>({ isLoading: false, isError: false, data: [] });

  useEffect(() => {
    if (!enabled) return;

    setResult({ isLoading: true, isError: false, data: [] });
    hotelService.searchHotels(params)
      .then(res => setResult({
        isLoading: false,
        isError: !res.success,
        data: res.success && Array.isArray(res.data) ? res.data : []
      }))
      .catch(() => setResult({ isLoading: false, isError: true, data: [] }));
  }, [params, enabled]);

  return result;
}

function useRentalSearch(params, enabled: boolean): ExternalSearchResult<any> {
  const [result, setResult] = useState<ExternalSearchResult<any>>({ isLoading: false, isError: false, data: [] });

  useEffect(() => {
    if (!enabled) return;

    setResult({ isLoading: true, isError: false, data: [] });
    rentalService.searchRentals(params)
      .then(res => setResult({
        isLoading: false,
        isError: !res.success,
        data: res.success && Array.isArray(res.data) ? res.data : []
      }))
      .catch(() => setResult({ isLoading: false, isError: true, data: [] }));
  }, [params, enabled]);

  return result;
}

function useRestaurantSearch(params, enabled: boolean): ExternalSearchResult<any> {
  const [result, setResult] = useState<ExternalSearchResult<any>>({ isLoading: false, isError: false, data: [] });

  useEffect(() => {
    if (!enabled) return;

    setResult({ isLoading: true, isError: false, data: [] });
    restaurantService.searchRestaurants(params)
      .then(res => setResult({
        isLoading: false,
        isError: !res.success,
        data: res.success && Array.isArray(res.data) ? res.data : []
      }))
      .catch(() => setResult({ isLoading: false, isError: true, data: [] }));
  }, [params, enabled]);

  return result;
}

// ----------------------
// Component
const ExternalServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hotels' | 'rentals' | 'restaurants'>('hotels');

  const [searchParams, setSearchParams] = useState({
    location: { latitude: 33.5731, longitude: -7.5898, city: 'Casablanca' },
    dateRange: {
      checkIn: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 14*24*60*60*1000).toISOString().split('T')[0],
    },
    guests: 2,
    filters: { priceRange: { min: 0, max: 500 }, rating: 0, worldCupFeatures: false }
  });

  const hotelsQuery = useHotelSearch(searchParams, activeTab === 'hotels');
  const rentalsQuery = useRentalSearch(searchParams, activeTab === 'rentals');
  const restaurantsQuery = useRestaurantSearch(searchParams, activeTab === 'restaurants');

  const worldCupCities = [
    { value: 'Casablanca', label: 'Casablanca' },
    { value: 'Rabat', label: 'Rabat' },
    { value: 'Marrakech', label: 'Marrakech' },
    { value: 'Tangier', label: 'Tangier' },
    { value: 'Agadir', label: 'Agadir' },
    { value: 'Fez', label: 'Fez' }
  ];

  const currentQuery = () => {
    switch (activeTab) {
      case 'hotels': return hotelsQuery;
      case 'rentals': return rentalsQuery;
      case 'restaurants': return restaurantsQuery;
      default: return hotelsQuery;
    }
  };

  const updateSearchParams = (updates) => {
    setSearchParams(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero & Search Form */}
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-8 h-8 text-primary" />
                <h1 className="text-4xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                  Morocco 2030 World Cup
                </h1>
              </div>
              <p className="text-lg text-muted-foreground mb-8">
                Discover hotels, rentals, and restaurants near World Cup stadiums across Morocco
              </p>

              {/* City Selector */}
              <Card className="p-6 bg-card/95 backdrop-blur-sm border-primary/20">
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      City
                    </Label>
                    <Select
                      value={searchParams.location.city}
                      onValueChange={(cityName) => updateSearchParams({ location: { ...searchParams.location, city: cityName } })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {worldCupCities.map(city => (
                          <SelectItem key={city.value} value={city.value}>{city.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Check-in */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Calendar className="w-4 h-4" />Check-in</Label>
                    <Input
                      type="date"
                      value={searchParams.dateRange.checkIn}
                      onChange={(e) => updateSearchParams({ dateRange: { ...searchParams.dateRange, checkIn: e.target.value } })}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  {/* Check-out */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Calendar className="w-4 h-4" />Check-out</Label>
                    <Input
                      type="date"
                      value={searchParams.dateRange.checkOut}
                      onChange={(e) => updateSearchParams({ dateRange: { ...searchParams.dateRange, checkOut: e.target.value } })}
                      min={searchParams.dateRange.checkIn}
                    />
                  </div>
                  {/* Guests */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Users className="w-4 h-4" />Guests</Label>
                    <Select
                      value={searchParams.guests.toString()}
                      onValueChange={(value) => updateSearchParams({ guests: parseInt(value) })}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5,6,7,8].map(n => <SelectItem key={n} value={n.toString()}>{n} {n===1?'Guest':'Guests'}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Tabs & Results */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                <TabsTrigger value="hotels" className="flex items-center gap-2"><Hotel className="w-4 h-4" />Hotels</TabsTrigger>
                <TabsTrigger value="rentals" className="flex items-center gap-2"><Home className="w-4 h-4" />Rentals</TabsTrigger>
                <TabsTrigger value="restaurants" className="flex items-center gap-2"><Utensils className="w-4 h-4" />Restaurants</TabsTrigger>
              </TabsList>

              {/* Hotels */}
              <TabsContent value="hotels" className="space-y-6">
                {hotelsQuery.isLoading ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}
                  </div>
                ) : hotelsQuery.isError ? (
                  <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>Failed to load hotels</AlertDescription></Alert>
                ) : hotelsQuery.data.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hotelsQuery.data.map(h => <HotelCard key={h.id} hotel={h} onBook={() => {}} onViewDetails={() => {}} showWorldCupFeatures={searchParams.filters.worldCupFeatures} />)}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Hotel className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No hotels found</h3>
                  </div>
                )}
              </TabsContent>

              {/* Rentals */}
              <TabsContent value="rentals" className="space-y-6">
                {rentalsQuery.isLoading ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(6)].map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}</div>
                ) : rentalsQuery.isError ? (
                  <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>Failed to load rentals</AlertDescription></Alert>
                ) : rentalsQuery.data.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rentalsQuery.data.map(r => <RentalCard key={r.id} rental={r} onBook={() => {}} onViewDetails={() => {}} showWorldCupFeatures={searchParams.filters.worldCupFeatures} />)}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No rentals found</h3>
                  </div>
                )}
              </TabsContent>

              {/* Restaurants */}
              <TabsContent value="restaurants" className="space-y-6">
                {restaurantsQuery.isLoading ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(6)].map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}</div>
                ) : restaurantsQuery.isError ? (
                  <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>Failed to load restaurants</AlertDescription></Alert>
                ) : restaurantsQuery.data.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {restaurantsQuery.data.map(r => <RestaurantCard key={r.id} restaurant={r} onReserve={() => {}} onViewDetails={() => {}} showWorldCupFeatures={searchParams.filters.worldCupFeatures} />)}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Utensils className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No restaurants found</h3>
                  </div>
                )}
              </TabsContent>

            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default ExternalServicesPage;
