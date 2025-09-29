const express = require('express');
const router = express.Router();

// Global CORS middleware for all image routes
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

/**
 * Placeholder Image Service
 * Provides placeholder images for development and fallback scenarios
 */

// Simple SVG placeholder generator
const generatePlaceholderSVG = (width, height, text = '', bgColor = '#f0f0f0', textColor = '#666') => {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="${textColor}" text-anchor="middle" dy=".3em">${text || `${width}×${height}`}</text>
  </svg>`;
};

// Morocco-themed placeholder images - using reliable sources
const moroccanPlaceholders = {
  hotel: {
    300: 'https://picsum.photos/300/200?random=1',
    400: 'https://picsum.photos/400/300?random=1'
  },
  restaurant: {
    300: 'https://picsum.photos/300/200?random=2', 
    400: 'https://picsum.photos/400/300?random=2'
  },
  rental: {
    300: 'https://picsum.photos/300/200?random=3',
    400: 'https://picsum.photos/400/300?random=3'
  },
  car: {
    300: 'https://picsum.photos/300/200?random=4',
    400: 'https://picsum.photos/400/300?random=4'
  }
};

/**
 * GET /api/placeholder/:width/:height
 * Generate a placeholder image with specified dimensions
 */
router.get('/placeholder/:width/:height', (req, res) => {
  const { width, height } = req.params;
  const { text, bg, color, type } = req.query;
  
  // Validate dimensions
  const w = Math.min(Math.max(parseInt(width) || 300, 50), 1200);
  const h = Math.min(Math.max(parseInt(height) || 200, 50), 800);
  
  // If type is specified and we have a themed placeholder, redirect to it
  if (type && moroccanPlaceholders[type]) {
    const size = w >= 400 ? 400 : 300;
    if (moroccanPlaceholders[type][size]) {
      return res.redirect(moroccanPlaceholders[type][size]);
    }
  }
  
  // Generate SVG placeholder
  const svg = generatePlaceholderSVG(w, h, text, bg, color);
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
  res.send(svg);
});

/**
 * GET /api/images/hotel/:size?
 * Get Morocco hotel placeholder image
 */
router.get('/images/hotel/:size?', (req, res) => {
  const size = req.params.size === 'large' ? 400 : 300;
  const height = size === 400 ? 300 : 200;
  
  // Generate SVG with hotel theme
  const svg = generatePlaceholderSVG(size, height, '🏨 Hotel', '#e3f2fd', '#1976d2');
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.send(svg);
});

/**
 * GET /api/images/restaurant/:size?
 * Get Morocco restaurant placeholder image
 */
router.get('/images/restaurant/:size?', (req, res) => {
  const size = req.params.size === 'large' ? 400 : 300;
  const height = size === 400 ? 300 : 200;
  
  // Generate SVG with restaurant theme
  const svg = generatePlaceholderSVG(size, height, '🍽️ Restaurant', '#fff3e0', '#f57c00');
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.send(svg);
});

/**
 * GET /api/images/rental/:size?
 * Get Morocco rental placeholder image
 */
router.get('/images/rental/:size?', (req, res) => {
  const size = req.params.size === 'large' ? 400 : 300;
  const height = size === 400 ? 300 : 200;
  
  // Generate SVG with rental theme
  const svg = generatePlaceholderSVG(size, height, '🏠 Rental', '#f3e5f5', '#7b1fa2');
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.send(svg);
});

/**
 * GET /api/images/car/:size?
 * Get car rental placeholder image
 */
router.get('/images/car/:size?', (req, res) => {
  const size = req.params.size === 'large' ? 400 : 300;
  const height = size === 400 ? 300 : 200;
  
  // Generate SVG with car theme
  const svg = generatePlaceholderSVG(size, height, '🚗 Car Rental', '#e8f5e8', '#388e3c');
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.send(svg);
});

/**
 * Image proxy service to handle CORS issues with external images
 */
router.get('/proxy', async (req, res) => {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }
  
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      throw new Error('Not an image');
    }
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    response.body.pipe(res);
    
  } catch (error) {
    console.error('Image proxy error:', error);
    // Fallback to placeholder
    res.redirect(`/api/placeholder/400/300?text=Image+Not+Available&bg=%23f8f9fa&color=%23666`);
  }
});

module.exports = router;
