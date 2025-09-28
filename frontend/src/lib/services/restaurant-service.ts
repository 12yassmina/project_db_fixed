import axios from 'axios';

// OpenTable API configuration
const OPENTABLE_API_KEY = import.meta.env.VITE_OPENTABLE_API_KEY || '';
const OPENTABLE_API_URL = 'https://opentable.p.rapidapi.com/v1';

const openTableHeaders = {
  'X-RapidAPI-Key': OPENTABLE_API_KEY,
  'X-RapidAPI-Host': 'opentable.p.rapidapi.com'
};

interface OpenTableRestaurant {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  area: string;
  postal_code: string;
  country: string;
  phone: string;
  lat: number;
  lng: number;
  price: number;
  reserve_url: string;
  mobile_reserve_url: string;
  image_url: string;
}

interface OpenTableSearchResponse {
  total_entries: number;
  per_page: number;
  current_page: number;
  restaurants: OpenTableRestaurant[];
}

export interface RestaurantSearchParams {
  city?: string;
  date?: string;
  time?: string;
  partySize?: number;
  cuisine?: string;
}

export interface RestaurantBookingParams {
  restaurantId: string;
  date: string;
  time: string;
  partySize: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  specialRequests?: string;
}

export const restaurantService = {
  // Search for restaurants
  async searchRestaurants(params: RestaurantSearchParams) {
    try {
      const { city = 'Casablanca', cuisine } = params;
      
      // Search restaurants in the city
      const response = await axios.get<OpenTableSearchResponse>(`${OPENTABLE_API_URL}/restaurants/search`, {
        headers: openTableHeaders,
        params: {
          city,
          cuisine_type: cuisine,
          country: 'MA', // Morocco
          per_page: 25,
          page: 1
        }
      });

      // Transform the response to match our interface
      const restaurants = response.data.restaurants.map((restaurant: any) => ({
        id: restaurant.id.toString(),
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        rating: restaurant.rating || 4.5,
        priceRange: '$'.repeat(restaurant.price_range || 3),
        address: restaurant.address,
        city: restaurant.city,
        phone: restaurant.phone,
        image: restaurant.image_url,
        availableTimes: ['18:00', '19:00', '20:00', '21:00'] // Note: Actual availability requires additional API call
      }));

      return { restaurants };
    } catch (error) {
      console.error('Error searching restaurants:', error);
      // Fallback to static data if API fails
      return {
        restaurants: [
          {
            id: '1',
            name: 'Atlas Traditional Restaurant',
            cuisine: 'Moroccan',
            rating: 4.9,
            priceRange: '$$$$',
            address: 'Downtown Casablanca',
            city: 'Casablanca',
            phone: '+212 522 123 456',
            image: '/placeholder.svg',
            availableTimes: ['18:00', '19:00', '20:00']
          },
          {
            id: '2',
            name: 'Rabat Fine Dining',
            cuisine: 'International',
            rating: 4.7,
            priceRange: '$$$',
            address: 'Marina Rabat',
            city: 'Rabat',
            phone: '+212 537 789 012',
            image: '/placeholder.svg',
            availableTimes: ['19:00', '20:00', '21:00']
          }
        ]
      };
    }
  },

  // Get restaurant details
  async getRestaurantDetails(restaurantId: string) {
    try {
      const response = await axios.get<OpenTableRestaurant>(
        `${OPENTABLE_API_URL}/restaurants/${restaurantId}`,
        { headers: openTableHeaders }
      );

      const restaurant = response.data;
      
      return {
        id: restaurant.id.toString(),
        name: restaurant.name,
        description: `${restaurant.name} is located in ${restaurant.area} area of ${restaurant.city}`,
        cuisine: restaurant.price ? 'Fine Dining' : 'Casual Dining',
        rating: 4.5, // OpenTable API doesn't provide ratings
        priceRange: '$'.repeat(restaurant.price || 3),
        address: restaurant.address,
        city: restaurant.city,
        phone: restaurant.phone,
        photos: [restaurant.image_url],
        location: {
          lat: restaurant.lat,
          lng: restaurant.lng
        },
        reserveUrl: restaurant.reserve_url,
        mobileReserveUrl: restaurant.mobile_reserve_url
      };
    } catch (error) {
      console.error('Error getting restaurant details:', error);
      // Fallback to static data if API fails
      return {
        id: restaurantId,
        name: 'Atlas Traditional Restaurant',
        description: 'Authentic Moroccan cuisine in the heart of Casablanca',
        cuisine: 'Moroccan',
        rating: 4.9,
        priceRange: '$$$$',
        address: 'Downtown Casablanca',
        city: 'Casablanca',
        phone: '+212 522 123 456',
        photos: ['/placeholder.svg'],
        location: {
          lat: 33.5731,
          lng: -7.5898
        }
      };
    }
  },

  // Get restaurant reservation URL
  async getReservationUrl(params: RestaurantBookingParams) {
    try {
      // First get the restaurant details to get the reservation URL
      const details = await this.getRestaurantDetails(params.restaurantId);
      
      // Check if we have a reservation URL
      if (!details.reserveUrl) {
        throw new Error('Restaurant does not support online reservations');
      }

      // OpenTable uses their own reservation system, so we return the URL
      // The frontend can then open this URL in a new window or iframe
      return {
        reservationUrl: details.mobileReserveUrl || details.reserveUrl,
        restaurantName: details.name,
        date: params.date,
        time: params.time,
        partySize: params.partySize
      };
    } catch (error) {
      console.error('Error getting reservation URL:', error);
      throw error;
    }
  }
};