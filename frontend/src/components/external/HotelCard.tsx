import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Star, 
  Wifi, 
  Car, 
  Utensils, 
  Waves,
  Users,
  Calendar,
  DollarSign,
  Trophy
} from "lucide-react";
import { Hotel } from '@/services/hotelService';

interface HotelCardProps {
  hotel: Hotel;
  onBook?: (hotel: Hotel) => void;
  onViewDetails?: (hotel: Hotel) => void;
  showWorldCupFeatures?: boolean;
  className?: string;
}

export const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  onBook,
  onViewDetails,
  showWorldCupFeatures = true,
  className = ""
}) => {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(price);
  };

  const getAmenityIcon = (amenity: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'wifi': <Wifi className="w-4 h-4" />,
      'parking': <Car className="w-4 h-4" />,
      'restaurant': <Utensils className="w-4 h-4" />,
      'pool': <Waves className="w-4 h-4" />,
      'gym': <Users className="w-4 h-4" />
    };
    
    return iconMap[amenity.toLowerCase()] || null;
  };

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {/* Hotel Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={hotel.mainImage || hotel.images?.[0]?.url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* World Cup Badge */}
        {showWorldCupFeatures && hotel.worldCupFeatures?.matchPackages && (
          <Badge className="absolute top-3 left-3 bg-gradient-morocco text-white">
            <Trophy className="w-3 h-3 mr-1" />
            World Cup Package
          </Badge>
        )}
        
        {/* Rating Badge */}
        <Badge className="absolute top-3 right-3 bg-white/90 text-gray-800">
          <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
          {hotel.rating.toFixed(1)}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">
              {hotel.name}
            </h3>
            
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="line-clamp-1">{hotel.address}</span>
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < hotel.rating 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-2">
                ({hotel.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {formatPrice(hotel.pricePerNight, hotel.currency)}
            </div>
            <div className="text-sm text-muted-foreground">per night</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 4).map((amenity, index) => (
            <div
              key={index}
              className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full"
            >
              {getAmenityIcon(amenity)}
              <span className="capitalize">{amenity}</span>
            </div>
          ))}
          {hotel.amenities.length > 4 && (
            <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              +{hotel.amenities.length - 4} more
            </div>
          )}
        </div>

        {/* World Cup Features */}
        {showWorldCupFeatures && hotel.worldCupFeatures && (
          <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-red-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">World Cup 2030 Features</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {hotel.worldCupFeatures.shuttleService && (
                <div className="flex items-center gap-1">
                  <Car className="w-3 h-3 text-green-600" />
                  <span>Stadium shuttle</span>
                </div>
              )}
              {hotel.worldCupFeatures.fanZone && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-green-600" />
                  <span>Fan zone</span>
                </div>
              )}
              {hotel.worldCupFeatures.matchPackages && (
                <div className="flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-green-600" />
                  <span>Match packages</span>
                </div>
              )}
              {hotel.worldCupFeatures.multilingualStaff && (
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-green-600" />
                  <span>Multilingual staff</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(hotel)}
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            onClick={() => onBook?.(hotel)}
            className="flex-1 bg-gradient-morocco text-white hover:opacity-90"
          >
            Book Now
          </Button>
        </div>

        {/* Availability Status */}
        <div className="mt-3 text-center">
          {hotel.availability ? (
            <span className="text-sm text-green-600 font-medium">✓ Available</span>
          ) : (
            <span className="text-sm text-red-600 font-medium">✗ Fully Booked</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
