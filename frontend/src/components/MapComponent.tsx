import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { MapOptions } from 'leaflet';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Hotel, 
  Utensils, 
  Calendar, 
  Building2, 
  MapPin, 
  Car,
  Star,
  Phone,
  Clock
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface MapLocation {
  id: string;
  name: string;
  type: 'hotel' | 'restaurant' | 'event' | 'stadium' | 'city' | 'transport';
  position: [number, number];
  description: string;
  rating?: number;
  price?: string;
  phone?: string;
  hours?: string;
  image?: string;
}

function fixMarkerIcon() {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
}

const createCustomIcon = (type: string, color: string) => {
  const iconMap = {
    hotel: '🏨',
    restaurant: '🍽️',
    event: '🎉',
    stadium: '⚽',
    city: '🏛️',
    transport: '🚌'
  };

  return L.divIcon({
    html: `<div style="background-color: ${color}; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); font-size: 18px;">${iconMap[type as keyof typeof iconMap] || '📍'}</div>`,
    className: 'custom-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

export default function MapComponent() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  useEffect(() => {
    fixMarkerIcon();
  }, []);

  // Données des lieux au Maroc
  const locations: MapLocation[] = [
    // Casablanca
    {
      id: '1',
      name: 'Grand Stade Hassan II',
      type: 'stadium',
      position: [33.5731, -7.5898],
      description: 'Le plus grand stade du monde en construction',
      rating: 4.9,
      phone: '+212 522 XX XX XX'
    },
    {
      id: '2',
      name: 'Four Seasons Hotel Casablanca',
      type: 'hotel',
      position: [33.5731, -7.5898],
      description: 'Hôtel de luxe 5 étoiles',
      rating: 4.8,
      price: 'À partir de 1200 MAD/nuit',
      phone: '+212 522 XX XX XX'
    },
    {
      id: '3',
      name: 'Rick\'s Café',
      type: 'restaurant',
      position: [33.5950, -7.6187],
      description: 'Restaurant emblématique inspiré du film Casablanca',
      rating: 4.6,
      price: '$$$$',
      hours: '12h00 - 01h00'
    },
    // Marrakech
    {
      id: '4',
      name: 'Stade de Marrakech',
      type: 'stadium',
      position: [31.6295, -7.9811],
      description: 'Stade moderne avec design traditionnel',
      rating: 4.7,
      phone: '+212 524 XX XX XX'
    },
    {
      id: '5',
      name: 'La Mamounia',
      type: 'hotel',
      position: [31.6204, -8.0041],
      description: 'Palace légendaire avec jardins magnifiques',
      rating: 4.9,
      price: 'À partir de 2500 MAD/nuit',
      phone: '+212 524 XX XX XX'
    },
    {
      id: '6',
      name: 'Festival Gnawa',
      type: 'event',
      position: [31.6295, -7.9811],
      description: 'Festival de musique traditionnelle',
      rating: 4.8,
      hours: '20h00 - 02h00'
    },
    // Rabat
    {
      id: '7',
      name: 'Stade National de Rabat',
      type: 'stadium',
      position: [34.0209, -6.8416],
      description: 'Stade écologique avec panneaux solaires',
      rating: 4.6,
      phone: '+212 537 XX XX XX'
    },
    {
      id: '8',
      name: 'Sofitel Rabat Jardin des Roses',
      type: 'hotel',
      position: [34.0209, -6.8416],
      description: 'Hôtel de luxe avec jardins',
      rating: 4.7,
      price: 'À partir de 900 MAD/nuit',
      phone: '+212 537 XX XX XX'
    },
    // Tanger
    {
      id: '9',
      name: 'Stade International de Tanger',
      type: 'stadium',
      position: [35.7595, -5.8340],
      description: 'Stade avec vue sur la Méditerranée',
      rating: 4.5,
      phone: '+212 539 XX XX XX'
    },
    {
      id: '10',
      name: 'Transport - Gare TGV',
      type: 'transport',
      position: [35.7595, -5.8340],
      description: 'Liaison TGV entre les villes hôtes',
      rating: 4.4,
      hours: '06h00 - 23h00'
    }
  ];

  const filteredLocations = selectedFilter === 'all' 
    ? locations 
    : locations.filter(loc => loc.type === selectedFilter);

  const options: MapOptions = {
    center: [32.2540, -6.0370], // Centre du Maroc
    zoom: 6,
    scrollWheelZoom: true
  };

  const filterButtons = [
    { key: 'all', label: 'Tout', icon: MapPin, color: '#10B981' },
    { key: 'hotel', label: 'Hôtels', icon: Hotel, color: '#3B82F6' },
    { key: 'restaurant', label: 'Restaurants', icon: Utensils, color: '#EF4444' },
    { key: 'event', label: 'Événements', icon: Calendar, color: '#8B5CF6' },
    { key: 'stadium', label: 'Stades', icon: Building2, color: '#F59E0B' },
    { key: 'transport', label: 'Transport', icon: Car, color: '#06B6D4' }
  ];

  const getMarkerColor = (type: string) => {
    const colorMap = {
      hotel: '#3B82F6',
      restaurant: '#EF4444',
      event: '#8B5CF6',
      stadium: '#F59E0B',
      city: '#10B981',
      transport: '#06B6D4'
    };
    return colorMap[type as keyof typeof colorMap] || '#6B7280';
  };

  const handleReservation = (location: MapLocation) => {
    // Logique de réservation
    alert(`Réservation pour ${location.name} - Fonctionnalité en cours de développement`);
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };
  
  return (
    <div className="relative w-full h-full">
      {/* Filtres */}
      <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4">
        <h3 className="font-semibold mb-3 text-sm">Filtrer par type</h3>
        <div className="flex flex-wrap gap-2">
          {filterButtons.map((filter) => (
            <Button
              key={filter.key}
              variant={selectedFilter === filter.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.key)}
              className="flex items-center gap-1"
            >
              <filter.icon className="w-3 h-3" />
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Détails du lieu sélectionné */}
      {selectedLocation && (
        <div className="absolute top-4 right-4 z-[1000] w-80">
          <Card className="p-4 bg-white shadow-lg">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">{selectedLocation.name}</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedLocation(null)}
              >
                ✕
              </Button>
            </div>
            
            <Badge variant="secondary" className="mb-2">
              {selectedLocation.type}
            </Badge>
            
            <p className="text-sm text-muted-foreground mb-3">
              {selectedLocation.description}
            </p>
            
            <div className="space-y-2 text-sm">
              {selectedLocation.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{selectedLocation.rating}</span>
                </div>
              )}
              
              {selectedLocation.price && (
                <div className="text-primary font-medium">
                  {selectedLocation.price}
                </div>
              )}
              
              {selectedLocation.hours && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{selectedLocation.hours}</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button 
                size="sm" 
                className="flex-1"
                onClick={() => handleReservation(selectedLocation)}
              >
                Réserver
              </Button>
              
              {selectedLocation.phone && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleCall(selectedLocation.phone!)}
                >
                  <Phone className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Carte */}
      <MapContainer
        {...options}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          {...{
            attribution: '© OpenStreetMap contributors'
          } as any}
        />
        
        {filteredLocations.map((location) => (
          <Marker
            key={location.id}
            position={location.position}
            {...{
              icon: createCustomIcon(location.type, getMarkerColor(location.type))
            } as any}
            eventHandlers={{
              click: () => setSelectedLocation(location)
            }}
          >
            <Popup>
              <div className="p-2">
                <h4 className="font-semibold">{location.name}</h4>
                <p className="text-sm text-gray-600">{location.description}</p>
                {location.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs">{location.rating}</span>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
