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
  Wifi, 
  Car, 
  Users,
  Phone,
  Heart,
  MapPin,
  Key,
  Calendar,
  Shield
} from "lucide-react";
import rentalImage from "@/assets/morocco-villa-rental.jpg";

const RentalPage = () => {
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
      image: rentalImage,
      amenities: ["Rooftop Terrace", "Traditional Breakfast", "WiFi", "AC"],
      location: "Marrakech - Old Medina",
      host: "Fatima",
      featured: true
    },
    {
      id: 3,
      title: "Modern Apartment Near Stadium",
      type: "Apartment",
      rating: 4.7,
      reviews: 210,
      price: "From 800 MAD/night",
      guests: "4 guests",
      bedrooms: "2 bedrooms",
      image: rentalImage,
      amenities: ["WiFi", "Kitchen", "Balcony", "Parking"],
      location: "Near Grand Stadium",
      host: "Ahmed",
      featured: true
    },
    {
      id: 4,
      title: "Beachfront House - Tangier",
      type: "House",
      rating: 4.6,
      reviews: 150,
      price: "From 1500 MAD/night",
      guests: "6 guests",
      bedrooms: "3 bedrooms",
      image: rentalImage,
      amenities: ["Beach Access", "BBQ Area", "WiFi", "Sea View"],
      location: "Tangier - Mediterranean Coast",
      host: "Omar",
      featured: false
    },
    {
      id: 5,
      title: "Budget Studio for Fans",
      type: "Studio",
      rating: 4.3,
      reviews: 85,
      price: "From 400 MAD/night",
      guests: "2 guests",
      bedrooms: "1 bedroom",
      image: rentalImage,
      amenities: ["WiFi", "Kitchenette", "Fan Zone Access", "AC"],
      location: "Rabat - Downtown",
      host: "Karim",
      featured: false
    },
    {
      id: 6,
      title: "Mountain Chalet - Atlas",
      type: "Chalet",
      rating: 4.8,
      reviews: 65,
      price: "From 1200 MAD/night",
      guests: "5 guests",
      bedrooms: "2 bedrooms",
      image: rentalImage,
      amenities: ["Mountain View", "Fireplace", "WiFi", "Hiking Trails"],
      location: "Atlas Mountains - Imlil",
      host: "Hassan",
      featured: false
    }
  ];

  const rentalTypes = [
    { icon: "🏖️", name: "Villas", count: "45 properties" },
    { icon: "🏛️", name: "Riads", count: "60 properties" },
    { icon: "🏢", name: "Apartments", count: "120 properties" },
    { icon: "🏠", name: "Houses", count: "80 properties" },
    { icon: "🏔️", name: "Chalets", count: "25 properties" },
    { icon: "⚽", name: "Fan Houses", count: "35 properties" }
  ];

  const whyChooseUs = [
    "Verified hosts and properties",
    "24/7 customer support",
    "Easy booking and cancellation",
    "Local area expertise"
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
                Vacation Rentals
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
                <Card
                  key={type.name}
                  className="p-6 text-center hover:shadow-morocco transition-all duration-300 group cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="text-4xl group-hover:scale-110 transition-transform">
                      {type.icon}
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
              ))}
            </div>
          </div>
        </section>

        {/* Featured Rentals */}
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                            <h3 className="text-lg font-semibold text-foreground leading-tight">
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
                          <span className="text-muted-foreground">Host: {rental.host}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{rental.location}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Users className="w-4 h-4" />
                          <span>{rental.guests}</span>
                        </div>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Home className="w-4 h-4" />
                          <span>{rental.bedrooms}</span>
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
                        <Button variant="outline" size="sm">
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

        {/* All Rentals */}
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
              {whyChooseUs.map((feature, index) => (
                <Card key={index} className="p-6 bg-gradient-card">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-morocco rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <p className="text-foreground font-medium">
                      {feature}
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

export default RentalPage;