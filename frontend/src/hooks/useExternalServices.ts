import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hotelService, Hotel, HotelSearchParams, HotelBookingRequest, RoomType } from '@/services/hotelService';
import { rentalService, Rental, RentalSearchParams, RentalBookingRequest } from '@/services/rentalService';
import { restaurantService, Restaurant, RestaurantSearchParams, ReservationRequest, AvailableTimeSlot } from '@/services/restaurantService';
import { ApiResponse } from '@/services/apiService';

/**
 * React Query hooks for external services
 */

// Hotel Service Hooks

export const useHotelSearch = (params: HotelSearchParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['hotels', params],
    queryFn: async () => {
      console.log('🏨 Direct API call with params:', params);
      
      // Direct API call to backend
      const API_BASE = (import.meta.env.VITE_API_BASE as string) || 'http://localhost:5001/api';
      const searchParams = new URLSearchParams({
        city: params.location.city || '',
        checkIn: params.dateRange.checkIn,
        checkOut: params.dateRange.checkOut,
        guests: params.guests.toString(),
        ...(params.filters?.priceRange?.min && { minPrice: params.filters.priceRange.min.toString() }),
        ...(params.filters?.priceRange?.max && { maxPrice: params.filters.priceRange.max.toString() }),
        ...(params.filters?.rating && { rating: params.filters.rating.toString() })
      });

      const response = await fetch(`${API_BASE}/hotels?${searchParams}`);
      const result = await response.json();
      
      console.log('🏨 Direct API result:', result);
      
      if (result.success && result.data) {
        return {
          success: true,
          data: result.data,
          status: 200
        };
      }
      
      throw new Error('Failed to fetch hotels');
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    select: (data: { success: boolean; data: any[] }) => (data?.success ? data.data : [])
  });
};

export const useHotelDetails = (hotelId: string, enabled: boolean = true) => {
  return useQuery<ApiResponse<Hotel>, Error, Hotel | null>({
    queryKey: ['hotels', 'details', hotelId],
    queryFn: () => hotelService.getHotelDetails(hotelId),
    enabled: enabled && !!hotelId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    select: (data) => data.success ? data.data : null
  });
};

export const useHotelAvailability = (
  hotelId: string, 
  dateRange: { checkIn: string; checkOut: string }, 
  guests: number,
  enabled: boolean = true
) => {
  return useQuery<ApiResponse<RoomType[]>, Error, RoomType[]>({
    queryKey: ['hotels', 'availability', hotelId, dateRange, guests],
    queryFn: () => hotelService.getHotelAvailability(hotelId, dateRange, guests),
    enabled: enabled && !!hotelId && !!dateRange.checkIn && !!dateRange.checkOut,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    select: (data) => data.success ? data.data : []
  });
};

export const useHotelBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (bookingRequest: HotelBookingRequest) => 
      hotelService.createBooking(bookingRequest),
    onSuccess: (data) => {
      if (data.success) {
        // Invalidate hotel queries to refresh availability
        queryClient.invalidateQueries({ queryKey: ['hotels'] });
      }
    },
    onError: (error) => {
      console.error('Hotel booking failed:', error);
    }
  });
};

// Rental Service Hooks

export const useRentalSearch = (params: RentalSearchParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['rentals', 'search', params],
    queryFn: async () => {
      console.log('🏠 Direct API call with params:', params);
      
      // Direct API call to backend
      const API_BASE = (import.meta.env.VITE_API_BASE as string) || 'http://localhost:5001/api';
      const searchParams = new URLSearchParams({
        city: params.location.city || '',
        ...(params.minPrice && { minPrice: params.minPrice.toString() }),
        ...(params.maxPrice && { maxPrice: params.maxPrice.toString() }),
        ...(params.guests && { guests: params.guests.toString() }),
        ...(params.propertyType && { propertyType: params.propertyType })
      });

      const response = await fetch(`${API_BASE}/rentals?${searchParams}`);
      const result = await response.json();
      
      console.log('🏠 Direct API result:', result);
      
      if (result.success && result.data) {
        return {
          success: true,
          data: result.data,
          status: 200
        };
      }
      
      throw new Error('Failed to fetch rentals');
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    select: (data: { success: boolean; data: any[] }) => (data?.success ? data.data : [])
  });
};

export const useRentalDetails = (rentalId: string, enabled: boolean = true) => {
  return useQuery<ApiResponse<Rental>, Error, Rental | null>({
    queryKey: ['rentals', 'details', rentalId],
    queryFn: () => rentalService.getRentalDetails(rentalId),
    enabled: enabled && !!rentalId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    select: (data) => data.success ? data.data : null
  });
};

export const useRentalAvailability = (
  rentalId: string,
  dateRange: { checkIn: string; checkOut: string },
  enabled: boolean = true
) => {
  return useQuery<ApiResponse<{ available: boolean; pricing: any }>, Error, { available: boolean; pricing: any } | null>({
    queryKey: ['rentals', 'availability', rentalId, dateRange],
    queryFn: () => rentalService.checkAvailability(rentalId, dateRange),
    enabled: enabled && !!rentalId && !!dateRange.checkIn && !!dateRange.checkOut,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    select: (data) => data.success ? data.data : null
  });
};

export const useRentalBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (bookingRequest: RentalBookingRequest) => 
      rentalService.createBooking(bookingRequest),
    onSuccess: (data) => {
      if (data.success) {
        // Invalidate rental queries to refresh availability
        queryClient.invalidateQueries({ queryKey: ['rentals'] });
      }
    },
    onError: (error) => {
      console.error('Rental booking failed:', error);
    }
  });
};

// Restaurant Service Hooks

export const useRestaurantSearch = (params: RestaurantSearchParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['restaurants', params],
    queryFn: async () => {
      console.log('🍽️ Direct API call with params:', params);
      
      // Direct API call to backend
      const API_BASE = (import.meta.env.VITE_API_BASE as string) || 'http://localhost:5001/api';
      const searchParams = new URLSearchParams({
        city: params.location.city || '',
        ...(params.cuisine && { cuisine: params.cuisine.join(',') }),
        ...(params.rating && { rating: params.rating.toString() })
      });

      const response = await fetch(`${API_BASE}/restaurants?${searchParams}`);
      const result = await response.json();
      
      console.log('🍽️ Direct API result:', result);
      
      if (result.success && result.data) {
        return {
          success: true,
          data: result.data,
          status: 200
        };
      }
      
      throw new Error('Failed to fetch restaurants');
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    select: (data: { success: boolean; data: any[] }) => (data?.success ? data.data : [])
  });
};

export const useRestaurantDetails = (restaurantId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['restaurants', 'details', restaurantId],
    queryFn: () => restaurantService.getRestaurantDetails(restaurantId),
    enabled: enabled && !!restaurantId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    select: (data) => data.success ? data.data : null
  });
};

export const useRestaurantReviews = (restaurantId: string, enabled: boolean = true) => {
  return useQuery<ApiResponse<any[]>, Error, any[]>({
    queryKey: ['restaurants', 'reviews', restaurantId],
    queryFn: () => restaurantService.getRestaurantReviews(restaurantId),
    enabled: enabled && !!restaurantId,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
    select: (data) => data.success ? data.data : []
  });
};

export const useRestaurantAvailability = (
  restaurantId: string,
  date: string,
  partySize: number,
  enabled: boolean = true
) => {
  return useQuery<ApiResponse<AvailableTimeSlot[]>, Error, AvailableTimeSlot[]>({
    queryKey: ['restaurants', 'availability', restaurantId, date, partySize],
    queryFn: () => restaurantService.getAvailableTimeSlots(restaurantId, date, partySize),
    enabled: enabled && !!restaurantId && !!date && partySize > 0,
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
    select: (data) => data.success ? data.data : []
  });
};

export const useRestaurantReservation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (reservationRequest: ReservationRequest) => 
      restaurantService.createReservation(reservationRequest),
    onSuccess: (data) => {
      if (data.success) {
        // Invalidate restaurant queries to refresh availability
        queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      }
    },
    onError: (error) => {
      console.error('Restaurant reservation failed:', error);
    }
  });
};

// Specialized search hooks

export const useHalalRestaurants = (location: { latitude: number; longitude: number }, enabled: boolean = true) => {
  // Placeholder: backend currently returns all restaurants; implement filter client-side if needed
  return useQuery<ApiResponse<Restaurant[]>, Error, Restaurant[]>({
    queryKey: ['restaurants', 'halal', location],
    queryFn: async () => ({ success: true, data: [], status: 200 } as any),
    enabled: false,
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
    retry: 0,
    select: () => []
  });
};

export const useRestaurantsByCuisine = (
  location: { latitude: number; longitude: number },
  cuisine: string,
  enabled: boolean = true
) => {
  // Placeholder: not implemented on backend yet
  return useQuery<ApiResponse<Restaurant[]>, Error, Restaurant[]>({
    queryKey: ['restaurants', 'cuisine', location, cuisine],
    queryFn: async () => ({ success: true, data: [], status: 200 } as any),
    enabled: false,
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
    retry: 0,
    select: () => []
  });
};

// Combined search hook for all services

export const useAllAccommodations = (
  location: { latitude: number; longitude: number; city?: string },
  dateRange: { checkIn: string; checkOut: string },
  guests: number,
  enabled: boolean = true
) => {
  const hotelParams: HotelSearchParams = {
    location,
    dateRange,
    guests,
    limit: 10
  };

  const rentalParams: RentalSearchParams = {
    location,
    dateRange,
    guests,
    limit: 10
  };

  const hotels = useHotelSearch(hotelParams, enabled);
  const rentals = useRentalSearch(rentalParams, enabled);

  return {
    hotels: {
      data: Array.isArray(hotels.data) ? hotels.data : [],
      isLoading: hotels.isLoading,
      error: hotels.error,
      isError: hotels.isError
    },
    rentals: {
      data: Array.isArray(rentals.data) ? rentals.data : [],
      isLoading: rentals.isLoading,
      error: rentals.error,
      isError: rentals.isError
    },
    isLoading: hotels.isLoading || rentals.isLoading,
    hasData: ((Array.isArray(hotels.data) ? hotels.data.length : 0) > 0) || ((Array.isArray(rentals.data) ? rentals.data.length : 0) > 0)
  };
};

// Utility hooks for common operations

export const useLocationSearch = () => {
  return {
    searchNearStadium: (stadiumName: string) => {
      // Morocco World Cup 2030 stadiums
      const stadiumCoordinates: Record<string, { latitude: number; longitude: number; city: string }> = {
        'casablanca': { latitude: 33.5731, longitude: -7.5898, city: 'Casablanca' },
        'rabat': { latitude: 34.0209, longitude: -6.8416, city: 'Rabat' },
        'marrakech': { latitude: 31.6295, longitude: -7.9811, city: 'Marrakech' },
        'tangier': { latitude: 35.7595, longitude: -5.8340, city: 'Tangier' },
        'agadir': { latitude: 30.4278, longitude: -9.5981, city: 'Agadir' },
        'fez': { latitude: 34.0181, longitude: -5.0078, city: 'Fez' }
      };

      return stadiumCoordinates[stadiumName.toLowerCase()] || stadiumCoordinates['casablanca'];
    }
  };
};

export default {
  // Hotel hooks
  useHotelSearch,
  useHotelDetails,
  useHotelAvailability,
  useHotelBooking,
  
  // Rental hooks
  useRentalSearch,
  useRentalDetails,
  useRentalAvailability,
  useRentalBooking,
  
  // Restaurant hooks
  useRestaurantSearch,
  useRestaurantDetails,
  useRestaurantReviews,
  useRestaurantAvailability,
  useRestaurantReservation,
  
  // Specialized hooks
  useHalalRestaurants,
  useRestaurantsByCuisine,
  useAllAccommodations,
  useLocationSearch
};
