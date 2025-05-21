
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ForecastDay } from '@/types/weather';
import { Wind } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ForecastCardProps {
  forecast: ForecastDay[];
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  // Get weather icon URL
  const getWeatherIconUrl = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}.png`;
  };

  return (
    <Card className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg border-0">
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {forecast.map((day, index) => (
            <div 
              key={index} 
              className="bg-gray-100 rounded-lg p-2 sm:p-3 flex flex-col items-center text-center"
            >
              <span className="font-semibold text-gray-800">{day.dayOfWeek}</span>
              <span className="text-xs text-gray-500">{new Date(day.date).toLocaleDateString()}</span>
              <img 
                src={getWeatherIconUrl(day.icon)} 
                alt={day.description} 
                className="w-10 h-10 sm:w-12 sm:h-12 my-1"
                loading="lazy"
              />
              <span className="font-medium">{day.temp}°C</span>
              <div className="mt-1 text-xs text-gray-600">
                <div>{day.tempMin}° / {day.tempMax}°</div>
                <div className="capitalize">{day.description}</div>
              </div>

              {/* Humidity gauge */}
              <div className="w-full mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Humidity</span>
                  <span className="text-xs font-medium">{day.humidity}%</span>
                </div>
                <Progress value={day.humidity} className="h-1.5"
                  indicatorClassName={`${
                    day.humidity > 80 ? "bg-blue-700" :
                    day.humidity > 60 ? "bg-blue-500" :
                    day.humidity > 40 ? "bg-blue-400" : "bg-blue-300"
                  }`}
                />
              </div>
              
              {/* Wind indicator */}
              <div className="w-full mt-2 flex items-center justify-between">
                <Wind className="h-3 w-3 text-teal-500" />
                <span className="text-xs font-medium">{day.windSpeed} m/s</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
