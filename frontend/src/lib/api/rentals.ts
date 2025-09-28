import { API_CONFIG, ApiResponse, ApiError, MOROCCO_CITIES } from './config';

// Car Rental Types
export interface CarRental {
  id: string;
  brand: string;
  model: string;
  category: 'economy' | 'compact' | 'midsize' | 'fullsize' | 'luxury' | 'suv' | 'van';
  transmission: 'manual' | 'automatic';
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  seats: number;
  doors: number;
  airConditioning: boolean;
  images: string[];
  features: string[];
  pricePerDay: number;
  currency: string;
  availability: boolean;
  pickupLocations: RentalLocation[];
  dropoffLocations: RentalLocation[];
  insurance: InsuranceOption[];
  mileage: 'unlimited' | number;
  minAge: number;
  description?: string;
  rating?: number;
  reviewCount?: number;
}

export interface RentalLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: {
    [key: string]: string; // day: hours
  };
  phone?: string;
  isAirport: boolean;
  isHotel: boolean;
}

export interface InsuranceOption {
  id: string;
  name: string;
  description: string;
  coverage: string[];
  pricePerDay: number;
  deductible: number;
}

export interface CarRentalSearchParams {
  pickupCity: string;
  dropoffCity?: string;
  pickupDate: string; // YYYY-MM-DD
  dropoffDate: string; // YYYY-MM-DD
  pickupTime: string; // HH:MM
  dropoffTime: string; // HH:MM
  pickupLocationId?: string;
  dropoffLocationId?: string;
  driverAge: number;
  category?: string[];
  transmission?: 'manual' | 'automatic';
  fuelType?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  features?: string[];
  sortBy?: 'price' | 'rating' | 'brand' | 'category';
  limit?: number;
  offset?: number;
}

export interface CarRentalBooking {
  carId: string;
  pickupLocationId: string;
  dropoffLocationId: string;
  pickupDate: string;
  dropoffDate: string;
  pickupTime: string;
  dropoffTime: string;
  driverInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    licenseNumber: string;
    licenseCountry: string;
    licenseExpiry: string;
  };
  additionalDrivers?: Array<{
    firstName: string;
    lastName: string;
    licenseNumber: string;
    licenseCountry: string;
  }>;
  insurance: string[]; // insurance option IDs
  extras?: string[]; // GPS, child seat, etc.
  paymentInfo?: {
    cardType: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    billingAddress: any;
  };
}

// Mock Car Rental Data
const mockRentalLocations: RentalLocation[] = [
  {
    id: 'casa-airport',
    name: 'Mohammed V International Airport',
    address: 'Mohammed V International Airport, Casablanca',
    city: 'casablanca',
    coordinates: { lat: 33.3675, lng: -7.5898 },
    openingHours: {
      monday: '06:00 - 23:00',
      tuesday: '06:00 - 23:00',
      wednesday: '06:00 - 23:00',
      thursday: '06:00 - 23:00',
      friday: '06:00 - 23:00',
      saturday: '06:00 - 23:00',
      sunday: '06:00 - 23:00',
    },
    phone: '+212 522 53 90 40',
    isAirport: true,
    isHotel: false,
  },
  {
    id: 'casa-downtown',
    name: 'Casablanca City Center',
    address: 'Boulevard Hassan II, Casablanca',
    city: 'casablanca',
    coordinates: { lat: 33.5731, lng: -7.5898 },
    openingHours: {
      monday: '08:00 - 18:00',
      tuesday: '08:00 - 18:00',
      wednesday: '08:00 - 18:00',
      thursday: '08:00 - 18:00',
      friday: '08:00 - 18:00',
      saturday: '08:00 - 16:00',
      sunday: 'Closed',
    },
    phone: '+212 522 22 15 60',
    isAirport: false,
    isHotel: false,
  },
  // Add more locations for other cities...
];

const mockInsuranceOptions: InsuranceOption[] = [
  {
    id: 'basic',
    name: 'Basic Protection',
    description: 'Third party liability coverage',
    coverage: ['Third party liability', 'Fire and theft'],
    pricePerDay: 15,
    deductible: 1000,
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive Protection',
    description: 'Full coverage with reduced deductible',
    coverage: ['Third party liability', 'Collision damage', 'Fire and theft', 'Personal accident'],
    pricePerDay: 25,
    deductible: 500,
  },
  {
    id: 'premium',
    name: 'Premium Protection',
    description: 'Zero deductible full coverage',
    coverage: ['Third party liability', 'Collision damage', 'Fire and theft', 'Personal accident', 'Roadside assistance'],
    pricePerDay: 35,
    deductible: 0,
  },
];

const mockCars: CarRental[] = [
  {
    id: 'car-1',
    brand: 'Renault',
    model: 'Clio',
    category: 'economy',
    transmission: 'manual',
    fuelType: 'petrol',
    seats: 5,
    doors: 5,
    airConditioning: true,
    images: [
      'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800',
    ],
    features: ['Air Conditioning', 'Radio', 'Power Steering'],
    pricePerDay: 25,
    currency: 'USD',
    availability: true,
    pickupLocations: mockRentalLocations,
    dropoffLocations: mockRentalLocations,
    insurance: mockInsuranceOptions,
    mileage: 'unlimited',
    minAge: 21,
    description: 'Perfect for city driving and short trips',
    rating: 4.2,
    reviewCount: 156,
  },
  {
    id: 'car-2',
    brand: 'Toyota',
    model: 'Corolla',
    category: 'compact',
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 5,
    doors: 4,
    airConditioning: true,
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    ],
    features: ['Air Conditioning', 'Bluetooth', 'Power Windows', 'ABS'],
    pricePerDay: 35,
    currency: 'USD',
    availability: true,
    pickupLocations: mockRentalLocations,
    dropoffLocations: mockRentalLocations,
    insurance: mockInsuranceOptions,
    mileage: 'unlimited',
    minAge: 23,
    description: 'Reliable and comfortable for longer journeys',
    rating: 4.5,
    reviewCount: 203,
  },
  {
    id: 'car-3',
    brand: 'BMW',
    model: 'X3',
    category: 'luxury',
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    doors: 5,
    airConditioning: true,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    ],
    features: ['Leather Seats', 'GPS Navigation', 'Sunroof', 'Premium Audio', 'Heated Seats'],
    pricePerDay: 85,
    currency: 'USD',
    availability: true,
    pickupLocations: mockRentalLocations,
    dropoffLocations: mockRentalLocations,
    insurance: mockInsuranceOptions,
    mileage: 'unlimited',
    minAge: 25,
    description: 'Luxury SUV perfect for exploring Morocco in style',
    rating: 4.8,
    reviewCount: 89,
  },
];

// Backend Car Rental Service
class BackendCarRentalService {
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

  async searchCars(params: CarRentalSearchParams): Promise<CarRental[]> {
    const response = await this.makeRequest<ApiResponse<CarRental[]>>('/car-rentals/search', params);
    return response.data || [];
  }

  async getCarDetails(carId: string): Promise<CarRental> {
    const response = await this.makeRequest<ApiResponse<CarRental>>(`/car-rentals/${carId}`);
    return response.data;
  }
}

// Car Rental Service
export class CarRentalService {
  private backendService = new BackendCarRentalService();

  async searchCars(params: CarRentalSearchParams): Promise<ApiResponse<CarRental[]>> {
    try {
      const cars = await this.backendService.searchCars(params);

      return {
        data: cars,
        status: 'success',
        pagination: {
          page: Math.floor((params.offset || 0) / (params.limit || 20)) + 1,
          limit: params.limit || 20,
          total: cars.length,
          hasMore: cars.length === (params.limit || 20),
        },
      };
    } catch (error) {
      console.error('Car rental search failed:', error);
      throw new ApiError('Car rental search failed', 500);
    }
  }

  async getCarById(id: string): Promise<ApiResponse<CarRental>> {
    try {
      const car = await this.backendService.getCarDetails(id);
      return {
        data: car,
        status: 'success',
      };
    } catch (error) {
      console.error('Failed to get car details:', error);
      throw error instanceof ApiError ? error : new ApiError('Failed to get car details', 500);
    }
  }

  async getRentalLocations(city: string): Promise<ApiResponse<RentalLocation[]>> {
    try {
      const response = await fetch(`${API_CONFIG.BACKEND.BASE_URL}/car-rentals/locations/${city}`);
      const result = await response.json();
      return result;
    } catch (error) {
      throw new ApiError('Failed to get rental locations', 500);
    }
  }

  async bookCar(booking: CarRentalBooking): Promise<ApiResponse<{ confirmationId: string; totalPrice: number }>> {
    try {
      const response = await fetch(`${API_CONFIG.BACKEND.BASE_URL}/car-rentals/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        throw new ApiError('Failed to book car rental', response.status);
      }

      return await response.json();
    } catch (error) {
      throw error instanceof ApiError ? error : new ApiError('Failed to book car rental', 500);
    }
  }

  // Helper methods removed - now handled by backend

  // Get available car categories
  async getCarCategories(): Promise<Array<{ id: string; name: string; description: string }>> {
    try {
      const response = await fetch(`${API_CONFIG.BACKEND.BASE_URL}/car-rentals/categories`);
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      // Fallback to static data
      return [
        { id: 'economy', name: 'Economy', description: 'Budget-friendly, fuel efficient' },
        { id: 'compact', name: 'Compact', description: 'Small to medium cars, good for city driving' },
        { id: 'midsize', name: 'Midsize', description: 'Comfortable for longer trips' },
        { id: 'fullsize', name: 'Full Size', description: 'Spacious and comfortable' },
        { id: 'luxury', name: 'Luxury', description: 'Premium vehicles with high-end features' },
        { id: 'suv', name: 'SUV', description: 'Sport utility vehicles, great for families' },
        { id: 'van', name: 'Van', description: 'Large vehicles for groups' },
      ];
    }
  }

  // Get available features for filtering
  async getAvailableFeatures(): Promise<string[]> {
    try {
      const response = await fetch(`${API_CONFIG.BACKEND.BASE_URL}/car-rentals/features`);
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      // Fallback to static data
      return [
        'Air Conditioning',
        'GPS Navigation',
        'Bluetooth',
        'USB Ports',
        'Backup Camera',
        'Leather Seats',
        'Sunroof',
        'Heated Seats',
        'Premium Audio',
        'Keyless Entry',
        'Cruise Control',
        'Parking Sensors',
      ];
    }
  }

  // Get fuel types
  async getFuelTypes(): Promise<Array<{ id: string; name: string }>> {
    try {
      const response = await fetch(`${API_CONFIG.BACKEND.BASE_URL}/car-rentals/fuel-types`);
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      // Fallback to static data
      return [
        { id: 'petrol', name: 'Petrol' },
        { id: 'diesel', name: 'Diesel' },
        { id: 'hybrid', name: 'Hybrid' },
        { id: 'electric', name: 'Electric' },
      ];
    }
  }

  // Get insurance options
  async getInsuranceOptions(): Promise<InsuranceOption[]> {
    try {
      const response = await fetch(`${API_CONFIG.BACKEND.BASE_URL}/car-rentals/insurance`);
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      // Fallback to static data
      return mockInsuranceOptions;
    }
  }

  // Calculate rental price
  async calculateRentalPrice(
    carId: string,
    startDate: string,
    endDate: string,
    insurance: string[] = []
  ): Promise<{ carPrice: number; insurancePrice: number; totalPrice: number; days: number }> {
    try {
      const response = await fetch(`${API_CONFIG.BACKEND.BASE_URL}/car-rentals/price-calculation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carId, startDate, endDate, insurance }),
      });

      if (!response.ok) {
        throw new ApiError('Failed to calculate price', response.status);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      throw error instanceof ApiError ? error : new ApiError('Failed to calculate rental price', 500);
    }
  }
}

// Export singleton instance
export const carRentalService = new CarRentalService();
