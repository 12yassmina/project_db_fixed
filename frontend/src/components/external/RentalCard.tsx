import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  Star, 
  Users, 
  Bed, 
  Bath,
  Wifi,
  Car,
  Trophy,
  Heart,
  Shield,
  Calendar,
  Home
} from "lucide-react";
import { Rental } from '@/services/rentalService';

interface RentalCardProps {
  rental: Rental;
  onBook?: (rental: Rental) => void;
  onViewDetails?: (rental: Rental) => void;
  onFavorite?: (rental: Rental) => void;
  showWorldCupFeatures?: boolean;
  isFavorite?: boolean;
  className?: string;
}

export const RentalCard: React.FC<RentalCardProps> = ({
  rental,
  onBook,
  onViewDetails,
  onFavorite,
  showWorldCupFeatures = true,
  isFavorite = false,
  className = ""
}) => {
  if (!rental) {
    return null;
  }
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(price);
  };

  const getPropertyTypeIcon = (type: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'apartment': <Home className="w-4 h-4" />,
      'house': <Home className="w-4 h-4" />,
      'villa': <Home className="w-4 h-4" />,
      'riad': <Home className="w-4 h-4" />,
      'studio': <Home className="w-4 h-4" />,
      'loft': <Home className="w-4 h-4" />
    };
    
    return iconMap[type] || <Home className="w-4 h-4" />;
  };

  const getPropertyTypeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      'apartment': 'bg-blue-100 text-blue-800',
      'house': 'bg-green-100 text-green-800',
      'villa': 'bg-purple-100 text-purple-800',
      'riad': 'bg-orange-100 text-orange-800',
      'studio': 'bg-gray-100 text-gray-800',
      'loft': 'bg-indigo-100 text-indigo-800'
    };
    
    return colorMap[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {/* Rental Images */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={rental.images?.[0] || `${(import.meta.env.VITE_API_BASE as string) || 'http://localhost:5001/api'}/images/rental`}
          alt={rental.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* Property Type Badge */}
        <Badge className={`absolute top-3 left-3 ${getPropertyTypeColor(rental.propertyType || 'apartment')}`}>
          {getPropertyTypeIcon(rental.propertyType || 'apartment')}
          <span className="ml-1 capitalize">{rental.propertyType || 'apartment'}</span>
        </Badge>
        
        {/* World Cup Badge */}
        {showWorldCupFeatures && rental.worldCupFeatures?.worldCupReady && (
          <Badge className="absolute top-3 right-3 bg-gradient-morocco text-white">
            <Trophy className="w-3 h-3 mr-1" />
            World Cup Ready
          </Badge>
        )}

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-3 right-3 bg-white/80 hover:bg-white"
          onClick={() => onFavorite?.(rental)}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </Button>

        {/* Instant Book Badge */}
        {rental.availability?.instantBook && (
          <Badge className="absolute bottom-3 left-3 bg-green-600 text-white">
            <Shield className="w-3 h-3 mr-1" />
            Instant Book
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-2">
              {rental.title}
            </h3>
            
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="line-clamp-1">{rental.city}, {rental.country}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{(rental.reviews?.rating ?? 4.6).toFixed(1)}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({rental.reviews?.count ?? 0} reviews)
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {formatPrice(rental.pricing?.basePrice ?? 0, rental.pricing?.currency || 'USD')}
            </div>
            <div className="text-sm text-muted-foreground">per night</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Property Details */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{rental.capacity?.guests ?? 0} guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{rental.capacity?.bedrooms ?? 0} bedrooms</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{rental.capacity?.bathrooms ?? 0} baths</span>
          </div>
        </div>

        {/* Host Information */}
        <div className="flex items-center gap-2 mb-4 p-2 bg-muted/50 rounded-lg">
          <Avatar className="w-8 h-8">
            <AvatarImage src={rental.host?.avatar} alt={rental.host?.name || 'Host'} />
            <AvatarFallback>{(rental.host?.name || 'H')[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{rental.host?.name || 'Host'}</span>
              {rental.host?.isSuperhost && (
                <Badge variant="secondary" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Superhost
                </Badge>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {rental.host?.responseRate ?? 0}% response rate
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(rental.amenities || []).slice(0, 3).map((amenity, index) => (
            <div
              key={index}
              className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full"
            >
              {amenity.toLowerCase().includes('wifi') && <Wifi className="w-3 h-3" />}
              {amenity.toLowerCase().includes('parking') && <Car className="w-3 h-3" />}
              <span className="capitalize">{amenity}</span>
            </div>
          ))}
          {(rental.amenities?.length || 0) > 3 && (
            <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              +{(rental.amenities?.length || 0) - 3} more
            </div>
          )}
        </div>

        {/* World Cup Features */}
        {showWorldCupFeatures && rental.worldCupFeatures && (
          <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-red-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">World Cup 2030 Features</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {typeof rental.worldCupFeatures.stadiumDistance === 'number' && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-green-600" />
                  <span>{(rental.worldCupFeatures.stadiumDistance).toFixed(1)}km to stadium</span>
                </div>
              )}
              {rental.worldCupFeatures.publicTransport && (
                <div className="flex items-center gap-1">
                  <Car className="w-3 h-3 text-green-600" />
                  <span>Public transport</span>
                </div>
              )}
              {rental.worldCupFeatures.fanZoneNearby && (
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-green-600" />
                  <span>Near fan zone</span>
                </div>
              )}
              {rental.worldCupFeatures.matchDayParking && (
                <div className="flex items-center gap-1">
                  <Car className="w-3 h-3 text-green-600" />
                  <span>Match day parking</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Booking Policy */}
        <div className="mb-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            <span>Min {rental.availability?.minimumStay ?? 1} nights</span>
            <span>•</span>
            <span className="capitalize">{rental.policies?.cancellation || 'flexible'} cancellation</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(rental)}
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            onClick={() => onBook?.(rental)}
            className="flex-1 bg-gradient-morocco text-white hover:opacity-90"
          >
            {rental.availability.instantBook ? 'Book Instantly' : 'Request to Book'}
          </Button>
        </div>

        {/* Total Price Breakdown */}
        <div className="mt-3 text-center text-xs text-muted-foreground">
          <span>
            {formatPrice(rental?.pricing?.basePrice ?? 0, rental?.pricing?.currency || 'USD')} × 7 nights = {' '}
            {formatPrice((rental?.pricing?.basePrice ?? 0) * 7, rental?.pricing?.currency || 'USD')}
          </span>
          <br />
          <span>+ {formatPrice(rental?.pricing?.cleaningFee || 0, rental?.pricing?.currency || 'USD')} cleaning fee</span>
        </div>
      </CardContent>
    </Card>
  );
}
;

export default RentalCard;
