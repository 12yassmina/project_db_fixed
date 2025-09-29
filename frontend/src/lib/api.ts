import { hotelService } from './services/hotel-service';
import { restaurantService } from './services/restaurant-service';
import { rentalService } from './services/rental-service';

// Normalize API base; prefer a base that already includes '/api'
const RAW_API_BASE = (import.meta.env.VITE_API_BASE as string) || 'http://localhost:5000/api';
export const API_BASE = RAW_API_BASE.replace(/\/$/, '');

// Export booking service types
export type { 
  HotelAvailabilityParams,
  HotelBookingParams 
} from './services/hotel-service';

export type {
  RestaurantSearchParams,
  RestaurantBookingParams
} from './services/restaurant-service';

export type {
  RentalSearchParams,
  RentalBookingParams
} from './services/rental-service';

// Booking services
export const bookingServices = {
  hotels: hotelService,
  restaurants: restaurantService,
  rentals: rentalService,
};

// Original API functions
export async function fetchGuides() {
  try {
    const res = await fetch(`${API_BASE}/guides`);
    if (!res.ok) throw new Error("Network error");
    return await res.json();
  } catch (error) {
    console.warn("fetchGuides failed:", error);
    return null;
  }
}

export async function fetchSuggestions() {
  try {
    const res = await fetch(`${API_BASE}/suggestions`);
    if (!res.ok) throw new Error("Network error");
    return await res.json();
  } catch (error) {
    console.warn("fetchSuggestions failed:", error);
    return null;
  }
}

export async function fetchEvents() {
  try {
    const res = await fetch(`${API_BASE}/events`);
    if (!res.ok) throw new Error("Network error");
    return await res.json();
  } catch (error) {
    console.warn("fetchEvents failed:", error);
    return null;
  }
}

// Export new services
export const api = {
  hotels: hotelService,
  restaurants: restaurantService,
  rentals: rentalService,
};
