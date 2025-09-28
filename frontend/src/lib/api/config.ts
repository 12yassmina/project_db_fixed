// API Configuration and Constants
export const API_CONFIG = {
  // Backend API (our proxy server)
  BACKEND: {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
  },
  
  // External APIs (fallback - now handled by backend)
  GOOGLE_PLACES: {
    BASE_URL: 'https://maps.googleapis.com/maps/api/place',
    API_KEY: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
  },
  
  YELP: {
    BASE_URL: 'https://api.yelp.com/v3',
    API_KEY: import.meta.env.VITE_YELP_API_KEY,
  },
  
  RATEHAWK: {
    BASE_URL: 'https://api.ratehawk.com/v1',
    API_KEY: import.meta.env.VITE_RATEHAWK_API_KEY,
  },
  
  AMADEUS: {
    BASE_URL: 'https://api.amadeus.com/v1',
    API_KEY: import.meta.env.VITE_AMADEUS_API_KEY,
    API_SECRET: import.meta.env.VITE_AMADEUS_API_SECRET,
  },
  
  FOURSQUARE: {
    BASE_URL: 'https://api.foursquare.com/v3',
    API_KEY: import.meta.env.VITE_FOURSQUARE_API_KEY,
  },
};

// Morocco World Cup 2030 Host Cities
export const MOROCCO_CITIES = [
  {
    id: 'casablanca',
    name: 'Casablanca',
    nameAr: 'الدار البيضاء',
    coordinates: { lat: 33.5731, lng: -7.5898 },
    stadium: 'Grand Stadium',
    capacity: 80000,
  },
  {
    id: 'marrakech',
    name: 'Marrakech',
    nameAr: 'مراكش',
    coordinates: { lat: 31.6295, lng: -7.9811 },
    stadium: 'Marrakech Stadium',
    capacity: 45000,
  },
  {
    id: 'rabat',
    name: 'Rabat',
    nameAr: 'الرباط',
    coordinates: { lat: 34.0209, lng: -6.8416 },
    stadium: 'Rabat National Stadium',
    capacity: 52000,
  },
  {
    id: 'tangier',
    name: 'Tangier',
    nameAr: 'طنجة',
    coordinates: { lat: 35.7595, lng: -5.8340 },
    stadium: 'Tangier Stadium',
    capacity: 65000,
  },
] as const;

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

// Common API Error
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// API Request Headers
export const getApiHeaders = (apiKey?: string, additionalHeaders?: Record<string, string>) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  return { ...headers, ...additionalHeaders };
};

// CORS Proxy for development (some APIs don't allow direct browser requests)
export const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

// Rate limiting configuration
export const RATE_LIMITS = {
  GOOGLE_PLACES: { requests: 1000, window: 'day' },
  YELP: { requests: 5000, window: 'day' },
  RATEHAWK: { requests: 1000, window: 'day' },
  FOURSQUARE: { requests: 1000, window: 'day' },
} as const;
