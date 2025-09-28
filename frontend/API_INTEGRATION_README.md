# Morocco 2030 World Cup - API Integration Guide

This document explains the comprehensive API integrations implemented for restaurants, hotels, and car rentals in the Morocco 2030 World Cup website.

## 🚀 Overview

We've integrated multiple APIs to provide real-time data for:
- **Restaurants**: Yelp Fusion API, Google Places API, OpenTable (partner required)
- **Hotels**: RateHawk API, Amadeus API, Booking.com (partner required)
- **Car Rentals**: Custom service with mock data (easily replaceable with real APIs)

## 📋 Features Implemented

### Restaurant Features
- ✅ Search restaurants by city, cuisine, price level
- ✅ Filter by rating, features (halal, outdoor seating, etc.)
- ✅ Real-time data from Yelp Fusion API
- ✅ Fallback to Google Places API
- ✅ Restaurant details with photos, reviews, ratings
- ✅ Reservation system (mock implementation)
- ✅ Category browsing
- ✅ Distance to stadium calculation

### Hotel Features
- ✅ Search hotels by city, dates, guests, rooms
- ✅ Filter by star rating, amenities, price range
- ✅ Real-time data from RateHawk API (free tier)
- ✅ Fallback to Amadeus API (premium)
- ✅ Hotel details with photos, amenities, room types
- ✅ Booking system with price calculation
- ✅ Date validation and night calculation
- ✅ Distance to stadium for each hotel

### Car Rental Features
- ✅ Search cars by pickup/dropoff dates and locations
- ✅ Filter by category, transmission, fuel type, age restrictions
- ✅ Age-based restrictions and young driver fees
- ✅ Insurance options and price calculation
- ✅ Rental locations with opening hours
- ✅ Multi-day rental pricing
- ✅ Car specifications and features

## 🔧 Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local` and add your API keys:

```bash
cp .env.example .env.local
```

### 2. Required API Keys

#### Google Places API (Free tier available)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Places API
4. Create credentials (API Key)
5. Add to `VITE_GOOGLE_PLACES_API_KEY`

#### Yelp Fusion API (Free tier: 5000 requests/day)
1. Go to [Yelp Developers](https://www.yelp.com/developers)
2. Create an app
3. Get your API key
4. Add to `VITE_YELP_API_KEY`

#### RateHawk API (Free tier available)
1. Visit [RateHawk API](https://www.ratehawk.com/lp/en/API/)
2. Sign up for developer access
3. Get your API key
4. Add to `VITE_RATEHAWK_API_KEY`

#### Amadeus API (Premium, free test environment)
1. Go to [Amadeus for Developers](https://developers.amadeus.com/)
2. Create account and get API key & secret
3. Add to `VITE_AMADEUS_API_KEY` and `VITE_AMADEUS_API_SECRET`

#### Foursquare API (Free tier available)
1. Visit [Foursquare Developers](https://developer.foursquare.com/)
2. Create an app
3. Get your API key
4. Add to `VITE_FOURSQUARE_API_KEY`

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

## 📁 File Structure

```
src/
├── lib/api/
│   ├── config.ts          # API configuration and constants
│   ├── restaurants.ts     # Restaurant service (Yelp + Google Places)
│   ├── hotels.ts         # Hotel service (RateHawk + Amadeus)
│   └── rentals.ts        # Car rental service
├── hooks/
│   ├── useRestaurants.ts # Restaurant React Query hooks
│   ├── useHotels.ts      # Hotel React Query hooks
│   └── useCarRentals.ts  # Car rental React Query hooks
└── pages/
    ├── RestaurantsPage.tsx # Restaurant search and listing
    ├── HotelsPage.tsx      # Hotel search and booking
    └── CarRentalsPage.tsx  # Car rental search and booking
```

## 🔄 API Service Architecture

### Service Layer Pattern
Each API service follows a consistent pattern:
- **Service Class**: Handles API communication
- **Type Definitions**: TypeScript interfaces for data
- **Error Handling**: Consistent error responses
- **Fallback Logic**: Multiple API providers for reliability

### React Query Integration
- **Caching**: 5-10 minute cache for search results
- **Background Updates**: Automatic data refresh
- **Loading States**: Skeleton components during loading
- **Error Boundaries**: Graceful error handling

### Search State Management
- **URL Synchronization**: Search params in URL
- **Debounced Search**: Prevents excessive API calls
- **Pagination**: Load more functionality
- **Filter Persistence**: Maintains filters across navigation

## 🌍 Morocco-Specific Features

### Host Cities Integration
All services are integrated with Morocco's 2030 World Cup host cities:
- **Casablanca** - Grand Stadium (80,000 capacity)
- **Marrakech** - Marrakech Stadium (45,000 capacity)
- **Rabat** - Rabat National Stadium (52,000 capacity)
- **Tangier** - Tangier Stadium (65,000 capacity)

### Cultural Considerations
- **Halal Options**: Automatic detection and filtering
- **Arabic Support**: City names in Arabic
- **Local Preferences**: Moroccan cuisine prioritization
- **Stadium Distance**: All results show distance to stadiums

## 📊 API Rate Limits & Costs

| API | Free Tier | Rate Limit | Cost After |
|-----|-----------|------------|------------|
| Google Places | $200 credit | 1000 req/day | $17/1000 req |
| Yelp Fusion | Free | 5000 req/day | Contact for pricing |
| RateHawk | Free trial | 1000 req/day | Contact for pricing |
| Amadeus | Test environment | 1000 req/month | $0.01-0.05/req |
| Foursquare | Free | 1000 req/day | $0.49/1000 req |

## 🚀 Production Deployment

### Environment Setup
1. Set production API keys in deployment environment
2. Configure CORS settings for your domain
3. Set up API monitoring and logging
4. Implement rate limiting on your backend

### Performance Optimization
- **CDN**: Use CDN for static assets
- **Caching**: Implement Redis caching for API responses
- **Compression**: Enable gzip compression
- **Lazy Loading**: Components load on demand

### Security Best Practices
- **API Keys**: Never expose in client-side code
- **Proxy Server**: Route API calls through your backend
- **Rate Limiting**: Implement client-side rate limiting
- **Input Validation**: Sanitize all user inputs

## 🧪 Testing

### API Testing
```bash
# Test restaurant search
curl "http://localhost:5173/api/restaurants/search?city=casablanca&cuisine=moroccan"

# Test hotel search
curl "http://localhost:5173/api/hotels/search?city=marrakech&checkIn=2030-06-15&checkOut=2030-06-17"
```

### Component Testing
- Unit tests for API services
- Integration tests for React components
- E2E tests for booking flows

## 🔮 Future Enhancements

### Planned Features
- [ ] Real-time availability checking
- [ ] Payment gateway integration
- [ ] Multi-language support
- [ ] Mobile app API
- [ ] AI-powered recommendations
- [ ] Social media integration
- [ ] Review and rating system
- [ ] Loyalty program integration

### Additional APIs to Consider
- **OpenTable API**: Restaurant reservations (partner required)
- **Booking.com API**: Hotel inventory (partner required)
- **Airbnb API**: Vacation rentals (very limited access)
- **Uber API**: Transportation integration
- **Weather API**: Weather-based recommendations

## 📞 Support

For API integration support:
1. Check the individual API documentation
2. Review error logs in browser console
3. Test API endpoints directly
4. Contact API providers for rate limit increases

## 🎯 Quick Start Checklist

- [ ] Copy `.env.example` to `.env.local`
- [ ] Get Google Places API key
- [ ] Get Yelp Fusion API key
- [ ] Install dependencies (`npm install`)
- [ ] Start development server (`npm run dev`)
- [ ] Test restaurant search at `/restaurants`
- [ ] Test hotel search at `/hotels`
- [ ] Test car rental search at `/car-rentals`

The application will work with mock data even without API keys, but real data requires the API keys to be configured.

---

**Built for Morocco 2030 World Cup** 🇲🇦⚽
