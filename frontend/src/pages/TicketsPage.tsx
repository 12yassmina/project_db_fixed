import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Ticket, Users, Clock, CheckCircle, Star, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const TicketsPage = () => {
  const ticketCategories = [
    {
      id: 1,
      name: "Group Stage",
      description: "Tickets for group stage matches",
      price: "From $75",
      features: ["Standard seating", "Food & beverage access", "Official merchandise discount"],
      availability: "Available",
      popular: false
    },
    {
      id: 2,
      name: "Round of 16",
      description: "Knockout stage excitement begins",
      price: "From $150",
      features: ["Premium seating", "Priority entry", "Complimentary program", "Food & beverage access"],
      availability: "Limited",
      popular: true
    },
    {
      id: 3,
      name: "Quarter Finals",
      description: "Top 8 teams battle for semifinals",
      price: "From $300",
      features: ["Premium seating", "VIP entrance", "Welcome reception", "Exclusive merchandise"],
      availability: "Waitlist",
      popular: false
    },
    {
      id: 4,
      name: "Semi Finals",
      description: "The road to the final",
      price: "From $500",
      features: ["VIP seating", "Private lounge access", "Gourmet dining", "Meet & greet opportunities"],
      availability: "Waitlist",
      popular: false
    },
    {
      id: 5,
      name: "Final",
      description: "The ultimate football experience",
      price: "From $1,200",
      features: ["Hospitality package", "Premium dining", "Official ceremony access", "Exclusive memorabilia"],
      availability: "Sold Out",
      popular: false
    }
  ];

  const ticketPhases = [
    {
      phase: "Phase 1",
      title: "FIFA Members Priority",
      status: "Completed",
      dates: "Jan 15 - Feb 28, 2024",
      description: "Exclusive access for FIFA members and sponsors"
    },
    {
      phase: "Phase 2",
      title: "Morocco Residents Priority",
      status: "Active",
      dates: "Mar 1 - Apr 30, 2024",
      description: "Special pricing for Moroccan residents"
    },
    {
      phase: "Phase 3",
      title: "General Public Sale",
      status: "Upcoming",
      dates: "May 1 - Dec 31, 2024",
      description: "Open to international fans worldwide"
    }
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available": return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "Limited": return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "Waitlist": return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "Sold Out": return "bg-red-500/10 text-red-700 dark:text-red-400";
      default: return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
      case "Active": return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "Upcoming": return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      default: return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
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
                World Cup Tickets
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Book your tickets now and be part of the greatest football celebration in Morocco
              </p>
            </div>
          </div>
        </section>

        {/* Ticket Sales Phases */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground">Ticket Sales Phases</h2>
              <p className="text-muted-foreground">Multiple phases to ensure fair access for everyone</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {ticketPhases.map((phase, index) => (
                <Card
                  key={phase.phase}
                  className="p-6 bg-gradient-card hover:shadow-morocco transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">{phase.phase}</h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(phase.status)}`}>
                        {phase.status}
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-primary">{phase.title}</h4>
                    
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{phase.dates}</span>
                    </div>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Ticket Categories */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground">Ticket Categories</h2>
              <p className="text-muted-foreground">Choose the perfect experience for your World Cup journey</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ticketCategories.map((category, index) => (
                <Card
                  key={category.id}
                  className={`p-6 bg-gradient-card hover:shadow-morocco transition-all duration-300 animate-fade-in-up relative ${
                    category.popular ? 'ring-2 ring-primary' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {category.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-foreground">{category.name}</h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(category.availability)}`}>
                        {category.availability}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">{category.description}</p>
                    
                    <div className="text-2xl font-bold text-primary">{category.price}</div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">Includes:</h4>
                      <ul className="space-y-1">
                        {category.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      variant={category.popular ? "hero" : "outline"}
                      className="w-full"
                      disabled={category.availability === "Sold Out"}
                    >
                      {category.availability === "Sold Out" ? "Sold Out" : 
                       category.availability === "Waitlist" ? "Join Waitlist" : 
                       "Select Tickets"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground">Important Information</h2>
              <p className="text-muted-foreground">Everything you need to know before purchasing</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center bg-gradient-card">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-morocco rounded-full flex items-center justify-center mx-auto">
                    <Shield className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Official Tickets Only</h3>
                  <p className="text-muted-foreground text-sm">
                    Purchase only through official FIFA channels to avoid fraud and ensure entry
                  </p>
                </div>
              </Card>

              <Card className="p-6 text-center bg-gradient-card">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-morocco rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Group Discounts</h3>
                  <p className="text-muted-foreground text-sm">
                    Special rates available for groups of 10 or more people
                  </p>
                </div>
              </Card>

              <Card className="p-6 text-center bg-gradient-card">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-morocco rounded-full flex items-center justify-center mx-auto">
                    <Ticket className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Mobile Tickets</h3>
                  <p className="text-muted-foreground text-sm">
                    All tickets will be delivered digitally to your mobile device
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TicketsPage;