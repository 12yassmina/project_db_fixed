const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  cuisine: {
    type: [String],
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
  priceRange: {
    type: String,
    enum: ['$', '$$', '$$$', '$$$$'],
    required: true
  },
  averagePrice: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'MAD'
  },
  images: [{
    url: String,
    alt: String
  }],
  mainImage: {
    type: String,
    required: true
  },
  menu: [{
    category: String,
    items: [{
      name: String,
      description: String,
      price: Number,
      isVegetarian: Boolean,
      isVegan: Boolean,
      isGlutenFree: Boolean,
      spiceLevel: {
        type: String,
        enum: ['Mild', 'Medium', 'Hot', 'Very Hot']
      }
    }]
  }],
  features: [{
    type: String
  }],
  openingHours: {
    monday: { open: String, close: String, closed: Boolean },
    tuesday: { open: String, close: String, closed: Boolean },
    wednesday: { open: String, close: String, closed: Boolean },
    thursday: { open: String, close: String, closed: Boolean },
    friday: { open: String, close: String, closed: Boolean },
    saturday: { open: String, close: String, closed: Boolean },
    sunday: { open: String, close: String, closed: Boolean }
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  reservations: {
    required: {
      type: Boolean,
      default: false
    },
    online: {
      type: Boolean,
      default: true
    },
    phone: {
      type: Boolean,
      default: true
    }
  },
  worldCupFeatures: {
    matchScreening: {
      type: Boolean,
      default: false
    },
    fanMenu: {
      type: Boolean,
      default: false
    },
    groupBookings: {
      type: Boolean,
      default: false
    },
    multilingualMenu: {
      type: Boolean,
      default: false
    }
  },
  dietaryOptions: {
    vegetarian: {
      type: Boolean,
      default: false
    },
    vegan: {
      type: Boolean,
      default: false
    },
    glutenFree: {
      type: Boolean,
      default: false
    },
    halal: {
      type: Boolean,
      default: true
    }
  },
  atmosphere: {
    type: [String],
    enum: ['Casual', 'Fine Dining', 'Family-Friendly', 'Romantic', 'Business', 'Traditional', 'Modern', 'Historic', 'Cultural']
  },
  featured: {
    type: Boolean,
    default: false
  },
  isOpen: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for location-based queries
restaurantSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });
restaurantSchema.index({ city: 1 });
restaurantSchema.index({ cuisine: 1 });
restaurantSchema.index({ rating: -1 });
restaurantSchema.index({ priceRange: 1 });
restaurantSchema.index({ averagePrice: 1 });

module.exports = mongoose.model('Restaurant', restaurantSchema);
