import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Star, 
  Phone, 
  Globe, 
  Clock,
  Users,
  Utensils,
  Trophy,
  Heart,
  Wifi,
  Car,
  Accessibility,
  Leaf
} from "lucide-react";
import { Restaurant } from '@/services/restaurantService';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onReserve?: (restaurant: Restaurant) => void;
  onViewDetails?: (restaurant: Restaurant) => void;
  onViewMenu?: (restaurant: Restaurant) => void;
  onFavorite?: (restaurant: Restaurant) => void;
  showWorldCupFeatures?: boolean;
  isFavorite?: boolean;
  className?: string;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onReserve,
  onViewDetails,
  onViewMenu,
  onFavorite,
  showWorldCupFeatures = true,
  isFavorite = false,
  className = ""
}) => {
  const getPriceLevelDisplay = (level: number) => {
    return '$'.repeat(level);
  };

  const getCuisineColor = (cuisine: string) => {
    const colorMap: Record<string, string> = {
      'moroccan': 'bg-red-100 text-red-800',
      'mediterranean': 'bg-blue-100 text-blue-800',
      'french': 'bg-purple-100 text-purple-800',
      'international': 'bg-gray-100 text-gray-800',
      'italian': 'bg-green-100 text-green-800',
      'asian': 'bg-yellow-100 text-yellow-800'
    };
    
    return colorMap[cuisine.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const getFeatureIcon = (feature: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'wifi': <Wifi className="w-3 h-3" />,
      'parking': <Car className="w-3 h-3" />,
      'wheelchair_accessible': <Accessibility className="w-3 h-3" />,
      'outdoor_seating': <Users className="w-3 h-3" />,
      'vegetarian_friendly': <Leaf className="w-3 h-3" />
    };
    
    return iconMap[feature] || null;
  };

  const isOpenNow = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.toTimeString().slice(0, 5);
    
    const todayHours = restaurant.hours[currentDay];
    if (!todayHours || todayHours === 'Closed') return false;
    
    const [open, close] = todayHours.split('-');
    return currentTime >= open && currentTime <= close;
  };

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {/* Restaurant Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.mainImage || restaurant.images?.[0]?.url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* Halal Badge */}
        {restaurant.features.halal && (
          <Badge className="absolute top-3 left-3 bg-green-600 text-white">
            <Leaf className="w-3 h-3 mr-1" />
            Halal
          </Badge>
        )}
        
        {/* World Cup Badge */}
        {showWorldCupFeatures && restaurant.worldCupFeatures?.matchViewing && (
          <Badge className="absolute top-3 right-3 bg-gradient-morocco text-white">
            <Trophy className="w-3 h-3 mr-1" />
            Match Viewing
          </Badge>
        )}

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-3 right-3 bg-white/80 hover:bg-white"
          onClick={() => onFavorite?.(restaurant)}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </Button>

        {/* Open/Closed Status */}
        <Badge 
          className={`absolute bottom-3 left-3 ${
            isOpenNow() 
              ? 'bg-green-600 text-white' 
              : 'bg-red-600 text-white'
          }`}
        >
          <Clock className="w-3 h-3 mr-1" />
          {isOpenNow() ? 'Open Now' : 'Closed'}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">
              {restaurant.name}
            </h3>
            
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="line-clamp-1">{restaurant.address}</span>
            </div>

            {/* Cuisine Types */}
            <div className="flex flex-wrap gap-1 mb-2">
              {restaurant.cuisine.slice(0, 2).map((cuisine, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className={`text-xs ${getCuisineColor(cuisine)}`}
                >
                  {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
                </Badge>
              ))}
              {restaurant.cuisine.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{restaurant.cuisine.length - 2}
                </Badge>
              )}
            </div>

            {/* Rating and Price */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{restaurant.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">
                  ({restaurant.reviewCount})
                </span>
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {getPriceLevelDisplay(restaurant.priceLevel)}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Contact Information */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          {restaurant.contact.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span className="truncate">{restaurant.contact.phone}</span>
            </div>
          )}
          {restaurant.contact.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>Website</span>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(restaurant.features)
            .filter(([_, value]) => value)
            .slice(0, 4)
            .map(([feature, _], index) => (
              <div
                key={index}
                className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full"
              >
                {getFeatureIcon(feature)}
                <span className="capitalize">{feature.replace('_', ' ')}</span>
              </div>
            ))}
        </div>

        {/* World Cup Features */}
        {showWorldCupFeatures && restaurant.worldCupFeatures && (
          <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-red-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">World Cup 2030 Features</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {restaurant.worldCupFeatures.stadiumDistance && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-green-600" />
                  <span>{restaurant.worldCupFeatures.stadiumDistance.toFixed(1)}km to stadium</span>
                </div>
              )}
              {restaurant.worldCupFeatures.matchViewing && (
                <div className="flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-green-600" />
                  <span>Match viewing area</span>
                </div>
              )}
              {restaurant.worldCupFeatures.worldCupMenu && (
                <div className="flex items-center gap-1">
                  <Utensils className="w-3 h-3 text-green-600" />
                  <span>World Cup menu</span>
                </div>
              )}
              {restaurant.worldCupFeatures.groupBookings && (
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-green-600" />
                  <span>Group bookings</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hours Today */}
        <div className="mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Today:</span>
            <span className="font-medium">
              {(() => {
                const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
                return restaurant.hours[today] || 'Hours not available';
              })()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(restaurant)}
            className="flex-1"
          >
            View Details
          </Button>
          {restaurant.menu && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewMenu?.(restaurant)}
              className="flex-1"
            >
              <Utensils className="w-4 h-4 mr-1" />
              Menu
            </Button>
          )}
        </div>

        <Button
          onClick={() => onReserve?.(restaurant)}
          disabled={!restaurant.features.reservations}
          className="w-full bg-gradient-morocco text-white hover:opacity-90"
        >
          {restaurant.features.reservations ? 'Make Reservation' : 'Call for Reservation'}
        </Button>

        {/* Reservation Info */}
        <div className="mt-3 text-center text-xs text-muted-foreground">
          {restaurant.features.reservations ? (
            <span>✓ Online reservations available</span>
          ) : (
            <span>📞 Call restaurant to make reservation</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
