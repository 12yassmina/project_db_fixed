import { ApiService, ApiResponse } from './apiService';

export interface Location {
  city?: string;
  latitude?: number;
  longitude?: number;
}

export interface DateRange {
  checkIn: string;
  checkOut: string;
}

export interface Rental {
  _id?: string;
  id: string;
  title: string;
  description: string;
  type: 'Apartment' | 'House' | 'Villa' | 'Studio' | 'Riad' | 'Penthouse';
  city: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  currency: string;
  capacity: {
    guests: number;
    bedrooms: number;
    bathrooms: number;
    beds: number;
  };
  amenities: string[];
  mainImage: string;
  images: { url: string; alt: string }[];
  host: {
    name: string;
    avatar?: string;
    responseRate: number;
    responseTime: string;
    isSuperhost: boolean;
  };
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    houseRules: string[];
    minimumStay: number;
  };
  worldCupFeatures: {
    shuttleService: boolean;
    fanZone: boolean;
    matchPackages: boolean;
    localGuide: boolean;
  };
  availability: boolean;
  featured: boolean;
  instantBook: boolean;
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

class RentalService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_BASE || 'http://localhost:5001');
    console.log('🏠 Rental Service: Using database at', this.baseUrl);
  }

  /**
   * Search for rentals using database
   */
  async searchRentals(params: RentalSearchParams): Promise<ApiResponse<Rental[]>> {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      
      if (params.location?.city) {
        queryParams.append('city', params.location.city);
      }
      
      if (params.filters?.priceRange?.min) {
        queryParams.append('minPrice', params.filters.priceRange.min.toString());
      }
      
      if (params.filters?.priceRange?.max) {
        queryParams.append('maxPrice', params.filters.priceRange.max.toString());
      }
      
      if (params.guests) {
        queryParams.append('guests', params.guests.toString());
      }
      
      if (params.filters?.propertyType && params.filters.propertyType.length > 0) {
        queryParams.append('propertyType', params.filters.propertyType.join(','));
      }
      
      if (params.filters?.worldCupFeatures) {
        queryParams.append('featured', 'true');
      }

      // Make request to backend database
      const response = await this.request<Rental[]>(`/api/rentals?${queryParams.toString()}`);
      
      if (response.success) {
        return response;
      }
    } catch (error) {
      console.warn('Database rental search failed:', error);
    }

    // Return empty result if database fails
    return {
      success: false,
      data: [],
      status: 500,
      message: 'Failed to fetch rentals'
    };
  }

  /**
   * Get rental details by ID
   */
  async getRentalDetails(rentalId: string): Promise<ApiResponse<Rental>> {
    try {
      const response = await this.request<Rental>(`/api/rentals/${rentalId}`);
      return response;
    } catch (error) {
      console.error('Get rental details error:', error);
      return {
        success: false,
        data: null as any,
        status: 500,
        message: 'Failed to fetch rental details'
      };
    }
  }

  /**
   * Create rental booking
   */
  async createBooking(request: RentalBookingRequest): Promise<ApiResponse<RentalBookingConfirmation>> {
    try {
      const response = await this.request<RentalBookingConfirmation>('/api/rentals/bookings', {
        method: 'POST',
        body: JSON.stringify(request)
      });
      return response;
    } catch (error) {
      console.error('Create rental booking error:', error);
      return {
        success: false,
        data: null as any,
        status: 500,
        message: 'Failed to create booking'
      };
    }
  }
}

export const rentalService = new RentalService();
export default rentalService;
