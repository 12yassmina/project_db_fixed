import { BaseApiService, ApiResponse } from './apiService';

// Location interface
export interface Location {
  city?: string;
  latitude?: number;
  longitude?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  images: string[];
  cuisine: string[];
  rating: number;
  reviewCount: number;
  priceLevel: number;
  contact: {
    phone?: string;
    website?: string;
    email?: string;
  };
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  features: {
    delivery: boolean;
    takeout: boolean;
    reservations: boolean;
    outdoor_seating: boolean;
    wifi: boolean;
    parking: boolean;
    wheelchair_accessible: boolean;
    halal: boolean;
    worldCupViewing: boolean;
  };
  worldCupFeatures: {
    stadiumDistance: number;
    matchViewing: boolean;
    worldCupMenu: boolean;
    groupBookings: boolean;
    fanZone: boolean;
  };
}

export interface RestaurantSearchParams {
  location: Location;
  cuisine?: string[];
  rating?: number;
  openNow?: boolean;
  sortBy?: 'rating' | 'distance' | 'price' | 'relevance';
  limit?: number;
}

export interface ReservationRequest {
  restaurantId: string;
  date: string;
  time: string;
  partySize: number;
  guestInfo: {
    name: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
}

export interface ReservationConfirmation {
  id: string;
  restaurant: Restaurant;
  date: string;
  time: string;
  partySize: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  confirmationNumber: string;
  guestInfo: any;
  specialInstructions?: string;
  cancellationPolicy: string;
}

export interface AvailableTimeSlot {
  time: string;
  available: boolean;
  partySize: number;
  type: 'standard' | 'bar' | 'outdoor' | 'private';
}

class RestaurantService extends BaseApiService {
  private yelpApiKey: string;
  private googleApiKey: string;

  constructor() {
    const backendUrl = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
    
    super(backendUrl, 'Restaurant Service', {
      'Content-Type': 'application/json'
    });

    this.yelpApiKey = 'backend-api';
    this.googleApiKey = 'backend-api';

    console.log('🍽️ Restaurant Service: Using backend API at', backendUrl);
  }

  async searchRestaurants(params: RestaurantSearchParams): Promise<ApiResponse<Restaurant[]>> {
    console.log('🍽️ Restaurant Service: Using backend API');
    
    try {
      const searchParams = new URLSearchParams({
        city: params.location.city || '',
        ...(params.cuisine && { cuisine: params.cuisine.join(',') }),
        ...(params.rating && { rating: params.rating.toString() })
      });

      const API_BASE = (import.meta.env.VITE_API_BASE as string) || 'http://localhost:5001/api';
      const response = await fetch(`${API_BASE}/restaurants?${searchParams}`);
      const result = await response.json();
      
      if (result.success && result.data) {
        return {
          success: true,
          data: result.data,
          status: 200
        };
      }
      
      throw new Error('Failed to fetch restaurants');
    } catch (error) {
      console.error('🍽️ Restaurant Service Error:', error);
      return { success: false, data: [], status: 500 };
    }
  }

  async getRestaurantDetails(restaurantId: string): Promise<ApiResponse<Restaurant>> {
    return { success: false, data: null, status: 404 };
  }

  async getRestaurantReviews(restaurantId: string): Promise<ApiResponse<any[]>> {
    return { success: false, data: [], status: 404 };
  }

  async getAvailableTimeSlots(
    restaurantId: string,
    date: string,
    partySize: number
  ): Promise<ApiResponse<AvailableTimeSlot[]>> {
    return { success: false, data: [], status: 404 };
  }

  async createReservation(reservationRequest: ReservationRequest): Promise<ApiResponse<ReservationConfirmation>> {
    return { success: false, data: null, status: 404 };
  }
}

// Create and export service instance
export const restaurantService = new RestaurantService();
export default restaurantService;
