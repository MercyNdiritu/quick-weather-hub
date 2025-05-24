
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
      <CardContent className="p-2">
        <h3 className="text-sm font-bold text-gray-800 mb-1">5-Day Forecast</h3>
        <div className="grid grid-cols-5 gap-1">
          {forecast.map((day, index) => (
            <div 
              key={index} 
              className="bg-gray-100 rounded-lg p-1.5 flex flex-col items-center text-center"
            >
              <span className="font-semibold text-gray-800 text-xs">{day.dayOfWeek}</span>
              <span className="text-xs text-gray-500">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              <img 
                src={getWeatherIconUrl(day.icon)} 
                alt={day.description} 
                className="w-6 h-6 my-0.5"
                loading="lazy"
              />
              <span className="font-medium text-xs">{day.temp}°C</span>
              <div className="text-xs text-gray-600">
                <div>{day.tempMin}° / {day.tempMax}°</div>
              </div>

              {/* Humidity gauge */}
              <div className="w-full mt-0.5">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs text-gray-500">H</span>
                  <span className="text-xs font-medium">{day.humidity}%</span>
                </div>
                <Progress value={day.humidity} className="h-0.5"
                  indicatorClassName={`${
                    day.humidity > 80 ? "bg-blue-700" :
                    day.humidity > 60 ? "bg-blue-500" :
                    day.humidity > 40 ? "bg-blue-400" : "bg-blue-300"
                  }`}
                />
              </div>
              
              {/* Wind indicator */}
              <div className="w-full mt-0.5 flex items-center justify-between">
                <Wind className="h-2.5 w-2.5 text-teal-500" />
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
