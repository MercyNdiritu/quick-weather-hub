
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Gauge, Wind } from 'lucide-react';
import { CurrentWeather as CurrentWeatherType } from '@/types/weather';
import { useFavorites } from '@/context/FavoritesContext';
import { Progress } from '@/components/ui/progress';
import SunriseSunsetChart from './SunriseSunsetChart';

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

  // Calculate wind direction arrow rotation
  const getWindDirectionStyle = (degrees: number) => {
    return {
      transform: `rotate(${degrees}deg)`,
    };
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

        {/* Sunrise Sunset Chart */}
        <div className="mt-4 sm:mt-6 bg-gray-50 p-3 rounded-lg">
          <SunriseSunsetChart sunrise={data.sunrise} sunset={data.sunset} />
        </div>

        <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4">
          {/* Humidity Gauge */}
          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mr-2" />
                <p className="text-xs sm:text-sm text-gray-500">Humidity</p>
              </div>
              <p className="text-base sm:text-xl font-semibold">{data.humidity}%</p>
            </div>
            <Progress value={data.humidity} className="h-2 sm:h-3" 
              indicatorClassName={`${
                data.humidity > 80 ? "bg-blue-700" :
                data.humidity > 60 ? "bg-blue-500" :
                data.humidity > 40 ? "bg-blue-400" : "bg-blue-300"
              }`}
            />
            <div className="flex justify-between mt-1 text-xs text-gray-400">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Wind Speed and Direction */}
          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Wind className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 mr-2" />
                <p className="text-xs sm:text-sm text-gray-500">Wind</p>
              </div>
              <p className="text-base sm:text-xl font-semibold">{data.windSpeed} m/s</p>
            </div>
            <div className="flex justify-center items-center my-1">
              <div className="relative bg-gray-200 rounded-full h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">N</div>
                <div className="absolute bottom-0 inset-x-0 flex justify-center text-xs text-gray-500">S</div>
                <div className="absolute inset-y-0 left-0 flex items-center text-xs text-gray-500">W</div>
                <div className="absolute inset-y-0 right-0 flex items-center text-xs text-gray-500">E</div>
                <div 
                  className="h-8 w-1 bg-teal-500 origin-bottom rounded transition-all duration-500"
                  style={getWindDirectionStyle(data.windDirection)}
                ></div>
              </div>
            </div>
            <div className="mt-1 text-xs text-center text-gray-500">
              {data.windSpeed < 3 ? "Light breeze" : 
               data.windSpeed < 8 ? "Moderate wind" : 
               data.windSpeed < 15 ? "Strong wind" : "Storm"}
            </div>
          </div>

          {/* Sunrise time */}
          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/></svg>
              <p className="text-xs sm:text-sm text-gray-500">Sunrise</p>
            </div>
            <p className="text-base sm:text-xl font-semibold text-center">{formatTime(data.sunrise)}</p>
          </div>

          {/* Sunset time */}
          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10V2"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="M16 18a4 4 0 0 0-8 0"/><path d="m8 6 4 4 4-4"/></svg>
              <p className="text-xs sm:text-sm text-gray-500">Sunset</p>
            </div>
            <p className="text-base sm:text-xl font-semibold text-center">{formatTime(data.sunset)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
