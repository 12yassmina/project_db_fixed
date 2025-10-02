import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Clock, MapPin, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { fetchSuggestions } from '@/lib/api';

// Team Logos for World Cup 2030
const teamLogos = {
  morocco: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg",
  spain: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg",
  brazil: "https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg",
  germany: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
  argentina: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
  france: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
  england: "https://upload.wikimedia.org/wikipedia/commons/b/be/Flag_of_England.svg",
  italy: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg"
};

const SchedulePage = () => {
  const groupStageMatches = [
    {
      id: 1,
      date: "2030-06-15",
      time: "18:00",
      teamA: { name: "Morocco", logo: teamLogos.morocco, code: "MAR" },
      teamB: { name: "Spain", logo: teamLogos.spain, code: "ESP" },
      stadium: "Grand Stadium Casablanca",
      city: "Casablanca",
      group: "Group A",
      status: "Upcoming"
    },
    {
      id: 2,
      date: "2030-06-16",
      time: "15:00",
      teamA: { name: "Brazil", logo: teamLogos.brazil, code: "BRA" },
      teamB: { name: "Germany", logo: teamLogos.germany, code: "GER" },
      stadium: "Tangier International Stadium",
      city: "Tangier",
      group: "Group B",
      status: "Upcoming"
    },
    {
      id: 3,
      date: "2030-06-17",
      time: "21:00",
      teamA: { name: "Argentina", logo: teamLogos.argentina, code: "ARG" },
      teamB: { name: "France", logo: teamLogos.france, code: "FRA" },
      stadium: "Rabat National Stadium",
      city: "Rabat",
      group: "Group C",
      status: "Upcoming"
    },
    {
      id: 4,
      date: "2030-06-18",
      time: "18:00",
      teamA: { name: "England", logo: teamLogos.england, code: "ENG" },
      teamB: { name: "Italy", logo: teamLogos.italy, code: "ITA" },
      stadium: "Marrakech Red City Stadium",
      city: "Marrakech",
      group: "Group D",
      status: "Upcoming"
    }
  ];

  // If there are no matches for a chosen day, show tourist suggestions
  
  const suggestions = [
    "Visit the local medina and try traditional street food",
    "Take a guided tour of historical sites and museums",
    "Book a hammam & spa experience to relax",
    "Explore nearby nature: valleys, oases or coastal walks",
    "Attend a local cultural event or craft market"
  ];

  const [suggestionsState, setSuggestionsState] = useState<string[] | null>(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fetchSuggestions();
      if (mounted && Array.isArray(data)) {
        setSuggestionsState(data);
      } else {
        setSuggestionsState(null); // will fallback to static suggestions
      }
    })();
    return () => { mounted = false; };
  }, []);



  const knockoutMatches = [
    {
      id: 5,
      date: "2030-07-05",
      time: "18:00",
      teamA: "TBD",
      teamB: "TBD",
      stadium: "Grand Stadium Casablanca",
      city: "Casablanca",
      round: "Quarter Final 1",
      status: "TBD"
    },
    {
      id: 6,
      date: "2030-07-06",
      time: "18:00",
      teamA: "TBD",
      teamB: "TBD",
      stadium: "Tangier International Stadium",
      city: "Tangier",
      round: "Quarter Final 2",
      status: "TBD"
    },
    {
      id: 7,
      date: "2030-07-09",
      time: "21:00",
      teamA: "TBD",
      teamB: "TBD",
      stadium: "Rabat National Stadium",
      city: "Rabat",
      round: "Semi Final 1",
      status: "TBD"
    },
    {
      id: 8,
      date: "2030-07-15",
      time: "18:00",
      teamA: "TBD",
      teamB: "TBD",
      stadium: "Grand Stadium Casablanca",
      city: "Casablanca",
      round: "Final",
      status: "TBD"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const MatchCard = ({ match, showGroup = false }: { match: any, showGroup?: boolean }) => (
    <Card className="p-6 bg-gradient-card hover:shadow-morocco transition-all duration-300 group">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{formatDate(match.date)}</span>
            <Clock className="w-4 h-4 text-primary ml-2" />
            <span className="text-sm">{match.time}</span>
          </div>
          {showGroup && match.group && (
            <Badge variant="secondary">{match.group}</Badge>
          )}
          {!showGroup && match.round && (
            <Badge variant="default">{match.round}</Badge>
          )}
        </div>

        <div className="flex items-center justify-center space-x-8">
          <div className="flex flex-col items-center space-y-2">
            {match.teamA.logo && (
              <img 
                src={match.teamA.logo} 
                alt={match.teamA.name}
                className="w-12 h-8 object-contain"
              />
            )}
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">{match.teamA.name || match.teamA}</div>
              {match.teamA.code && (
                <div className="text-xs text-muted-foreground">{match.teamA.code}</div>
              )}
            </div>
          </div>
          <div className="text-2xl font-bold text-muted-foreground">VS</div>
          <div className="flex flex-col items-center space-y-2">
            {match.teamB.logo && (
              <img 
                src={match.teamB.logo} 
                alt={match.teamB.name}
                className="w-12 h-8 object-contain"
              />
            )}
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">{match.teamB.name || match.teamB}</div>
              {match.teamB.code && (
                <div className="text-xs text-muted-foreground">{match.teamB.code}</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{match.stadium}, {match.city}</span>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant={match.status === "Upcoming" ? "secondary" : "outline"}>
            {match.status}
          </Badge>
          <Button variant="ghost" size="sm">
            Set Reminder
          </Button>
        </div>
      </div>
    </Card>
  );

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
                All match times and fixtures for the Morocco World Cup 2030
              </p>
            </div>
          </div>
        </section>

        {/* Tournament Overview */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">32</div>
                <div className="text-sm text-muted-foreground">Teams</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">64</div>
                <div className="text-sm text-muted-foreground">Matches</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">32</div>
                <div className="text-sm text-muted-foreground">Days</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-sm text-muted-foreground">Cities</div>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Tabs */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="group-stage" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
                <TabsTrigger value="group-stage">Group Stage</TabsTrigger>
                <TabsTrigger value="knockout">Knockout</TabsTrigger>
              </TabsList>
              
              <TabsContent value="group-stage" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Group Stage Matches</h2>
                  <p className="text-muted-foreground">June 15 - July 2, 2030</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {groupStageMatches.map((match) => (
                    <MatchCard key={match.id} match={match} showGroup={true} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="knockout" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Knockout Stage</h2>
                  <p className="text-muted-foreground">July 5 - July 15, 2030</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {knockoutMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Tournament Bracket Preview */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground">Tournament Bracket</h2>
              <p className="text-muted-foreground">Follow the path to the final</p>
            </div>
            
            <Card className="p-8 text-center bg-gradient-card">
              <div className="space-y-6">
          {/* If there are no matches for the selected date, show suggestions */}
          {groupStageMatches.length === 0 && (
            <div className="bg-card p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2 text-foreground">No matches found for this day</h3>
              <p className="text-sm text-muted-foreground mb-4">Here are suggestions to enjoy your day:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground max-w-xl mx-auto">
                {(suggestionsState ?? suggestions).map((s) => (
                  <li key={s} className="py-1">{s}</li>
                ))}
              </ul>
              <div className="mt-4">
                <Button asChild>
                </Button>
              </div>
            </div>
          )}

                <Trophy className="w-16 h-16 text-primary mx-auto" />
                <h3 className="text-xl font-semibold">Interactive Bracket Coming Soon</h3>
                <p className="text-muted-foreground">
                  Track teams' progress through the tournament with our interactive bracket system
                </p>
                <Button variant="hero" size="lg">
                  View Full Bracket
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SchedulePage;