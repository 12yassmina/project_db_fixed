import { ApiService, ApiResponse } from './apiService';

// Types used by hooks and consumers
export interface Location {
  city?: string;
}

export interface DateRange {
  checkIn: string;
  checkOut: string;
}

export interface RoomType {
  id: string;
  name: string;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
}

export interface Hotel {
  _id?: string;
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  coordinates: { latitude: number; longitude: number };
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  currency: string;
  starRating: number;
  amenities: string[];
  mainImage: string;
  images: { url: string; alt: string }[];
  roomTypes: RoomType[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    petPolicy: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  worldCupFeatures: {
    shuttleService: boolean;
    fanZone: boolean;
    matchPackages: boolean;
    multilingualStaff: boolean;
  };
  availability: boolean;
  featured: boolean;
}

export interface HotelSearchParams {
  location: Location;
  dateRange: DateRange;
  guests: number;
  rooms?: number;
  filters?: {
    priceRange?: { min: number; max: number };
    rating?: number;
    worldCupFeatures?: boolean;
  };
  sortBy?: 'price' | 'rating' | 'distance' | 'popularity';
  limit?: number;
}

export interface HotelBookingRequest {
  hotelId: string;
  roomTypeId: string;
  dateRange: DateRange;
  guests: { adults: number; children?: number };
  guestInfo: { firstName: string; lastName: string; email: string; phone: string };
}

export interface HotelBookingConfirmation {
  bookingId: string;
  confirmationNumber: string;
  hotelId: string;
  roomTypeId: string;
  dateRange: DateRange;
  totalPrice: number;
  currency: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  guestInfo: any;
}

class HotelService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_BASE || 'http://localhost:5001');
    console.log('🏨 Hotel Service: Using database at', this.baseUrl);
  }


  /**
   * Search for hotels using database
   */
  async searchHotels(params: HotelSearchParams): Promise<ApiResponse<Hotel[]>> {
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
      
      if (params.filters?.rating) {
        queryParams.append('rating', params.filters.rating.toString());
      }
      
      if (params.guests) {
        queryParams.append('guests', params.guests.toString());
      }
      
      if (params.filters?.worldCupFeatures) {
        queryParams.append('featured', 'true');
      }

      // Make request to backend database
      const response = await this.request<Hotel[]>(`/api/hotels?${queryParams.toString()}`);
      
      if (response.success) {
        return response;
      }
    } catch (error) {
      console.warn('Database hotel search failed:', error);
    }

    // Return empty result if database fails
    return {
      success: false,
      data: [],
      status: 500,
      message: 'Failed to fetch hotels'
    };
  }

  /**
   * Get hotel details by ID
   */
  async getHotelDetails(hotelId: string): Promise<ApiResponse<Hotel>> {
    try {
      const response = await this.request<Hotel>(`/api/hotels/${hotelId}`);
      return response;
    } catch (error) {
      console.error('Get hotel details error:', error);
      return {
        success: false,
        data: null as any,
        status: 500,
        message: 'Failed to fetch hotel details'
      };
    }
  }

  /**
   * Create hotel booking
   */
  async createBooking(request: HotelBookingRequest): Promise<ApiResponse<HotelBookingConfirmation>> {
    try {
      const response = await this.request<HotelBookingConfirmation>('/api/hotels/bookings', {
        method: 'POST',
        body: JSON.stringify(request)
      });
      return response;
    } catch (error) {
      console.error('Create hotel booking error:', error);
      return {
        success: false,
        data: null as any,
        status: 500,
        message: 'Failed to create booking'
      };
    }
  }

}

export const hotelService = new HotelService();
export default hotelService;
