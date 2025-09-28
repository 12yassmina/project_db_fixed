import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { carRentalService, CarRentalSearchParams, CarRentalBooking } from '@/lib/api/rentals';

// Query Keys
export const carRentalKeys = {
  all: ['carRentals'] as const,
  search: (params: CarRentalSearchParams) => [...carRentalKeys.all, 'search', params] as const,
  detail: (id: string) => [...carRentalKeys.all, 'detail', id] as const,
  locations: (city: string) => [...carRentalKeys.all, 'locations', city] as const,
  categories: () => [...carRentalKeys.all, 'categories'] as const,
  features: () => [...carRentalKeys.all, 'features'] as const,
  fuelTypes: () => [...carRentalKeys.all, 'fuelTypes'] as const,
  insurance: () => [...carRentalKeys.all, 'insurance'] as const,
};

// Search Cars Hook
export const useCarRentalSearch = (params: CarRentalSearchParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: carRentalKeys.search(params),
    queryFn: () => carRentalService.searchCars(params),
    enabled: enabled && !!params.pickupCity && !!params.pickupDate && !!params.dropoffDate,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get Car Details Hook
export const useCarRental = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: carRentalKeys.detail(id),
    queryFn: () => carRentalService.getCarById(id),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get Rental Locations Hook
export const useRentalLocations = (city: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: carRentalKeys.locations(city),
    queryFn: () => carRentalService.getRentalLocations(city),
    enabled: enabled && !!city,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Get Car Categories Hook
export const useCarCategories = () => {
  return useQuery({
    queryKey: carRentalKeys.categories(),
    queryFn: () => carRentalService.getCarCategories(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

// Get Available Features Hook
export const useCarFeatures = () => {
  return useQuery({
    queryKey: carRentalKeys.features(),
    queryFn: () => carRentalService.getAvailableFeatures(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

// Get Fuel Types Hook
export const useCarFuelTypes = () => {
  return useQuery({
    queryKey: carRentalKeys.fuelTypes(),
    queryFn: () => carRentalService.getFuelTypes(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

// Get Insurance Options Hook
export const useInsuranceOptions = () => {
  return useQuery({
    queryKey: carRentalKeys.insurance(),
    queryFn: () => carRentalService.getInsuranceOptions(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

// Car Rental Booking Mutation
export const useCarRentalBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (booking: CarRentalBooking) => carRentalService.bookCar(booking),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: carRentalKeys.all });
    },
  });
};

// Hook for managing car rental search state
export const useCarRentalSearchState = () => {
  const [searchParams, setSearchParams] = React.useState<CarRentalSearchParams>({
    pickupCity: 'casablanca',
    pickupDate: '',
    dropoffDate: '',
    pickupTime: '10:00',
    dropoffTime: '10:00',
    driverAge: 25,
    limit: 20,
    offset: 0,
    sortBy: 'price',
  });

  const updateSearchParams = React.useCallback((updates: Partial<CarRentalSearchParams>) => {
    setSearchParams(prev => ({
      ...prev,
      ...updates,
      offset: updates.offset ?? 0, // Reset offset when other params change
    }));
  }, []);

  const resetSearch = React.useCallback(() => {
    setSearchParams({
      pickupCity: 'casablanca',
      pickupDate: '',
      dropoffDate: '',
      pickupTime: '10:00',
      dropoffTime: '10:00',
      driverAge: 25,
      limit: 20,
      offset: 0,
      sortBy: 'price',
    });
  }, []);

  // Calculate rental days
  const rentalDays = React.useMemo(() => {
    if (!searchParams.pickupDate || !searchParams.dropoffDate) return 0;
    const pickup = new Date(searchParams.pickupDate);
    const dropoff = new Date(searchParams.dropoffDate);
    const diffTime = Math.abs(dropoff.getTime() - pickup.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [searchParams.pickupDate, searchParams.dropoffDate]);

  return {
    searchParams,
    updateSearchParams,
    resetSearch,
    rentalDays,
  };
};

// Hook for rental price calculation
export const useRentalPriceCalculation = (
  carId: string,
  startDate: string,
  endDate: string,
  insurance: string[] = []
) => {
  return useQuery({
    queryKey: ['rentalPrice', carId, startDate, endDate, insurance],
    queryFn: () => carRentalService.calculateRentalPrice(carId, startDate, endDate, insurance),
    enabled: !!carId && !!startDate && !!endDate,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for date validation
export const useRentalDateValidation = (pickupDate: string, dropoffDate: string, driverAge: number) => {
  return React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);
    
    const errors: string[] = [];
    
    if (pickup < today) {
      errors.push('Pickup date cannot be in the past');
    }
    
    if (dropoff <= pickup) {
      errors.push('Drop-off date must be after pickup date');
    }
    
    if (driverAge < 18) {
      errors.push('Driver must be at least 18 years old');
    }
    
    const maxAdvanceBooking = new Date();
    maxAdvanceBooking.setFullYear(maxAdvanceBooking.getFullYear() + 1);
    
    if (pickup > maxAdvanceBooking) {
      errors.push('Pickup date cannot be more than 1 year in advance');
    }
    
    // Maximum rental period (e.g., 30 days)
    const maxRentalDays = 30;
    const rentalDays = Math.ceil((dropoff.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));
    
    if (rentalDays > maxRentalDays) {
      errors.push(`Rental period cannot exceed ${maxRentalDays} days`);
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      rentalDays,
    };
  }, [pickupDate, dropoffDate, driverAge]);
};

// Hook for age-based restrictions
export const useAgeRestrictions = (driverAge: number) => {
  return React.useMemo(() => {
    const restrictions = {
      canRentEconomy: driverAge >= 21,
      canRentLuxury: driverAge >= 25,
      canRentSUV: driverAge >= 23,
      youngDriverFee: driverAge < 25 ? 15 : 0, // $15 per day for drivers under 25
      seniorDriverDiscount: driverAge >= 65 ? 0.1 : 0, // 10% discount for seniors
    };

    const availableCategories = [];
    if (restrictions.canRentEconomy) availableCategories.push('economy', 'compact');
    if (restrictions.canRentSUV) availableCategories.push('midsize', 'fullsize', 'suv');
    if (restrictions.canRentLuxury) availableCategories.push('luxury');

    return {
      ...restrictions,
      availableCategories,
    };
  }, [driverAge]);
};
