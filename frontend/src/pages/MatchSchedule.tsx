import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Team Logos for World Cup 2030
const teamLogos = {
  morocco: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg",
  spain: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg",
  portugal: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg",
  brazil: "https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg",
  argentina: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
  france: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
  germany: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
  england: "https://upload.wikimedia.org/wikipedia/commons/b/be/Flag_of_England.svg",
  italy: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg",
  netherlands: "https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg"
};

const MatchSchedule = () => {
  const matchSchedule = [
    {
      id: 1,
      homeTeam: { name: "Morocco", logo: teamLogos.morocco, code: "MAR" },
      awayTeam: { name: "Spain", logo: teamLogos.spain, code: "ESP" },
      date: "2030-06-11",
      time: "21:00",
      stadium: "Grand Stade Hassan II, Casablanca",
      matchType: "Opening Match",
      group: "A"
    },
    {
      id: 2,
      homeTeam: { name: "Brazil", logo: teamLogos.brazil, code: "BRA" },
      awayTeam: { name: "Argentina", logo: teamLogos.argentina, code: "ARG" },
      date: "2030-06-13",
      time: "18:00",
      stadium: "Stade Mohammed V, Casablanca",
      matchType: "Group Stage",
      group: "B"
    },
    {
      id: 3,
      homeTeam: { name: "France", logo: teamLogos.france, code: "FRA" },
      awayTeam: { name: "Germany", logo: teamLogos.germany, code: "GER" },
      date: "2030-06-15",
      time: "21:00",
      stadium: "Stade Prince Moulay Abdellah, Rabat",
      matchType: "Group Stage",
      group: "C"
    },
    {
      id: 4,
      homeTeam: { name: "Portugal", logo: teamLogos.portugal, code: "POR" },
      awayTeam: { name: "England", logo: teamLogos.england, code: "ENG" },
      date: "2030-06-17",
      time: "18:00",
      stadium: "Stade de Marrakech, Marrakech",
      matchType: "Group Stage",
      group: "D"
    },
    {
      id: 5,
      homeTeam: { name: "Italy", logo: teamLogos.italy, code: "ITA" },
      awayTeam: { name: "Netherlands", logo: teamLogos.netherlands, code: "NED" },
      date: "2030-06-19",
      time: "21:00",
      stadium: "Stade de Fès, Fès",
      matchType: "Group Stage",
      group: "E"
    },
    {
      id: 6,
      homeTeam: { name: "Morocco", logo: teamLogos.morocco, code: "MAR" },
      awayTeam: { name: "Portugal", logo: teamLogos.portugal, code: "POR" },
      date: "2030-06-21",
      time: "18:00",
      stadium: "Stade de Tangier, Tangier",
      matchType: "Group Stage",
      group: "A"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-6">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Match Schedule
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                World Cup 2030 fixtures featuring the best teams from around the world
              </p>
            </div>
          </div>
        </section>

        {/* Match Schedule */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 max-w-4xl mx-auto">
              {matchSchedule.map((match, index) => (
                <Card
                  key={match.id}
                  className="p-6 bg-gradient-card hover:shadow-morocco transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    {/* Match Type & Group */}
                    <div className="flex items-center space-x-2 md:absolute md:top-4 md:left-6">
                      <Badge 
                        className={match.matchType === "Opening Match" ? "bg-red-500/10 text-red-700" : ""}
                      >
                        {match.matchType}
                      </Badge>
                      {match.group && (
                        <Badge variant="outline">
                          Group {match.group}
                        </Badge>
                      )}
                    </div>

                    {/* Teams */}
                    <div className="flex items-center justify-center space-x-8 flex-1">
                      {/* Home Team */}
                      <div className="flex flex-col items-center space-y-2">
                        <img 
                          src={match.homeTeam.logo} 
                          alt={match.homeTeam.name}
                          className="w-16 h-12 object-contain"
                        />
                        <div className="text-center">
                          <p className="font-semibold text-lg">{match.homeTeam.name}</p>
                          <p className="text-sm text-muted-foreground">{match.homeTeam.code}</p>
                        </div>
                      </div>

                      {/* VS */}
                      <div className="flex flex-col items-center space-y-2">
                        <div className="text-2xl font-bold text-primary">VS</div>
                        <div className="text-sm text-muted-foreground">{match.time}</div>
                      </div>

                      {/* Away Team */}
                      <div className="flex flex-col items-center space-y-2">
                        <img 
                          src={match.awayTeam.logo} 
                          alt={match.awayTeam.name}
                          className="w-16 h-12 object-contain"
                        />
                        <div className="text-center">
                          <p className="font-semibold text-lg">{match.awayTeam.name}</p>
                          <p className="text-sm text-muted-foreground">{match.awayTeam.code}</p>
                        </div>
                      </div>
                    </div>

                    {/* Match Details */}
                    <div className="flex flex-col space-y-2 text-sm text-muted-foreground md:min-w-[200px]">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(match.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{match.time} Local Time</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-xs">{match.stadium}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* More Matches Coming Soon */}
            <div className="text-center mt-12">
              <Card className="p-8 bg-gradient-card max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-2">More Matches Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Complete fixture list will be announced after the final draw ceremony
                </p>
                <Button variant="outline">
                  Get Notified
                </Button>
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

export default MatchSchedule;
