const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
    enum: ['Casablanca', 'Rabat', 'Marrakech', 'Tangier', 'Agadir', 'Fez']
  },
  address: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4.0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  pricePerNight: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'MAD'
  },
  starRating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  amenities: [{
    type: String
  }],
  images: [{
    url: String,
    alt: String
  }],
  mainImage: {
    type: String,
    required: true
  },
  roomTypes: [{
    name: String,
    capacity: Number,
    pricePerNight: Number,
    amenities: [String]
  }],
  policies: {
    checkIn: String,
    checkOut: String,
    cancellation: String,
    petPolicy: String
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  worldCupFeatures: {
    shuttleService: {
      type: Boolean,
      default: false
    },
    fanZone: {
      type: Boolean,
      default: false
    },
    matchPackages: {
      type: Boolean,
      default: false
    },
    multilingualStaff: {
      type: Boolean,
      default: false
    }
  },
  availability: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for location-based queries
hotelSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });
hotelSchema.index({ city: 1 });
hotelSchema.index({ rating: -1 });
hotelSchema.index({ pricePerNight: 1 });

module.exports = mongoose.model('Hotel', hotelSchema);
