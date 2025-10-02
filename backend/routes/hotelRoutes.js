const express = require('express');
const router = express.Router();
const { optionalAuth } = require('../middleware/auth');
const Hotel = require('../models/Hotel');

// @route   GET /api/hotels
// @desc    Get all hotels
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { city, minPrice, maxPrice, rating, checkIn, checkOut, guests, featured } = req.query;
    
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
    
    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    // Execute query with sorting
    const hotels = await Hotel.find(query)
      .sort({ featured: -1, rating: -1 })
      .limit(50);
    
    // Transform data to match frontend expectations
    const transformedHotels = hotels.map(hotel => {
      const hotelObj = hotel.toObject();
      // Ensure id field exists (some components expect id instead of _id)
      hotelObj.id = hotelObj._id.toString();
      return hotelObj;
    });
    
    console.log('🏨 Backend API: Returning hotels from database:', transformedHotels.length);
    
    res.json({
      success: true,
      data: transformedHotels,
      status: 200
    });
  } catch (error) {
    console.error('Get hotels error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching hotels'
    });
  }
});

// @route   GET /api/hotels/:id
// @desc    Get hotel details
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }

    res.json({ success: true, data: hotel, status: 200 });
  } catch (error) {
    console.error('Get hotel details error:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching hotel details' });
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
