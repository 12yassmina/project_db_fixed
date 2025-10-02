const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Apartment', 'House', 'Villa', 'Studio', 'Riad', 'Penthouse']
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
  capacity: {
    guests: {
      type: Number,
      required: true,
      min: 1
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 1
    },
    beds: {
      type: Number,
      required: true,
      min: 1
    }
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
  host: {
    name: {
      type: String,
      required: true
    },
    avatar: String,
    responseRate: {
      type: Number,
      min: 0,
      max: 100,
      default: 95
    },
    responseTime: {
      type: String,
      default: 'within an hour'
    },
    isSuperhost: {
      type: Boolean,
      default: false
    }
  },
  policies: {
    checkIn: String,
    checkOut: String,
    cancellation: String,
    houseRules: [String],
    minimumStay: {
      type: Number,
      default: 1
    }
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
    localGuide: {
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
  },
  instantBook: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for location-based queries
rentalSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });
rentalSchema.index({ city: 1 });
rentalSchema.index({ type: 1 });
rentalSchema.index({ rating: -1 });
rentalSchema.index({ pricePerNight: 1 });
rentalSchema.index({ 'capacity.guests': 1 });

module.exports = mongoose.model('Rental', rentalSchema);
