import { API_CONFIG, ApiResponse, ApiError, getApiHeaders, MOROCCO_CITIES } from './config';

// Hotel Types
export interface Hotel {
  id: string;
  name: string;
  starRating: 1 | 2 | 3 | 4 | 5;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  amenities: string[];
  roomTypes: RoomType[];
  description?: string;
  phone?: string;
  website?: string;
  checkInTime: string;
  checkOutTime: string;
  policies: {
    cancellation: string;
    petPolicy: string;
    childPolicy: string;
  };
  distanceToStadium?: number; // in km
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface RoomType {
  id: string;
  name: string;
  description: string;
  maxOccupancy: number;
  bedType: string;
  size: number; // in sqm
  amenities: string[];
  images: string[];
  pricePerNight: number;
  availability: boolean;
  totalPrice?: number;
}

export interface HotelSearchParams {
  city: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  guests: number;
  rooms: number;
  starRating?: number[];
  priceRange?: {
    min: number;
    max: number;
  };
  amenities?: string[];
  sortBy?: 'price' | 'rating' | 'distance' | 'popularity';
  limit?: number;
  offset?: number;
}

export interface HotelBooking {
  hotelId: string;
  roomTypeId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    specialRequests?: string;
  };
  paymentInfo?: {
    cardType: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    billingAddress: any;
  };
}

// Legacy services removed - now using backend API

// Mock Hotel Data for Development
const mockHotels: Hotel[] = [
  {
    id: 'hotel-1',
    name: 'Riad Fes Maya Suite & Spa',
    starRating: 5,
    rating: 4.8,
    reviewCount: 1250,
    address: 'Derb Arset Bennis, Bab Boujloud, Fes 30000',
    city: 'casablanca',
    coordinates: { lat: 33.5731, lng: -7.5898 },
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    ],
    amenities: ['WiFi', 'Spa', 'Pool', 'Restaurant', 'Parking', 'Air Conditioning'],
    roomTypes: [
      {
        id: 'room-1',
        name: 'Deluxe Suite',
        description: 'Spacious suite with traditional Moroccan decor',
        maxOccupancy: 4,
        bedType: 'King + Sofa Bed',
        size: 45,
        amenities: ['Balcony', 'Minibar', 'Safe'],
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'],
        pricePerNight: 180,
        availability: true,
      },
    ],
    checkInTime: '15:00',
    checkOutTime: '11:00',
    policies: {
      cancellation: 'Free cancellation up to 48 hours before check-in',
      petPolicy: 'Pets allowed with additional fee',
      childPolicy: 'Children under 12 stay free',
    },
    distanceToStadium: 2.5,
    priceRange: { min: 120, max: 300, currency: 'USD' },
  },
  // Add more mock hotels...
];

// Backend Hotel Service
class BackendHotelService {
  private async makeRequest<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${API_CONFIG.BACKEND.BASE_URL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    try {
      const response = await fetch(url.toString(), {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new ApiError(
          `Backend API error: ${response.statusText}`,
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to fetch from backend API', 500);
    }
  }

  async searchHotels(params: HotelSearchParams): Promise<Hotel[]> {
    const response = await this.makeRequest<ApiResponse<Hotel[]>>('/hotels/search', params);
    return response.data || [];
  }

  async getHotelDetails(hotelId: string): Promise<Hotel> {
    const response = await this.makeRequest<ApiResponse<Hotel>>(`/hotels/${hotelId}`);
    return response.data;
  }
}

// Main Hotel Service
export class HotelService {
  private backendService = new BackendHotelService();

  async searchHotels(params: HotelSearchParams): Promise<ApiResponse<Hotel[]>> {
    try {
      const hotels = await this.backendService.searchHotels(params);

      return {
        data: hotels,
        status: 'success',
        pagination: {
          page: Math.floor((params.offset || 0) / (params.limit || 20)) + 1,
          limit: params.limit || 20,
          total: hotels.length,
          hasMore: hotels.length === (params.limit || 20),
        },
      };
    } catch (error) {
      console.error('Hotel search failed:', error);
      throw error instanceof ApiError ? error : new ApiError('Hotel search failed', 500);
    }
  }

  async getHotelById(id: string): Promise<ApiResponse<Hotel>> {
    try {
      const hotel = await this.backendService.getHotelDetails(id);
      return {
        data: hotel,
        status: 'success',
      };
    } catch (error) {
      console.error('Failed to get hotel details:', error);
      throw error instanceof ApiError ? error : new ApiError('Failed to get hotel details', 500);
    }
  }

  async bookHotel(booking: HotelBooking): Promise<ApiResponse<{ confirmationId: string; totalPrice: number }>> {
    try {
      const response = await fetch(`${API_CONFIG.BACKEND.BASE_URL}/hotels/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        throw new ApiError('Failed to book hotel', response.status);
      }

      return await response.json();
    } catch (error) {
      throw error instanceof ApiError ? error : new ApiError('Failed to book hotel', 500);
    }
  }

  // Helper methods removed - now handled by backend

  // Get available amenities for filtering
  async getAvailableAmenities(): Promise<string[]> {
    try {
      const response = await fetch(`${API_CONFIG.BACKEND.BASE_URL}/hotels/amenities`);
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      // Fallback to static data
      return [
        'WiFi',
        'Pool',
        'Spa',
        'Gym',
        'Restaurant',
        'Bar',
        'Parking',
        'Air Conditioning',
        'Room Service',
        'Concierge',
        'Business Center',
        'Pet Friendly',
        'Wheelchair Accessible',
        'Airport Shuttle',
      ];
    }
  }

  // Calculate nights between dates
  calculateNights(checkIn: string, checkOut: string): number {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}

// Export singleton instance
export const hotelService = new HotelService();
