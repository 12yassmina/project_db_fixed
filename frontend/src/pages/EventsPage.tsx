import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReservationModal } from "@/components/ReservationModal";
import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  Music,
  Palette,
  Sparkles,
  Ticket,
  Star,
  Heart
} from "lucide-react";
import eventImage from "@/assets/morocco-cultural-event.jpeg";

const EventsPage = () => {
  const [showReservation, setShowReservation] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleReservation = (event: any) => {
    setSelectedEvent(event);
    setShowReservation(true);
  };

  const events = [
    {
      id: 1,
      title: "Morocco 2030 World Cup Opening Ceremony",
      category: "Official Ceremonies",
      date: "June 15, 2030",
      time: "20:00",
      location: "Grand Stadium - Casablanca",
      price: "From 500 MAD",
      image: eventImage,
      description: "Legendary opening ceremony combining Moroccan heritage with global performances",
      attendees: "80,000 spectators",
      featured: true
    },
    {
      id: 2,
      title: "Gnawa and World Music Festival",
      category: "Music & Arts",
      date: "June 20-25, 2030",
      time: "21:00",
      location: "Essaouira - Old Port",
      price: "Free",
      image: eventImage,
      description: "Largest music festival bringing together artists from around the world",
      attendees: "50,000 visitors daily",
      featured: false
    },
    {
      id: 3,
      title: "Contemporary Moroccan Art Exhibition",
      category: "Culture & Arts",
      date: "June 1 - July 31, 2030",
      time: "10:00 - 22:00",
      location: "National Museum - Rabat",
      price: "50 MAD",
      image: eventImage,
      description: "Journey through Moroccan art history from traditional to contemporary",
      attendees: "200 visitors daily",
      featured: false
    },
    {
      id: 4,
      title: "International Moroccan Cuisine Festival",
      category: "Food & Drink",
      date: "July 10-17, 2030",
      time: "12:00 - 23:00",
      location: "Marrakech - Jemaa el-Fnaa Square",
      price: "100 MAD",
      image: eventImage,
      description: "Taste the most delicious Moroccan dishes with live cooking shows",
      attendees: "5,000 visitors daily",
      featured: true
    },
    {
      id: 5,
      title: "Moroccan Poetry and Literature Night",
      category: "Literature & Culture",
      date: "July 5, 2030",
      time: "20:30",
      location: "Fez - Old Medina",
      price: "80 MAD",
      image: eventImage,
      description: "Poetry evening with renowned Moroccan poets and writers",
      attendees: "300 participants",
      featured: false
    },
    {
      id: 6,
      title: "Grand Fireworks Display",
      category: "Entertainment",
      date: "July 14, 2030",
      time: "22:00",
      location: "Tangier - Mediterranean Coast",
      price: "Free",
      image: eventImage,
      description: "Spectacular fireworks show over the Mediterranean Sea",
      attendees: "100,000 spectators",
      featured: true
    }
  ];

  const categories = [
    { name: "All", count: "50+", active: true },
    { name: "Official Ceremonies", count: "8", active: false },
    { name: "Music & Arts", count: "15", active: false },
    { name: "Culture & Arts", count: "12", active: false },
    { name: "Food & Drink", count: "10", active: false },
    { name: "Entertainment", count: "20", active: false }
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
                <Sparkles className="w-4 h-4 mr-2" />
                Events & Activities
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Experience a Unique Cultural Journey
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover hundreds of cultural, artistic and entertainment events taking place during Morocco World Cup 2030
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  View All Events
                </Button>
                <Button variant="outline" size="lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  Full Calendar
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 bg-muted">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={category.active ? "hero" : "outline"}
                  size="sm"
                  className="flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Featured Events
              </h2>
              <p className="text-muted-foreground">
                The most important events you cannot miss
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {events.filter(event => event.featured).map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden bg-card hover:shadow-morocco transition-all duration-300 group"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="w-16 h-16 rounded-lg overflow-hidden">
                            <img 
                              src={event.image} 
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <div>
                            <Badge variant="secondary" className="mb-2">
                              {event.category}
                            </Badge>
                            <h3 className="text-xl font-semibold text-foreground">
                              {event.title}
                            </h3>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                      
                      <Button variant="ghost" size="icon">
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <Badge variant="outline" className="font-medium">
                        {event.price}
                      </Badge>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button variant="outline" size="sm">
                          Plus de détails
                        </Button>
                        <Button 
                          variant="hero" 
                          size="sm"
                          onClick={() => handleReservation(event)}
                        >
                          <Ticket className="w-4 h-4 mr-1" />
                          Réserver
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All Events */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                All Events
              </h2>
              <p className="text-muted-foreground">
                Explore the complete cultural program
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.filter(event => !event.featured).map((event) => (
                <Card
                  key={event.id}
                  className="p-6 bg-card hover:shadow-elegant transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-10 h-10 rounded-lg overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="flex-1">
                        <Badge variant="secondary" className="text-xs mb-1">
                          {event.category}
                        </Badge>
                        <h3 className="font-semibold text-foreground text-sm leading-tight">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <Badge variant="outline" className="text-xs">
                        {event.price}
                      </Badge>
                      <Button 
                        variant="hero" 
                        size="sm"
                        onClick={() => handleReservation(event)}
                      >
                        Réserver
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Don&apos;t Miss Any Event!
              </h2>
              <p className="text-muted-foreground">
                Subscribe to our newsletter and get event updates delivered to you first
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  Subscribe to Notifications
                </Button>
                <Button variant="outline" size="lg">
                  Download App
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChat />
      
      {/* Modal de réservation */}
      {selectedEvent && (
        <ReservationModal
          isOpen={showReservation}
          onClose={() => {
            setShowReservation(false);
            setSelectedEvent(null);
          }}
          itemName={selectedEvent.title}
          itemType="event"
          itemPrice={selectedEvent.price}
        />
      )}
    </div>
  );
};

export default EventsPage;