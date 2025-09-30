const express = require('express');
const router = express.Router();
const axios = require('axios');

// Environment variables for RapidAPI
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const BOOKING_API_HOST = process.env.BOOKING_API_HOST || 'booking-com15.p.rapidapi.com';
const HOTELS_API_BASE = process.env.HOTELS_API_BASE || 'https://booking-com15.p.rapidapi.com';

// Common RapidAPI headers
const getRapidAPIHeaders = () => ({
  'X-RapidAPI-Key': RAPIDAPI_KEY,
  'X-RapidAPI-Host': BOOKING_API_HOST,
  'Content-Type': 'application/json'
});

// City destination IDs for Booking.com API
const CITY_DESTINATION_IDS = {
  casablanca: '-394633',
  rabat: '-394634',
  marrakech: '-394632',
  tangier: '-394635',
  agadir: '-394631',
  fez: '-394636'
};

// Hotel search endpoint
router.post('/hotels/search', async (req, res) => {
  try {
    const { location, dateRange, guests, limit = 10 } = req.body;

    if (!RAPIDAPI_KEY) {
      return res.status(500).json({
        success: false,
        message: 'RapidAPI key not configured'
      });
    }

    const city = location.city?.toLowerCase() || 'casablanca';
    const destId = CITY_DESTINATION_IDS[city] || CITY_DESTINATION_IDS.casablanca;

    const searchParams = {
      dest_id: destId,
      search_type: 'city',
      arrival_date: dateRange.checkIn,
      departure_date: dateRange.checkOut,
      adults: guests.toString(),
      children_age: '0',
      room_qty: '1',
      page_number: '1',
      languagecode: 'en-us',
      currency_code: 'USD'
    };

    const response = await axios.get(`${HOTELS_API_BASE}/api/v1/hotels/searchHotels`, {
      headers: getRapidAPIHeaders(),
      params: searchParams,
      timeout: 10000
    });

    if (response.data && response.data.result) {
      const hotels = transformHotelsData(response.data.result, location, limit);
      res.json({
        success: true,
        data: hotels,
        total: hotels.length
      });
    } else {
      res.json({
        success: true,
        data: [],
        message: 'No hotels found'
      });
    }
  } catch (error) {
    console.error('Hotel search error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to search hotels',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Hotel details endpoint
router.get('/hotels/:hotelId', async (req, res) => {
  try {
    const { hotelId } = req.params;

    if (!RAPIDAPI_KEY) {
      return res.status(500).json({
        success: false,
        message: 'RapidAPI key not configured'
      });
    }

    const response = await axios.get(`${HOTELS_API_BASE}/api/v1/hotels/getHotelDetails`, {
      headers: getRapidAPIHeaders(),
      params: {
        hotel_id: hotelId,
        languagecode: 'en-us',
        currency_code: 'USD'
      },
      timeout: 10000
    });

    if (response.data) {
      const hotel = transformHotelDetails(response.data);
      res.json({
        success: true,
        data: hotel
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }
  } catch (error) {
    console.error('Hotel details error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to get hotel details',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Rental search endpoint (using same Booking.com API with property type filter)
router.post('/rentals/search', async (req, res) => {
  try {
    const { location, dateRange, guests, limit = 10 } = req.body;

    if (!RAPIDAPI_KEY) {
      return res.status(500).json({
        success: false,
        message: 'RapidAPI key not configured'
      });
    }

    const city = location.city?.toLowerCase() || 'casablanca';
    const destId = CITY_DESTINATION_IDS[city] || CITY_DESTINATION_IDS.casablanca;

    const searchParams = {
      dest_id: destId,
      search_type: 'city',
      arrival_date: dateRange.checkIn,
      departure_date: dateRange.checkOut,
      adults: guests.toString(),
      children_age: '0',
      room_qty: '1',
      page_number: '1',
      languagecode: 'en-us',
      currency_code: 'USD',
      property_type: 'apartment,house' // Filter for rental properties
    };

    const response = await axios.get(`${HOTELS_API_BASE}/api/v1/hotels/searchHotels`, {
      headers: getRapidAPIHeaders(),
      params: searchParams,
      timeout: 10000
    });

    if (response.data && response.data.result) {
      const rentals = transformRentalsData(response.data.result, location, limit);
      res.json({
        success: true,
        data: rentals,
        total: rentals.length
      });
    } else {
      res.json({
        success: true,
        data: [],
        message: 'No rentals found'
      });
    }
  } catch (error) {
    console.error('Rental search error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to search rentals',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Restaurant search endpoint (mock data for now)
router.post('/restaurants/search', async (req, res) => {
  try {
    const { location, limit = 10 } = req.body;

    // For now, return mock restaurant data
    // In a real implementation, you would integrate with OpenTable API or similar
    const restaurants = getMockRestaurants(location, limit);

    res.json({
      success: true,
      data: restaurants,
      total: restaurants.length
    });
  } catch (error) {
    console.error('Restaurant search error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to search restaurants',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Transform Booking.com hotels data to our format
function transformHotelsData(hotels, location, limit) {
  return hotels.slice(0, limit).map((hotel, index) => ({
    id: hotel.hotel_id?.toString() || `hotel_${index}`,
    name: hotel.hotel_name || `Hotel ${index + 1}`,
    description: hotel.hotel_name_trans || hotel.hotel_name,
    address: hotel.address || `${location.city}, Morocco`,
    city: location.city || 'Casablanca',
    country: 'Morocco',
    latitude: hotel.latitude || location.latitude + (Math.random() - 0.5) * 0.01,
    longitude: hotel.longitude || location.longitude + (Math.random() - 0.5) * 0.01,
    rating: hotel.review_score ? parseFloat(hotel.review_score) / 2 : 4 + Math.random(),
    reviewCount: hotel.review_nr || Math.floor(Math.random() * 500) + 100,
    pricePerNight: hotel.min_total_price || Math.floor(Math.random() * 200) + 80,
    currency: hotel.currency_code || 'USD',
    images: hotel.main_photo_url ? [hotel.main_photo_url] : getMockImages(),
    amenities: getMockAmenities(),
    distanceFromStadium: Math.random() * 10 + 1,
    worldCupFeatures: {
      shuttleService: Math.random() > 0.7,
      fanZone: Math.random() > 0.8,
      matchPackages: Math.random() > 0.6,
    },
  }));
}

// Transform Booking.com data for rentals
function transformRentalsData(rentals, location, limit) {
  const rentalTypes = ['apartment', 'house', 'villa', 'studio'];
  
  return rentals.slice(0, limit).map((rental, index) => ({
    id: rental.hotel_id?.toString() || `rental_${index}`,
    name: rental.hotel_name || `Rental ${index + 1}`,
    description: rental.hotel_name_trans || `Beautiful rental in ${location.city}`,
    type: rentalTypes[Math.floor(Math.random() * rentalTypes.length)],
    address: rental.address || `${location.city}, Morocco`,
    city: location.city || 'Casablanca',
    country: 'Morocco',
    latitude: rental.latitude || location.latitude + (Math.random() - 0.5) * 0.01,
    longitude: rental.longitude || location.longitude + (Math.random() - 0.5) * 0.01,
    rating: rental.review_score ? parseFloat(rental.review_score) / 2 : 4 + Math.random(),
    reviewCount: rental.review_nr || Math.floor(Math.random() * 200) + 50,
    pricePerNight: rental.min_total_price || Math.floor(Math.random() * 150) + 60,
    currency: rental.currency_code || 'USD',
    images: rental.main_photo_url ? [rental.main_photo_url] : getMockImages(),
    amenities: getMockAmenities(),
    bedrooms: Math.floor(Math.random() * 3) + 1,
    bathrooms: Math.floor(Math.random() * 2) + 1,
    maxGuests: Math.floor(Math.random() * 6) + 2,
    distanceFromStadium: Math.random() * 15 + 2,
    worldCupFeatures: {
      shuttleService: Math.random() > 0.8,
      fanZone: Math.random() > 0.7,
      matchPackages: Math.random() > 0.9,
    },
    host: {
      name: getRandomHostName(),
      responseRate: Math.floor(Math.random() * 20) + 80,
      isSuperhost: Math.random() > 0.7,
    },
  }));
}

// Transform hotel details
function transformHotelDetails(hotelData) {
  return {
    id: hotelData.hotel_id?.toString(),
    name: hotelData.hotel_name,
    description: hotelData.hotel_description || hotelData.hotel_name,
    address: hotelData.address,
    city: hotelData.city,
    country: hotelData.country,
    latitude: hotelData.latitude,
    longitude: hotelData.longitude,
    rating: hotelData.review_score ? parseFloat(hotelData.review_score) / 2 : 4.5,
    reviewCount: hotelData.review_nr || 0,
    pricePerNight: hotelData.min_total_price || 100,
    currency: hotelData.currency_code || 'USD',
    images: hotelData.photos ? hotelData.photos.map(p => p.url_original) : getMockImages(),
    amenities: hotelData.facilities ? hotelData.facilities.map(f => f.name) : getMockAmenities(),
    worldCupFeatures: {
      shuttleService: Math.random() > 0.7,
      fanZone: Math.random() > 0.8,
      matchPackages: Math.random() > 0.6,
    },
  };
}

// Mock restaurant data
function getMockRestaurants(location, limit) {
  const mockRestaurants = [
    {
      id: 'restaurant_1',
      name: 'La Sqala',
      description: 'Traditional Moroccan cuisine in a historic setting',
      cuisine: ['Moroccan', 'Mediterranean'],
      address: 'Boulevard de la Corniche, Casablanca',
      city: location.city || 'Casablanca',
      country: 'Morocco',
      latitude: location.latitude + 0.001,
      longitude: location.longitude + 0.001,
      rating: 4.6,
      reviewCount: 234,
      priceRange: '$$$',
      images: getMockImages(),
      amenities: ['Outdoor Seating', 'WiFi', 'Parking', 'Live Music'],
      distanceFromStadium: 2.1,
      worldCupFeatures: {
        matchScreens: true,
        fanMenu: true,
        groupBookings: true,
      },
    },
    {
      id: 'restaurant_2',
      name: 'Rick\'s Café',
      description: 'Inspired by the famous movie, serving international cuisine',
      cuisine: ['International', 'French', 'Moroccan'],
      address: '248 Boulevard Sour Jdid, Casablanca',
      city: location.city || 'Casablanca',
      country: 'Morocco',
      latitude: location.latitude + 0.002,
      longitude: location.longitude - 0.001,
      rating: 4.4,
      reviewCount: 567,
      priceRange: '$$$$',
      images: getMockImages(),
      amenities: ['Bar', 'Live Music', 'WiFi', 'Valet Parking'],
      distanceFromStadium: 3.5,
      worldCupFeatures: {
        matchScreens: true,
        fanMenu: false,
        groupBookings: true,
      },
    },
  ];

  return mockRestaurants.slice(0, limit);
}

// Helper functions
function getMockImages() {
  return [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
  ];
}

function getMockAmenities() {
  const allAmenities = ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Parking', 'Bar', 'Concierge', 'Room Service'];
  return allAmenities.slice(0, Math.floor(Math.random() * 6) + 3);
}

function getRandomHostName() {
  const names = ['Ahmed', 'Fatima', 'Youssef', 'Aicha', 'Omar', 'Khadija', 'Hassan', 'Laila'];
  return names[Math.floor(Math.random() * names.length)];
}

module.exports = router;
