import { BaseApiService, ApiResponse, Location, DateRange, ApiUtils } from './apiService';

/**
 * Home Rental Service
 * Integrates with Airbnb-like APIs for short-term home rentals
 * 
 * Required Environment Variables:
 * - VITE_RAPIDAPI_KEY: Your RapidAPI key
 * - VITE_AIRBNB_API_HOST: airbnb13.p.rapidapi.com
 * 
 * Get API keys from:
 * - RapidAPI Airbnb: https://rapidapi.com/3b-data-3b-data-default/api/airbnb13
 * - Alternative: https://rapidapi.com/apidojo/api/airbnb19
 */

export interface Rental {
  id: string;
  title: string;
  description: string;
  propertyType: 'apartment' | 'house' | 'villa' | 'riad' | 'studio' | 'loft';
  address: string;
  city: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  host: {
    id: string;
    name: string;
    avatar?: string;
    isSuperhost?: boolean;
    responseRate?: number;
    joinedDate?: string;
  };
  capacity: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  amenities: string[];
  images: string[];
  pricing: {
    basePrice: number;
    cleaningFee?: number;
    serviceFee?: number;
    currency: string;
    weeklyDiscount?: number;
    monthlyDiscount?: number;
  };
  availability: {
    instantBook: boolean;
    minimumStay: number;
    maximumStay?: number;
    availableDates: string[];
  };
  reviews: {
    count: number;
    rating: number;
    accuracy?: number;
    cleanliness?: number;
    communication?: number;
    location?: number;
    checkIn?: number;
    value?: number;
  };
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: 'flexible' | 'moderate' | 'strict';
    houseRules: string[];
  };
  worldCupFeatures?: {
    stadiumDistance?: number;
    publicTransport?: boolean;
    worldCupReady?: boolean;
    fanZoneNearby?: boolean;
    matchDayParking?: boolean;
  };
}

export interface RentalSearchParams {
  location: Location;
  dateRange: DateRange;
  guests: number;
  filters?: {
    propertyType?: string[];
    priceRange?: { min: number; max: number };
    bedrooms?: number;
    bathrooms?: number;
    amenities?: string[];
    instantBook?: boolean;
    superhost?: boolean;
    worldCupFeatures?: boolean;
  };
  sortBy?: 'price' | 'rating' | 'distance' | 'newest';
  limit?: number;
}

export interface RentalBookingRequest {
  rentalId: string;
  dateRange: DateRange;
  guests: {
    adults: number;
    children?: number;
    infants?: number;
  };
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message?: string;
  };
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  purpose?: 'vacation' | 'business' | 'world_cup' | 'family_visit';
  specialRequests?: string;
}

export interface RentalBookingConfirmation {
  bookingId: string;
  confirmationNumber: string;
  rental: Rental;
  dateRange: DateRange;
  pricing: {
    basePrice: number;
    nights: number;
    subtotal: number;
    cleaningFee: number;
    serviceFee: number;
    taxes: number;
    total: number;
    currency: string;
  };
  status: 'confirmed' | 'pending' | 'cancelled';
  guestInfo: any;
  checkInInstructions?: string;
  hostContact?: {
    name: string;
    phone?: string;
    email?: string;
  };
}

class RentalService extends BaseApiService {
  private rapidApiKey: string;
  private airbnbApiHost: string;

  constructor() {
    const rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    const airbnbApiHost = import.meta.env.VITE_AIRBNB_API_HOST || 'airbnb13.p.rapidapi.com';
    
    super(`https://${airbnbApiHost}`, 'Rental Service', {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': airbnbApiHost
    });

    this.rapidApiKey = rapidApiKey;
    this.airbnbApiHost = airbnbApiHost;

    if (!ApiUtils.validateEnvVars(['VITE_RAPIDAPI_KEY'])) {
      console.warn('⚠️ Rental Service: Missing API keys. Service will use mock data.');
    }
  }

  /**
   * Search for rental properties
   */
  async searchRentals(params: RentalSearchParams): Promise<ApiResponse<Rental[]>> {
    // For development, use mock data to avoid API issues
    console.log('🏠 Rental Service: Using mock data for development');
    return this.getMockRentals(params);
    
    if (!this.rapidApiKey || this.rapidApiKey === 'your_rapidapi_key_here') {
      return this.getMockRentals(params);
    }

    try {
      const searchParams = {
        location: ApiUtils.formatLocation(params.location),
        checkin: params.dateRange.checkIn,
        checkout: params.dateRange.checkOut,
        adults: params.guests,
        children: 0,
        infants: 0,
        page: 1,
        currency: 'USD'
      };

      // Add filters
      if (params.filters?.priceRange) {
        searchParams['priceMin'] = params.filters.priceRange.min;
        searchParams['priceMax'] = params.filters.priceRange.max;
      }

      if (params.filters?.propertyType?.length) {
        searchParams['propertyType'] = params.filters.propertyType.join(',');
      }

      if (params.filters?.bedrooms) {
        searchParams['bedrooms'] = params.filters.bedrooms;
      }

      if (params.filters?.instantBook) {
        searchParams['instantBook'] = 'true';
      }

      const response = await this.get<any>('/search-location', {
        params: searchParams
      });

      if (response.success && response.data) {
        const rentals = this.transformAirbnbResponse(response.data);
        return {
          success: true,
          data: rentals,
          status: response.status
        };
      }

      return this.getMockRentals(params);

    } catch (error) {
      console.error('Rental search error:', error);
      return this.getMockRentals(params);
    }
  }

  /**
   * Get detailed information about a specific rental
   */
  async getRentalDetails(rentalId: string): Promise<ApiResponse<Rental>> {
    if (!this.rapidApiKey || this.rapidApiKey === 'your_rapidapi_key_here') {
      return this.getMockRentalDetails(rentalId);
    }

    try {
      const response = await this.get<any>('/search-property', {
        params: {
          propertyId: rentalId
        }
      });

      if (response.success && response.data) {
        const rental = this.transformRentalDetails(response.data);
        return {
          success: true,
          data: rental,
          status: response.status
        };
      }

      return this.getMockRentalDetails(rentalId);

    } catch (error) {
      console.error('Rental details error:', error);
      return this.getMockRentalDetails(rentalId);
    }
  }

  /**
   * Check availability for specific dates
   */
  async checkAvailability(
    rentalId: string, 
    dateRange: DateRange
  ): Promise<ApiResponse<{ available: boolean; pricing: any }>> {
    if (!this.rapidApiKey || this.rapidApiKey === 'your_rapidapi_key_here') {
      return this.getMockAvailability(rentalId, dateRange);
    }

    try {
      const response = await this.get<any>('/check-availability', {
        params: {
          propertyId: rentalId,
          checkin: dateRange.checkIn,
          checkout: dateRange.checkOut
        }
      });

      if (response.success && response.data) {
        return {
          success: true,
          data: {
            available: response.data.available || true,
            pricing: response.data.pricing || {}
          },
          status: response.status
        };
      }

      return this.getMockAvailability(rentalId, dateRange);

    } catch (error) {
      console.error('Availability check error:', error);
      return this.getMockAvailability(rentalId, dateRange);
    }
  }

  /**
   * Create a rental booking
   */
  async createBooking(bookingRequest: RentalBookingRequest): Promise<ApiResponse<RentalBookingConfirmation>> {
    console.log('🏠 Creating rental booking:', bookingRequest);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    const rental = await this.getMockRentalById(bookingRequest.rentalId);
    const nights = this.calculateNights(bookingRequest.dateRange);
    const pricing = this.calculatePricing(rental, nights);

    const confirmation: RentalBookingConfirmation = {
      bookingId: `RNT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      confirmationNumber: `WC2030-R-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      rental,
      dateRange: bookingRequest.dateRange,
      pricing,
      status: 'confirmed',
      guestInfo: bookingRequest.guestInfo,
      checkInInstructions: 'Self check-in with lockbox. Code will be sent 24 hours before arrival.',
      hostContact: {
        name: rental.host.name,
        phone: '+212 6XX XXX XXX',
        email: 'host@example.com'
      }
    };

    return {
      success: true,
      data: confirmation,
      status: 201
    };
  }

  // Private helper methods

  private transformAirbnbResponse(data: any): Rental[] {
    if (!data.results) return [];

    return data.results.map((item: any) => ({
      id: item.id?.toString() || Math.random().toString(),
      title: item.name || 'Beautiful Property',
      description: item.summary || item.description || '',
      propertyType: this.mapPropertyType(item.property_type),
      address: item.smart_location || item.street || '',
      city: item.city || '',
      country: item.country || 'Morocco',
      coordinates: {
        latitude: parseFloat(item.lat) || 0,
        longitude: parseFloat(item.lng) || 0
      },
      host: {
        id: item.host?.id?.toString() || '',
        name: item.host?.name || 'Host',
        avatar: item.host?.picture_url || '',
        isSuperhost: item.host?.is_superhost || false,
        responseRate: item.host?.response_rate || 95
      },
      capacity: {
        guests: parseInt(item.accommodates) || 2,
        bedrooms: parseInt(item.bedrooms) || 1,
        beds: parseInt(item.beds) || 1,
        bathrooms: parseFloat(item.bathrooms) || 1
      },
      amenities: item.amenities ? item.amenities.slice(0, 10) : [],
      images: this.processImages(item.photos ? item.photos.slice(0, 5).map((p: any) => p.picture_url) : [], 'rental'),
      pricing: {
        basePrice: parseFloat(item.price) || 80,
        cleaningFee: parseFloat(item.cleaning_fee) || 25,
        serviceFee: parseFloat(item.service_fee) || 15,
        currency: item.currency || 'USD'
      },
      availability: {
        instantBook: item.instant_bookable || false,
        minimumStay: parseInt(item.minimum_nights) || 1,
        maximumStay: parseInt(item.maximum_nights) || 30,
        availableDates: []
      },
      reviews: {
        count: parseInt(item.number_of_reviews) || 0,
        rating: parseFloat(item.review_scores_rating) / 20 || 4.5, // Convert from 100 scale to 5 scale
        accuracy: parseFloat(item.review_scores_accuracy) / 20 || 4.5,
        cleanliness: parseFloat(item.review_scores_cleanliness) / 20 || 4.5,
        communication: parseFloat(item.review_scores_communication) / 20 || 4.5,
        location: parseFloat(item.review_scores_location) / 20 || 4.5,
        checkIn: parseFloat(item.review_scores_checkin) / 20 || 4.5,
        value: parseFloat(item.review_scores_value) / 20 || 4.5
      },
      policies: {
        checkIn: '15:00',
        checkOut: '11:00',
        cancellation: this.mapCancellationPolicy(item.cancellation_policy),
        houseRules: item.house_rules ? item.house_rules.split('\n').slice(0, 5) : []
      },
      worldCupFeatures: {
        stadiumDistance: Math.random() * 25,
        publicTransport: Math.random() > 0.3,
        worldCupReady: Math.random() > 0.6,
        fanZoneNearby: Math.random() > 0.7,
        matchDayParking: Math.random() > 0.5
      }
    }));
  }

  private transformRentalDetails(data: any): Rental {
    return this.transformAirbnbResponse({ results: [data] })[0];
  }

  private mapPropertyType(type: string): 'apartment' | 'house' | 'villa' | 'riad' | 'studio' | 'loft' {
    const typeMap: Record<string, any> = {
      'apartment': 'apartment',
      'house': 'house',
      'villa': 'villa',
      'riad': 'riad',
      'studio': 'studio',
      'loft': 'loft',
      'condominium': 'apartment',
      'townhouse': 'house'
    };
    return typeMap[type?.toLowerCase()] || 'apartment';
  }

  private mapCancellationPolicy(policy: string): 'flexible' | 'moderate' | 'strict' {
    const policyMap: Record<string, any> = {
      'flexible': 'flexible',
      'moderate': 'moderate',
      'strict': 'strict',
      'super_strict_30': 'strict',
      'super_strict_60': 'strict'
    };
    return policyMap[policy?.toLowerCase()] || 'moderate';
  }

  private calculateNights(dateRange: DateRange): number {
    const checkIn = new Date(dateRange.checkIn);
    const checkOut = new Date(dateRange.checkOut);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  }

  private calculatePricing(rental: Rental, nights: number) {
    const basePrice = rental.pricing.basePrice;
    const subtotal = basePrice * nights;
    const cleaningFee = rental.pricing.cleaningFee || 25;
    const serviceFee = Math.round(subtotal * 0.12); // 12% service fee
    const taxes = Math.round(subtotal * 0.08); // 8% taxes
    const total = subtotal + cleaningFee + serviceFee + taxes;

    return {
      basePrice,
      nights,
      subtotal,
      cleaningFee,
      serviceFee,
      taxes,
      total,
      currency: rental.pricing.currency
    };
  }

  // Mock data methods

  private async getMockRentals(params: RentalSearchParams): Promise<ApiResponse<Rental[]>> {
    console.log('🏠 getMockRentals called with params:', params);
    const mockRentals: Rental[] = [
      {
        id: 'rental-1',
        title: 'Stunning Riad in Medina with Rooftop Terrace',
        description: 'Experience authentic Moroccan living in this beautifully restored riad. Perfect for World Cup visitors with easy access to stadiums.',
        propertyType: 'riad',
        address: 'Medina, Marrakech',
        city: 'Marrakech',
        country: 'Morocco',
        coordinates: { latitude: 31.6295, longitude: -7.9811 },
        host: {
          id: 'host-1',
          name: 'Youssef',
          avatar: 'http://localhost:5000/api/placeholder/100/100',
          isSuperhost: true,
          responseRate: 98,
          joinedDate: '2019'
        },
        capacity: {
          guests: 6,
          bedrooms: 3,
          beds: 4,
          bathrooms: 2
        },
        amenities: ['WiFi', 'Kitchen', 'Rooftop Terrace', 'Traditional Decor', 'Air Conditioning', 'Parking'],
        images: ['http://localhost:5000/api/images/rental', 'http://localhost:5000/api/images/rental/large'],
        pricing: {
          basePrice: 95,
          cleaningFee: 30,
          serviceFee: 18,
          currency: 'USD'
        },
        availability: {
          instantBook: true,
          minimumStay: 2,
          maximumStay: 28,
          availableDates: []
        },
        reviews: {
          count: 127,
          rating: 4.8,
          accuracy: 4.9,
          cleanliness: 4.8,
          communication: 4.9,
          location: 4.7,
          checkIn: 4.8,
          value: 4.6
        },
        policies: {
          checkIn: '15:00',
          checkOut: '11:00',
          cancellation: 'moderate',
          houseRules: ['No smoking', 'No parties', 'Check-in after 3 PM']
        },
        worldCupFeatures: {
          stadiumDistance: 6.2,
          publicTransport: true,
          worldCupReady: true,
          fanZoneNearby: true,
          matchDayParking: true
        }
      },
      {
        id: 'rental-2',
        title: 'Modern Apartment with Ocean View',
        description: 'Stylish apartment overlooking Casablanca\'s coastline. Modern amenities with Moroccan touches.',
        propertyType: 'apartment',
        address: 'Corniche Ain Diab, Casablanca',
        city: 'Casablanca',
        country: 'Morocco',
        coordinates: { latitude: 33.5731, longitude: -7.5898 },
        host: {
          id: 'host-2',
          name: 'Fatima',
          avatar: '/api/placeholder/100/101',
          isSuperhost: false,
          responseRate: 92,
          joinedDate: '2020'
        },
        capacity: {
          guests: 4,
          bedrooms: 2,
          beds: 2,
          bathrooms: 2
        },
        amenities: ['WiFi', 'Kitchen', 'Ocean View', 'Balcony', 'Elevator', 'Beach Access'],
        images: ['http://localhost:5000/api/images/rental', 'http://localhost:5000/api/images/rental/large'],
        pricing: {
          basePrice: 75,
          cleaningFee: 25,
          serviceFee: 15,
          currency: 'USD'
        },
        availability: {
          instantBook: false,
          minimumStay: 1,
          maximumStay: 14,
          availableDates: []
        },
        reviews: {
          count: 89,
          rating: 4.6,
          accuracy: 4.5,
          cleanliness: 4.7,
          communication: 4.4,
          location: 4.8,
          checkIn: 4.6,
          value: 4.5
        },
        policies: {
          checkIn: '16:00',
          checkOut: '10:00',
          cancellation: 'flexible',
          houseRules: ['No smoking', 'Quiet hours after 10 PM']
        },
        worldCupFeatures: {
          stadiumDistance: 3.8,
          publicTransport: true,
          worldCupReady: true,
          fanZoneNearby: false,
          matchDayParking: false
        }
      },
      {
        id: 'rental-3',
        title: 'Luxury Villa with Private Pool',
        description: 'Exclusive villa in upscale neighborhood. Perfect for groups attending World Cup matches.',
        propertyType: 'villa',
        address: 'Palmier, Casablanca',
        city: 'Casablanca',
        country: 'Morocco',
        coordinates: { latitude: 33.5892, longitude: -7.6039 },
        host: {
          id: 'host-3',
          name: 'Ahmed',
          avatar: '/api/placeholder/100/102',
          isSuperhost: true,
          responseRate: 100,
          joinedDate: '2018'
        },
        capacity: {
          guests: 8,
          bedrooms: 4,
          beds: 5,
          bathrooms: 3
        },
        amenities: ['WiFi', 'Kitchen', 'Private Pool', 'Garden', 'BBQ', 'Parking', 'Security'],
        images: ['http://localhost:5000/api/images/rental', 'http://localhost:5000/api/images/rental/large'],
        pricing: {
          basePrice: 180,
          cleaningFee: 50,
          serviceFee: 35,
          currency: 'USD'
        },
        availability: {
          instantBook: true,
          minimumStay: 3,
          maximumStay: 30,
          availableDates: []
        },
        reviews: {
          count: 45,
          rating: 4.9,
          accuracy: 5.0,
          cleanliness: 4.9,
          communication: 4.8,
          location: 4.7,
          checkIn: 4.9,
          value: 4.8
        },
        policies: {
          checkIn: '15:00',
          checkOut: '11:00',
          cancellation: 'strict',
          houseRules: ['No smoking indoors', 'No parties without permission', 'Pool supervision required']
        },
        worldCupFeatures: {
          stadiumDistance: 8.5,
          publicTransport: false,
          worldCupReady: true,
          fanZoneNearby: false,
          matchDayParking: true
        }
      }
    ];

    // Temporarily disable location filtering for debugging
    console.log('🏠 Skipping location filtering for debugging');
    
    // Filter by location if specified
    if (false && params.location.city) {
      const filtered = mockRentals.filter(rental => 
        rental.city.toLowerCase().includes(params.location.city!.toLowerCase())
      );
      if (filtered.length > 0) {
        return { success: true, data: filtered, status: 200 };
      }
    }

    console.log('🏠 Mock Rentals Data:', mockRentals);
    console.log('🏠 First rental images:', mockRentals[0]?.images);
    return { success: true, data: mockRentals, status: 200 };
  }

  private async getMockRentalDetails(rentalId: string): Promise<ApiResponse<Rental>> {
    const rentals = await this.getMockRentals({} as RentalSearchParams);
    const rental = rentals.data?.find(r => r.id === rentalId) || rentals.data?.[0];
    
    if (rental) {
      return { success: true, data: rental, status: 200 };
    }
    
    return { 
      success: false, 
      error: { service: 'Rental Service', message: 'Rental not found', status: 404 },
      status: 404 
    };
  }

  private async getMockAvailability(rentalId: string, dateRange: DateRange): Promise<ApiResponse<{ available: boolean; pricing: any }>> {
    return {
      success: true,
      data: {
        available: true,
        pricing: {
          basePrice: 95,
          cleaningFee: 30,
          serviceFee: 18,
          currency: 'USD'
        }
      },
      status: 200
    };
  }

  private async getMockRentalById(rentalId: string): Promise<Rental> {
    const response = await this.getMockRentalDetails(rentalId);
    return response.data || {} as Rental;
  }

  /**
   * Process and validate image URLs
   */
  private processImages(images: string[], type: string = 'rental'): string[] {
    const validImages = images.filter(img => img && img.trim() !== '');
    
    if (validImages.length === 0) {
      // Return fallback images
      return [
        `http://localhost:5000/api/images/${type}`,
        `http://localhost:5000/api/images/${type}/large`
      ];
    }
    
    // Process external URLs through proxy if needed
    return validImages.map(img => {
      if (img.startsWith('http') && !img.includes('localhost')) {
        // Use image proxy for external URLs to handle CORS
        return `http://localhost:5000/api/proxy?url=${encodeURIComponent(img)}`;
      }
      return img;
    });
  }
}

// Export singleton instance
export const rentalService = new RentalService();
export default rentalService;
