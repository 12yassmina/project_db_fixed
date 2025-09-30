const express = require('express');
const router = express.Router();
const { optionalAuth } = require('../middleware/auth');

// Mock restaurant data for development
const mockRestaurants = [
  {
    id: 1,
    name: 'La Maison Arabe',
    city: 'Marrakech',
    cuisine: 'Moroccan',
    rating: 4.7,
    priceRange: '$$$',
    image: '/api/images/restaurant',
    halal: true,
    worldCupSpecial: true
  },
  {
    id: 2,
    name: 'Rick\'s Café',
    city: 'Casablanca',
    cuisine: 'International',
    rating: 4.4,
    priceRange: '$$$$',
    image: '/api/images/restaurant',
    halal: false,
    worldCupSpecial: true
  },
  {
    id: 3,
    name: 'Dar Hatim',
    city: 'Fez',
    cuisine: 'Traditional',
    rating: 4.6,
    priceRange: '$$$',
    image: '/api/images/restaurant',
    halal: true,
    worldCupSpecial: false
  },
  {
    id: 4,
    name: 'Le Dhow',
    city: 'Rabat',
    cuisine: 'Seafood',
    rating: 4.5,
    priceRange: '$$$',
    image: '/api/images/restaurant',
    halal: false,
    worldCupSpecial: true
  }
];
// @route   GET /api/restaurants
// @desc    Get all restaurants
// @access  Public
router.get('/', optionalAuth, (req, res) => {
  try {
    const { city, cuisine, rating, priceRange } = req.query;
    
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Enhanced mock restaurants with proper images
    const enhancedMockRestaurants = mockRestaurants.map(restaurant => ({
      ...restaurant,
      images: [
        `${baseUrl}/api/images/restaurant`,
        `${baseUrl}/api/images/restaurant/large`
      ],
      cuisine: [restaurant.cuisine || 'moroccan'],
      coordinates: { latitude: 31.6295, longitude: -7.9811 },
      contact: {
        phone: '+212 524 387 010',
        website: 'https://restaurant.ma',
        email: 'info@restaurant.ma'
      },
      reviewCount: Math.floor(Math.random() * 500) + 50,
      priceLevel: 3,
      hours: {
        monday: '12:00-23:00',
        tuesday: '12:00-23:00',
        wednesday: '12:00-23:00',
        thursday: '12:00-23:00',
        friday: '12:00-23:00',
        saturday: '12:00-23:00',
        sunday: '12:00-23:00'
      },
      features: {
        delivery: false,
        takeout: true,
        reservations: true,
        outdoor_seating: true,
        wifi: true,
        parking: true,
        wheelchair_accessible: false,
        halal: restaurant.halal || false,
        worldCupViewing: true
      },
      worldCupFeatures: {
        stadiumDistance: Math.random() * 15,
        matchViewing: Math.random() > 0.5,
        worldCupMenu: true,
        groupBookings: true,
        fanZone: Math.random() > 0.7
      }
    }));
    
    let filteredRestaurants = [...enhancedMockRestaurants];
    
    if (city) {
      const cityFiltered = filteredRestaurants.filter(restaurant => 
        restaurant.city.toLowerCase().includes(city.toLowerCase())
      );
      filteredRestaurants = cityFiltered.length > 0 ? cityFiltered : enhancedMockRestaurants;
    }
    
    if (cuisine) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.cuisine.some(c => c.toLowerCase().includes(cuisine.toLowerCase()))
      );
    }
    
    if (rating) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.rating >= parseFloat(rating)
      );
    }
    
    console.log('🍽️ Backend API: Returning restaurants with images:', filteredRestaurants.length);
    
    res.json({
      success: true,
      data: filteredRestaurants,
      status: 200
    });
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({
      success: false,
    });
  }
});

// @route   POST /api/restaurants/reservations
// @desc    Create restaurant reservation
// @access  Public
router.post('/reservations', optionalAuth, (req, res) => {
  try {
    const reservationData = req.body;
    
    // Generate mock confirmation ID
    const confirmationId = `RST-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    res.status(201).json({
      success: true,
      message: 'Restaurant reservation created successfully',
      data: {
        confirmationId,
        reservation: {
          ...reservationData,
          id: confirmationId,
          status: 'confirmed',
          createdAt: new Date().toISOString()
        }
      }
    });
  } catch (error) {
    console.error('Restaurant reservation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating restaurant reservation'
    });
  }
});

module.exports = router;
