import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RestaurantBookingModal } from "@/components/RestaurantBookingModal";
import { 
  Utensils, 
  Star, 
  Clock, 
  MapPin, 
  Users,
  Phone,
  Heart,
  Coffee,
  Pizza,
  Apple
} from "lucide-react";
import restaurantImage from "@/assets/morocco-restaurant.jpg";

const RestaurantPage = () => {
  const handleContact = (restaurant: any) => {
    window.open(`tel:${restaurant.phone}`, '_self');
  };

  const restaurants = [
    {
      id: 1,
      name: "Atlas Traditional Restaurant",
      cuisine: "Authentic Moroccan Cuisine",
      rating: 4.9,
      reviews: 1250,
      price: "$$$$",
      time: "30-45 minutes",
      image: restaurantImage,
      specialties: ["Couscous", "Tagine", "Pastilla"],
      location: "Casablanca - City Center",
      phone: "+212 522 XX XX XX"
    },
    {
      id: 2,
      name: "Grand Stadium Cafeteria",
      cuisine: "Fast Food & Beverages",
      rating: 4.5,
      reviews: 850,
      price: "$$",
      time: "10-15 minutes",
      image: restaurantImage,
      specialties: ["Moroccan Burger", "Fresh Juices", "Pastries"],
      location: "Inside Grand Stadium",
      phone: "+212 661 XX XX XX"
    },
    {
      id: 3,
      name: "Al-Andalus Sweets",
      cuisine: "Sweets & Moroccan Hospitality",
      rating: 4.8,
      reviews: 620,
      price: "$$$",
      time: "15-20 minutes",
      image: restaurantImage,
      specialties: ["Chebakia", "Mahanche", "Moroccan Tea"],
      location: "Marrakech - Jemaa el-Fnaa",
      phone: "+212 524 XX XX XX"
    },
    {
      id: 4,
      name: "Mediterranean Seafood",
      cuisine: "Fresh Seafood",
      rating: 4.7,
      reviews: 940,
      price: "$$$",
      time: "25-35 minutes",
      image: restaurantImage,
      specialties: ["Grilled Sardines", "Sea Bream with Vegetables", "Seafood Salad"],
      location: "Tangier - Port",
      phone: "+212 539 XX XX XX"
    }
  ];

  const cuisineTypes = [
    { icon: "🍛", name: "Traditional Moroccan", count: "45 restaurants" },
    { icon: "🍔", name: "Fast Food", count: "38 restaurants" },
    { icon: "🐟", name: "Seafood", count: "28 restaurants" },
    { icon: "🧁", name: "Sweets & Cafes", count: "52 restaurants" },
    { icon: "🥗", name: "Healthy & Vegetarian", count: "22 restaurants" },
    { icon: "🍕", name: "International", count: "35 restaurants" }
  ];

  const specialOffers = [
    "20% discount for fans with tickets",
    "Free meals for children under 12",
    "Special World Cup 2030 menu",
    "Free delivery around stadiums"
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
                <Utensils className="w-4 h-4 mr-2" />
                Restaurants & Cafes
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Taste Authentic Moroccan Flavors
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover the best restaurants and cafes that will give you an unforgettable dining experience during World Cup 2030
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <RestaurantBookingModal
                  restaurantName="Morocco World Cup Restaurant"
                  restaurantId="general-reservation"
                  defaultData={{
                    date: '',
                    time: '19:00',
                    partySize: 2
                  }}
                >
                  <Button variant="hero" size="lg">
                    Réserver votre table maintenant
                  </Button>
                </RestaurantBookingModal>
                <Button variant="outline" size="lg">
                  <MapPin className="w-4 h-4 mr-2" />
                  Près de moi
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cuisine Types */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Cuisine Types
              </h2>
              <p className="text-muted-foreground">
                Choose your favorite type
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {cuisineTypes.map((cuisine, index) => (
                <Card
                  key={cuisine.name}
                  className="p-6 text-center hover:shadow-morocco transition-all duration-300 group cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="text-4xl group-hover:scale-110 transition-transform">
                      {cuisine.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground text-sm">
                        {cuisine.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {cuisine.count}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Restaurants */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Featured Restaurants
              </h2>
              <p className="text-muted-foreground">
                Top recommended restaurants by fans
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {restaurants.map((restaurant) => (
                <Card
                  key={restaurant.id}
                  className="overflow-hidden bg-card hover:shadow-morocco transition-all duration-300 group"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <img 
                              src={restaurant.image} 
                              alt={restaurant.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-foreground">
                              {restaurant.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {restaurant.cuisine}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm">
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{restaurant.rating}</span>
                            <span className="text-muted-foreground">({restaurant.reviews})</span>
                          </div>
                          <Badge variant="outline">
                            {restaurant.price}
                          </Badge>
                          <div className="flex items-center space-x-1 rtl:space-x-reverse text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{restaurant.time}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{restaurant.location}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Specialties:</p>
                        <div className="flex flex-wrap gap-2">
                          {restaurant.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3 rtl:space-x-reverse">
                      <RestaurantBookingModal
                        restaurantName={restaurant.name}
                        restaurantId={restaurant.id.toString()}
                        defaultData={{
                          date: '',
                          time: '19:00',
                          partySize: 2
                        }}
                      >
                        <Button variant="hero" className="flex-1">
                          Réserver table
                        </Button>
                      </RestaurantBookingModal>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleContact(restaurant)}
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offers */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Special Offers for Fans
              </h2>
              <p className="text-muted-foreground">
                Take advantage of exclusive offers during World Cup
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {specialOffers.map((offer, index) => (
                <Card key={index} className="p-6 bg-gradient-card">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-morocco rounded-full flex items-center justify-center">
                      <Coffee className="w-6 h-6 text-primary-foreground" />
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

export default RestaurantPage;