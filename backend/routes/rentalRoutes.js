const express = require('express');
const router = express.Router();
const { optionalAuth } = require('../middleware/auth');

// Mock rental data for development
const mockRentals = [
  {
    id: 1,
    title: 'Stunning Riad in Medina with Rooftop Terrace',
    propertyType: 'riad',
    city: 'Marrakech',
    pricePerNight: 95,
    rating: 4.8,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    available: true
  },
  {
    id: 2,
    title: 'Modern Apartment with Ocean View',
    propertyType: 'apartment',
    city: 'Casablanca',
    pricePerNight: 75,
    rating: 4.5,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    available: true
  },
  {
    id: 3,
    title: 'Luxury Villa with Private Pool',
    propertyType: 'villa',
    city: 'Tangier',
    pricePerNight: 180,
    rating: 4.9,
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    available: true
  }
];

// @route   GET /api/rentals
// @desc    Get all rentals
// @access  Public
router.get('/', optionalAuth, (req, res) => {
  try {
    const { city, minPrice, maxPrice, guests, propertyType } = req.query;
    
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Enhanced mock rentals with proper images
    const enhancedMockRentals = mockRentals.map(rental => ({
      ...rental,
      images: [
        `${baseUrl}/api/images/rental`,
        `${baseUrl}/api/images/rental/large`
      ],
      description: `Experience authentic Moroccan living in this beautiful ${rental.propertyType}. Perfect for World Cup visitors with easy access to stadiums.`,
      address: `${rental.propertyType} Address, ${rental.city}`,
      country: 'Morocco',
      coordinates: { latitude: 31.6295, longitude: -7.9811 },
      host: {
        id: `host-${rental.id}`,
        name: 'Ahmed',
        avatar: `${baseUrl}/api/placeholder/100/100`,
        isSuperhost: true,
        responseRate: 98,
        joinedDate: '2019'
      },
      capacity: {
        guests: rental.guests,
        bedrooms: rental.bedrooms,
        beds: rental.bedrooms + 1,
        bathrooms: rental.bathrooms
      },
      amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Parking', 'World Cup Ready'],
      pricing: {
        basePrice: rental.pricePerNight,
        cleaningFee: 25,
        serviceFee: 15,
        currency: 'USD'
      },
      reviews: {
        count: Math.floor(Math.random() * 200) + 20,
        rating: rental.rating || 4.6,
        accuracy: 4.6,
        cleanliness: 4.6,
        communication: 4.6,
        location: 4.6,
        checkIn: 4.6,
        value: 4.6
      },
      availability: {
        instantBook: true,
        minimumStay: 2,
        maximumStay: 28,
        availableFrom: new Date().toISOString().split('T')[0],
        availableUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      policies: {
        checkIn: '15:00',
        checkOut: '11:00',
        cancellation: 'Flexible',
        houseRules: ['No smoking', 'No parties', 'Pets allowed']
      },
      worldCupFeatures: {
        stadiumDistance: Math.random() * 20,
        publicTransport: true,
        worldCupReady: true,
        fanZoneNearby: Math.random() > 0.5,
        matchDayParking: true
      }
    }));
    
    let filteredRentals = [...enhancedMockRentals];
    
    if (city) {
      filteredRentals = filteredRentals.filter(rental => 
        rental.city.toLowerCase().includes(city.toLowerCase())
      );
    }
    
    if (minPrice) {
      filteredRentals = filteredRentals.filter(rental => rental.pricePerNight >= parseInt(minPrice));
    }
    
    if (maxPrice) {
      filteredRentals = filteredRentals.filter(rental => rental.pricePerNight <= parseInt(maxPrice));
    }
    
    if (guests) {
      filteredRentals = filteredRentals.filter(rental => rental.guests >= parseInt(guests));
    }
    
    if (propertyType) {
      filteredRentals = filteredRentals.filter(rental => 
        rental.propertyType.toLowerCase() === propertyType.toLowerCase()
      );
    }
    
    console.log('🏠 Backend API: Returning rentals with images:', filteredRentals.length);
    
    res.json({
      success: true,
      data: filteredRentals,
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
