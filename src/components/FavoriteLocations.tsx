
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useFavorites } from '@/context/FavoritesContext';
import { Button } from '@/components/ui/button';
import { MapPin, X } from 'lucide-react';

interface FavoriteLocationsProps {
  onSelectCity: (city: string) => void;
}

const FavoriteLocations: React.FC<FavoriteLocationsProps> = ({ onSelectCity }) => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return null;
  }

  return (
    <Card className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg border-0">
      <CardContent className="p-2">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-sm font-bold text-gray-800">Favorite Locations</h3>
        </div>
        <div className="flex flex-wrap gap-1">
          {favorites.map((city, index) => (
            <div 
              key={index} 
              className="bg-gray-100 rounded-full px-2 py-0.5 flex items-center"
            >
              <MapPin className="w-2.5 h-2.5 text-weather-blue mr-0.5" />
              <button 
                className="mr-0.5 text-xs font-medium hover:text-weather-blue"
                onClick={() => onSelectCity(city)}
              >
                {city}
              </button>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(city);
                }}
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteLocations;
