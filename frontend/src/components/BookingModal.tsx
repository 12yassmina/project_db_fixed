import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Users, CreditCard, User, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

interface BookingModalProps {
  type: 'hotel' | 'restaurant' | 'car';
  itemName: string;
  itemId: string;
  defaultData?: any;
  children: React.ReactNode;
}

export const BookingModal: React.FC<BookingModalProps> = ({ 
  type, 
  itemName, 
  itemId, 
  defaultData = {}, 
  children 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Common fields
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Hotel specific
    checkIn: defaultData.checkIn || '',
    checkOut: defaultData.checkOut || '',
    guests: defaultData.guests || 2,
    rooms: defaultData.rooms || 1,
    
    // Restaurant specific
    date: '',
    time: '19:00',
    partySize: 2,
    
    // Car rental specific
    pickupDate: defaultData.pickupDate || '',
    dropoffDate: defaultData.dropoffDate || '',
    driverAge: defaultData.driverAge || 25,
    
    // Special requests
    specialRequests: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let result;
      
      if (type === 'hotel') {
        result = await api.hotels.bookHotel({
          hotelId: itemId,
          roomId: 'room-1', // Default room type
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: [{
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email
          }],
          paymentDetails: {
            cardType: 'visa',
            cardNumber: '****-****-****-1234',
            expiryDate: '12/25',
            cvv: '123'
          }
        });
      } else if (type === 'restaurant') {
        // For restaurants, we'll use a simple reservation endpoint
        const response = await fetch('http://localhost:5000/api/restaurants/reservations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            restaurantId: itemId,
            date: formData.date,
            time: formData.time,
            partySize: formData.partySize,
            customerInfo: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone
            },
            specialRequests: formData.specialRequests
          })
        });
        result = await response.json();
      } else if (type === 'car') {
        result = await api.rentals.bookRental({
          propertyId: itemId,
          checkIn: formData.pickupDate,
          checkOut: formData.dropoffDate,
          guests: 1,
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone
          },
          specialRequests: formData.specialRequests
        });
      }
      
      const confirmationId = result?.data?.confirmationId || `WC2030-${type.toUpperCase()}-${Date.now()}`;
      
      // Show success message
      toast({
        title: "Booking Confirmed! 🎉",
        description: `Your ${type} booking has been confirmed. Confirmation ID: ${confirmationId}`,
      });
      
      // Close modal
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
        rooms: defaultData.rooms || 1,
        date: '',
        time: '19:00',
        partySize: 2,
        pickupDate: defaultData.pickupDate || '',
        dropoffDate: defaultData.dropoffDate || '',
        driverAge: defaultData.driverAge || 25,
        specialRequests: ''
      });
      
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderBookingFields = () => {
    switch (type) {
      case 'hotel':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="checkIn">Check-in Date</Label>
                <Input
                  id="checkIn"
                  type="date"
                  value={formData.checkIn}
                  onChange={(e) => handleInputChange('checkIn', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="checkOut">Check-out Date</Label>
                <Input
                  id="checkOut"
                  type="date"
                  value={formData.checkOut}
                  onChange={(e) => handleInputChange('checkOut', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guests">Guests</Label>
                <Select value={formData.guests.toString()} onValueChange={(value) => handleInputChange('guests', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} Guest{num > 1 ? 's' : ''}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rooms">Rooms</Label>
                <Select value={formData.rooms.toString()} onValueChange={(value) => handleInputChange('rooms', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} Room{num > 1 ? 's' : ''}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );
        
      case 'restaurant':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Reservation Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'].map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
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
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num} Person{num > 1 ? 's' : ''}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );
        
      case 'car':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pickupDate">Pickup Date</Label>
                <Input
                  id="pickupDate"
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dropoffDate">Drop-off Date</Label>
                <Input
                  id="dropoffDate"
                  type="date"
                  value={formData.dropoffDate}
                  onChange={(e) => handleInputChange('dropoffDate', e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="driverAge">Driver Age</Label>
              <Input
                id="driverAge"
                type="number"
                min="18"
                max="99"
                value={formData.driverAge}
                onChange={(e) => handleInputChange('driverAge', parseInt(e.target.value))}
                required
              />
            </div>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === 'hotel' && <MapPin className="w-5 h-5" />}
            {type === 'restaurant' && <Calendar className="w-5 h-5" />}
            {type === 'car' && <CreditCard className="w-5 h-5" />}
            Book {itemName}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Booking specific fields */}
          {renderBookingFields()}
          
          {/* Customer Information */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Contact Information
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Special Requests */}
          <div>
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <Input
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              placeholder="Any special requirements..."
            />
          </div>
          
          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            variant="hero"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : `Confirm ${type === 'car' ? 'Rental' : 'Booking'}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
