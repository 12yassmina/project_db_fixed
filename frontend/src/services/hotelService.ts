import { BaseApiService, ApiResponse } from './apiService';

// Types used by hooks and consumers
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
  hotelId: string;
  roomTypeId: string;
  dateRange: DateRange;
  totalPrice: number;
  currency: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  guestInfo: any;
}

class HotelService extends BaseApiService {
  private useBookingApi: boolean;
  private bookingApiHost?: string;
  private rapidKey?: string;

  constructor() {
    const bookingHost = import.meta.env.VITE_BOOKING_API_HOST as string | undefined;
    const rapidKey = import.meta.env.VITE_RAPIDAPI_KEY as string | undefined;
    const externalHotelsApiBase = import.meta.env.VITE_HOTELS_API_BASE as string | undefined;

    const apiBase = bookingHost
      ? `https://${bookingHost}`
      : externalHotelsApiBase || (import.meta.env.VITE_API_BASE as string) || 'http://localhost:5000/api';

    const defaultHeaders: Record<string, string> = { 'Content-Type': 'application/json' };
    if (bookingHost && rapidKey) {
      defaultHeaders['X-RapidAPI-Key'] = rapidKey;
      defaultHeaders['X-RapidAPI-Host'] = bookingHost;
    }

    super(apiBase, 'Hotel Service', defaultHeaders);

    this.useBookingApi = !!(bookingHost && rapidKey);
    this.bookingApiHost = bookingHost;
    this.rapidKey = rapidKey;

    console.log(
      '🏨 Hotel Service: Using',
      this.useBookingApi ? `RapidAPI Booking (${apiBase})` : `API at ${apiBase}`
    );
  }

  // --- helper to call RapidAPI directly ---
  private async bookingFetch<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    if (!this.bookingApiHost || !this.rapidKey) {
      return {
        success: false,
        status: 500,
        error: { service: 'Hotel Service', message: 'RapidAPI config missing', status: 500 },
      };
    }

    const url = new URL(`https://${this.bookingApiHost}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) url.searchParams.append(k, String(v));
      });
    }

    try {
      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': this.rapidKey,
          'X-RapidAPI-Host': this.bookingApiHost,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          status: res.status,
          error: { service: 'Hotel Service', message: data?.message || res.statusText, status: res.status },
        };
      }

      return { success: true, data, status: res.status };
    } catch (err: any) {
      return {
        success: false,
        status: 500,
        error: { service: 'Hotel Service', message: err.message || 'Fetch error', status: 500 },
      };
    }
  }

  // --- search hotels ---
  async searchHotels(params: HotelSearchParams): Promise<ApiResponse<Hotel[]>> {
    try {
      if (this.useBookingApi) {
        return await this.searchHotelsViaBooking(params);
      }

      // fallback to backend
      const endpoint = '/hotels';
      const response = await this.get<any>(endpoint, {
        params: {
          city: params.location.city,
          checkIn: params.dateRange.checkIn,
          checkOut: params.dateRange.checkOut,
          guests: params.guests,
          minPrice: params.filters?.priceRange?.min,
          maxPrice: params.filters?.priceRange?.max,
          rating: params.filters?.rating,
        },
      });

      if (response.success && response.data) {
        return { success: true, data: response.data as Hotel[], status: response.status || 200 };
      }

      return {
        success: false,
        status: response.status || 500,
        error: { service: 'Hotel Service', message: 'No hotel data available', status: response.status || 500 },
      };
    } catch (e) {
      console.error('Hotel search error:', e);
      return {
        success: false,
        status: 500,
        error: { service: 'Hotel Service', message: (e as any)?.message || 'Hotel search error', status: 500 },
      };
    }
  }

  // --- search via RapidAPI ---
  private async searchHotelsViaBooking(params: HotelSearchParams): Promise<ApiResponse<Hotel[]>> {
    const overrideDestId = import.meta.env.VITE_BOOKING_DEST_ID as string | undefined;
    const overrideDestType = (import.meta.env.VITE_BOOKING_DEST_TYPE as string | undefined) || 'city';
    if (overrideDestId) {
      return this.searchHotelsViaBookingWithDest(params, overrideDestId, overrideDestType);
    }

    const cityQuery = params.location.city || '';

    // use only searchDestination
    const destResp = await this.bookingFetch<any[]>('/api/v1/hotels/searchDestination', { query: cityQuery });
    if (!destResp.success || !Array.isArray(destResp.data) || destResp.data.length === 0) {
      return { success: true, data: [], status: 200 };
    }

    const dest = destResp.data[0];
    const destId = dest?.dest_id || dest?.city_ufi || dest?.id;
    const destType = dest?.dest_type || 'city';

    return this.searchHotelsViaBookingWithDest(params, destId, destType);
  }

  private async searchHotelsViaBookingWithDest(
    params: HotelSearchParams,
    destId: string,
    destType: string
  ): Promise<ApiResponse<Hotel[]>> {
    const searchResp = await this.bookingFetch<any>('/api/v1/hotels/search', {
      checkout_date: params.dateRange.checkOut,
      checkin_date: params.dateRange.checkIn,
      dest_id: destId,
      dest_type: destType,
      adults_number: Math.max(1, params.guests || 1),
      room_number: 1,
      order_by: 'popularity',
      filter_by_currency: 'USD',
      page_number: 0,
      locale: 'en-gb',
      units: 'metric',
      price_filter_min: params.filters?.priceRange?.min,
      price_filter_max: params.filters?.priceRange?.max,
    });

    if (!searchResp.success) {
      return { success: false, status: searchResp.status || 500, error: searchResp.error };
    }

    const items: any[] = Array.isArray(searchResp.data?.results)
      ? searchResp.data.results
      : Array.isArray(searchResp.data?.data)
      ? searchResp.data.data
      : Array.isArray(searchResp.data)
      ? searchResp.data
      : [];

    const hotels: Hotel[] = items.map((h: any, idx: number) => ({
      id: (h.hotel_id || h.id || `hotel-${idx}`).toString(),
      name: h.hotel_name || h.name || 'Hotel',
      description: h.unit_configuration_label || h.accommodation_type_name || '',
      address: h.address || h.address_trans || '',
      city: h.city || params.location.city || '',
      country: h.country_trans || 'Morocco',
      coordinates: { latitude: parseFloat(h.latitude) || 0, longitude: parseFloat(h.longitude) || 0 },
      rating: parseFloat(h.review_score) ? Math.round((parseFloat(h.review_score) / 2) * 10) / 10 : 4.5,
      reviewScore: parseFloat(h.review_score) || 8.8,
      reviewCount: parseInt(h.review_nr) || 100,
      images: [h.max_photo_url || h.main_photo_url || ''],
      amenities: [],
      pricePerNight: parseFloat(h.min_total_price) || parseFloat(h.composite_price_breakdown?.gross_amount?.value) || 120,
      currency: h.composite_price_breakdown?.gross_amount?.currency || 'USD',
      availability: true,
      roomTypes: [],
    }));

    return { success: true, data: hotels, status: 200 };
  }

  // --- minimal implementations to satisfy hooks ---
  async getHotelDetails(_hotelId: string): Promise<ApiResponse<Hotel>> {
    return { success: false, status: 404, error: { service: 'Hotel Service', message: 'Not implemented', status: 404 } } as any;
  }

  async getHotelAvailability(_hotelId: string, _dateRange: DateRange, _guests: number): Promise<ApiResponse<RoomType[]>> {
    return { success: true, status: 200, data: [] };
  }

  async createBooking(_request: HotelBookingRequest): Promise<ApiResponse<HotelBookingConfirmation>> {
    const confirmation: HotelBookingConfirmation = {
      bookingId: `HTL-${Date.now()}`,
      confirmationNumber: `WC2030-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      hotelId: _request.hotelId,
      roomTypeId: _request.roomTypeId,
      dateRange: _request.dateRange,
      totalPrice: 0,
      currency: 'USD',
      status: 'confirmed',
      guestInfo: _request.guestInfo,
    };
    return { success: true, status: 201, data: confirmation };
  }
}

export const hotelService = new HotelService();
export default hotelService;
