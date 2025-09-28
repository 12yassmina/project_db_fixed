import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar } from "lucide-react";

// Import stadium images
import { STADIUMS as STADIUMS_DATA } from "@/assets/stadiums";

export const stadiumsData = STADIUMS_DATA.map(s => ({
  ...s,
  description: s.id === 'grand-stade-tanger'
    ? 'Modern stadium with stunning architecture and sea views'
    : s.id === 'grand-stade-marrakesh'
      ? 'Beautiful stadium inspired by traditional Moroccan architecture'
      : 'The largest stadium for Morocco 2030, currently under construction',
  descriptionAr: s.id === 'grand-stade-tanger'
    ? 'ملعب حديث بهندسة معمارية رائعة وإطلالة على البحر'
    : s.id === 'grand-stade-marrakesh'
      ? 'ملعب جميل مستوحى من العمارة المغربية التقليدية'
      : 'أكبر ملعب للمغرب 2030، قيد الإنشاء حالياً'
}));

interface StadiumInfoProps {
  stadiumId?: string;
  showAll?: boolean;
  compact?: boolean;
}

export const StadiumInfo: React.FC<StadiumInfoProps> = ({ 
  stadiumId, 
  showAll = false, 
  compact = false 
}) => {
  const stadiums = showAll ? stadiumsData : stadiumsData.filter(s => s.id === stadiumId);

  if (compact) {
    const stadium = stadiums[0];
    if (!stadium) return null;

    return (
      <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
        <img 
          src={stadium.image} 
          alt={stadium.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div>
          <h4 className="font-semibold text-sm">{stadium.nameAr}</h4>
          <p className="text-xs text-muted-foreground">{stadium.cityAr}</p>
        </div>
        <Badge variant={stadium.status === 'Ready' ? 'default' : 'secondary'}>
          {stadium.statusAr}
        </Badge>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {stadiums.map((stadium) => (
        <Card key={stadium.id} className="overflow-hidden">
          <div className="aspect-video overflow-hidden">
            <img 
              src={stadium.image} 
              alt={stadium.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{stadium.nameAr}</h3>
                <p className="text-sm text-muted-foreground">{stadium.name}</p>
              </div>
              <Badge variant={stadium.status === 'Ready' ? 'default' : 'secondary'}>
                {stadium.statusAr}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{stadium.cityAr}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{stadium.capacity.toLocaleString()} مقعد</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {stadium.descriptionAr}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StadiumInfo;
