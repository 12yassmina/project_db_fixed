import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HotelBookingModal } from "@/components/HotelBookingModal";
import { 
  Hotel, 
  Star, 
  Wifi, 
  Car, 
  Users,
  Phone,
  Heart,
  MapPin,
  Coffee,
  Utensils,
  Waves
} from "lucide-react";
import { Link } from "react-router-dom";
import luxuryHotelImage from "@/assets/morocco-luxury-hotel.jpg";
import riadImage from "@/assets/morocco-home-interior.png";
import villaImage from "@/assets/morocco-villa-rental.jpg";

const HotelPage = () => {
  const handleContact = (hotel: any) => {
    window.open(`tel:${hotel.phone}`, '_self');
  };

  const hotels = [
    {
      id: 1,
      name: "Grand Atlas Hotel & Spa",
      rating: 4.9,
      reviews: 2340,
      price: "From 1200 MAD/night",
      image: luxuryHotelImage,
      amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant"],
      location: "Marrakech - Gueliz",
      description: "Luxury hotel with panoramic views of the Atlas Mountains",
      phone: "+212 524 XX XX XX",
      featured: true
    },
    {
      id: 2,
      name: "Stadium View Hotel",
      category: "4-star Business",
      rating: 4.7,
      reviews: 1850,
      price: "From 800 MAD/night",
      image: luxuryHotelImage,
      amenities: ["Free WiFi", "Gym", "Business Center", "Parking"],
      location: "Near Grand Stadium",
      phone: "+212 522 YY YY YY",
      featured: true
    },
    {
      id: 3,
      name: "Riad Marrakech Heritage",
      category: "Traditional Riad",
      rating: 4.8,
      reviews: 1120,
      price: "From 600 MAD/night",
      image: riadImage,
      amenities: ["Traditional Breakfast", "Rooftop Terrace", "Hammam", "WiFi"],
      location: "Marrakech - Medina",
      phone: "+212 524 ZZ ZZ ZZ",
      featured: false
    },
    {
      id: 4,
      name: "Seaside Resort Tangier",
      category: "Beach Resort",
      rating: 4.6,
      reviews: 980,
      price: "From 900 MAD/night",
      image: villaImage,
      amenities: ["Beach Access", "Pool", "Restaurant", "Spa"],
      location: "Tangier - Mediterranean Coast",
      phone: "+212 539 AA AA AA",
      featured: false
    },
    {
      id: 5,
      name: "Budget Inn Rabat",
      category: "Budget Friendly",
      rating: 4.2,
      reviews: 650,
      price: "From 300 MAD/night",
      image: luxuryHotelImage,
      amenities: ["Free WiFi", "24h Reception", "Breakfast", "AC"],
      location: "Rabat - Downtown",
      phone: "+212 537 BB BB BB",
      featured: false
    },
    {
      id: 6,
      name: "Fan Zone Hotel",
      category: "Fan Experience",
      rating: 4.5,
      reviews: 1200,
      price: "From 700 MAD/night",
      image: luxuryHotelImage,
      amenities: ["Fan Lounge", "Match Viewing", "Shuttle Service", "WiFi"],
      location: "Multiple Locations",
      phone: "+212 661 CC CC CC",
      featured: true
    }
  ];

  const hotelTypes = [
    { image: luxuryHotelImage, name: "Luxury Hotels", count: "25 hotels", route: "/hotels/luxury" },
    { image: luxuryHotelImage, name: "Business Hotels", count: "35 hotels", route: "/hotels/business" },
    { image: riadImage, name: "Traditional Riads", count: "45 hotels", route: "/hotels/riads" },
    { image: villaImage, name: "Beach Resorts", count: "18 hotels", route: "/hotels/resorts" },
    { image: luxuryHotelImage, name: "Budget Hotels", count: "60 hotels", route: "/hotels/budget" },
    { image: villaImage, name: "Fan Hotels", count: "12 hotels", route: "/hotels/fan" }
  ];

  const specialOffers = [
    "Free airport transfer for 3+ nights",
    "World Cup package with breakfast",
    "Group booking discounts up to 30%",
    "Free cancellation until match day"
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
                <Hotel className="w-4 h-4 mr-2" />
                Hotels & Accommodation
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Comfortable Stay During World Cup 2030
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Book your perfect accommodation from luxury hotels to traditional riads near stadiums and tourist attractions
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <HotelBookingModal
                  hotelName="Morocco World Cup Hotel"
                  hotelId="general-booking"
                  defaultData={{
                    checkIn: '',
                    checkOut: '',
                    guests: 2,
                    rooms: 1
                  }}
                >
                  <Button variant="hero" size="lg">
                    Book Your Stay Now
                  </Button>
                </HotelBookingModal>
                <Link to="/hotels/nearby">
                  <Button variant="outline" size="lg">
                    <MapPin className="w-4 h-4 mr-2" />
                    Hotels Near Me
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Hotel Types */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Accommodation Types
              </h2>
              <p className="text-muted-foreground">
                Choose what suits your budget and preferences
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {hotelTypes.map((type, index) => (
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

        {/* Featured Hotels */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Featured Hotels
              </h2>
              <p className="text-muted-foreground">
                Top recommended accommodations for World Cup fans
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.filter(hotel => hotel.featured).map((hotel) => (
                <Card
                  key={hotel.id}
                  className="overflow-hidden bg-card hover:shadow-morocco transition-all duration-300 group"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <img 
                              src={hotel.image} 
                              alt={hotel.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <div>
                            <Badge variant="secondary" className="text-xs mb-1">
                              {hotel.category}
                            </Badge>
                            <h3 className="text-lg font-semibold text-foreground">
                              {hotel.name}
                            </h3>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm">
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{hotel.rating}</span>
                            <span className="text-muted-foreground">({hotel.reviews})</span>
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
                        <span>{hotel.location}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Amenities:</p>
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <Badge variant="outline" className="font-medium">
                        {hotel.price}
                      </Badge>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => window.alert(`Call ${hotel.phone}`)}>
                          <Phone className="w-4 h-4" />
                        </Button>
                        <HotelBookingModal
                          hotelName={hotel.name}
                          hotelId={hotel.id.toString()}
                          defaultData={{
                            checkIn: '',
                            checkOut: '',
                            guests: 2,
                            rooms: 1
                          }}
                        >
                          <Button variant="hero" size="sm">
                            Book Now
                          </Button>
                        </HotelBookingModal>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All Hotels */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                All Hotels
              </h2>
              <p className="text-muted-foreground">
                Explore all available accommodations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.filter(hotel => !hotel.featured).map((hotel) => (
                <Card
                  key={hotel.id}
                  className="p-6 bg-card hover:shadow-elegant transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-10 h-10 rounded-lg overflow-hidden">
                        <img 
                          src={hotel.image} 
                          alt={hotel.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="text-xs mb-1">
                          {hotel.category}
                        </Badge>
                        <h3 className="font-semibold text-foreground text-sm leading-tight">
                          {hotel.name}
                        </h3>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-muted-foreground">{hotel.rating} ({hotel.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <MapPin className="w-3 h-3" />
                        <span>{hotel.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <Badge variant="outline" className="text-xs">
                        {hotel.price}
                      </Badge>
                      <div className="flex gap-2">
                        {hotel.phone && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleContact(hotel)}
                          >
                            <Phone className="w-3 h-3" />
                          </Button>
                        )}
                        <HotelBookingModal
                          hotelName={hotel.name}
                          hotelId={hotel.id.toString()}
                          defaultData={{
                            checkIn: '',
                            checkOut: '',
                            guests: 2,
                            rooms: 1
                          }}
                        >
                          <Button variant="hero" size="sm">
                            Book Now
                          </Button>
                        </HotelBookingModal>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offers */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Special Offers for Fans
              </h2>
              <p className="text-muted-foreground">
                Exclusive deals during World Cup period
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {specialOffers.map((offer, index) => (
                <Card key={index} className="p-6 bg-gradient-card">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-morocco rounded-full flex items-center justify-center">
                      <Hotel className="w-6 h-6 text-primary-foreground" />
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

export default HotelPage;