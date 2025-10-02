import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Base API Service Class
 * Provides common functionality for all external API services
 * Handles error management, request configuration, and response processing
 */
export class BaseApiService {
  protected api: AxiosInstance;
  protected serviceName: string;

  constructor(baseURL: string, serviceName: string, defaultHeaders: Record<string, string> = {}) {
    this.serviceName = serviceName;
    
    // Create axios instance with base configuration
    this.api = axios.create({
      baseURL,
      timeout: 10000, // 10 seconds timeout
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders
      }
    });

    // Request interceptor for logging and modification
    this.api.interceptors.request.use(
      (config) => {
        console.log(`🔄 ${this.serviceName} API Request:`, {
          method: config.method?.toUpperCase(),
          url: config.url,
          params: config.params
        });
        return config;
      },
      (error) => {
        console.error(`❌ ${this.serviceName} Request Error:`, error);
        return Promise.reject(error);
      }
    );

    // Response interceptor for logging and error handling
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`✅ ${this.serviceName} API Response:`, {
          status: response.status,
          url: response.config.url,
          dataLength: Array.isArray(response.data) ? response.data.length : 'object'
        });
        return response;
      },
      (error) => {
        console.error(`❌ ${this.serviceName} Response Error:`, {
          status: error.response?.status,
          message: error.message,
          url: error.config?.url
        });
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Standardized error handling for all API services
   */
  protected handleError(error: any): ApiError {
    const apiError: ApiError = {
      service: this.serviceName,
      message: 'An unexpected error occurred',
      status: 500,
      originalError: error
    };

    if (error.response) {
      // Server responded with error status
      apiError.status = error.response.status;
      apiError.message = error.response.data?.message || 
                        error.response.data?.error || 
                        `HTTP ${error.response.status} Error`;
    } else if (error.request) {
      // Request was made but no response received
      apiError.message = 'Network error - please check your connection';
      apiError.status = 0;
    } else {
      // Something else happened
      apiError.message = error.message || 'Request configuration error';
    }

    return apiError;
  }

  /**
   * Generic GET request with error handling
   */
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.get<T>(url, config);
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return {
        success: false,
        error: error as ApiError,
        status: (error as ApiError).status
      };
    }
  }

  /**
   * Generic POST request with error handling
   */
  protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post<T>(url, data, config);
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return {
        success: false,
        error: error as ApiError,
        status: (error as ApiError).status
      };
    }
  }
}

/**
 * Type definitions for API responses and errors
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  status: number;
  message?: string;
}

export interface ApiError {
  service: string;
  message: string;
  status: number;
  originalError?: any;
}

/**
 * Common location interface for all services
 */
export interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  address?: string;
}

/**
 * Common date range interface
 */
export interface DateRange {
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
}

/**
 * Common search filters interface
 */
export interface SearchFilters {
  location: Location;
  dateRange: DateRange;
  guests?: number;
  priceRange?: {
    min: number;
    max: number;
  };
}

/**
 * Utility functions for API services
 */
export class ApiUtils {
  /**
   * Format date to ISO string for API calls
   */
  static formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  /**
   * Create location string from coordinates
   */
  static formatLocation(location: Location): string {
    if (location.city && location.country) {
      return `${location.city}, ${location.country}`;
    }
    return `${location.latitude},${location.longitude}`;
  }

  /**
   * Validate required environment variables
   */
  static validateEnvVars(requiredVars: string[]): boolean {
    const missing = requiredVars.filter(varName => !import.meta.env[varName]);
    if (missing.length > 0) {
      console.warn(`⚠️ Missing environment variables: ${missing.join(', ')}`);
      return false;
    }
    return true;
  }

  /**
   * Add CORS proxy if needed (for development)
   */
  static addCorsProxy(url: string): string {
    const corsProxy = import.meta.env.VITE_CORS_PROXY;
    if (corsProxy && import.meta.env.DEV) {
      return `${corsProxy}${url}`;
    }
    return url;
  }
}

/**
 * Simple API Service for database operations
 */
export class ApiService {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          status: response.status,
          error: {
            service: 'API Service',
            message: data.message || 'Request failed',
            status: response.status
          }
        };
      }

      return {
        success: true,
        data: data.data || data,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        error: {
          service: 'API Service',
          message: error instanceof Error ? error.message : 'Network error',
          status: 500
        }
      };
    }
  }
}

export default BaseApiService;
