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
      <CardContent className="p-2 sm:p-4">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">5-Day Forecast</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {forecast.map((day, index) => (
            <div 
              key={index} 
              className="bg-gray-100 rounded-lg p-2 flex flex-col items-center text-center"
            >
              <span className="font-semibold text-gray-800 text-xs sm:text-sm">{day.dayOfWeek}</span>
              <span className="text-xs text-gray-500">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              <img 
                src={getWeatherIconUrl(day.icon)} 
                alt={day.description} 
                className="w-8 h-8 sm:w-10 sm:h-10 my-1"
                loading="lazy"
              />
              <span className="font-medium text-sm">{day.temp}°C</span>
              <div className="text-xs text-gray-600">
                <div>{day.tempMin}° / {day.tempMax}°</div>
              </div>

              {/* Humidity gauge */}
              <div className="w-full mt-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Humidity</span>
                  <span className="text-xs font-medium">{day.humidity}%</span>
                </div>
                <Progress value={day.humidity} className="h-1"
                  indicatorClassName={`${
                    day.humidity > 80 ? "bg-blue-700" :
                    day.humidity > 60 ? "bg-blue-500" :
                    day.humidity > 40 ? "bg-blue-400" : "bg-blue-300"
                  }`}
                />
              </div>
              
              {/* Wind indicator */}
              <div className="w-full mt-1 flex items-center justify-between">
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
