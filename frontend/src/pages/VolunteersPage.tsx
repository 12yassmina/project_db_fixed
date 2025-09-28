import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Heart, Clock, MapPin, Languages, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const VolunteersPage = () => {
  const volunteerRoles = [
    {
      id: 1,
      title: "Stadium Operations",
      description: "Assist with match day operations, crowd management, and fan services",
      requirements: ["18+ years old", "Physical fitness", "Team player"],
      timeCommitment: "Full tournament",
      locations: ["All host cities"],
      spots: "2,000",
      category: "Operations"
    },
    {
      id: 2,
      title: "Guest Relations",
      description: "Welcome international visitors and provide tourism assistance",
      requirements: ["Language skills", "Customer service experience", "Cultural knowledge"],
      timeCommitment: "Flexible",
      locations: ["Airports", "Hotels", "City centers"],
      spots: "1,500",
      category: "Hospitality"
    },
    {
      id: 3,
      title: "Media Support",
      description: "Support media operations, press conferences, and broadcasting",
      requirements: ["Media experience", "Technical skills", "Attention to detail"],
      timeCommitment: "Full tournament",
      locations: ["Media centers", "Stadiums"],
      spots: "800",
      category: "Media"
    },
    {
      id: 4,
      title: "Transportation",
      description: "Assist with team and fan transportation coordination",
      requirements: ["Local knowledge", "Communication skills", "Reliability"],
      timeCommitment: "Part-time",
      locations: ["Transport hubs", "Route coordination"],
      spots: "1,200",
      category: "Transport"
    },
    {
      id: 5,
      title: "Cultural Ambassador",
      description: "Showcase Moroccan culture and traditions to international guests",
      requirements: ["Cultural knowledge", "Presentation skills", "Enthusiasm"],
      timeCommitment: "Event-based",
      locations: ["Cultural centers", "Fan zones"],
      spots: "600",
      category: "Culture"
    },
    {
      id: 6,
      title: "IT & Technology",
      description: "Support digital services, mobile apps, and technical systems",
      requirements: ["Technical expertise", "Problem-solving", "IT background"],
      timeCommitment: "Full tournament",
      locations: ["Tech centers", "Venues"],
      spots: "400",
      category: "Technology"
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Unique Experience",
      description: "Be part of the world's biggest sporting event in your home country"
    },
    {
      icon: Users,
      title: "Global Network",
      description: "Meet people from around the world and build lasting friendships"
    },
    {
      icon: CheckCircle,
      title: "Official Recognition",
      description: "Receive official FIFA volunteer certification and memorabilia"
    },
    {
      icon: Languages,
      title: "Skill Development",
      description: "Gain valuable experience in event management and international relations"
    }
  ];

  const requirements = [
    "Must be 18 years or older by June 2030",
    "Moroccan citizen or legal resident",
    "Available for minimum 10 days during tournament",
    "Fluency in Arabic, French, or English required",
    "Pass background check and health screening",
    "Complete mandatory training program"
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Operations": return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "Hospitality": return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "Media": return "bg-purple-500/10 text-purple-700 dark:text-purple-400";
      case "Transport": return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "Culture": return "bg-red-500/10 text-red-700 dark:text-red-400";
      case "Technology": return "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400";
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
                Volunteer Program
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Be part of this historic event and help create unforgettable memories for millions of fans
              </p>
              
              <div className="flex items-center justify-center space-x-8 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15,000</div>
                  <div className="text-sm text-muted-foreground">Volunteer Positions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100,000+</div>
                  <div className="text-sm text-muted-foreground">Applications Received</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">6</div>
                  <div className="text-sm text-muted-foreground">Volunteer Categories</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Benefits */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground">Why Volunteer?</h2>
              <p className="text-muted-foreground">Amazing benefits await our volunteer team</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card
                  key={benefit.title}
                  className="p-6 text-center bg-gradient-card hover:shadow-morocco transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-gradient-morocco rounded-full flex items-center justify-center mx-auto">
                      <benefit.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Volunteer Roles */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground">Available Positions</h2>
              <p className="text-muted-foreground">Find the perfect role that matches your skills and interests</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {volunteerRoles.map((role, index) => (
                <Card
                  key={role.id}
                  className="p-6 bg-gradient-card hover:shadow-morocco transition-all duration-300 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-foreground">{role.title}</h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(role.category)}`}>
                        {role.category}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {role.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2 text-primary" />
                        <span className="font-medium mr-2">Time:</span>
                        <span className="text-muted-foreground">{role.timeCommitment}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        <span className="font-medium mr-2">Location:</span>
                        <span className="text-muted-foreground">{role.locations.join(", ")}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Users className="w-4 h-4 mr-2 text-primary" />
                        <span className="font-medium mr-2">Positions:</span>
                        <span className="text-muted-foreground">{role.spots} available</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">Requirements:</h4>
                      <ul className="space-y-1">
                        {role.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center text-xs text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button variant="outline" className="w-full group-hover:bg-primary/10">
                      Apply for This Role
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Application Requirements */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold text-foreground">Application Requirements</h2>
                <p className="text-muted-foreground">Make sure you meet these requirements before applying</p>
              </div>

              <Card className="p-8 bg-gradient-card">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-6">General Requirements</h3>
                    <ul className="space-y-3">
                      {requirements.map((req, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-6">Application Process</h3>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 text-primary-foreground font-semibold text-xs">1</div>
                        <span className="text-muted-foreground">Complete online application</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 text-primary-foreground font-semibold text-xs">2</div>
                        <span className="text-muted-foreground">Background check & screening</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 text-primary-foreground font-semibold text-xs">3</div>
                        <span className="text-muted-foreground">Interview (virtual or in-person)</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 text-primary-foreground font-semibold text-xs">4</div>
                        <span className="text-muted-foreground">Training program completion</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-border text-center">
                  <Button variant="hero" size="lg" className="mr-4">
                    Start Application
                  </Button>
                  <Button variant="outline" size="lg">
                    Download Info Pack
                  </Button>
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

export default VolunteersPage;