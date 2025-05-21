
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
      <CardContent className="p-4 sm:p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{city}</h2>
            <p className="text-sm sm:text-base text-gray-600">{country}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFavorite}
            className={favorite ? "text-yellow-400" : "text-gray-400"}
          >
            <Star className={`h-5 w-5 sm:h-6 sm:w-6 ${favorite ? "fill-yellow-400" : ""}`} />
          </Button>
        </div>

        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
            <img 
              src={getWeatherIconUrl(data.icon)} 
              alt={data.description} 
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
            <div className="ml-0 sm:ml-2 text-center sm:text-left">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">{data.temp}°C</p>
              <p className="text-base sm:text-lg text-gray-600 capitalize">{data.description}</p>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-sm sm:text-base text-gray-700">Feels like: {data.feelsLike}°C</p>
            <p className="text-sm sm:text-base text-gray-700">Min: {data.tempMin}°C / Max: {data.tempMax}°C</p>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
          <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-500">Humidity</p>
            <p className="text-base sm:text-xl font-semibold">{data.humidity}%</p>
          </div>
          <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-500">Wind</p>
            <p className="text-base sm:text-xl font-semibold">{data.windSpeed} m/s</p>
          </div>
          <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-500">Sunrise</p>
            <p className="text-base sm:text-xl font-semibold">{formatTime(data.sunrise)}</p>
          </div>
          <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-500">Sunset</p>
            <p className="text-base sm:text-xl font-semibold">{formatTime(data.sunset)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
