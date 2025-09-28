import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantService, RestaurantSearchParams, RestaurantReservation } from '@/lib/api/restaurants';

// Query Keys
export const restaurantKeys = {
  all: ['restaurants'] as const,
  search: (params: RestaurantSearchParams) => [...restaurantKeys.all, 'search', params] as const,
  detail: (id: string) => [...restaurantKeys.all, 'detail', id] as const,
  categories: () => [...restaurantKeys.all, 'categories'] as const,
  cuisines: () => [...restaurantKeys.all, 'cuisines'] as const,
};

// Search Restaurants Hook
export const useRestaurantSearch = (params: RestaurantSearchParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: restaurantKeys.search(params),
    queryFn: () => restaurantService.searchRestaurants(params),
    enabled: enabled && !!params.city,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get Restaurant Details Hook
export const useRestaurant = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: restaurantKeys.detail(id),
    queryFn: () => restaurantService.getRestaurantById(id),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get Restaurant Categories Hook
export const useRestaurantCategories = () => {
  return useQuery({
    queryKey: restaurantKeys.categories(),
    queryFn: () => restaurantService.getRestaurantCategories(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

// Get Popular Cuisines Hook
export const usePopularCuisines = () => {
  return useQuery({
    queryKey: restaurantKeys.cuisines(),
    queryFn: () => restaurantService.getPopularCuisines(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

// Make Reservation Mutation
export const useRestaurantReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservation: RestaurantReservation) => 
      restaurantService.makeReservation(reservation),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: restaurantKeys.all });
    },
  });
};

// Custom hook for restaurant search with debouncing
export const useDebouncedRestaurantSearch = (
  params: RestaurantSearchParams,
  delay: number = 500
) => {
  const [debouncedParams, setDebouncedParams] = React.useState(params);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedParams(params);
    }, delay);

    return () => clearTimeout(timer);
  }, [params, delay]);

  return useRestaurantSearch(debouncedParams);
};

// Hook for managing restaurant search state
export const useRestaurantSearchState = () => {
  const [searchParams, setSearchParams] = React.useState<RestaurantSearchParams>({
    city: 'casablanca',
    limit: 20,
    offset: 0,
    sortBy: 'rating',
  });

  const updateSearchParams = React.useCallback((updates: Partial<RestaurantSearchParams>) => {
    setSearchParams(prev => ({
      ...prev,
      ...updates,
      offset: updates.offset ?? 0, // Reset offset when other params change
    }));
  }, []);

  const resetSearch = React.useCallback(() => {
    setSearchParams({
      city: 'casablanca',
      limit: 20,
      offset: 0,
      sortBy: 'rating',
    });
  }, []);

  return {
    searchParams,
    updateSearchParams,
    resetSearch,
  };
};
