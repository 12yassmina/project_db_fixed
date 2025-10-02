const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');
const Rental = require('../models/Rental');
const Restaurant = require('../models/Restaurant');
require('dotenv').config();

// Generate 25 hotels with working Unsplash images
const generateHotels = () => {
  const cities = ['Casablanca', 'Marrakech', 'Rabat', 'Tangier', 'Agadir', 'Fez'];
  const hotelNames = ['Grand Hotel', 'Palace Resort', 'Marina Hotel', 'Atlas Hotel', 'Riad', 'Beach Resort', 'Business Hotel', 'Luxury Resort', 'City Hotel', 'Airport Hotel'];
  const images = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'
  ];
  
  const hotels = [];
  for (let i = 0; i < 25; i++) {
    const city = cities[i % cities.length];
    const name = `${hotelNames[i % hotelNames.length]} ${city}`;
    const image = images[i % images.length];
    
    hotels.push({
      name,
      description: `Beautiful ${hotelNames[i % hotelNames.length].toLowerCase()} in ${city}`,
      city,
      address: `${i + 1} Avenue Mohammed V, ${city}`,
      coordinates: { 
        latitude: 31.6295 + (Math.random() - 0.5) * 0.1, 
        longitude: -7.9811 + (Math.random() - 0.5) * 0.1 
      },
      rating: 3.5 + Math.random() * 1.5,
      reviewCount: Math.floor(Math.random() * 1000) + 100,
      pricePerNight: 80 + Math.floor(Math.random() * 200),
      starRating: Math.floor(Math.random() * 3) + 3,
      amenities: ['WiFi', 'Pool', 'Restaurant', 'Spa'].slice(0, Math.floor(Math.random() * 4) + 1),
      mainImage: image,
      images: [{ url: image, alt: 'Hotel' }],
      roomTypes: [],
      policies: {
        checkIn: '15:00',
        checkOut: '11:00',
        cancellation: 'Free 24h',
        petPolicy: Math.random() > 0.5 ? 'No pets' : 'Small pets ok'
      },
      contact: {
        phone: `+212 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100}`,
        email: `info@hotel${i + 1}.ma`,
        website: `https://hotel${i + 1}.ma`
      },
      worldCupFeatures: {
        shuttleService: Math.random() > 0.5,
        fanZone: Math.random() > 0.5,
        matchPackages: Math.random() > 0.5,
        multilingualStaff: Math.random() > 0.3
      },
      featured: i < 5,
      availability: true
    });
  }
  return hotels;
};

// Generate 25 rentals with working images
const generateRentals = () => {
  const cities = ['Casablanca', 'Marrakech', 'Rabat', 'Tangier', 'Agadir', 'Fez'];
  const types = ['Apartment', 'House', 'Villa', 'Riad', 'Studio'];
  const images = [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
  ];
  
  const hosts = ['Ahmed', 'Fatima', 'Youssef', 'Laila', 'Omar', 'Aicha', 'Hassan', 'Khadija'];
  const avatars = [
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
  ];
  
  const rentals = [];
  for (let i = 0; i < 25; i++) {
    const city = cities[i % cities.length];
    const type = types[i % types.length];
    const image = images[i % images.length];
    const host = hosts[i % hosts.length];
    const avatar = avatars[i % avatars.length];
    
    rentals.push({
      title: `Beautiful ${type} in ${city}`,
      description: `Comfortable ${type.toLowerCase()} perfect for World Cup visitors`,
      type,
      city,
      address: `${i + 1} Rue de la Paix, ${city}`,
      coordinates: { 
        latitude: 31.6295 + (Math.random() - 0.5) * 0.1, 
        longitude: -7.9811 + (Math.random() - 0.5) * 0.1 
      },
      rating: 4.0 + Math.random() * 1.0,
      reviewCount: Math.floor(Math.random() * 300) + 50,
      pricePerNight: 50 + Math.floor(Math.random() * 150),
      capacity: {
        guests: Math.floor(Math.random() * 6) + 2,
        bedrooms: Math.floor(Math.random() * 3) + 1,
        bathrooms: Math.floor(Math.random() * 2) + 1,
        beds: Math.floor(Math.random() * 4) + 1
      },
      amenities: ['WiFi', 'Kitchen', 'AC', 'Balcony', 'Parking'].slice(0, Math.floor(Math.random() * 5) + 2),
      mainImage: image,
      images: [{ url: image, alt: type }],
      host: {
        name: `${host} ${['Benali', 'El Mansouri', 'Alami', 'Tazi'][i % 4]}`,
        avatar,
        responseRate: 85 + Math.floor(Math.random() * 15),
        responseTime: ['within an hour', 'within hours', 'within a day'][Math.floor(Math.random() * 3)],
        isSuperhost: Math.random() > 0.7
      },
      policies: {
        checkIn: ['15:00', '16:00', '14:00'][Math.floor(Math.random() * 3)],
        checkOut: ['11:00', '12:00', '10:00'][Math.floor(Math.random() * 3)],
        cancellation: ['Flexible', 'Moderate', 'Strict'][Math.floor(Math.random() * 3)],
        houseRules: ['No smoking', 'No parties', 'Quiet hours'].slice(0, Math.floor(Math.random() * 3) + 1),
        minimumStay: Math.floor(Math.random() * 3) + 1
      },
      worldCupFeatures: {
        shuttleService: Math.random() > 0.6,
        fanZone: Math.random() > 0.7,
        matchPackages: Math.random() > 0.5,
        localGuide: Math.random() > 0.6
      },
      availability: true,
      featured: i < 5,
      instantBook: Math.random() > 0.5
    });
  }
  return rentals;
};

// Generate 25 restaurants with working images
const generateRestaurants = () => {
  const cities = ['Casablanca', 'Marrakech', 'Rabat', 'Tangier', 'Agadir', 'Fez'];
  const cuisines = [
    ['Moroccan', 'Traditional'], ['French', 'Mediterranean'], ['International', 'Modern'],
    ['Seafood', 'Moroccan'], ['Italian', 'Pizza'], ['Asian', 'Fusion'], ['Moroccan', 'Berber']
  ];
  const names = ['Le Foundouk', 'Dar Yacout', 'Rick\'s Café', 'La Sqala', 'Nomad', 'Al Fassia', 'Comptoir Darna', 'Pepe Nero', 'Bo & Zin', 'Maison Arabe'];
  const images = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800',
    'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800'
  ];
  
  const restaurants = [];
  for (let i = 0; i < 25; i++) {
    const city = cities[i % cities.length];
    const cuisine = cuisines[i % cuisines.length];
    const name = `${names[i % names.length]} ${city}`;
    const image = images[i % images.length];
    
    restaurants.push({
      name,
      description: `Authentic ${cuisine[0].toLowerCase()} cuisine in the heart of ${city}`,
      cuisine,
      city,
      address: `${i + 1} Boulevard Mohammed V, ${city}`,
      coordinates: { 
        latitude: 31.6295 + (Math.random() - 0.5) * 0.1, 
        longitude: -7.9811 + (Math.random() - 0.5) * 0.1 
      },
      rating: 3.8 + Math.random() * 1.2,
      reviewCount: Math.floor(Math.random() * 800) + 100,
      priceRange: ['$', '$$', '$$$', '$$$$'][Math.floor(Math.random() * 4)],
      averagePrice: 25 + Math.floor(Math.random() * 50),
      currency: 'MAD',
      mainImage: image,
      images: [{ url: image, alt: 'Restaurant' }],
      menu: [{
        category: 'Main Dishes',
        items: [{
          name: 'Signature Dish',
          description: 'Chef\'s special recommendation',
          price: 30 + Math.floor(Math.random() * 30),
          isVegetarian: Math.random() > 0.7,
          isVegan: Math.random() > 0.8,
          isGlutenFree: Math.random() > 0.8
        }]
      }],
      features: ['Fine Dining', 'Terrace', 'Live Music', 'Traditional Decor'].slice(0, Math.floor(Math.random() * 4) + 1),
      openingHours: {
        monday: { open: '12:00', close: '22:00', closed: false },
        tuesday: { open: '12:00', close: '22:00', closed: false },
        wednesday: { open: '12:00', close: '22:00', closed: false },
        thursday: { open: '12:00', close: '22:00', closed: false },
        friday: { open: '12:00', close: '22:00', closed: false },
        saturday: { open: '12:00', close: '22:00', closed: false },
        sunday: { open: '12:00', close: '22:00', closed: Math.random() > 0.8 }
      },
      contact: {
        phone: `+212 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100}`,
        email: `info@restaurant${i + 1}.ma`,
        website: `https://restaurant${i + 1}.ma`
      },
      reservations: {
        required: Math.random() > 0.5,
        online: Math.random() > 0.3,
        phone: true
      },
      worldCupFeatures: {
        matchScreening: Math.random() > 0.6,
        fanMenu: Math.random() > 0.5,
        groupBookings: Math.random() > 0.3,
        multilingualMenu: Math.random() > 0.4
      },
      dietaryOptions: {
        vegetarian: Math.random() > 0.3,
        vegan: Math.random() > 0.7,
        glutenFree: Math.random() > 0.6,
        halal: Math.random() > 0.1
      },
      atmosphere: [
        ['Casual', 'Family-Friendly'], ['Fine Dining', 'Romantic'], ['Traditional', 'Cultural'],
        ['Modern', 'Business'], ['Historic', 'Traditional']
      ][Math.floor(Math.random() * 5)],
      featured: i < 5,
      isOpen: true
    });
  }
  return restaurants;
};

async function seedMegaDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Hotel.deleteMany({});
    await Rental.deleteMany({});
    await Restaurant.deleteMany({});
    console.log('Cleared existing data');

    // Generate and insert data
    const hotels = await Hotel.insertMany(generateHotels());
    console.log(`Inserted ${hotels.length} hotels`);

    const rentals = await Rental.insertMany(generateRentals());
    console.log(`Inserted ${rentals.length} rentals`);

    const restaurants = await Restaurant.insertMany(generateRestaurants());
    console.log(`Inserted ${restaurants.length} restaurants`);

    console.log('Mega database seeded successfully!');
    console.log(`Total: ${hotels.length + rentals.length + restaurants.length} items`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedMegaDatabase();
