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
    image: '/api/images/hotel',
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant'],
    worldCupPackage: true
  },
  {
    id: 2,
    name: 'Riad Marrakech Palace',
    city: 'Marrakech',
    rating: 4.8,
    price: 95,
    image: '/api/images/hotel',
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Garden'],
    worldCupPackage: true
  }
];

// @route   GET /api/hotels
// @desc    Get all hotels
// @access  Public
router.get('/', optionalAuth, (req, res) => {
  try {
    const { city, minPrice, maxPrice, rating, checkIn, checkOut, guests } = req.query;
    
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Enhanced mock hotels with proper images
    const enhancedMockHotels = mockHotels.map(hotel => ({
      ...hotel,
      images: [
        `${baseUrl}/api/images/hotel`,
        `${baseUrl}/api/images/hotel/large`
      ],
      pricePerNight: hotel.price,
      currency: 'USD',
      availability: true,
      roomTypes: [],
      coordinates: { latitude: 33.5731, longitude: -7.5898 },
      reviewScore: hotel.rating * 2,
      reviewCount: Math.floor(Math.random() * 1000) + 100,
      amenities: hotel.amenities || ['WiFi', 'Pool', 'Restaurant'],
      worldCupFeatures: {
        stadiumDistance: Math.random() * 20,
        shuttleService: Math.random() > 0.5,
        worldCupPackage: hotel.worldCupPackage || false,
        matchViewingArea: Math.random() > 0.6
      }
    }));
    
    let filteredHotels = [...enhancedMockHotels];
    
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
    
    console.log('🏨 Backend API: Returning hotels with images:', filteredHotels.length);
    
    res.json({
      success: true,
      data: filteredHotels,
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
// @desc    Get hotel details (richer media)
// @access  Public
router.get('/:id', optionalAuth, (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const hotel = mockHotels.find(h => h.id === id);

    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }

    const data = {
      ...hotel,
      images: [
        `${baseUrl}/api/images/hotel`,
        `${baseUrl}/api/images/hotel/large`,
        `${baseUrl}/api/images/hotel?i=2`,
        `${baseUrl}/api/images/hotel?i=3`,
        `${baseUrl}/api/images/hotel?i=4`
      ],
      gallery: [
        `${baseUrl}/api/images/hotel/large`,
        `${baseUrl}/api/images/hotel?type=lobby`,
        `${baseUrl}/api/images/hotel?type=room`,
        `${baseUrl}/api/images/hotel?type=pool`
      ],
      pricePerNight: hotel.price,
      currency: 'USD',
      availability: true,
      roomTypes: [
        { id: 'std', name: 'Standard', pricePerNight: hotel.price, images: [`${baseUrl}/api/images/hotel`] },
        { id: 'dlx', name: 'Deluxe', pricePerNight: hotel.price + 40, images: [`${baseUrl}/api/images/hotel/large`] }
      ],
      coordinates: { latitude: 33.5731, longitude: -7.5898 },
      reviewScore: hotel.rating * 2,
      reviewCount: Math.floor(Math.random() * 1000) + 100,
      amenities: hotel.amenities || ['WiFi', 'Pool', 'Restaurant']
    };

    res.json({ success: true, data, status: 200 });
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
