import { BaseApiService, ApiResponse } from './apiService';

// Types kept minimal to satisfy existing hooks and UI
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
  availability: number;
  images?: string[];
}

export interface Hotel {
  id: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  country: string;
  coordinates: { latitude: number; longitude: number };
  rating: number;
  reviewScore?: number;
  reviewCount?: number;
  images: string[];
  amenities: string[];
  pricePerNight: number;
  currency: string;
  availability: boolean;
  roomTypes: RoomType[];
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
  hotel: Hotel;
  roomType: RoomType;
  dateRange: DateRange;
  totalPrice: number;
  currency: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  guestInfo: any;
}

class HotelService extends BaseApiService {
  constructor() {
    const backendUrl = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
    super(backendUrl, 'Hotel Service', { 'Content-Type': 'application/json' });
    console.log('🏨 Hotel Service: Using backend API at', backendUrl);
  }

  async searchHotels(params: HotelSearchParams): Promise<ApiResponse<Hotel[]>> {
    try {
      const response = await this.get<any>('/hotels', {
        params: {
          city: params.location.city,
          checkIn: params.dateRange.checkIn,
          checkOut: params.dateRange.checkOut,
          guests: params.guests,
          minPrice: params.filters?.priceRange?.min,
          maxPrice: params.filters?.priceRange?.max,
          rating: params.filters?.rating
        }
      });

      if (response.success && response.data) {
        return { success: true, data: response.data, status: response.status || 200 };
      }
      // fallback
      return this.getMockHotels(params);
    } catch (e) {
      console.error('Hotel search error:', e);
      return this.getMockHotels(params);
    }
  }

  async getHotelDetails(hotelId: string): Promise<ApiResponse<Hotel>> {
    try {
      const response = await this.get<any>(`/hotels/${hotelId}`);
      if (response.success && response.data) {
        return { success: true, data: response.data, status: response.status || 200 };
      }
      return this.getMockHotelDetails(hotelId);
    } catch (e) {
      console.error('Hotel details error:', e);
      return this.getMockHotelDetails(hotelId);
    }
  }

  async getHotelAvailability(hotelId: string, dateRange: DateRange, guests: number): Promise<ApiResponse<RoomType[]>> {
    // For now, return mock availability to satisfy hooks
    return this.getMockRoomTypes();
  }

  async createBooking(_request: HotelBookingRequest): Promise<ApiResponse<HotelBookingConfirmation>> {
    // Mock a booking success
    return {
      success: true,
      status: 201,
      data: {
        bookingId: `HTL-${Date.now()}`,
        confirmationNumber: `WC2030-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        hotel: (await this.getMockHotels({
          location: { city: 'Casablanca' },
          dateRange: { checkIn: '2025-06-01', checkOut: '2025-06-05' },
          guests: 2
        })).data[0],
        roomType: (await this.getMockRoomTypes()).data[0],
        dateRange: { checkIn: '2025-06-01', checkOut: '2025-06-05' },
        totalPrice: 480,
        currency: 'USD',
        status: 'confirmed',
        guestInfo: {}
      }
    };
  }

  // ---- Mock helpers ----
  private async getMockHotels(_params: HotelSearchParams): Promise<ApiResponse<Hotel[]>> {
    const API_BASE = (import.meta.env.VITE_API_BASE as string) || 'http://localhost:5001/api';
    const mockHotels: Hotel[] = [
      {
        id: 'hotel-1',
        name: 'Riad Atlas Casablanca',
        description: 'Luxury riad in the heart of Casablanca',
        address: 'Boulevard Mohammed V, Casablanca',
        city: 'Casablanca',
        country: 'Morocco',
        coordinates: { latitude: 33.5731, longitude: -7.5898 },
        rating: 5,
        reviewScore: 9.2,
        reviewCount: 1247,
        images: [`${API_BASE}/images/hotel`, `${API_BASE}/images/hotel/large`],
        amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Airport Shuttle', 'World Cup Viewing'],
        pricePerNight: 180,
        currency: 'USD',
        availability: true,
        roomTypes: []
      },
      {
        id: 'hotel-2',
        name: 'Hotel Marrakech Palace',
        description: 'Modern hotel with views of the Atlas Mountains',
        address: 'Avenue Mohammed VI, Marrakech',
        city: 'Marrakech',
        country: 'Morocco',
        coordinates: { latitude: 31.6295, longitude: -7.9811 },
        rating: 4,
        reviewScore: 8.8,
        reviewCount: 892,
        images: ['http://localhost:5000/api/images/hotel', 'http://localhost:5000/api/images/hotel/large'],
        amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Rooftop Terrace'],
        pricePerNight: 120,
        currency: 'USD',
        availability: true,
        roomTypes: []
      }
    ];

    return { success: true, data: mockHotels, status: 200 };
  }

  private async getMockHotelDetails(hotelId: string): Promise<ApiResponse<Hotel>> {
    const hotels = await this.getMockHotels({
      location: { city: 'Casablanca' },
      dateRange: { checkIn: '2025-06-01', checkOut: '2025-06-05' },
      guests: 2
    } as HotelSearchParams);
    const hotel = hotels.data.find(h => h.id === hotelId) || hotels.data[0];
    if (hotel) return { success: true, data: hotel, status: 200 };
    return { success: false, status: 404, error: { service: 'Hotel Service', message: 'Hotel not found', status: 404 } };
  }

  private async getMockRoomTypes(): Promise<ApiResponse<RoomType[]>> {
    const API_BASE = (import.meta.env.VITE_API_BASE as string) || 'http://localhost:5001/api';
    const roomTypes: RoomType[] = [
      { id: 'room-1', name: 'Standard Double Room', pricePerNight: 120, availability: 3, images: [`${API_BASE}/images/hotel`] },
      { id: 'room-2', name: 'Deluxe Suite', pricePerNight: 200, availability: 1, images: [`${API_BASE}/images/hotel`] }
    ];
    return { success: true, data: roomTypes, status: 200 };
  }
}

export const hotelService = new HotelService();
export default hotelService;
