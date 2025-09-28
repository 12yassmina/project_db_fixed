import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HouseRentalBookingModal } from "@/components/HouseRentalBookingModal";
import {
  Home,
  Star,
  MapPin,
  Users,
  Phone,
  Heart,
  Wifi,
  Bed,
  Bath,
  Car,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";
import rentalImage from "@/assets/morocco-villa-rental.jpg";

const HouseRentalsPage = () => {
  const handleContact = (rental: any) => {
    window.open(`tel:${rental.phone}`, '_self');
  };

  const rentals = [
    {
      id: 1,
      title: "Luxury Villa with Pool - Casablanca",
      type: "Villa",
      rating: 4.9,
      reviews: 180,
      price: "From 2500 MAD/night",
      guests: "8 guests",
      bedrooms: "4 bedrooms",
      bathrooms: "3 bathrooms",
      image: rentalImage,
      amenities: ["Private Pool", "WiFi", "Parking", "Kitchen"],
      location: "Casablanca - Ain Diab",
      host: "Youssef",
      featured: true
    },
    {
      id: 2,
      title: "Traditional Riad in Medina",
      type: "Riad",
      rating: 4.8,
      reviews: 95,
      price: "From 1800 MAD/night",
      guests: "6 guests",
      bedrooms: "3 bedrooms",
      bathrooms: "2 bathrooms",
      image: rentalImage,
      amenities: ["Rooftop Terrace", "Traditional Breakfast", "WiFi", "AC"],
      location: "Marrakech - Old Medina",
      host: "Fatima",
      featured: true
    },
    {
      id: 3,
      title: "Modern Apartment in Rabat",
      type: "Apartment",
      rating: 4.6,
      reviews: 23,
      price: "From 800 MAD/night",
      guests: "4 guests",
      bedrooms: "2 bedrooms",
      bathrooms: "1 bathroom",
      image: rentalImage,
      amenities: ["WiFi", "Kitchen", "Balcony", "Elevator"],
      location: "Rabat - Agdal",
      host: "Ahmed",
      featured: false
    },
    {
      id: 4,
      title: "Beachfront House in Tangier",
      type: "House",
      rating: 4.7,
      reviews: 67,
      price: "From 1200 MAD/night",
      guests: "6 guests",
      bedrooms: "3 bedrooms",
      bathrooms: "2 bathrooms",
      image: rentalImage,
      amenities: ["Beach Access", "WiFi", "Parking", "Garden"],
      location: "Tangier - Malabata",
      host: "Laila",
      featured: false
    }
  ];

  const rentalTypes = [
    { image: rentalImage, name: "Villas", count: "25 properties", route: "/rentals/villas" },
    { image: rentalImage, name: "Riads", count: "35 properties", route: "/rentals/riads" },
    { image: rentalImage, name: "Apartments", count: "45 properties", route: "/rentals/apartments" },
    { image: rentalImage, name: "Houses", count: "18 properties", route: "/rentals/houses" },
    { image: rentalImage, name: "Penthouses", count: "8 properties", route: "/rentals/penthouses" },
    { image: rentalImage, name: "Studios", count: "30 properties", route: "/rentals/studios" }
  ];

  const specialOffers = [
    "Free airport transfer for 7+ nights",
    "World Cup package with local guide",
    "Group booking discounts up to 25%",
    "Free cancellation until 48h before"
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
                <Home className="w-4 h-4 mr-2" />
                House Rentals
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Your Home Away From Home
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Rent unique places to stay from local hosts. Experience Morocco like a local during World Cup 2030
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <HouseRentalBookingModal
                  houseName="Morocco Vacation Rental"
                  houseId="general-rental"
                  defaultData={{
                    checkIn: '',
                    checkOut: '',
                    guests: 2
                  }}
                >
                  <Button variant="hero" size="lg">
                    Find Your Perfect Place
                  </Button>
                </HouseRentalBookingModal>
                <Button variant="outline" size="lg">
                  <MapPin className="w-4 h-4 mr-2" />
                  Browse by Location
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Rental Types */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Property Types
              </h2>
              <p className="text-muted-foreground">
                Find the perfect accommodation type for your stay
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {rentalTypes.map((type, index) => (
                <Link to={type.route} key={type.name}>
                  <Card
                    className="p-6 text-center hover:shadow-morocco transition-all duration-300 group cursor-pointer"
                  >
                    <div className="space-y-3">
                      <div className="w-full h-24 overflow-hidden rounded-lg group-hover:scale-105 transition-transform">
                        <img 
                          src={type.image} 
                          alt={type.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground text-sm">
                          {type.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {type.count}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Featured Properties
              </h2>
              <p className="text-muted-foreground">
                Top-rated places to stay chosen by our community
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {rentals.filter(rental => rental.featured).map((rental) => (
                <Card
                  key={rental.id}
                  className="overflow-hidden bg-card hover:shadow-morocco transition-all duration-300 group"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <img 
                              src={rental.image} 
                              alt={rental.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <div>
                            <Badge variant="secondary" className="text-xs mb-1">
                              {rental.type}
                            </Badge>
                            <h3 className="text-lg font-semibold text-foreground">
                              {rental.title}
                            </h3>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm">
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{rental.rating}</span>
                            <span className="text-muted-foreground">({rental.reviews})</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => window.alert('Added to favorites!')}>
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{rental.location}</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{rental.guests}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Bed className="w-4 h-4" />
                          <span>{rental.bedrooms}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Bath className="w-4 h-4" />
                          <span>{rental.bathrooms}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Amenities:</p>
                        <div className="flex flex-wrap gap-2">
                          {rental.amenities.map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <Badge variant="outline" className="font-medium">
                        {rental.price}
                      </Badge>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => window.alert(`Contact ${rental.host}`)}
                        >
                          <Phone className="w-4 h-4" />
                        </Button>
                        <HouseRentalBookingModal
                          houseName={rental.title}
                          houseId={rental.id.toString()}
                          defaultData={{
                            checkIn: '',
                            checkOut: '',
                            guests: parseInt(rental.guests.split(' ')[0])
                          }}
                        >
                          <Button variant="hero" size="sm">
                            Book Now
                          </Button>
                        </HouseRentalBookingModal>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All Properties */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                All Properties
              </h2>
              <p className="text-muted-foreground">
                Discover all available vacation rentals
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rentals.filter(rental => !rental.featured).map((rental) => (
                <Card
                  key={rental.id}
                  className="p-6 bg-card hover:shadow-elegant transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-10 h-10 rounded-lg overflow-hidden">
                        <img 
                          src={rental.image} 
                          alt={rental.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="text-xs mb-1">
                          {rental.type}
                        </Badge>
                        <h3 className="font-semibold text-foreground text-sm leading-tight">
                          {rental.title}
                        </h3>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-muted-foreground">{rental.rating} ({rental.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <MapPin className="w-3 h-3" />
                        <span>{rental.location}</span>
                      </div>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <span>{rental.guests}</span>
                        <span>{rental.bedrooms}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <Badge variant="outline" className="text-xs">
                        {rental.price}
                      </Badge>
                      <HouseRentalBookingModal
                        houseName={rental.title}
                        houseId={rental.id.toString()}
                        defaultData={{
                          checkIn: '',
                          checkOut: '',
                          guests: parseInt(rental.guests.split(' ')[0])
                        }}
                      >
                        <Button variant="hero" size="sm">
                          Book
                        </Button>
                      </HouseRentalBookingModal>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-muted-foreground">
                We ensure the best experience for World Cup visitors
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {specialOffers.map((offer, index) => (
                <Card key={index} className="p-6 bg-gradient-card">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-morocco rounded-full flex items-center justify-center">
                      <Home className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <p className="text-foreground font-medium">
                      {offer}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChat />
    </div>
  );
};

export default HouseRentalsPage;
