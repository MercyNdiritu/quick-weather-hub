
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ForecastDay } from '@/types/weather';

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
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {forecast.map((day, index) => (
            <div 
              key={index} 
              className="bg-gray-100 rounded-lg p-3 flex flex-col items-center text-center"
            >
              <span className="font-semibold text-gray-800">{day.dayOfWeek}</span>
              <span className="text-xs text-gray-500">{new Date(day.date).toLocaleDateString()}</span>
              <img 
                src={getWeatherIconUrl(day.icon)} 
                alt={day.description} 
                className="w-12 h-12 my-1"
              />
              <span className="font-medium">{day.temp}°C</span>
              <div className="mt-1 text-xs text-gray-600">
                <div>{day.tempMin}° / {day.tempMax}°</div>
                <div className="capitalize">{day.description}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
