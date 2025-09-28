import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Ticket } from "lucide-react";
import { STADIUMS } from "@/assets/stadiums";
import { Link, useSearchParams } from "react-router-dom";
import { HotelBookingModal } from "@/components/HotelBookingModal";
import { RestaurantBookingModal } from "@/components/RestaurantBookingModal";
import { HouseRentalBookingModal } from "@/components/HouseRentalBookingModal";

const seedFixtures = [
  {
    id: "match-1",
    date: "2030-06-15",
    time: "18:00",
    group: "Group A",
    home: "Morocco",
    away: "Team B",
    stadiumId: "grand-stade-tanger",
    city: "Tangier",
  },
  {
    id: "match-2",
    date: "2030-06-18",
    time: "21:00",
    group: "Group C",
    home: "Team C",
    away: "Team D",
    stadiumId: "grand-stade-marrakesh",
    city: "Marrakesh",
  },
  {
    id: "match-3",
    date: "2030-07-05",
    time: "20:00",
    group: "Quarter-Final",
    home: "Winner E",
    away: "Winner F",
    stadiumId: "new-stadium-casablanca",
    city: "Casablanca",
  },
  {
    id: "match-4",
    date: "2030-06-22",
    time: "16:00",
    group: "Group B",
    home: "Team G",
    away: "Team H",
    stadiumId: "grand-stade-rabat",
    city: "Rabat",
  },
];

const MatchesPage = () => {
  const [searchParams] = useSearchParams();
  const stadiumFilter = searchParams.get('stadium');
  
  // Filter matches by stadium city if parameter is provided
  const filteredMatches = stadiumFilter 
    ? seedFixtures.filter(match => match.city.toLowerCase() === stadiumFilter.toLowerCase())
    : seedFixtures;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center space-y-4">
            <Badge variant="secondary" className="mb-2">
              <Calendar className="w-4 h-4 mr-2" /> Matches
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
              {stadiumFilter ? `Matches in ${stadiumFilter}` : 'World Cup 2030 Matches'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {stadiumFilter 
                ? `All matches scheduled in ${stadiumFilter}. Book your stay and dining nearby.`
                : 'Browse fixtures by date and stadium. Book your stay and dining nearby in a few clicks.'
              }
            </p>
            {stadiumFilter && (
              <div className="pt-4">
                <Link to="/matches">
                  <Button variant="outline">Show All Matches</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
            {filteredMatches.map((m) => {
              const stadium = STADIUMS.find((s) => s.id === m.stadiumId)!;
              return (
                <Card key={m.id} className="overflow-hidden bg-card hover:shadow-morocco transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img src={stadium.image} alt={stadium.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {m.home} vs {m.away}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" /> {m.date}</span>
                          <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" /> {m.time}</span>
                          <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" /> {stadium.nameAr}</span>
                        </div>
                      </div>
                      <Badge variant={stadium.status === 'Ready' ? 'default' : 'secondary'}>{stadium.statusAr}</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <HotelBookingModal hotelName={`${stadium.cityAr} Hotel`} hotelId={`${stadium.id}-hotel`} defaultData={{ guests: 2 }}>
                        <Button variant="outline" className="w-full">Hotel</Button>
                      </HotelBookingModal>
                      <RestaurantBookingModal restaurantName={`${stadium.cityAr} Restaurant`} restaurantId={`${stadium.id}-restaurant`} defaultData={{ partySize: 2 }}>
                        <Button variant="outline" className="w-full">Restaurant</Button>
                      </RestaurantBookingModal>
                      <HouseRentalBookingModal houseName={`${stadium.cityAr} Stay`} houseId={`${stadium.id}-stay`} defaultData={{ guests: 2 }}>
                        <Button variant="hero" className="w-full">Stay</Button>
                      </HouseRentalBookingModal>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="text-sm text-muted-foreground">
                        Capacity: {stadium.capacity.toLocaleString()} · City: {stadium.cityAr}
                      </div>
                      <Link to="/stadiums">
                        <Button variant="ghost" size="sm"><Ticket className="w-4 h-4 mr-1" /> Stadiums</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
      <AIChat />
    </div>
  );
};

export default MatchesPage;
