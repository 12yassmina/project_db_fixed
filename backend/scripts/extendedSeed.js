const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');
const Rental = require('../models/Rental');
const Restaurant = require('../models/Restaurant');
require('dotenv').config();

// Extended hotels data - 25 hotels
const hotelsData = [
  // Casablanca (8)
  { name: 'Grand Hotel Hassan II', description: 'Luxury hotel with Hassan II Mosque views', city: 'Casablanca', address: '123 Boulevard Hassan II', coordinates: { latitude: 33.5731, longitude: -7.5898 }, rating: 4.8, reviewCount: 1250, pricePerNight: 180, starRating: 5, amenities: ['WiFi', 'Pool', 'Spa'], mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', images: [{ url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', alt: 'Hotel' }], roomTypes: [], policies: { checkIn: '15:00', checkOut: '11:00', cancellation: 'Free 24h', petPolicy: 'No pets' }, contact: { phone: '+212 522 123 456', email: 'info@hotel.ma', website: 'https://hotel.ma' }, worldCupFeatures: { shuttleService: true, fanZone: true, matchPackages: true, multilingualStaff: true }, featured: true },
  { name: 'Marina Resort Casa', description: 'Waterfront luxury resort', city: 'Casablanca', address: '45 Marina Boulevard', coordinates: { latitude: 33.5831, longitude: -7.5998 }, rating: 4.7, reviewCount: 890, pricePerNight: 160, starRating: 5, amenities: ['WiFi', 'Pool', 'Marina'], mainImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', images: [{ url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', alt: 'Marina' }], roomTypes: [], policies: { checkIn: '15:00', checkOut: '11:00', cancellation: 'Free 24h', petPolicy: 'No pets' }, contact: { phone: '+212 522 234 567', email: 'info@marina.ma', website: 'https://marina.ma' }, worldCupFeatures: { shuttleService: true, fanZone: false, matchPackages: true, multilingualStaff: true }, featured: true },
  { name: 'Atlas Business Hotel', description: 'Modern business hotel', city: 'Casablanca', address: '78 Avenue Hassan II', coordinates: { latitude: 33.5631, longitude: -7.5798 }, rating: 4.3, reviewCount: 567, pricePerNight: 120, starRating: 4, amenities: ['WiFi', 'Business Center'], mainImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', images: [{ url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', alt: 'Business' }], roomTypes: [], policies: { checkIn: '14:00', checkOut: '12:00', cancellation: 'Free 48h', petPolicy: 'Small pets ok' }, contact: { phone: '+212 522 345 678', email: 'info@atlas.ma', website: 'https://atlas.ma' }, worldCupFeatures: { shuttleService: false, fanZone: true, matchPackages: false, multilingualStaff: true }, featured: false },
  { name: 'Palace Hotel Casa', description: 'Historic palace hotel', city: 'Casablanca', address: '12 Place Mohammed V', coordinates: { latitude: 33.5931, longitude: -7.6098 }, rating: 4.6, reviewCount: 1100, pricePerNight: 200, starRating: 5, amenities: ['WiFi', 'Spa', 'Gardens'], mainImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', images: [{ url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', alt: 'Palace' }], roomTypes: [], policies: { checkIn: '15:00', checkOut: '11:00', cancellation: 'Free 24h', petPolicy: 'No pets' }, contact: { phone: '+212 522 456 789', email: 'info@palace.ma', website: 'https://palace.ma' }, worldCupFeatures: { shuttleService: true, fanZone: true, matchPackages: true, multilingualStaff: true }, featured: true },
  { name: 'Corniche Beach Hotel', description: 'Beachfront hotel', city: 'Casablanca', address: '89 Corniche Ain Diab', coordinates: { latitude: 33.5531, longitude: -7.6298 }, rating: 4.2, reviewCount: 445, pricePerNight: 140, starRating: 4, amenities: ['WiFi', 'Beach', 'Pool'], mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', images: [{ url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', alt: 'Beach' }], roomTypes: [], policies: { checkIn: '15:00', checkOut: '11:00', cancellation: 'Free 24h', petPolicy: 'No pets' }, contact: { phone: '+212 522 567 890', email: 'info@corniche.ma', website: 'https://corniche.ma' }, worldCupFeatures: { shuttleService: false, fanZone: false, matchPackages: true, multilingualStaff: false }, featured: false },
  
  // Marrakech (6)
  { name: 'Riad Atlas Marrakech', description: 'Traditional riad in Medina', city: 'Marrakech', address: '45 Derb Sidi Bouloukat', coordinates: { latitude: 31.6295, longitude: -7.9811 }, rating: 4.6, reviewCount: 890, pricePerNight: 120, starRating: 4, amenities: ['WiFi', 'Pool', 'Garden'], mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', images: [{ url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', alt: 'Riad' }], roomTypes: [], policies: { checkIn: '14:00', checkOut: '12:00', cancellation: 'Free 48h', petPolicy: 'Small pets ok' }, contact: { phone: '+212 524 987 654', email: 'info@riad.ma', website: 'https://riad.ma' }, worldCupFeatures: { shuttleService: true, fanZone: false, matchPackages: true, multilingualStaff: true }, featured: true },
  { name: 'Marrakech Luxury Resort', description: '5-star resort with Atlas views', city: 'Marrakech', address: 'Palmeraie District', coordinates: { latitude: 31.6495, longitude: -7.9611 }, rating: 4.9, reviewCount: 1456, pricePerNight: 280, starRating: 5, amenities: ['WiFi', 'Spa', 'Golf', 'Pool'], mainImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', images: [{ url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', alt: 'Luxury' }], roomTypes: [], policies: { checkIn: '15:00', checkOut: '12:00', cancellation: 'Free 24h', petPolicy: 'No pets' }, contact: { phone: '+212 524 123 789', email: 'info@luxury.ma', website: 'https://luxury.ma' }, worldCupFeatures: { shuttleService: true, fanZone: true, matchPackages: true, multilingualStaff: true }, featured: true },
  
  // Rabat (4)
  { name: 'Hotel Rabat Capital', description: 'Modern hotel in capital city', city: 'Rabat', address: '67 Avenue Mohammed V', coordinates: { latitude: 34.0209, longitude: -6.8416 }, rating: 4.4, reviewCount: 678, pricePerNight: 130, starRating: 4, amenities: ['WiFi', 'Restaurant', 'Bar'], mainImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', images: [{ url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', alt: 'Capital' }], roomTypes: [], policies: { checkIn: '15:00', checkOut: '11:00', cancellation: 'Free 24h', petPolicy: 'No pets' }, contact: { phone: '+212 537 234 567', email: 'info@capital.ma', website: 'https://capital.ma' }, worldCupFeatures: { shuttleService: true, fanZone: true, matchPackages: false, multilingualStaff: true }, featured: false },
  
  // Tangier (3)
  { name: 'Hotel Tangier Bay', description: 'Mediterranean views hotel', city: 'Tangier', address: '78 Avenue Mohammed VI', coordinates: { latitude: 35.7595, longitude: -5.8340 }, rating: 4.4, reviewCount: 650, pricePerNight: 95, starRating: 4, amenities: ['WiFi', 'Beach', 'Restaurant'], mainImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', images: [{ url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', alt: 'Bay' }], roomTypes: [], policies: { checkIn: '15:00', checkOut: '11:00', cancellation: 'Free 24h', petPolicy: 'No pets' }, contact: { phone: '+212 539 456 789', email: 'info@bay.ma', website: 'https://bay.ma' }, worldCupFeatures: { shuttleService: false, fanZone: true, matchPackages: false, multilingualStaff: true }, featured: false },
  
  // Agadir (2)
  { name: 'Agadir Beach Resort', description: 'Beachfront resort', city: 'Agadir', address: 'Boulevard du 20 Août', coordinates: { latitude: 30.4278, longitude: -9.5981 }, rating: 4.3, reviewCount: 543, pricePerNight: 110, starRating: 4, amenities: ['WiFi', 'Beach', 'Pool'], mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', images: [{ url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', alt: 'Resort' }], roomTypes: [], policies: { checkIn: '15:00', checkOut: '11:00', cancellation: 'Free 24h', petPolicy: 'Small pets ok' }, contact: { phone: '+212 528 123 456', email: 'info@resort.ma', website: 'https://resort.ma' }, worldCupFeatures: { shuttleService: true, fanZone: false, matchPackages: true, multilingualStaff: false }, featured: false },
  
  // Fez (2)
  { name: 'Riad Fez Medina', description: 'Traditional riad in ancient medina', city: 'Fez', address: 'Medina Fez El Bali', coordinates: { latitude: 34.0181, longitude: -5.0078 }, rating: 4.5, reviewCount: 432, pricePerNight: 100, starRating: 4, amenities: ['WiFi', 'Traditional', 'Garden'], mainImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', images: [{ url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', alt: 'Medina' }], roomTypes: [], policies: { checkIn: '14:00', checkOut: '12:00', cancellation: 'Free 48h', petPolicy: 'No pets' }, contact: { phone: '+212 535 987 654', email: 'info@medina.ma', website: 'https://medina.ma' }, worldCupFeatures: { shuttleService: false, fanZone: true, matchPackages: false, multilingualStaff: true }, featured: false }
];

async function seedExtendedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Hotel.deleteMany({});
    console.log('Cleared existing hotels');

    const hotels = await Hotel.insertMany(hotelsData);
    console.log(`Inserted ${hotels.length} hotels`);

    console.log('Extended database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedExtendedDatabase();
