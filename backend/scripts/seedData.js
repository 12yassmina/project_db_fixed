const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');
const Rental = require('../models/Rental');
const Restaurant = require('../models/Restaurant');
require('dotenv').config();

// Sample data for hotels - 25 hotels across Morocco World Cup cities
const hotelsData = [
  // Casablanca Hotels (8)
  { name: 'Grand Hotel Hassan II', description: 'Luxury hotel with stunning Hassan II Mosque views', city: 'Casablanca', address: '123 Boulevard Hassan II', coordinates: { latitude: 33.5731, longitude: -7.5898 }, rating: 4.8, reviewCount: 1250, pricePerNight: 180, starRating: 5, amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'], mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', images: [{ url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', alt: 'Hotel exterior' }], roomTypes: [], policies: { checkIn: '15:00', checkOut: '11:00', cancellation: 'Free 24h', petPolicy: 'No pets' }, contact: { phone: '+212 522 123 456', email: 'info@grandhotel.ma', website: 'https://grandhotel.ma' }, worldCupFeatures: { shuttleService: true, fanZone: true, matchPackages: true, multilingualStaff: true }, featured: true },
  { name: 'Casablanca Marina Resort', description: 'Waterfront luxury with modern amenities', city: 'Casablanca', address: '45 Marina Boulevard', coordinates: { latitude: 33.5831, longitude: -7.5998 }, rating: 4.7, reviewCount: 890, pricePerNight: 160, starRating: 5, amenities: ['WiFi', 'Pool', 'Marina', 'Spa'], mainImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', images: [{ url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', alt: 'Marina view' }], roomTypes: [], policies: { checkIn: '15:00', checkOut: '11:00', cancellation: 'Free 24h', petPolicy: 'No pets' }, contact: { phone: '+212 522 234 567', email: 'info@marina.ma', website: 'https://marina.ma' }, worldCupFeatures: { shuttleService: true, fanZone: false, matchPackages: true, multilingualStaff: true }, featured: true },
  { name: 'Hotel Atlas Casablanca', description: 'Business hotel in city center', city: 'Casablanca', address: '78 Avenue Hassan II', coordinates: { latitude: 33.5631, longitude: -7.5798 }, rating: 4.3, reviewCount: 567, pricePerNight: 120, starRating: 4, amenities: ['WiFi', 'Business Center', 'Restaurant'], mainImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', images: [{ url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', alt: 'Business hotel' }], roomTypes: [], policies: { checkIn: '14:00', checkOut: '12:00', cancellation: 'Free 48h', petPolicy: 'Small pets ok' }, contact: { phone: '+212 522 345 678', email: 'info@atlas.ma', website: 'https://atlas.ma' }, worldCupFeatures: { shuttleService: false, fanZone: true, matchPackages: false, multilingualStaff: true }, featured: false },
  { name: 'Casablanca Palace Hotel', description: 'Historic palace converted to luxury hotel', city: 'Casablanca', address: '12 Place Mohammed V', coordinates: { latitude: 33.5931, longitude: -7.6098 }, rating: 4.6, reviewCount: 1100, pricePerNight: 200, starRating: 5, amenities: ['WiFi', 'Spa', 'Palace Gardens', 'Fine Dining'], mainImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', images: [{ url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', alt: 'Palace lobby' }], roomTypes: [], policies: { checkIn: '15:00', checkOut: '11:00', cancellation: 'Free 24h', petPolicy: 'No pets' }, contact: { phone: '+212 522 456 789', email: 'info@palace.ma', website: 'https://palace.ma' }, worldCupFeatures: { shuttleService: true, fanZone: true, matchPackages: true, multilingualStaff: true }, featured: true },
  { name: 'Hotel Corniche Casa', description: 'Beachfront hotel with ocean views', city: 'Casablanca', address: '89 Corniche Ain Diab', coordinates: { latitude: 33.5531, longitude: -7.6298 }, rating: 4.2, reviewCount: 445, pricePerNight: 140, starRating: 4, amenities: ['WiFi', 'Beach Access', 'Pool', 'Restaurant'], mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', images: [{ url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', alt: 'Beach hotel' }], roomTypes: [], policies: { checkIn: '15:00', checkOut: '11:00', cancellation: 'Free 24h', petPolicy: 'No pets' }, contact: { phone: '+212 522 567 890', email: 'info@corniche.ma', website: 'https://corniche.ma' }, worldCupFeatures: { shuttleService: false, fanZone: false, matchPackages: true, multilingualStaff: false }, featured: false },
  { name: 'Casa Business Center Hotel', description: 'Modern business hotel with conference facilities', city: 'Casablanca', address: '34 Boulevard Zerktouni', coordinates: { latitude: 33.5731, longitude: -7.5698 }, rating: 4.1, reviewCount: 334, pricePerNight: 110, starRating: 4, amenities: ['WiFi', 'Business Center', 'Conference Rooms'], mainImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', images: [{ url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', alt: 'Business hotel' }], roomTypes: [], policies: { checkIn: '14:00', checkOut: '12:00', cancellation: 'Free 48h', petPolicy: 'No pets' }, contact: { phone: '+212 522 678 901', email: 'info@business.ma', website: 'https://business.ma' }, worldCupFeatures: { shuttleService: true, fanZone: false, matchPackages: false, multilingualStaff: true }, featured: false },
  { name: 'Hotel Anfa Casablanca', description: 'Boutique hotel in upscale Anfa district', city: 'Casablanca', address: '56 Boulevard Anfa', coordinates: { latitude: 33.5831, longitude: -7.5598 }, rating: 4.4, reviewCount: 678, pricePerNight: 150, starRating: 4, amenities: ['WiFi', 'Boutique Design', 'Restaurant', 'Bar'], mainImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', images: [{ url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', alt: 'Boutique hotel' }], roomTypes: [], policies: { checkIn: '15:00', checkOut: '11:00', cancellation: 'Free 24h', petPolicy: 'Small pets ok' }, contact: { phone: '+212 522 789 012', email: 'info@anfa.ma', website: 'https://anfa.ma' }, worldCupFeatures: { shuttleService: false, fanZone: true, matchPackages: true, multilingualStaff: true }, featured: false },
  { name: 'Casablanca Airport Hotel', description: 'Convenient airport hotel for travelers', city: 'Casablanca', address: 'Mohammed V Airport', coordinates: { latitude: 33.3731, longitude: -7.5898 }, rating: 3.9, reviewCount: 234, pricePerNight: 90, starRating: 3, amenities: ['WiFi', 'Airport Shuttle', '24h Service'], mainImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', images: [{ url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', alt: 'Airport hotel' }], roomTypes: [], policies: { checkIn: '24h', checkOut: '24h', cancellation: 'Free 24h', petPolicy: 'No pets' }, contact: { phone: '+212 522 890 123', email: 'info@airport.ma', website: 'https://airport.ma' }, worldCupFeatures: { shuttleService: true, fanZone: false, matchPackages: false, multilingualStaff: true }, featured: false }
];

// Sample data for rentals
const rentalsData = [
  {
    title: 'Luxury Apartment with Atlas Mountain Views',
    description: 'Stunning modern apartment with panoramic views of the Atlas Mountains. Perfect for World Cup visitors.',
    type: 'Apartment',
    city: 'Marrakech',
    address: 'Gueliz District, Marrakech',
    coordinates: { latitude: 31.6295, longitude: -7.9811 },
    rating: 4.9,
    reviewCount: 156,
    pricePerNight: 85,
    capacity: {
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      beds: 3
    },
    amenities: ['WiFi', 'Kitchen', 'AC', 'Balcony', 'Parking', 'Washing Machine'],
    mainImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', alt: 'Living room' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', alt: 'Bedroom' }
    ],
    host: {
      name: 'Fatima El Mansouri',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      responseRate: 98,
      responseTime: 'within an hour',
      isSuperhost: true
    },
    policies: {
      checkIn: '16:00',
      checkOut: '11:00',
      cancellation: 'Flexible',
      houseRules: ['No smoking', 'No parties', 'Quiet hours 10 PM - 8 AM'],
      minimumStay: 2
    },
    worldCupFeatures: {
      shuttleService: true,
      fanZone: false,
      matchPackages: true,
      localGuide: true
    },
    featured: true
  },
  {
    title: 'Traditional Riad in Historic Medina',
    description: 'Authentic Moroccan riad with traditional architecture, perfect for experiencing local culture.',
    type: 'Riad',
    city: 'Fez',
    address: 'Medina, Fez',
    coordinates: { latitude: 34.0181, longitude: -5.0078 },
    rating: 4.7,
    reviewCount: 89,
    pricePerNight: 110,
    capacity: {
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      beds: 4
    },
    amenities: ['WiFi', 'Kitchen', 'Garden', 'Rooftop Terrace', 'Traditional Decor'],
    mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', alt: 'Riad courtyard' },
      { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', alt: 'Traditional bedroom' }
    ],
    host: {
      name: 'Ahmed Benali',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      responseRate: 95,
      responseTime: 'within a few hours',
      isSuperhost: false
    },
    policies: {
      checkIn: '15:00',
      checkOut: '12:00',
      cancellation: 'Moderate',
      houseRules: ['No smoking', 'Respect local customs', 'Remove shoes indoors'],
      minimumStay: 1
    },
    worldCupFeatures: {
      shuttleService: false,
      fanZone: true,
      matchPackages: false,
      localGuide: true
    },
    featured: true
  },
  {
    title: 'Modern Villa with Private Pool',
    description: 'Spacious villa with private pool and garden, ideal for families and groups visiting for the World Cup.',
    type: 'Villa',
    city: 'Rabat',
    address: 'Souissi District, Rabat',
    coordinates: { latitude: 34.0209, longitude: -6.8416 },
    rating: 4.8,
    reviewCount: 124,
    pricePerNight: 200,
    capacity: {
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      beds: 6
    },
    amenities: ['WiFi', 'Kitchen', 'Pool', 'Garden', 'Parking', 'BBQ', 'AC'],
    mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', alt: 'Villa exterior' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', alt: 'Pool area' }
    ],
    host: {
      name: 'Youssef Alami',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      responseRate: 100,
      responseTime: 'within an hour',
      isSuperhost: true
    },
    policies: {
      checkIn: '16:00',
      checkOut: '11:00',
      cancellation: 'Strict',
      houseRules: ['No smoking indoors', 'Pool supervision required for children', 'No loud music after 10 PM'],
      minimumStay: 3
    },
    worldCupFeatures: {
      shuttleService: true,
      fanZone: false,
      matchPackages: true,
      localGuide: false
    },
    featured: false
  }
];

// Sample data for restaurants
const restaurantsData = [
  {
    name: 'Le Foundouk',
    description: 'Elegant restaurant serving refined Moroccan and French cuisine in a beautifully restored riad.',
    cuisine: ['Moroccan', 'French', 'Mediterranean'],
    city: 'Marrakech',
    address: '55 Rue du Souk des Fassis, Marrakech',
    coordinates: { latitude: 31.6295, longitude: -7.9811 },
    rating: 4.6,
    reviewCount: 890,
    priceRange: '$$$',
    averagePrice: 45,
    mainImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', alt: 'Restaurant interior' },
      { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', alt: 'Signature dish' }
    ],
    menu: [
      {
        category: 'Appetizers',
        items: [
          { name: 'Moroccan Mezze Platter', description: 'Selection of traditional appetizers', price: 18, isVegetarian: true },
          { name: 'Pastilla Royale', description: 'Traditional pastry with pigeon and almonds', price: 22, isVegetarian: false }
        ]
      },
      {
        category: 'Main Courses',
        items: [
          { name: 'Lamb Tagine with Apricots', description: 'Slow-cooked lamb with dried fruits', price: 38, isVegetarian: false },
          { name: 'Vegetarian Couscous', description: 'Traditional couscous with seasonal vegetables', price: 28, isVegetarian: true }
        ]
      }
    ],
    features: ['Fine Dining', 'Wine List', 'Rooftop Terrace', 'Private Dining'],
    openingHours: {
      monday: { open: '19:00', close: '23:00', closed: false },
      tuesday: { open: '19:00', close: '23:00', closed: false },
      wednesday: { open: '19:00', close: '23:00', closed: false },
      thursday: { open: '19:00', close: '23:00', closed: false },
      friday: { open: '19:00', close: '23:00', closed: false },
      saturday: { open: '19:00', close: '23:00', closed: false },
      sunday: { open: '19:00', close: '23:00', closed: false }
    },
    contact: {
      phone: '+212 524 378 190',
      email: 'info@lefoundouk.ma',
      website: 'https://lefoundouk.ma'
    },
    reservations: {
      required: true,
      online: true,
      phone: true
    },
    worldCupFeatures: {
      matchScreening: false,
      fanMenu: true,
      groupBookings: true,
      multilingualMenu: true
    },
    dietaryOptions: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      halal: true
    },
    atmosphere: ['Fine Dining', 'Romantic', 'Traditional'],
    featured: true
  },
  {
    name: 'Rick\'s Café',
    description: 'Iconic restaurant inspired by the movie Casablanca, serving international and Moroccan cuisine.',
    cuisine: ['International', 'Moroccan', 'American'],
    city: 'Casablanca',
    address: '248 Boulevard Sour Jdid, Casablanca',
    coordinates: { latitude: 33.5731, longitude: -7.5898 },
    rating: 4.4,
    reviewCount: 1250,
    priceRange: '$$$$',
    averagePrice: 55,
    mainImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', alt: 'Restaurant bar' },
      { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', alt: 'Dining area' }
    ],
    menu: [
      {
        category: 'Starters',
        items: [
          { name: 'Seafood Platter', description: 'Fresh Atlantic seafood selection', price: 28, isVegetarian: false },
          { name: 'Moroccan Salad', description: 'Traditional tomato and cucumber salad', price: 12, isVegetarian: true }
        ]
      },
      {
        category: 'Main Courses',
        items: [
          { name: 'Grilled Sea Bass', description: 'Fresh fish with Moroccan spices', price: 42, isVegetarian: false },
          { name: 'Chicken Tagine', description: 'Traditional chicken with preserved lemons', price: 35, isVegetarian: false }
        ]
      }
    ],
    features: ['Piano Bar', 'Live Music', 'Historic Venue', 'Terrace'],
    openingHours: {
      monday: { open: '18:00', close: '01:00', closed: false },
      tuesday: { open: '18:00', close: '01:00', closed: false },
      wednesday: { open: '18:00', close: '01:00', closed: false },
      thursday: { open: '18:00', close: '01:00', closed: false },
      friday: { open: '18:00', close: '01:00', closed: false },
      saturday: { open: '18:00', close: '01:00', closed: false },
      sunday: { open: '18:00', close: '01:00', closed: false }
    },
    contact: {
      phone: '+212 522 274 207',
      email: 'info@rickscafe.ma',
      website: 'https://rickscafe.ma'
    },
    reservations: {
      required: true,
      online: true,
      phone: true
    },
    worldCupFeatures: {
      matchScreening: true,
      fanMenu: true,
      groupBookings: true,
      multilingualMenu: true
    },
    dietaryOptions: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      halal: true
    },
    atmosphere: ['Fine Dining', 'Historic', 'Business'],
    featured: true
  },
  {
    name: 'Dar Yacout',
    description: 'Legendary Moroccan restaurant offering authentic cuisine in a stunning traditional setting.',
    cuisine: ['Moroccan', 'Traditional', 'North African'],
    city: 'Marrakech',
    address: '79 Sidi Ahmed Soussi, Marrakech',
    coordinates: { latitude: 31.6295, longitude: -7.9811 },
    rating: 4.8,
    reviewCount: 567,
    priceRange: '$$$$',
    averagePrice: 65,
    mainImage: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800', alt: 'Traditional dining room' },
      { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', alt: 'Moroccan feast' }
    ],
    menu: [
      {
        category: 'Traditional Feast',
        items: [
          { name: 'Royal Couscous', description: 'Traditional couscous with seven vegetables', price: 48, isVegetarian: true },
          { name: 'Mechoui Lamb', description: 'Slow-roasted lamb with traditional spices', price: 58, isVegetarian: false }
        ]
      }
    ],
    features: ['Traditional Decor', 'Cultural Experience', 'Set Menu', 'Entertainment'],
    openingHours: {
      monday: { open: '20:00', close: '23:30', closed: false },
      tuesday: { open: '20:00', close: '23:30', closed: false },
      wednesday: { open: '20:00', close: '23:30', closed: false },
      thursday: { open: '20:00', close: '23:30', closed: false },
      friday: { open: '20:00', close: '23:30', closed: false },
      saturday: { open: '20:00', close: '23:30', closed: false },
      sunday: { open: '20:00', close: '23:30', closed: true }
    },
    contact: {
      phone: '+212 524 382 929',
      email: 'contact@daryacout.ma',
      website: 'https://daryacout.ma'
    },
    reservations: {
      required: true,
      online: false,
      phone: true
    },
    worldCupFeatures: {
      matchScreening: false,
      fanMenu: false,
      groupBookings: true,
      multilingualMenu: false
    },
    dietaryOptions: {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
      halal: true
    },
    atmosphere: ['Traditional', 'Fine Dining', 'Cultural'],
    featured: false
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Hotel.deleteMany({});
    await Rental.deleteMany({});
    await Restaurant.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    const hotels = await Hotel.insertMany(hotelsData);
    console.log(`Inserted ${hotels.length} hotels`);

    const rentals = await Rental.insertMany(rentalsData);
    console.log(`Inserted ${rentals.length} rentals`);

    const restaurants = await Restaurant.insertMany(restaurantsData);
    console.log(`Inserted ${restaurants.length} restaurants`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
