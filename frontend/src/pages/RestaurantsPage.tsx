import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  MapPin, 
  Star, 
  Phone, 
  Globe, 
  Clock, 
  Users, 
  Filter,
  Search,
  Heart,
  Calendar,
  ChefHat,
  Utensils
} from "lucide-react";
import { useRestaurantSearch, useRestaurantCategories, usePopularCuisines, useRestaurantSearchState } from "@/hooks/useRestaurants";
import { MOROCCO_CITIES } from "@/lib/api/config";

const RestaurantsPage = () => {
  const { searchParams, updateSearchParams } = useRestaurantSearchState();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showFilters, setShowFilters] = React.useState(false);

  // API Queries
  const { data: restaurantsResponse, isLoading, error } = useRestaurantSearch(searchParams);
  const { data: categories } = useRestaurantCategories();
  const { data: cuisines } = usePopularCuisines();

  const restaurants = restaurantsResponse?.data || [];

  // Handle search
  const handleSearch = React.useCallback(() => {
    if (searchTerm.trim()) {
      updateSearchParams({ 
        cuisine: searchTerm.toLowerCase(),
        offset: 0 
      });
    }
  }, [searchTerm, updateSearchParams]);

  // Handle filter changes
  const handleCityChange = (city: string) => {
    updateSearchParams({ city, offset: 0 });
  };

  const handleCuisineChange = (cuisine: string) => {
    updateSearchParams({ 
      cuisine: cuisine === 'all' ? undefined : cuisine,
      offset: 0 
    });
  };

  const handlePriceLevelChange = (priceLevel: string) => {
    updateSearchParams({ 
      priceLevel: priceLevel === 'all' ? undefined : parseInt(priceLevel) as 1 | 2 | 3 | 4,
      offset: 0 
    });
  };

  const handleSortChange = (sortBy: string) => {
    updateSearchParams({ 
      sortBy: sortBy as 'rating' | 'distance' | 'review_count' | 'best_match',
      offset: 0 
    });
  };

  // Load more results
  const loadMore = () => {
    updateSearchParams({ 
      offset: (searchParams.offset || 0) + (searchParams.limit || 20)
    });
  };

  const getPriceDisplay = (priceLevel: number) => {
    return '$'.repeat(priceLevel);
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
            <ChefHat className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Discover Morocco</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-morocco bg-clip-text text-transparent mb-4">
            Authentic Moroccan Restaurants
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Experience the rich flavors of Morocco during the 2030 World Cup. From traditional tagines to modern fusion cuisine.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search for cuisine, restaurant name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} variant="hero">
              Search
            </Button>
            <Button 
              onClick={() => setShowFilters(!showFilters)} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filter Restaurants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* City Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">City</label>
                  <Select value={searchParams.city} onValueChange={handleCityChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOROCCO_CITIES.map((city) => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Cuisine Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Cuisine</label>
                  <Select 
                    value={searchParams.cuisine || 'all'} 
                    onValueChange={handleCuisineChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All cuisines" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cuisines</SelectItem>
                      {cuisines?.map((cuisine) => (
                        <SelectItem key={cuisine} value={cuisine}>
                          {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Level Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Price Range</label>
                  <Select 
                    value={searchParams.priceLevel?.toString() || 'all'} 
                    onValueChange={handlePriceLevelChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All prices" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="1">$ - Budget</SelectItem>
                      <SelectItem value="2">$$ - Moderate</SelectItem>
                      <SelectItem value="3">$$$ - Expensive</SelectItem>
                      <SelectItem value="4">$$$$ - Very Expensive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select 
                    value={searchParams.sortBy || 'rating'} 
                    onValueChange={handleSortChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="review_count">Most Reviewed</SelectItem>
                      <SelectItem value="distance">Nearest</SelectItem>
                      <SelectItem value="best_match">Best Match</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Restaurant Categories */}
        {categories && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => handleCuisineChange(category.id)}
                >
                  <Utensils className="w-6 h-6" />
                  <span className="text-xs text-center">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert className="mb-8">
            <AlertDescription>
              Failed to load restaurants. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Results */}
        {!isLoading && restaurants.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {restaurants.length} Restaurant{restaurants.length !== 1 ? 's' : ''} Found
              </h2>
              <div className="text-sm text-muted-foreground">
                in {MOROCCO_CITIES.find(c => c.id === searchParams.city)?.name}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {restaurants.map((restaurant) => (
                <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Restaurant Image */}
                  <div className="aspect-video overflow-hidden">
                    {restaurant.imageUrl ? (
                      <img 
                        src={restaurant.imageUrl} 
                        alt={restaurant.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <ChefHat className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    {/* Restaurant Info */}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold line-clamp-1">{restaurant.name}</h3>
                      <Button variant="ghost" size="sm" className="p-1">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Cuisine Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {restaurant.cuisine.slice(0, 2).map((cuisine, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {cuisine}
                        </Badge>
                      ))}
                      {restaurant.isHalal && (
                        <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                          Halal
                        </Badge>
                      )}
                    </div>

                    {/* Rating and Price */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{formatRating(restaurant.rating)}</span>
                        <span className="text-sm text-muted-foreground">
                          ({restaurant.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="font-semibold text-primary">
                        {getPriceDisplay(restaurant.priceLevel)}
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-2 mb-4">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground line-clamp-2">
                        {restaurant.address}
                      </span>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {restaurant.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        variant="hero"
                        onClick={() => {
                          const today = new Date();
                          const tomorrow = new Date(today);
                          tomorrow.setDate(tomorrow.getDate() + 1);
                          const confirmationId = `WC2030-REST-${Date.now()}`;
                          
                          if (confirm(`Reserve table at ${restaurant.name}?\n\nDate: ${tomorrow.toLocaleDateString()}\nTime: 7:00 PM\nParty Size: 2 people`)) {
                            alert(`✅ Reservation Confirmed!\n\nRestaurant: ${restaurant.name}\nDate: ${tomorrow.toLocaleDateString()}\nTime: 7:00 PM\nParty Size: 2 people\nConfirmation ID: ${confirmationId}\n\nYou will receive a confirmation email shortly.`);
                          }
                        }}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Reserve
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      {restaurant.website && (
                        <Button variant="outline" size="sm">
                          <Globe className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            {restaurantsResponse?.pagination?.hasMore && (
              <div className="text-center">
                <Button onClick={loadMore} variant="outline" size="lg">
                  Load More Restaurants
                </Button>
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {!isLoading && restaurants.length === 0 && !error && (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse different categories.
            </p>
            <Button onClick={() => updateSearchParams({ cuisine: undefined, priceLevel: undefined })}>
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default RestaurantsPage;
