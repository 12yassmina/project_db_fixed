import axios from 'axios';

// Backend API configuration - no API keys needed in frontend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface HotelAvailabilityParams {
  checkIn: string;
  checkOut: string;
  adults: number;
  rooms?: number;
  cityId?: string;
}

export interface HotelBookingParams {
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: {
    firstName: string;
    lastName: string;
    email: string;
  }[];
  paymentDetails: {
    cardType: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
}

export const hotelService = {
  // Search for available hotels
  async searchHotels(params: HotelAvailabilityParams) {
    try {
      const response = await axios.get(`${API_BASE_URL}/hotels/search`, {
        params: {
          city: params.cityId || 'casablanca',
          checkIn: params.checkIn,
          checkOut: params.checkOut,
          guests: params.adults,
          rooms: params.rooms || 1
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching hotels:', error);
      throw error;
    }
  },

  // Get hotel details
  async getHotelDetails(hotelId: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/hotels/${hotelId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting hotel details:', error);
      throw error;
    }
  },

  // Make a hotel booking
  async bookHotel(params: HotelBookingParams) {
    try {
      const response = await axios.post(`${API_BASE_URL}/hotels/bookings`, {
        hotelId: params.hotelId,
        roomTypeId: params.roomId,
        checkIn: params.checkIn,
        checkOut: params.checkOut,
        guests: params.guests.length,
        rooms: 1,
        guestInfo: {
          firstName: params.guests[0]?.firstName || '',
          lastName: params.guests[0]?.lastName || '',
          email: params.guests[0]?.email || '',
          phone: '',
          country: 'Morocco'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error booking hotel:', error);
      throw error;
    }
  }
};