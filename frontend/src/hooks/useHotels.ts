import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hotelService, HotelSearchParams, HotelBooking } from '@/lib/api/hotels';

// Query Keys
export const hotelKeys = {
  all: ['hotels'] as const,
  search: (params: HotelSearchParams) => [...hotelKeys.all, 'search', params] as const,
  detail: (id: string) => [...hotelKeys.all, 'detail', id] as const,
  amenities: () => [...hotelKeys.all, 'amenities'] as const,
};

// Search Hotels Hook
export const useHotelSearch = (params: HotelSearchParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: hotelKeys.search(params),
    queryFn: () => hotelService.searchHotels(params),
    enabled: enabled && !!params.city && !!params.checkIn && !!params.checkOut,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get Hotel Details Hook
export const useHotel = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: hotelKeys.detail(id),
    queryFn: () => hotelService.getHotelById(id),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get Available Amenities Hook
export const useHotelAmenities = () => {
  return useQuery({
    queryKey: hotelKeys.amenities(),
    queryFn: () => hotelService.getAvailableAmenities(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

// Hotel Booking Mutation
export const useHotelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (booking: HotelBooking) => hotelService.bookHotel(booking),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: hotelKeys.all });
    },
  });
};

// Hook for managing hotel search state
export const useHotelSearchState = () => {
  const [searchParams, setSearchParams] = React.useState<HotelSearchParams>({
    city: 'casablanca',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
    limit: 20,
    offset: 0,
    sortBy: 'rating',
  });

  const updateSearchParams = React.useCallback((updates: Partial<HotelSearchParams>) => {
    setSearchParams(prev => ({
      ...prev,
      ...updates,
      offset: updates.offset ?? 0, // Reset offset when other params change
    }));
  }, []);

  const resetSearch = React.useCallback(() => {
    setSearchParams({
      city: 'casablanca',
      checkIn: '',
      checkOut: '',
      guests: 2,
      rooms: 1,
      limit: 20,
      offset: 0,
      sortBy: 'rating',
    });
  }, []);

  // Calculate number of nights
  const nights = React.useMemo(() => {
    if (!searchParams.checkIn || !searchParams.checkOut) return 0;
    return hotelService.calculateNights(searchParams.checkIn, searchParams.checkOut);
  }, [searchParams.checkIn, searchParams.checkOut]);

  return {
    searchParams,
    updateSearchParams,
    resetSearch,
    nights,
  };
};

// Hook for date validation
export const useHotelDateValidation = (checkIn: string, checkOut: string) => {
  return React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    const errors: string[] = [];
    
    if (checkInDate < today) {
      errors.push('Check-in date cannot be in the past');
    }
    
    if (checkOutDate <= checkInDate) {
      errors.push('Check-out date must be after check-in date');
    }
    
    const maxAdvanceBooking = new Date();
    maxAdvanceBooking.setFullYear(maxAdvanceBooking.getFullYear() + 1);
    
    if (checkInDate > maxAdvanceBooking) {
      errors.push('Check-in date cannot be more than 1 year in advance');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }, [checkIn, checkOut]);
};
