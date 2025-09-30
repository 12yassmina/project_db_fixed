import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Star,
  MapPin,
  Users,
  Phone,
  Heart,
  Fuel,
  Settings,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";

const CarRentalsPage = () => {
  const cars = [
    {
      id: 1,
      brand: "Toyota",
      model: "Corolla",
      category: "Economy",
      rating: 4.5,
      reviews: 120,
      pricePerDay: 250,
      seats: 5,
      transmission: "Automatic",
      fuelType: "Petrol",
      doors: 4,
      features: ["AC", "GPS", "Bluetooth"],
      image: "http://localhost:5000/api/images/car",
      location: "Casablanca Airport"
    },
    {
      id: 2,
      brand: "Renault",
      model: "Duster",
      category: "SUV",
      rating: 4.7,
      reviews: 85,
      pricePerDay: 400,
      seats: 7,
      transmission: "Manual",
      fuelType: "Diesel",
      doors: 5,
      features: ["4WD", "AC", "GPS"],
      image: "http://localhost:5000/api/images/car",
      location: "Marrakech Center"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4 text-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="mb-4">
                <Car className="w-4 h-4 mr-2" />
                Car Rentals
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Rent a Car for World Cup 2030
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore Morocco at your own pace during the 2030 World Cup. From economy to luxury vehicles.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  Find Your Perfect Car
                </Button>
                <Button variant="outline" size="lg">
                  <MapPin className="w-4 h-4 mr-2" />
                  Browse Locations
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Available Cars */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Available Cars
              </h2>
              <p className="text-muted-foreground">
                Choose from our fleet of reliable vehicles
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {cars.map((car) => (
                <Card
                  key={car.id}
                  className="overflow-hidden bg-card hover:shadow-morocco transition-all duration-300 group"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Car className="w-8 h-8 text-primary" />
                          <div>
                            <Badge variant="secondary" className="text-xs mb-1">
                              {car.category}
                            </Badge>
                            <h3 className="text-lg font-semibold text-foreground">
                              {car.brand} {car.model}
                            </h3>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 text-sm">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{car.rating}</span>
                            <span className="text-muted-foreground">({car.reviews})</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{car.location}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{car.seats} seats</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Settings className="w-4 h-4" />
                          <span>{car.transmission}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Fuel className="w-4 h-4" />
                          <span>{car.fuelType}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Car className="w-4 h-4" />
                          <span>{car.doors} doors</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Features:</p>
                        <div className="flex flex-wrap gap-2">
                          {car.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {car.pricePerDay} MAD
                        </div>
                        <div className="text-sm text-muted-foreground">per day</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="hero" size="sm">
                          Rent Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Choose Our Car Rentals?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="p-6 text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Fully Insured</h3>
                <p className="text-sm text-muted-foreground">
                  All vehicles come with comprehensive insurance coverage
                </p>
              </Card>
              <Card className="p-6 text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Multiple Locations</h3>
                <p className="text-sm text-muted-foreground">
                  Pick up and drop off at convenient locations across Morocco
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Round-the-clock customer support for your peace of mind
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChat />
    </div>
  );
};

export default CarRentalsPage;
