import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  MapPin, 
  Star, 
  Phone, 
  Globe, 
  CalendarIcon, 
  Users, 
  Filter,
  Search,
  Heart,
  Wifi,
  Car,
  Coffee,
  Waves,
  Dumbbell,
  UtensilsCrossed,
  Building,
  Bed
} from "lucide-react";
import { useHotelSearch, useHotelAmenities, useHotelSearchState } from "@/hooks/useHotels";
import { MOROCCO_CITIES } from "@/lib/api/config";

const HotelsPage = () => {
  const { searchParams, updateSearchParams, nights } = useHotelSearchState();
  const [checkInDate, setCheckInDate] = React.useState<Date>();
  const [checkOutDate, setCheckOutDate] = React.useState<Date>();
  const [showFilters, setShowFilters] = React.useState(false);

  // API Queries
  const { data: hotelsResponse, isLoading, error } = useHotelSearch(searchParams);
  const { data: amenities } = useHotelAmenities();

  const hotels = hotelsResponse?.data || [];

  // Date validation
  const { isValid: datesValid, errors: dateErrors } = useHotelDateValidation(
    searchParams.checkIn,
    searchParams.checkOut
  );

  // Handle date changes
  const handleCheckInChange = (date: Date | undefined) => {
    setCheckInDate(date);
    if (date) {
      const dateStr = format(date, 'yyyy-MM-dd');
      updateSearchParams({ checkIn: dateStr });
      
      // Auto-set checkout to next day if not set
      if (!checkOutDate) {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        setCheckOutDate(nextDay);
        updateSearchParams({ checkOut: format(nextDay, 'yyyy-MM-dd') });
      }
    }
  };

  const handleCheckOutChange = (date: Date | undefined) => {
    setCheckOutDate(date);
    if (date) {
      updateSearchParams({ checkOut: format(date, 'yyyy-MM-dd') });
    }
  };

  // Handle filter changes
  const handleCityChange = (city: string) => {
    updateSearchParams({ city, offset: 0 });
  };

  const handleGuestsChange = (guests: string) => {
    updateSearchParams({ guests: parseInt(guests), offset: 0 });
  };

  const handleRoomsChange = (rooms: string) => {
    updateSearchParams({ rooms: parseInt(rooms), offset: 0 });
  };

  const handleStarRatingChange = (rating: string) => {
    const ratings = rating === 'all' ? undefined : [parseInt(rating)];
    updateSearchParams({ starRating: ratings, offset: 0 });
  };

  const handleSortChange = (sortBy: string) => {
    updateSearchParams({ 
      sortBy: sortBy as 'price' | 'rating' | 'distance' | 'popularity',
      offset: 0 
    });
  };

  // Load more results
  const loadMore = () => {
    updateSearchParams({ 
      offset: (searchParams.offset || 0) + (searchParams.limit || 20)
    });
  };

  const getStarDisplay = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const getAmenityIcon = (amenity: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'WiFi': <Wifi className="w-4 h-4" />,
      'Parking': <Car className="w-4 h-4" />,
      'Restaurant': <Coffee className="w-4 h-4" />,
      'Gym': <Dumbbell className="w-4 h-4" />,
      'Pool': <Building className="w-4 h-4" />,
    };
    return iconMap[amenity] || <Building className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
            <Building className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">World Cup 2030</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-morocco bg-clip-text text-transparent mb-4">
            Hotels in Morocco
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Find the perfect accommodation for your World Cup 2030 experience. From luxury resorts to budget-friendly options.
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Your Perfect Stay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* City Selection */}
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

              {/* Check-in Date */}
              <div>
                <label className="text-sm font-medium mb-2 block">Check-in</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkInDate ? format(checkInDate, "MMM dd, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkInDate}
                      onSelect={handleCheckInChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-out Date */}
              <div>
                <label className="text-sm font-medium mb-2 block">Check-out</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOutDate ? format(checkOutDate, "MMM dd, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOutDate}
                      onSelect={handleCheckOutChange}
                      disabled={(date) => date <= (checkInDate || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Guests */}
              <div>
                <label className="text-sm font-medium mb-2 block">Guests</label>
                <Select value={searchParams.guests.toString()} onValueChange={handleGuestsChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} Guest{num !== 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rooms */}
              <div>
                <label className="text-sm font-medium mb-2 block">Rooms</label>
                <Select value={searchParams.rooms.toString()} onValueChange={handleRoomsChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 4 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} Room{num !== 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date Validation Errors */}
            {dateErrors.length > 0 && (
              <Alert className="mt-4">
                <AlertDescription>
                  {dateErrors.join(', ')}
                </AlertDescription>
              </Alert>
            )}

            {/* Nights Display */}
            {nights > 0 && (
              <div className="mt-4 text-center">
                <Badge variant="secondary" className="text-sm">
                  {nights} night{nights !== 1 ? 's' : ''}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
          <Button 
            onClick={() => setShowFilters(!showFilters)} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          
          <Select 
            value={searchParams.sortBy || 'rating'} 
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price">Lowest Price</SelectItem>
              <SelectItem value="distance">Nearest to Stadium</SelectItem>
              <SelectItem value="popularity">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {showFilters && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Filter Hotels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {/* Star Rating Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Star Rating</label>
                  <Select 
                    value={searchParams.starRating?.[0]?.toString() || 'all'} 
                    onValueChange={handleStarRatingChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All ratings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                      <SelectItem value="2">2+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Price Range (per night)</label>
                  <div className="flex gap-2">
                    <Input placeholder="Min" type="number" />
                    <Input placeholder="Max" type="number" />
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {amenities?.slice(0, 4).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="cursor-pointer">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Alert className="mb-8">
            <AlertDescription>
              Failed to load hotels. Please try again later.
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
        {!isLoading && hotels.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {hotels.length} Hotel{hotels.length !== 1 ? 's' : ''} Found
              </h2>
              <div className="text-sm text-muted-foreground">
                in {MOROCCO_CITIES.find(c => c.id === searchParams.city)?.name}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {hotels.map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Hotel Image */}
                  <div className="aspect-video overflow-hidden relative">
                    {hotel.images.length > 0 ? (
                      <img 
                        src={hotel.images[0]} 
                        alt={hotel.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Building className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    
                    {/* Distance to Stadium */}
                    {hotel.distanceToStadium && (
                      <Badge className="absolute top-2 left-2 bg-black/70 text-white">
                        {hotel.distanceToStadium}km to stadium
                      </Badge>
                    )}
                    
                    {/* Favorite Button */}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  <CardContent className="p-6">
                    {/* Hotel Info */}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold line-clamp-1">{hotel.name}</h3>
                      <div className="flex">
                        {getStarDisplay(hotel.starRating)}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{hotel.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({hotel.reviewCount} reviews)
                      </span>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-2 mb-4">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground line-clamp-2">
                        {hotel.address}
                      </span>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 4).map((amenity, index) => (
                        <div key={index} className="flex items-center gap-1">
                          {getAmenityIcon(amenity)}
                          <span className="text-xs text-muted-foreground">{amenity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Room Types */}
                    {hotel.roomTypes.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Bed className="w-4 h-4" />
                          <span>{hotel.roomTypes[0].name}</span>
                          <span className="text-muted-foreground">
                            • {hotel.roomTypes[0].maxOccupancy} guests
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          ${hotel.priceRange.min}
                        </div>
                        <div className="text-sm text-muted-foreground">per night</div>
                      </div>
                      {nights > 0 && (
                        <div className="text-right">
                          <div className="text-lg font-semibold">
                            ${hotel.priceRange.min * nights}
                          </div>
                          <div className="text-sm text-muted-foreground">total</div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        variant="hero" 
                        disabled={!datesValid}
                        onClick={() => {
                          if (datesValid) {
                            const confirmationId = `WC2030-HTL-${Date.now()}`;
                            const totalPrice = hotel.priceRange.min * nights;
                            
                            if (confirm(`Book ${hotel.name}?\n\nCheck-in: ${searchParams.checkIn}\nCheck-out: ${searchParams.checkOut}\nGuests: ${searchParams.guests}\nRooms: ${searchParams.rooms}\nTotal: $${totalPrice}`)) {
                              alert(`✅ Hotel Booking Confirmed!\n\nHotel: ${hotel.name}\nCheck-in: ${searchParams.checkIn}\nCheck-out: ${searchParams.checkOut}\nGuests: ${searchParams.guests}\nRooms: ${searchParams.rooms}\nTotal Price: $${totalPrice}\nConfirmation ID: ${confirmationId}\n\nYou will receive a confirmation email shortly.`);
                            }
                          }
                        }}
                      >
                        Book Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      {hotel.website && (
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
            {hotelsResponse?.pagination?.hasMore && (
              <div className="text-center">
                <Button onClick={loadMore} variant="outline" size="lg">
                  Load More Hotels
                </Button>
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {!isLoading && hotels.length === 0 && !error && (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or selecting different dates.
            </p>
            <Button onClick={() => updateSearchParams({ starRating: undefined })}>
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HotelsPage;
