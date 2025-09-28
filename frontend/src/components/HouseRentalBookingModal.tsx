import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Home, User, Mail, Phone, MapPin, Users, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HouseRentalBookingModalProps {
  houseName: string;
  houseId: string;
  defaultData?: any;
  children: React.ReactNode;
}

export const HouseRentalBookingModal: React.FC<HouseRentalBookingModalProps> = ({ 
  houseName, 
  houseId, 
  defaultData = {}, 
  children 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: defaultData.checkIn || '',
    checkOut: defaultData.checkOut || '',
    guests: defaultData.guests || 2,
    purpose: 'vacation',
    emergencyContact: '',
    emergencyPhone: '',
    specialRequests: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/house-rentals/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          houseId: houseId,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: formData.guests,
          guestInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone
          },
          purpose: formData.purpose,
          emergencyContact: {
            name: formData.emergencyContact,
            phone: formData.emergencyPhone
          },
          specialRequests: formData.specialRequests
        })
      });
      
      const result = await response.json();
      const confirmationId = result?.data?.confirmationId || `WC2030-HSE-${Date.now()}`;
      
      toast({
        title: "🏠 House Rental Confirmed!",
        description: `Your booking for ${houseName} has been confirmed. Confirmation ID: ${confirmationId}`,
      });
      
      setIsOpen(false);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        checkIn: defaultData.checkIn || '',
        checkOut: defaultData.checkOut || '',
        guests: defaultData.guests || 2,
        purpose: 'vacation',
        emergencyContact: '',
        emergencyPhone: '',
        specialRequests: ''
      });
      
    } catch (error) {
      console.error('House rental booking error:', error);
      toast({
        title: "Booking Failed",
        description: "An error occurred while processing your house rental booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Home className="w-6 h-6 text-primary" />
            House Rental Booking - {houseName}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Form to book a house rental with check-in/out dates, guests, purpose and emergency contact.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Rental Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Rental Details
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="checkIn">Check-in Date *</Label>
                <Input
                  id="checkIn"
                  type="date"
                  value={formData.checkIn}
                  onChange={(e) => handleInputChange('checkIn', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="checkOut">Check-out Date *</Label>
                <Input
                  id="checkOut"
                  type="date"
                  value={formData.checkOut}
                  onChange={(e) => handleInputChange('checkOut', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="guests">Number of Guests</Label>
              <Select value={formData.guests.toString()} onValueChange={(value) => handleInputChange('guests', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8,9,10,12,15,20].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num} guest{num > 1 ? 's' : ''}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="purpose">Rental Purpose</Label>
              <Select value={formData.purpose} onValueChange={(value) => handleInputChange('purpose', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vacation">Vacation/Tourism</SelectItem>
                  <SelectItem value="worldcup">World Cup Attendance</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="family">Family Visit</SelectItem>
                  <SelectItem value="event">Special Event</SelectItem>
                  <SelectItem value="relocation">Temporary Relocation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Emergency Contact
            </h3>
            
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="emergencyPhone">Emergency Phone Number *</Label>
              <Input
                id="emergencyPhone"
                type="tel"
                value={formData.emergencyPhone}
                onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <Label htmlFor="specialRequests">Special Requests</Label>
            <textarea
              id="specialRequests"
              className="w-full p-2 border rounded-md"
              rows={3}
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              placeholder="Any special requests or additional needs..."
            />
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Booking details and arrival instructions will be sent to your email after confirmation.
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Confirm House Rental"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
