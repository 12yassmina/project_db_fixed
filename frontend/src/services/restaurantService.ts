import { ApiService, ApiResponse } from './apiService';

// Location interface
export interface Location {
  city?: string;
  latitude?: number;
  longitude?: number;
}

export interface Restaurant {
  _id?: string;
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  city: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  reviewCount: number;
  priceRange: string;
  averagePrice: number;
  currency: string;
  mainImage: string;
  images: { url: string; alt: string }[];
  menu: {
    category: string;
    items: {
      name: string;
      description: string;
      price: number;
      isVegetarian: boolean;
      isVegan: boolean;
      isGlutenFree: boolean;
      spiceLevel?: string;
    }[];
  }[];
  features: string[];
  openingHours: {
    monday: { open: string; close: string; closed: boolean };
    tuesday: { open: string; close: string; closed: boolean };
    wednesday: { open: string; close: string; closed: boolean };
    thursday: { open: string; close: string; closed: boolean };
    friday: { open: string; close: string; closed: boolean };
    saturday: { open: string; close: string; closed: boolean };
    sunday: { open: string; close: string; closed: boolean };
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  reservations: {
    required: boolean;
    online: boolean;
    phone: boolean;
  };
  worldCupFeatures: {
    matchScreening: boolean;
    fanMenu: boolean;
    groupBookings: boolean;
    multilingualMenu: boolean;
  };
  dietaryOptions: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    halal: boolean;
  };
  atmosphere: string[];
  featured: boolean;
  isOpen: boolean;
}

export interface RestaurantSearchParams {
  location: Location;
  filters?: {
    cuisine?: string[];
    priceRange?: string | { min: number; max: number };
    rating?: number;
    worldCupFeatures?: boolean;
  };
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

class RestaurantService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_BASE || 'http://localhost:5001');
    console.log('🍽️ Restaurant Service: Using database at', this.baseUrl);
  }

  /**
   * Search for restaurants using database
   */
  async searchRestaurants(params: RestaurantSearchParams): Promise<ApiResponse<Restaurant[]>> {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      
      if (params.location?.city) {
        queryParams.append('city', params.location.city);
      }
      
      if (params.filters?.cuisine && params.filters.cuisine.length > 0) {
        queryParams.append('cuisine', params.filters.cuisine.join(','));
      }
      
      if (params.filters?.priceRange) {
        if (typeof params.filters.priceRange === 'string') {
          queryParams.append('priceRange', params.filters.priceRange);
        } else {
          // Convert price range object to string representation
          const { min, max } = params.filters.priceRange;
          if (max <= 100) queryParams.append('priceRange', '$');
          else if (max <= 200) queryParams.append('priceRange', '$$');
          else if (max <= 400) queryParams.append('priceRange', '$$$');
          else queryParams.append('priceRange', '$$$$');
        }
      }
      
      if (params.filters?.rating) {
        queryParams.append('rating', params.filters.rating.toString());
      }
      
      if (params.filters?.worldCupFeatures) {
        queryParams.append('featured', 'true');
      }

      // Make request to backend database
      const response = await this.request<Restaurant[]>(`/api/restaurants?${queryParams.toString()}`);
      
      if (response.success) {
        return response;
      }
    } catch (error) {
      console.warn('Database restaurant search failed:', error);
    }

    // Return empty result if database fails
    return {
      success: false,
      data: [],
      status: 500,
      message: 'Failed to fetch restaurants'
    };
  }

  /**
   * Get restaurant details by ID
   */
  async getRestaurantDetails(restaurantId: string): Promise<ApiResponse<Restaurant>> {
    try {
      const response = await this.request<Restaurant>(`/api/restaurants/${restaurantId}`);
      return response;
    } catch (error) {
      console.error('Get restaurant details error:', error);
      return {
        success: false,
        data: null as any,
        status: 500,
        message: 'Failed to fetch restaurant details'
      };
    }
  }

  /**
   * Create restaurant reservation
   */
  async createReservation(reservationRequest: ReservationRequest): Promise<ApiResponse<ReservationConfirmation>> {
    try {
      const response = await this.request<ReservationConfirmation>('/api/restaurants/reservations', {
        method: 'POST',
        body: JSON.stringify(reservationRequest)
      });
      return response;
    } catch (error) {
      console.error('Create restaurant reservation error:', error);
      return {
        success: false,
        data: null as any,
        status: 500,
        message: 'Failed to create reservation'
      };
    }
  }
}

// Create and export service instance
export const restaurantService = new RestaurantService();
export default restaurantService;
