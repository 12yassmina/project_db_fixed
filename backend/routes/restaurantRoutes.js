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
    image: '/api/placeholder/300/200',
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
    image: '/api/placeholder/300/200',
    halal: false,
    worldCupSpecial: true
  }
];

// @route   GET /api/restaurants
// @desc    Get all restaurants
// @access  Public
router.get('/', optionalAuth, (req, res) => {
  try {
    const { city, cuisine, halal, rating } = req.query;
    
    let filteredRestaurants = [...mockRestaurants];
    
    if (city) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.city.toLowerCase().includes(city.toLowerCase())
      );
    }
    
    if (cuisine) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.cuisine.toLowerCase().includes(cuisine.toLowerCase())
      );
    }
    
    if (halal === 'true') {
      filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.halal);
    }
    
    if (rating) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.rating >= parseFloat(rating));
    }
    
    res.json({
      success: true,
      data: {
        restaurants: filteredRestaurants,
        total: filteredRestaurants.length
      }
    });
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching restaurants'
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
