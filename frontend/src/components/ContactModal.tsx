import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Phone,
  Mail,
  MessageCircle,
  Send,
  CheckCircle,
  X
} from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactName: string;
  contactType: 'guide' | 'hotel' | 'restaurant' | 'support';
  phone?: string;
  email?: string;
}

export const ContactModal = ({ 
  isOpen, 
  onClose, 
  contactName, 
  contactType,
  phone,
  email 
}: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du message
    console.log('Message envoyé:', formData);
    setIsSubmitted(true);
    
    // Réinitialiser après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const handleDirectContact = (method: 'phone' | 'email') => {
    if (method === 'phone' && phone) {
      window.open(`tel:${phone}`, '_self');
    } else if (method === 'email' && email) {
      window.open(`mailto:${email}`, '_self');
    }
  };

  const getContactTypeLabel = (type: string) => {
    const labels = {
      guide: 'Guide touristique',
      hotel: 'Hôtel',
      restaurant: 'Restaurant',
      support: 'Support client'
    };
    return labels[type as keyof typeof labels] || type;
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Message envoyé !</h3>
              <p className="text-muted-foreground">
                Votre message a été envoyé à <strong>{contactName}</strong>. 
                Vous recevrez une réponse dans les plus brefs délais.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle>Contacter {contactName}</DialogTitle>
              <DialogDescription>{getContactTypeLabel(contactType)}</DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        {/* Options de contact direct */}
        {(phone || email) && (
          <div className="space-y-3 pb-6 border-b">
            <h4 className="font-medium text-sm">Contact direct</h4>
            <div className="flex gap-2">
              {phone && (
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleDirectContact('phone')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Appeler
                </Button>
              )}
              {email && (
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleDirectContact('email')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              )}
            </div>
          </div>
        )}
        
        {/* Formulaire de contact */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Envoyer un message
          </h4>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Nom</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Votre nom"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Téléphone</label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+212 6XX XXX XXX"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="votre@email.com"
              required
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Sujet</label>
            <Input
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="Objet de votre message"
              required
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Message</label>
            <Textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Votre message..."
              rows={4}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Envoyer le message
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
