import { API_CONFIG, ApiResponse, ApiError, getApiHeaders, MOROCCO_CITIES } from './config';

// Restaurant Types
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  priceLevel: 1 | 2 | 3 | 4; // $ to $$$$
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone?: string;
  website?: string;
  imageUrl?: string;
  openingHours?: string[];
  features: string[]; // e.g., ['outdoor_seating', 'wifi', 'parking']
  description?: string;
  isHalal?: boolean;
  acceptsReservations?: boolean;
  reservationUrl?: string;
}

export interface RestaurantSearchParams {
  city: string;
  cuisine?: string;
  priceLevel?: 1 | 2 | 3 | 4;
  rating?: number;
  radius?: number; // in meters
  limit?: number;
  offset?: number;
  sortBy?: 'rating' | 'distance' | 'review_count' | 'best_match';
  openNow?: boolean;
}

export interface RestaurantReservation {
  restaurantId: string;
  date: string;
  time: string;
  partySize: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
}

// Backend API Service
class BackendRestaurantService {
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

  async searchRestaurants(params: RestaurantSearchParams): Promise<Restaurant[]> {
    const backendParams = {
      city: params.city,
      cuisine: params.cuisine,
      priceLevel: params.priceLevel,
      rating: params.rating,
      radius: params.radius || 5000,
      limit: params.limit || 20,
      offset: params.offset || 0,
      sortBy: params.sortBy || 'best_match',
      openNow: params.openNow,
    };

    const response = await this.makeRequest<ApiResponse<Restaurant[]>>('/restaurants/search', backendParams);
    return response.data || [];
  }

  async getRestaurantDetails(restaurantId: string): Promise<Restaurant> {
    const response = await this.makeRequest<ApiResponse<Restaurant>>(`/restaurants/${restaurantId}`);
    return response.data;
  }

}

// Main Restaurant Service
export class RestaurantService {
  private backendService = new BackendRestaurantService();

  async searchRestaurants(params: RestaurantSearchParams): Promise<ApiResponse<Restaurant[]>> {
    try {
      const restaurants = await this.backendService.searchRestaurants(params);

      return {
        data: restaurants,
        status: 'success',
        pagination: {
          page: Math.floor((params.offset || 0) / (params.limit || 20)) + 1,
          limit: params.limit || 20,
          total: restaurants.length,
          hasMore: restaurants.length === (params.limit || 20),
        },
      };
    } catch (error) {
      console.error('Restaurant search failed:', error);
      throw error instanceof ApiError ? error : new ApiError('Restaurant search failed', 500);
    }
  }

  async getRestaurantById(id: string): Promise<ApiResponse<Restaurant>> {
    try {
      const restaurant = await this.backendService.getRestaurantDetails(id);
      return {
        data: restaurant,
        status: 'success',
      };
    } catch (error) {
      console.error('Failed to get restaurant details:', error);
      throw error instanceof ApiError ? error : new ApiError('Failed to get restaurant details', 500);
    }
  }

  async makeReservation(reservation: RestaurantReservation): Promise<ApiResponse<{ confirmationId: string }>> {
    try {
      const response = await fetch(`${API_CONFIG.BACKEND.BASE_URL}/restaurants/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
      });

      if (!response.ok) {
        throw new ApiError('Failed to make reservation', response.status);
      }

      return await response.json();
    } catch (error) {
      throw error instanceof ApiError ? error : new ApiError('Failed to make reservation', 500);
    }
  }

  async getPopularCuisines(): Promise<string[]> {
    try {
      const response = await fetch(`${API_CONFIG.BACKEND.BASE_URL}/restaurants/cuisines`);
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      // Fallback to static data
      return [
        'moroccan',
        'mediterranean',
        'french',
        'italian',
        'seafood',
        'middle_eastern',
        'international',
        'vegetarian',
        'halal',
      ];
    }
  }

  async getRestaurantCategories(): Promise<Array<{ id: string; name: string; description: string }>> {
    try {
      const response = await fetch(`${API_CONFIG.BACKEND.BASE_URL}/restaurants/categories`);
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      // Fallback to static data
      return [
        { id: 'moroccan', name: 'Moroccan', description: 'Traditional Moroccan cuisine' },
        { id: 'fine_dining', name: 'Fine Dining', description: 'Upscale dining experience' },
        { id: 'casual', name: 'Casual Dining', description: 'Relaxed atmosphere' },
        { id: 'street_food', name: 'Street Food', description: 'Local street food vendors' },
        { id: 'international', name: 'International', description: 'Global cuisines' },
        { id: 'halal', name: 'Halal', description: 'Halal certified restaurants' },
        { id: 'vegetarian', name: 'Vegetarian', description: 'Vegetarian-friendly options' },
        { id: 'seafood', name: 'Seafood', description: 'Fresh seafood specialties' },
      ];
    }
  }
}

// Export singleton instance
export const restaurantService = new RestaurantService();
