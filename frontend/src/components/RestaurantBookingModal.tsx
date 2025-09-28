import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Users, Utensils, User, Mail, Phone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RestaurantBookingModalProps {
  restaurantName: string;
  restaurantId: string;
  defaultData?: any;
  children: React.ReactNode;
}

export const RestaurantBookingModal: React.FC<RestaurantBookingModalProps> = ({ 
  restaurantName, 
  restaurantId, 
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
    date: defaultData.date || '',
    time: defaultData.time || '19:00',
    partySize: defaultData.partySize || 2,
    occasion: '',
    dietaryRestrictions: '',
    specialRequests: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/restaurants/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId: restaurantId,
          date: formData.date,
          time: formData.time,
          partySize: formData.partySize,
          customerInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone
          },
          occasion: formData.occasion,
          dietaryRestrictions: formData.dietaryRestrictions,
          specialRequests: formData.specialRequests
        })
      });
      
      const result = await response.json();
      const confirmationId = result?.data?.confirmationId || `WC2030-RST-${Date.now()}`;
      
      toast({
        title: "🍽️ Restaurant Reservation Confirmed!",
        description: `Your table reservation at ${restaurantName} has been confirmed. Confirmation ID: ${confirmationId}`,
      });
      
      setIsOpen(false);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        date: defaultData.date || '',
        time: defaultData.time || '19:00',
        partySize: defaultData.partySize || 2,
        occasion: '',
        dietaryRestrictions: '',
        specialRequests: ''
      });
      
    } catch (error) {
      console.error('Restaurant booking error:', error);
      toast({
        title: "Reservation Failed",
        description: "An error occurred while processing your restaurant reservation. Please try again.",
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
            <Utensils className="w-6 h-6 text-primary" />
            Table Reservation - {restaurantName}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Form to reserve a table at the restaurant with date, time, party size, occasion and dietary restrictions.
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

          {/* Reservation Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Reservation Details
            </h3>
            
            <div className="bg-muted p-4 rounded-lg mb-4">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> For reservations near stadiums, please mention the stadium name in special requests.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Time *</Label>
                <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="12:30">12:30 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="13:30">1:30 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="19:00">7:00 PM</SelectItem>
                    <SelectItem value="19:30">7:30 PM</SelectItem>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                    <SelectItem value="20:30">8:30 PM</SelectItem>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="partySize">Party Size</Label>
              <Select value={formData.partySize.toString()} onValueChange={(value) => handleInputChange('partySize', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num} person{num > 1 ? 's' : ''}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="occasion">Occasion (Optional)</Label>
              <Select value={formData.occasion} onValueChange={(value) => handleInputChange('occasion', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select occasion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="anniversary">Anniversary</SelectItem>
                  <SelectItem value="business">Business Meeting</SelectItem>
                  <SelectItem value="celebration">Celebration</SelectItem>
                  <SelectItem value="worldcup">World Cup Viewing</SelectItem>
                  <SelectItem value="pre-match">Pre-Match Meal</SelectItem>
                  <SelectItem value="post-match">Post-Match Celebration</SelectItem>
                  <SelectItem value="stadium-visit">Stadium Visit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div>
            <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
            <Select value={formData.dietaryRestrictions} onValueChange={(value) => handleInputChange('dietaryRestrictions', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select if any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="halal">Halal Only</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                <SelectItem value="dairy-free">Dairy-Free</SelectItem>
              </SelectContent>
            </Select>
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
              placeholder="Any special requests for the restaurant (window table, high chair, etc.)..."
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Confirm Table Reservation"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
