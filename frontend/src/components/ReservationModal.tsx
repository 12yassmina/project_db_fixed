import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  CreditCard,
  CheckCircle,
  X
} from "lucide-react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemType: 'hotel' | 'restaurant' | 'event' | 'guide' | 'transport';
  itemPrice?: string;
  itemImage?: string;
}

export const ReservationModal = ({ 
  isOpen, 
  onClose, 
  itemName, 
  itemType, 
  itemPrice,
  itemImage 
}: ReservationModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: '',
    paymentMethod: 'card'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Logique de soumission de réservation
    console.log('Réservation soumise:', formData);
    setStep(4); // Étape de confirmation
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      hotel: 'Hôtel',
      restaurant: 'Restaurant',
      event: 'Événement',
      guide: 'Guide',
      transport: 'Transport'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Informations personnelles</h3>
        <p className="text-muted-foreground">Veuillez remplir vos coordonnées</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Prénom</label>
          <Input
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="Votre prénom"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Nom</label>
          <Input
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Votre nom"
          />
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Email</label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="votre@email.com"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Téléphone</label>
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="+212 6XX XXX XXX"
        />
      </div>
      
      <Button 
        onClick={() => setStep(2)} 
        className="w-full"
        disabled={!formData.firstName || !formData.lastName || !formData.email}
      >
        Continuer
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Détails de la réservation</h3>
        <p className="text-muted-foreground">Choisissez vos préférences</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date
          </label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Heure
          </label>
          <Input
            type="time"
            value={formData.time}
            onChange={(e) => handleInputChange('time', e.target.value)}
          />
        </div>
      </div>
      
      {(itemType === 'restaurant' || itemType === 'hotel') && (
        <div>
          <label className="text-sm font-medium mb-2 block flex items-center gap-2">
            <Users className="w-4 h-4" />
            Nombre de personnes
          </label>
          <select 
            className="w-full px-3 py-2 bg-background border border-border rounded-md"
            value={formData.guests}
            onChange={(e) => handleInputChange('guests', e.target.value)}
          >
            {[1,2,3,4,5,6,7,8].map(num => (
              <option key={num} value={num}>{num} personne{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
      )}
      
      <div>
        <label className="text-sm font-medium mb-2 block">Demandes spéciales</label>
        <Textarea
          value={formData.specialRequests}
          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
          placeholder="Allergies, préférences, demandes particulières..."
          rows={3}
        />
      </div>
      
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          Retour
        </Button>
        <Button 
          onClick={() => setStep(3)} 
          className="flex-1"
          disabled={!formData.date || !formData.time}
        >
          Continuer
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Récapitulatif et paiement</h3>
        <p className="text-muted-foreground">Vérifiez vos informations</p>
      </div>
      
      {/* Récapitulatif */}
      <Card className="p-4 bg-muted">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">{itemName}</span>
            <Badge variant="secondary">{getTypeLabel(itemType)}</Badge>
          </div>
          
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{formData.date}</span>
            </div>
            <div className="flex justify-between">
              <span>Heure:</span>
              <span>{formData.time}</span>
            </div>
            <div className="flex justify-between">
              <span>Personnes:</span>
              <span>{formData.guests}</span>
            </div>
            {itemPrice && (
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Prix:</span>
                <span>{itemPrice}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
      
      {/* Paiement */}
      <div className="space-y-4">
        <h4 className="font-medium flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Méthode de paiement
        </h4>
        
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input 
              type="radio" 
              name="payment" 
              value="card"
              checked={formData.paymentMethod === 'card'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
            />
            <span>Carte bancaire</span>
          </label>
          <label className="flex items-center space-x-2">
            <input 
              type="radio" 
              name="payment" 
              value="paypal"
              checked={formData.paymentMethod === 'paypal'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
            />
            <span>PayPal</span>
          </label>
          <label className="flex items-center space-x-2">
            <input 
              type="radio" 
              name="payment" 
              value="onsite"
              checked={formData.paymentMethod === 'onsite'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
            />
            <span>Paiement sur place</span>
          </label>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
          Retour
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          Confirmer la réservation
        </Button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-2">Réservation confirmée !</h3>
        <p className="text-muted-foreground">
          Votre réservation pour <strong>{itemName}</strong> a été confirmée.
        </p>
      </div>
      
      <Card className="p-4 bg-muted text-left">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Numéro de réservation:</span>
            <span className="font-mono">WC2030-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{formData.date}</span>
          </div>
          <div className="flex justify-between">
            <span>Heure:</span>
            <span>{formData.time}</span>
          </div>
        </div>
      </Card>
      
      <p className="text-sm text-muted-foreground">
        Un email de confirmation a été envoyé à <strong>{formData.email}</strong>
      </p>
      
      <Button onClick={onClose} className="w-full">
        Fermer
      </Button>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle>Réservation</DialogTitle>
              <DialogDescription>{itemName}</DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        {/* Indicateur d'étapes */}
        {step < 4 && (
          <div className="flex items-center justify-center space-x-2 mb-6">
            {[1, 2, 3].map((stepNum) => (
              <div
                key={stepNum}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNum === step
                    ? 'bg-primary text-primary-foreground'
                    : stepNum < step
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {stepNum < step ? <CheckCircle className="w-4 h-4" /> : stepNum}
              </div>
            ))}
          </div>
        )}
        
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </DialogContent>
    </Dialog>
  );
};
