const express = require('express');
const router = express.Router();
const { optionalAuth } = require('../middleware/auth');

// Mock hotel data for development
const mockHotels = [
  {
    id: 1,
    name: 'Hotel Atlas Casablanca',
    city: 'Casablanca',
    rating: 4.5,
    price: 120,
    image: '/api/placeholder/300/200',
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant'],
    worldCupPackage: true
  },
  {
    id: 2,
    name: 'Riad Marrakech Palace',
    city: 'Marrakech',
    rating: 4.8,
    price: 95,
    image: '/api/placeholder/300/200',
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Garden'],
    worldCupPackage: true
  }
];

// @route   GET /api/hotels
// @desc    Get all hotels
// @access  Public
router.get('/', optionalAuth, (req, res) => {
  try {
    const { city, minPrice, maxPrice, rating } = req.query;
    
    let filteredHotels = [...mockHotels];
    
    if (city) {
      filteredHotels = filteredHotels.filter(hotel => 
        hotel.city.toLowerCase().includes(city.toLowerCase())
      );
    }
    
    if (minPrice) {
      filteredHotels = filteredHotels.filter(hotel => hotel.price >= parseInt(minPrice));
    }
    
    if (maxPrice) {
      filteredHotels = filteredHotels.filter(hotel => hotel.price <= parseInt(maxPrice));
    }
    
    if (rating) {
      filteredHotels = filteredHotels.filter(hotel => hotel.rating >= parseFloat(rating));
    }
    
    res.json({
      success: true,
      data: {
        hotels: filteredHotels,
        total: filteredHotels.length
      }
    });
  } catch (error) {
    console.error('Get hotels error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching hotels'
    });
  }
});

// @route   POST /api/hotels/bookings
// @desc    Create hotel booking
// @access  Public
router.post('/bookings', optionalAuth, (req, res) => {
  try {
    const bookingData = req.body;
    
    // Generate mock confirmation ID
    const confirmationId = `HTL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    res.status(201).json({
      success: true,
      message: 'Hotel booking created successfully',
      data: {
        confirmationId,
        booking: {
          ...bookingData,
          id: confirmationId,
          status: 'confirmed',
          createdAt: new Date().toISOString()
        }
      }
    });
  } catch (error) {
    console.error('Hotel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating hotel booking'
    });
  }
});

module.exports = router;
