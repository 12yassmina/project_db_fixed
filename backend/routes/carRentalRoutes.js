const express = require('express');
const router = express.Router();
const { optionalAuth } = require('../middleware/auth');

// Mock car rental data for development
const mockCarRentals = [
  {
    id: 1,
    company: 'Hertz Morocco',
    model: 'Toyota Corolla',
    category: 'Economy',
    pricePerDay: 35,
    image: '/api/placeholder/300/200',
    features: ['AC', 'GPS', 'Bluetooth'],
    available: true
  },
  {
    id: 2,
    company: 'Avis Morocco',
    model: 'Mercedes C-Class',
    category: 'Luxury',
    pricePerDay: 85,
    image: '/api/placeholder/300/200',
    features: ['AC', 'GPS', 'Leather Seats', 'Premium Sound'],
    available: true
  }
];

// @route   GET /api/car-rentals
// @desc    Get all car rentals
// @access  Public
router.get('/', optionalAuth, (req, res) => {
  try {
    const { category, minPrice, maxPrice, company } = req.query;
    
    let filteredRentals = [...mockCarRentals];
    
    if (category) {
      filteredRentals = filteredRentals.filter(rental => 
        rental.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    if (company) {
      filteredRentals = filteredRentals.filter(rental => 
        rental.company.toLowerCase().includes(company.toLowerCase())
      );
    }
    
    if (minPrice) {
      filteredRentals = filteredRentals.filter(rental => rental.pricePerDay >= parseInt(minPrice));
    }
    
    if (maxPrice) {
      filteredRentals = filteredRentals.filter(rental => rental.pricePerDay <= parseInt(maxPrice));
    }
    
    res.json({
      success: true,
      data: {
        rentals: filteredRentals,
        total: filteredRentals.length
      }
    });
  } catch (error) {
    console.error('Get car rentals error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching car rentals'
    });
  }
});

// @route   POST /api/car-rentals/bookings
// @desc    Create car rental booking
// @access  Public
router.post('/bookings', optionalAuth, (req, res) => {
  try {
    const bookingData = req.body;
    
    // Generate mock confirmation ID
    const confirmationId = `CAR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    res.status(201).json({
      success: true,
      message: 'Car rental booking created successfully',
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
    console.error('Car rental booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating car rental booking'
    });
  }
});

module.exports = router;
