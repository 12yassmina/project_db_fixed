import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Types
interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  nationality?: string;
  preferredLanguage: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  worldCupPreferences?: {
    favoriteTeams?: string[];
    interestedCities?: string[];
    accommodationType?: string;
    budgetRange?: {
      min?: number;
      max?: number;
    };
  };
  avatar?: string;
  role: string;
  isEmailVerified: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string; user?: User }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message: string; user?: User }>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; message: string; user?: User }>;
  refreshToken: () => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  dateOfBirth?: string;
  nationality?: string;
  preferredLanguage?: string;
  worldCupPreferences?: {
    favoriteTeams?: string[];
    interestedCities?: string[];
    accommodationType?: string;
    budgetRange?: {
      min?: number;
      max?: number;
    };
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Axios instance with interceptors
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// Request interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshResponse = await api.post('/auth/refresh');
        const { token } = refreshResponse.data.data;
        
        localStorage.setItem('authToken', token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          
          // Verify token is still valid by fetching profile
          try {
            const response = await api.get('/users/profile');
            setUser(response.data.data.user);
          } catch (error) {
            // Token is invalid, clear storage
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            setToken(null);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const response = await api.post('/auth/login', {
        email,
        password
      });

      const { user: userData, token: userToken } = response.data.data;
      
      // Store in state
      setUser(userData);
      setToken(userToken);
      
      // Store in localStorage
      localStorage.setItem('authToken', userToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return {
        success: true,
        message: response.data.message,
        user: userData
      };
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please try again.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      
      const response = await api.post('/auth/register', userData);
      
      const { user: newUser, token: userToken } = response.data.data;
      
      // Store in state
      setUser(newUser);
      setToken(userToken);
      
      // Store in localStorage
      localStorage.setItem('authToken', userToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return {
        success: true,
        message: response.data.message,
        user: newUser
      };
    } catch (error: any) {
      console.error('Register error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed. Please try again.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear state and localStorage regardless of API call result
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      const response = await api.put('/users/profile', profileData);
      
      const updatedUser = response.data.data.user;
      
      // Update state
      setUser(updatedUser);
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return {
        success: true,
        message: response.data.message,
        user: updatedUser
      };
    } catch (error: any) {
      console.error('Update profile error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Profile update failed. Please try again.'
      };
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const response = await api.post('/auth/refresh');
      const { token: newToken } = response.data.data;
      
      setToken(newToken);
      localStorage.setItem('authToken', newToken);
      
      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const response = await api.put('/users/change-password', {
        currentPassword,
        newPassword
      });
      
      return {
        success: true,
        message: response.data.message
      };
    } catch (error: any) {
      console.error('Change password error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Password change failed. Please try again.'
      };
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    refreshToken,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
