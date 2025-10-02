const express = require('express');
const router = express.Router();
const { optionalAuth } = require('../middleware/auth');
const Rental = require('../models/Rental');

// @route   GET /api/rentals
// @desc    Get all rentals
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { city, minPrice, maxPrice, guests, propertyType, featured } = req.query;
    
    // Build query
    let query = { availability: true };
    
    if (city) {
      query.city = new RegExp(city, 'i');
    }
    
    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = parseInt(minPrice);
      if (maxPrice) query.pricePerNight.$lte = parseInt(maxPrice);
    }
    
    if (guests) {
      query['capacity.guests'] = { $gte: parseInt(guests) };
    }
    
    if (propertyType) {
      query.type = new RegExp(propertyType, 'i');
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    // Execute query with sorting
    const rentals = await Rental.find(query)
      .sort({ featured: -1, rating: -1 })
      .limit(50);
    
    // Transform data to match frontend expectations
    const transformedRentals = rentals.map(rental => {
      const rentalObj = rental.toObject();
      // Ensure id field exists (some components expect id instead of _id)
      rentalObj.id = rentalObj._id.toString();
      return rentalObj;
    });
    
    console.log('🏠 Backend API: Returning rentals from database:', transformedRentals.length);
    
    res.json({
      success: true,
      data: transformedRentals,
      status: 200
    });
  } catch (error) {
    console.error('Get rentals error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching rentals'
    });
  }
});

// @route   GET /api/rentals/:id
// @desc    Get rental details
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);

    if (!rental) {
      return res.status(404).json({ success: false, message: 'Rental not found' });
    }

    res.json({ success: true, data: rental, status: 200 });
  } catch (error) {
    console.error('Get rental details error:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching rental details' });
  }
});

// @route   POST /api/rentals/bookings
// @desc    Create rental booking
// @access  Public
router.post('/bookings', optionalAuth, (req, res) => {
  try {
    const bookingData = req.body;
    
    // Generate mock confirmation ID
    const confirmationId = `RNT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    res.status(201).json({
      success: true,
      message: 'Rental booking created successfully',
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
    console.error('Rental booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating rental booking'
    });
  }
});

module.exports = router;
