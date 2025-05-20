
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { CurrentWeather as CurrentWeatherType } from '@/types/weather';
import { useFavorites } from '@/context/FavoritesContext';

interface CurrentWeatherProps {
  data: CurrentWeatherType;
  city: string;
  country: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, city, country }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(city);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(city);
    } else {
      addFavorite(city);
    }
  };

  // Format time from timestamp
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get weather icon URL
  const getWeatherIconUrl = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  return (
    <Card className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg border-0">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{city}</h2>
            <p className="text-gray-600">{country}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFavorite}
            className={favorite ? "text-yellow-400" : "text-gray-400"}
          >
            <Star className={`h-6 w-6 ${favorite ? "fill-yellow-400" : ""}`} />
          </Button>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={getWeatherIconUrl(data.icon)} 
              alt={data.description} 
              className="w-20 h-20"
            />
            <div className="ml-2">
              <p className="text-5xl font-bold text-gray-800">{data.temp}°C</p>
              <p className="text-lg text-gray-600 capitalize">{data.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-700">Feels like: {data.feelsLike}°C</p>
            <p className="text-gray-700">Min: {data.tempMin}°C / Max: {data.tempMax}°C</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="text-xl font-semibold">{data.humidity}%</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Wind</p>
            <p className="text-xl font-semibold">{data.windSpeed} m/s</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Sunrise</p>
            <p className="text-xl font-semibold">{formatTime(data.sunrise)}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Sunset</p>
            <p className="text-xl font-semibold">{formatTime(data.sunset)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
