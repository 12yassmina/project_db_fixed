import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GuideProfile } from "@/components/GuideProfile";
import { ReservationModal } from "@/components/ReservationModal";
import { useState } from "react";
import { 
  User, 
  MapPin, 
  Star, 
  Languages, 
  Clock, 
  Phone,
  MessageCircle,
  Shield,
  Award,
  Globe,
  Camera,
  Heart,
  CheckCircle,
  Users,
  Calendar
} from "lucide-react";

const GuidePage = () => {
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [showReservation, setShowReservation] = useState(false);
  const [reservationGuide, setReservationGuide] = useState<any>(null);

  const topGuides = [
    {
      id: "1",
      name: "Ahmed Benali",
      city: "Marrakech",
      rating: 4.9,
      reviews: 247,
      languages: ["Arabic", "French", "English", "Spanish"],
      specialties: ["Historical Sites", "Culinary Tours", "Adventure"],
      price: "350 MAD/heure",
      image: "/api/placeholder/150/150",
      verified: true,
      legalCapacity: true,
      experience: "8 years",
      description: "Guide touristique certifié avec une expertise approfondie de l'histoire et de la culture marocaine. Spécialisé dans les visites personnalisées de Marrakech et ses environs.",
      certifications: [
        "Licence de Guide Touristique National - Ministère du Tourisme",
        "Certificat de Premiers Secours",
        "Formation en Histoire de l'Art Islamique",
        "Diplôme en Langues Étrangères Appliquées"
      ],
      availability: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      photos: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
      testimonials: [
        {
          name: "Marie Dubois",
          rating: 5,
          comment: "Ahmed est un guide exceptionnel ! Sa connaissance de Marrakech est impressionnante et il nous a fait découvrir des lieux magiques.",
          date: "15 décembre 2024"
        },
        {
          name: "John Smith",
          rating: 5,
          comment: "Professional and knowledgeable. Ahmed made our trip to Marrakech unforgettable!",
          date: "10 décembre 2024"
        }
      ]
    },
    {
      name: "Fatima El Mansouri",
      city: "Casablanca", 
      rating: 4.8,
      reviews: 193,
      languages: ["Arabic", "French", "English"],
      specialties: ["Architecture", "Modern City", "Business District"],
      price: "€40/hour",
      image: "/api/placeholder/150/150",
      verified: true,
      experience: "6 years"
    },
    {
      name: "Omar Kettani",
      city: "Rabat",
      rating: 4.9,
      reviews: 156,
      languages: ["Arabic", "French", "English", "German"],
      specialties: ["Royal Heritage", "Museums", "Gardens"],
      price: "€38/hour", 
      image: "/api/placeholder/150/150",
      verified: true,
      experience: "10 years"
    },
    {
      name: "Aicha Berrada",
      city: "Tangier",
      rating: 4.7,
      reviews: 134,
      languages: ["Arabic", "Spanish", "French", "English"],
      specialties: ["Coastal Tours", "Cultural Heritage", "Photography"],
      price: "€32/hour",
      image: "/api/placeholder/150/150", 
      verified: true,
      experience: "5 years"
    }
  ];

  const guideServices = [
    {
      icon: MapPin,
      title: "City Walking Tours",
      description: "Personalized walking tours of historic quarters and modern districts",
      duration: "2-4 hours",
      price: "From €25"
    },
    {
      icon: Camera,
      title: "Photography Tours",
      description: "Capture the best shots with local photography expertise",
      duration: "3-5 hours", 
      price: "From €40"
    },
    {
      icon: Users,
      title: "Cultural Immersion",
      description: "Deep dive into Moroccan traditions, customs and daily life",
      duration: "Half/Full day",
      price: "From €50"
    },
    {
      icon: Globe,
      title: "Multi-City Tours",
      description: "Comprehensive tours covering multiple World Cup host cities",
      duration: "2-7 days",
      price: "From €200"
    }
  ];

  const becomeGuideSteps = [
    {
      step: 1,
      title: "Create Your Profile", 
      description: "Fill out detailed information about your experience, languages, and specialties"
    },
    {
      step: 2,
      title: "Verification Process",
      description: "Submit required documents and complete our certification process"
    },
    {
      step: 3,
      title: "Training & Certification",
      description: "Complete our World Cup 2030 guide training program"
    },
    {
      step: 4,
      title: "Start Guiding",
      description: "Get connected with tourists and start earning"
    }
  ];

  const handleGuideClick = (guide: any) => {
    setSelectedGuide(guide);
  };

  const handleReservation = (guide: any) => {
    setReservationGuide(guide);
    setShowReservation(true);
  };

  const handleContact = (guide: any) => {
    // Logique de contact
    alert(`Contacter ${guide.name} - Fonctionnalité en cours de développement`);
  };

  if (selectedGuide) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedGuide(null)}
              className="mb-6"
            >
              ← Retour à la liste des guides
            </Button>
            <GuideProfile guide={selectedGuide} />
          </div>
        </main>
        <Footer />
        <AIChat />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Certified Local Guides
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Connect with expert local guides for authentic Moroccan experiences during the World Cup 2030. 
                Professional, certified guides ready to show you the real Morocco.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" variant="hero" className="w-full sm:w-auto">
                  <User className="w-5 h-5 mr-2" />
                  Find a Guide
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Award className="w-5 h-5 mr-2" />
                  Become a Guide
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Top Guides Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Top Rated Guides
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet our most experienced and highly-rated local guides
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topGuides.map((guide, index) => (
                <Card
                  key={guide.name}
                  className="p-6 bg-card hover:shadow-elegant transition-all duration-300 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-morocco rounded-full mx-auto mb-3 flex items-center justify-center">
                        <User className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <h3 className="font-semibold text-foreground">{guide.name}</h3>
                        {guide.verified && (
                          <CheckCircle className="w-4 h-4 text-secondary" />
                        )}
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{guide.city}</span>
                      </div>
                    </div>

                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="font-medium">{guide.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({guide.reviews} reviews)
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {guide.experience} experience
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Languages className="w-4 h-4 text-primary" />
                        <span className="font-medium">Languages:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {guide.languages.map((lang) => (
                          <Badge key={lang} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-foreground">Specialties:</div>
                      <div className="text-xs text-muted-foreground">
                        {guide.specialties.join(" • ")}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="text-lg font-semibold text-primary">
                        {guide.price}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleGuideClick(guide)}
                        >
                          Voir profil
                        </Button>
                        <Button 
                          size="sm" 
                          variant="hero"
                          onClick={() => handleReservation(guide)}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
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

        {/* Guide Services */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                Guide Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Professional guide services tailored for World Cup visitors
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {guideServices.map((service, index) => (
                <Card
                  key={service.title}
                  className="p-6 bg-gradient-card hover:shadow-morocco transition-all duration-300 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-4 text-center">
                    <div className="w-16 h-16 bg-gradient-morocco rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <service.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="font-semibold text-primary">
                        {service.price}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Become a Guide Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-morocco bg-clip-text text-transparent">
                  Become a Certified Guide
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Join our network of professional guides and earn money sharing your love for Morocco with World Cup visitors.
                </p>
                
                <div className="space-y-4">
                  {becomeGuideSteps.map((step) => (
                    <div key={step.step} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gradient-morocco rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {step.step}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-foreground">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-4 pt-4">
                  <Button size="lg" variant="hero">
                    <Award className="w-5 h-5 mr-2" />
                    Apply Now
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Application Form */}
              <Card className="p-8 bg-gradient-card">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-foreground text-center">
                    Quick Guide Registration
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="First Name" />
                      <Input placeholder="Last Name" />
                    </div>
                    
                    <Input type="email" placeholder="Email Address" />
                    <Input type="tel" placeholder="Phone Number" />
                    
                    <select className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm">
                      <option>Select Your City</option>
                      <option>Casablanca</option>
                      <option>Marrakech</option>
                      <option>Rabat</option>
                      <option>Tangier</option>
                    </select>
                    
                    <Textarea 
                      placeholder="Tell us about your guiding experience and languages spoken..."
                      rows={4}
                    />
                    
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1" />
                      <label className="text-sm text-muted-foreground">
                        I agree to the terms and conditions and privacy policy
                      </label>
                    </div>
                  </div>
                  
                  <Button className="w-full" size="lg" variant="hero">
                    <Shield className="w-5 h-5 mr-2" />
                    Submit Application
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChat />
      
      {/* Modal de réservation */}
      {reservationGuide && (
        <ReservationModal
          isOpen={showReservation}
          onClose={() => {
            setShowReservation(false);
            setReservationGuide(null);
          }}
          itemName={reservationGuide.name}
          itemType="guide"
          itemPrice={reservationGuide.price}
        />
      )}
    </div>
  );
};

export default GuidePage;