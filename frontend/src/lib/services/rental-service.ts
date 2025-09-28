import axios from 'axios';

// Backend API configuration - no API keys needed in frontend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface RentalSearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  propertyType?: string[];
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
}

export interface RentalBookingParams {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  specialRequests?: string;
}

export const rentalService = {
  // Search for rental cars
  async searchRentals(params: RentalSearchParams) {
    try {
      const response = await axios.get(`${API_BASE_URL}/car-rentals/search`, {
        params: {
          pickupCity: params.location,
          pickupDate: params.checkIn,
          dropoffDate: params.checkOut,
          driverAge: 25, // Default age
          priceRange: params.minPrice && params.maxPrice ? 
            { min: params.minPrice, max: params.maxPrice } : undefined
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching car rentals:', error);
      throw error;
    }
  },

  // Get rental car details
  async getRentalDetails(carId: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/car-rentals/${carId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting car rental details:', error);
      throw error;
    }
  },

  // Make a car rental booking
  async bookRental(params: RentalBookingParams) {
    try {
      const response = await axios.post(`${API_BASE_URL}/car-rentals/bookings`, {
        carId: params.propertyId,
        pickupLocationId: 'default-location',
        dropoffLocationId: 'default-location',
        pickupDate: params.checkIn,
        dropoffDate: params.checkOut,
        pickupTime: '10:00',
        dropoffTime: '10:00',
        driverInfo: {
          firstName: params.customer.firstName,
          lastName: params.customer.lastName,
          email: params.customer.email,
          phone: params.customer.phone,
          age: 25,
          licenseNumber: 'TEMP123',
          country: 'Morocco'
        },
        insurance: [],
        extras: []
      });
      return response.data;
    } catch (error) {
      console.error('Error booking car rental:', error);
      throw error;
    }
  }
};