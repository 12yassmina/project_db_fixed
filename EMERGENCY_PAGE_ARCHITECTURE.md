# Emergency Page - Full-Stack Architecture
## Morocco 2030 World Cup Tourist App

---

## 📱 FRONTEND WIREFRAME (Mobile-First)

```
┌─────────────────────────────────────┐
│ 🇲🇦 Emergency Help | EN FR AR 🌐    │ ← Header with language toggle
├─────────────────────────────────────┤
│                                     │
│        🚨 SOS EMERGENCY 🚨          │ ← Large red button (fixed)
│         TAP FOR HELP                │   One-tap call to 112
│                                     │
├─────────────────────────────────────┤
│ 📞 Emergency Numbers                │
│ ┌─────┬─────────────────────────────┤
│ │ 🚔  │ Police: 19                  │
│ │ 🚑  │ Ambulance: 150              │
│ │ 🚒  │ Fire: 15                    │
│ │ 👮  │ Gendarmerie: 177            │
│ │ 📱  │ General Emergency: 112      │
│ └─────┴─────────────────────────────┤
├─────────────────────────────────────┤
│ 🏥 Nearest Help (GPS-based)         │
│ ┌─────────────────────────────────┐ │
│ │ 📍 Ibn Rushd Hospital - 2.3km  │ │ ← Google Maps integration
│ │ 💊 Pharmacy Centrale - 0.8km   │ │
│ │ 🏥 Clinic Atlas - 1.2km        │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ 🏛️ Embassy Contacts                 │
│ ┌─────────────────────────────────┐ │
│ │ 🔍 Search by country...         │ │ ← Search functionality
│ │ 🇺🇸 US Embassy: +212 537...     │ │
│ │ 🇫🇷 French Embassy: +212 537... │ │
│ │ 🇬🇧 UK Embassy: +212 537...     │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ ⚡ Quick Help Cards                 │
│ ┌───────┬───────┬───────┬───────┐   │
│ │ 📄    │ 💳    │ ⚠️    │ 🚨    │   │ ← Swipeable cards
│ │ Lost  │Stolen │Scams  │Report │   │
│ │Passport│Wallet│ Help  │Crime  │   │
│ └───────┴───────┴───────┴───────┘   │
├─────────────────────────────────────┤
│ 🛡️ Safety Tips                      │
│ • Stay in tourist areas             │
│ • Keep copies of documents          │
│ • Use official taxis only           │
│ • Emergency app downloaded          │
├─────────────────────────────────────┤
│ 📍 Share Location | 📞 Call Support │ ← Bottom actions
└─────────────────────────────────────┘
```

---

## 🔧 BACKEND API ENDPOINTS

### Authentication & User Management
```javascript
// User session management
POST   /api/auth/session          // Create anonymous session
GET    /api/auth/session          // Get current session
DELETE /api/auth/session          // End session

// User location tracking (for emergency services)
POST   /api/user/location         // Update user location
GET    /api/user/location         // Get user location
```

### Emergency Services
```javascript
// Emergency calls and alerts
POST   /api/emergency/call        // Trigger emergency call
POST   /api/emergency/whatsapp    // Start WhatsApp chat
POST   /api/emergency/report      // Report emergency incident
GET    /api/emergency/status/:id  // Check emergency request status

// Example JSON Response - Emergency Call
{
  "success": true,
  "data": {
    "emergencyId": "EMG-2030-001234",
    "callInitiated": true,
    "number": "112",
    "location": {
      "latitude": 33.5731,
      "longitude": -7.5898,
      "address": "Casablanca, Morocco"
    },
    "timestamp": "2030-06-15T14:30:00Z",
    "estimatedResponse": "5-10 minutes"
  }
}
```

### Location & Nearby Services
```javascript
// Hospitals and medical services
GET    /api/nearby/hospitals      // Get nearest hospitals
GET    /api/nearby/pharmacies     // Get 24/7 pharmacies
GET    /api/nearby/police         // Get nearest police stations

// Example JSON Response - Nearby Hospitals
{
  "success": true,
  "data": [
    {
      "id": "hospital_001",
      "name": "Ibn Rushd University Hospital",
      "type": "hospital",
      "distance": 2.3,
      "address": "Royal Army Street, Casablanca",
      "phone": "+212 522 48 20 20",
      "emergency24h": true,
      "coordinates": {
        "latitude": 33.5731,
        "longitude": -7.5898
      },
      "services": ["Emergency", "Surgery", "Cardiology"],
      "googleMapsUrl": "https://maps.google.com/?q=33.5731,-7.5898"
    }
  ]
}
```

### Embassy & Consulate Services
```javascript
// Embassy and consulate information
GET    /api/embassies             // Get all embassies
GET    /api/embassies/search      // Search by country
GET    /api/embassies/:country    // Get specific country embassy

// Example JSON Response - Embassy Search
{
  "success": true,
  "data": [
    {
      "id": "embassy_usa",
      "country": "United States",
      "countryCode": "US",
      "name": "U.S. Embassy Rabat",
      "address": "Km 5.7, Avenue Mohamed VI, Rabat",
      "phone": "+212 537 63 73 00",
      "emergencyPhone": "+212 661 13 19 39",
      "email": "RabatACS@state.gov",
      "website": "https://ma.usembassy.gov",
      "hours": "Monday-Friday 8:00-17:00",
      "emergency24h": true,
      "services": ["Passport", "Visa", "Emergency Services"],
      "coordinates": {
        "latitude": 34.0181,
        "longitude": -6.8326
      }
    }
  ]
}
```

### Content Management
```javascript
// Safety tips and help guides
GET    /api/content/safety-tips   // Get safety tips
GET    /api/content/help-guides   // Get quick help guides
GET    /api/content/alerts        // Get city-specific alerts

// Example JSON Response - Safety Tips
{
  "success": true,
  "data": {
    "tips": [
      {
        "id": "tip_001",
        "category": "general",
        "title": "Stay in Tourist Areas",
        "description": "Stick to well-lit, populated tourist areas, especially at night",
        "icon": "🏛️",
        "priority": "high"
      },
      {
        "id": "tip_002",
        "category": "documents",
        "title": "Keep Document Copies",
        "description": "Always carry photocopies of passport and keep originals in hotel safe",
        "icon": "📄",
        "priority": "high"
      }
    ]
  }
}
```

### Analytics & Monitoring
```javascript
// Emergency usage analytics (anonymized)
POST   /api/analytics/emergency   // Log emergency request
GET    /api/analytics/stats       // Get usage statistics (admin)
POST   /api/analytics/feedback    // User feedback on emergency services
```

---

## 🗄️ DATABASE SCHEMA

### PostgreSQL Tables

```sql
-- Users and Sessions
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_token VARCHAR(255) UNIQUE NOT NULL,
    user_agent TEXT,
    ip_address INET,
    location POINT,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT true
);

-- Emergency Incidents
CREATE TABLE emergency_incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES user_sessions(id),
    incident_type VARCHAR(50) NOT NULL, -- 'call', 'whatsapp', 'report'
    emergency_number VARCHAR(20),
    location POINT NOT NULL,
    address TEXT,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'resolved', 'cancelled'
    created_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP,
    response_time_minutes INTEGER
);

-- Hospitals and Medical Services
CREATE TABLE medical_facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'hospital', 'pharmacy', 'clinic'
    address TEXT NOT NULL,
    phone VARCHAR(20),
    emergency_phone VARCHAR(20),
    location POINT NOT NULL,
    is_24h BOOLEAN DEFAULT false,
    services TEXT[], -- Array of services
    google_place_id VARCHAR(255),
    rating DECIMAL(2,1),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Embassies and Consulates
CREATE TABLE embassies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_name VARCHAR(100) NOT NULL,
    country_code VARCHAR(3) NOT NULL,
    embassy_name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20),
    emergency_phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    location POINT NOT NULL,
    business_hours JSONB, -- Flexible hours format
    services TEXT[],
    is_24h_emergency BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Safety Content Management
CREATE TABLE safety_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL, -- 'tip', 'guide', 'alert'
    category VARCHAR(50),
    title JSONB NOT NULL, -- Multilingual: {"en": "Title", "fr": "Titre", "ar": "العنوان"}
    content JSONB NOT NULL, -- Multilingual content
    icon VARCHAR(10),
    priority VARCHAR(20) DEFAULT 'medium',
    is_active BOOLEAN DEFAULT true,
    target_cities TEXT[], -- Specific cities or null for global
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Emergency Analytics (Anonymized)
CREATE TABLE emergency_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_type VARCHAR(50) NOT NULL,
    city VARCHAR(100),
    response_time_minutes INTEGER,
    user_satisfaction INTEGER, -- 1-5 rating
    timestamp TIMESTAMP DEFAULT NOW(),
    -- No personal data stored for privacy
    session_hash VARCHAR(64) -- Hashed session ID for deduplication
);

-- Indexes for performance
CREATE INDEX idx_medical_facilities_location ON medical_facilities USING GIST(location);
CREATE INDEX idx_embassies_location ON embassies USING GIST(location);
CREATE INDEX idx_embassies_country ON embassies(country_code);
CREATE INDEX idx_emergency_incidents_created ON emergency_incidents(created_at);
CREATE INDEX idx_safety_content_type ON safety_content(type, is_active);
```

---

## 🏗️ TECH STACK IMPLEMENTATION

### Frontend (React Native)
```javascript
// Key dependencies
{
  "dependencies": {
    "react-native": "^0.72.0",
    "@react-navigation/native": "^6.1.0",
    "react-native-maps": "^1.7.0",
    "react-native-geolocation-service": "^5.3.0",
    "react-native-communications": "^2.2.1", // For calls/SMS
    "react-native-push-notification": "^8.1.0",
    "react-native-i18n": "^2.0.15", // Multilingual support
    "react-native-vector-icons": "^9.2.0",
    "@react-native-async-storage/async-storage": "^1.19.0"
  }
}

// Emergency call function
const makeEmergencyCall = async (number) => {
  try {
    const location = await getCurrentLocation();
    
    // Log emergency request
    await fetch('/api/emergency/call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number,
        location: {
          latitude: location.latitude,
          longitude: location.longitude
        }
      })
    });
    
    // Initiate call
    Communications.phonecall(number, true);
  } catch (error) {
    console.error('Emergency call failed:', error);
  }
};
```

### Backend (Node.js + Express)
```javascript
// Emergency service implementation
const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

// Rate limiting for emergency endpoints
const emergencyLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 emergency calls per minute per IP
  message: 'Too many emergency requests'
});

// Emergency call endpoint
app.post('/api/emergency/call', emergencyLimiter, async (req, res) => {
  try {
    const { number, location, description } = req.body;
    const sessionId = req.session.id;
    
    // Log incident in database
    const incident = await db.query(`
      INSERT INTO emergency_incidents (session_id, incident_type, emergency_number, location, description)
      VALUES ($1, 'call', $2, POINT($3, $4), $5)
      RETURNING id
    `, [sessionId, number, location.longitude, location.latitude, description]);
    
    // Send to emergency services (integration with local systems)
    await notifyEmergencyServices({
      incidentId: incident.rows[0].id,
      location,
      type: 'call',
      number
    });
    
    res.json({
      success: true,
      data: {
        emergencyId: incident.rows[0].id,
        callInitiated: true,
        number,
        location,
        estimatedResponse: '5-10 minutes'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

---

## 🔒 SECURITY & DEPLOYMENT

### Security Measures
```javascript
// Security configuration
const helmet = require('helmet');
const cors = require('cors');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://maps.googleapis.com"]
    }
  }
}));

// CORS for mobile app
app.use(cors({
  origin: ['capacitor://localhost', 'ionic://localhost'],
  credentials: true
}));

// Rate limiting by endpoint type
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per 15 minutes
});

const emergencyLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 emergency calls per minute
  skipSuccessfulRequests: true
});
```

### Environment Configuration
```bash
# Production environment variables
NODE_ENV=production
PORT=443
DATABASE_URL=postgresql://user:pass@host:5432/emergency_db
JWT_SECRET=your-super-secure-jwt-secret
GOOGLE_MAPS_API_KEY=your-google-maps-key
WHATSAPP_BUSINESS_TOKEN=your-whatsapp-token
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token

# SSL Configuration
SSL_CERT_PATH=/path/to/ssl/cert.pem
SSL_KEY_PATH=/path/to/ssl/private.key

# Redis for session storage
REDIS_URL=redis://localhost:6379
```

### Deployment Architecture (AWS)
```yaml
# docker-compose.yml for production
version: '3.8'
services:
  app:
    image: morocco-emergency-app:latest
    ports:
      - "443:443"
    environment:
      - NODE_ENV=production
    depends_on:
      - postgres
      - redis
    
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: emergency_db
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
```

### Monitoring & Alerts
```javascript
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    database: 'connected' // Check DB connection
  });
});

// Emergency alert system
const sendCriticalAlert = async (incident) => {
  // Send to monitoring system (DataDog, New Relic, etc.)
  await monitoring.alert({
    level: 'critical',
    message: `Emergency incident ${incident.id} requires attention`,
    metadata: {
      location: incident.location,
      type: incident.type,
      timestamp: incident.created_at
    }
  });
};
```

---

## 📊 PERFORMANCE & SCALABILITY

### Caching Strategy
```javascript
// Redis caching for frequently accessed data
const redis = require('redis');
const client = redis.createClient();

// Cache nearby hospitals for 1 hour
const getNearbyHospitals = async (latitude, longitude) => {
  const cacheKey = `hospitals:${latitude}:${longitude}`;
  const cached = await client.get(cacheKey);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const hospitals = await db.query(`
    SELECT *, ST_Distance(location, POINT($1, $2)) as distance
    FROM medical_facilities 
    WHERE type = 'hospital'
    ORDER BY distance
    LIMIT 10
  `, [longitude, latitude]);
  
  await client.setex(cacheKey, 3600, JSON.stringify(hospitals.rows));
  return hospitals.rows;
};
```

### Load Balancing & Auto-scaling
```yaml
# Kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: emergency-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: emergency-app
  template:
    spec:
      containers:
      - name: app
        image: morocco-emergency:latest
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
---
apiVersion: v1
kind: Service
metadata:
  name: emergency-service
spec:
  selector:
    app: emergency-app
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

This architecture provides a robust, scalable emergency system that prioritizes user safety while maintaining high performance and security standards for the Morocco 2030 World Cup.
