const express = require('express');
const router = express.Router();
const { optionalAuth } = require('../middleware/auth');
const Restaurant = require('../models/Restaurant');
// @route   GET /api/restaurants
// @desc    Get all restaurants
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { city, cuisine, rating, priceRange, featured } = req.query;
    
    // Build query
    let query = { isOpen: true };
    
    if (city) {
      query.city = new RegExp(city, 'i');
    }
    
    if (cuisine) {
      query.cuisine = { $in: [new RegExp(cuisine, 'i')] };
    }
    
    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }
    
    if (priceRange) {
      query.priceRange = priceRange;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    // Execute query with sorting
    const restaurants = await Restaurant.find(query)
      .sort({ featured: -1, rating: -1 })
      .limit(50);
    
    // Transform data to match frontend expectations
    const transformedRestaurants = restaurants.map(restaurant => {
      const restaurantObj = restaurant.toObject();
      
      // Transform openingHours to hours format expected by frontend
      if (restaurantObj.openingHours) {
        restaurantObj.hours = {};
        Object.keys(restaurantObj.openingHours).forEach(day => {
          const dayHours = restaurantObj.openingHours[day];
          if (dayHours.closed) {
            restaurantObj.hours[day] = 'Closed';
          } else {
            restaurantObj.hours[day] = `${dayHours.open}-${dayHours.close}`;
          }
        });
      }
      
      // Ensure id field exists (some components expect id instead of _id)
      restaurantObj.id = restaurantObj._id.toString();
      
      return restaurantObj;
    });
    
    console.log('🍽️ Backend API: Returning restaurants from database:', transformedRestaurants.length);
    
    res.json({
      success: true,
      data: transformedRestaurants,
      status: 200
    });
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching restaurants'
    });
  }
});

// @route   GET /api/restaurants/:id
// @desc    Get restaurant details
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    // Transform data to match frontend expectations
    const restaurantObj = restaurant.toObject();
    
    // Transform openingHours to hours format expected by frontend
    if (restaurantObj.openingHours) {
      restaurantObj.hours = {};
      Object.keys(restaurantObj.openingHours).forEach(day => {
        const dayHours = restaurantObj.openingHours[day];
        if (dayHours.closed) {
          restaurantObj.hours[day] = 'Closed';
        } else {
          restaurantObj.hours[day] = `${dayHours.open}-${dayHours.close}`;
        }
      });
    }
    
    // Ensure id field exists
    restaurantObj.id = restaurantObj._id.toString();

    res.json({ success: true, data: restaurantObj, status: 200 });
  } catch (error) {
    console.error('Get restaurant details error:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching restaurant details' });
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
