import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReservationModal } from "./ReservationModal";
import { 
  Star,
  MapPin,
  Languages,
  Award,
  Shield,
  Phone,
  Mail,
  Calendar,
  Users,
  CheckCircle,
  MessageCircle,
  Camera,
  Clock,
  Heart,
  Share2
} from "lucide-react";

interface GuideProfileProps {
  guide: {
    id: string;
    name: string;
    avatar?: string;
    city: string;
    rating: number;
    reviews: number;
    languages: string[];
    specialties: string[];
    price: string;
    experience: string;
    verified: boolean;
    legalCapacity: boolean;
    description: string;
    certifications: string[];
    availability: string[];
    photos: string[];
    testimonials: {
      name: string;
      rating: number;
      comment: string;
      date: string;
    }[];
  };
}

export const GuideProfile = ({ guide }: GuideProfileProps) => {
  const [showReservation, setShowReservation] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleContact = () => {
    // Logique de contact
    alert(`Contacter ${guide.name} - Fonctionnalité en cours de développement`);
  };

  const handleShare = () => {
    // Logique de partage
    if (navigator.share) {
      navigator.share({
        title: `Guide ${guide.name}`,
        text: `Découvrez ${guide.name}, guide certifié à ${guide.city}`,
        url: window.location.href,
      });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Share
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* En-tête du profil */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <Avatar className="w-32 h-32">
              <AvatarImage src={guide.avatar} alt={guide.name} />
              <AvatarFallback className="text-2xl">
                {guide.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{guide.name}</h1>
                {guide.verified && (
                  <CheckCircle className="w-6 h-6 text-blue-500" />
                )}
                {guide.legalCapacity && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Shield className="w-3 h-3 mr-1" />
                    Capacité Judiciaire
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{guide.city}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{guide.rating}</span>
                  <span>({guide.reviews} avis)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>{guide.experience} d'expérience</span>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {guide.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Langues:</span>
              </div>
              {guide.languages.map((lang) => (
                <Badge key={lang} variant="outline" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium">Spécialités:</span>
              {guide.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex-shrink-0 space-y-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{guide.price}</div>
              <div className="text-sm text-muted-foreground">par heure</div>
            </div>
            
            <div className="space-y-2">
              <Button 
                className="w-full"
                onClick={() => setShowReservation(true)}
              >
                Réserver maintenant
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleContact}>
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Contact
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Onglets de contenu */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="reviews">Avis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Disponibilités */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Disponibilités
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {guide.availability.map((day) => (
                <div key={day} className="text-center p-3 bg-muted rounded-lg">
                  <div className="font-medium text-sm">{day}</div>
                  <div className="text-xs text-muted-foreground">9h - 18h</div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Services proposés */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Services proposés</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Visite guidée de la ville", duration: "3-4h", price: "À partir de 300 MAD" },
                { name: "Tour gastronomique", duration: "2-3h", price: "À partir de 250 MAD" },
                { name: "Visite des monuments", duration: "4-5h", price: "À partir de 400 MAD" },
                { name: "Shopping et artisanat", duration: "2-3h", price: "À partir de 200 MAD" }
              ].map((service, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-medium">{service.name}</h4>
                  <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {service.duration}
                    </span>
                    <span className="font-medium text-primary">{service.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="certifications" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Certifications et Qualifications
            </h3>
            
            {/* Capacité judiciaire */}
            {guide.legalCapacity && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-6 h-6 text-green-600" />
                  <h4 className="font-semibold text-green-800">Capacité Judiciaire Certifiée</h4>
                </div>
                <p className="text-sm text-green-700">
                  Ce guide possède une capacité judiciaire reconnue par les autorités marocaines, 
                  garantissant un service professionnel et conforme à la réglementation en vigueur.
                </p>
                <div className="mt-3 text-xs text-green-600">
                  ✓ Certifié par le Ministère du Tourisme du Maroc<br/>
                  ✓ Assurance responsabilité civile professionnelle<br/>
                  ✓ Formation aux premiers secours
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              {guide.certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="photos" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Galerie Photos
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {guide.photos.map((photo, index) => (
                <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={photo} 
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Avis clients</h3>
            <div className="space-y-6">
              {guide.testimonials.map((testimonial, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                        {testimonial.name[0]}
                      </div>
                      <span className="font-medium">{testimonial.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < testimonial.rating 
                              ? 'text-yellow-500 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">
                    {testimonial.comment}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.date}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de réservation */}
      <ReservationModal
        isOpen={showReservation}
        onClose={() => setShowReservation(false)}
        itemName={guide.name}
        itemType="guide"
        itemPrice={guide.price}
      />
    </div>
  );
};
