
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface SunriseSunsetChartProps {
  sunrise: number;
  sunset: number;
}

const SunriseSunsetChart: React.FC<SunriseSunsetChartProps> = ({ sunrise, sunset }) => {
  const data = useMemo(() => {
    const sunriseTime = new Date(sunrise * 1000);
    const sunsetTime = new Date(sunset * 1000);
    
    // Create a full day timeline (24 hours)
    const timeline = [];
    
    // Get current hour to show where we are in the day
    const currentTime = new Date();
    const currentHour = currentTime.getHours() + (currentTime.getMinutes() / 60);
    
    // Create 24 data points (one for each hour)
    for (let i = 0; i < 24; i++) {
      const hour = i;
      
      const sunriseHour = sunriseTime.getHours() + (sunriseTime.getMinutes() / 60);
      const sunsetHour = sunsetTime.getHours() + (sunsetTime.getMinutes() / 60);
      
      // Create a curve that peaks during daylight hours
      let value = 0;
      if (hour >= sunriseHour && hour <= sunsetHour) {
        // Create a bell curve for daylight hours
        const midpoint = (sunriseHour + sunsetHour) / 2;
        const distance = Math.abs(hour - midpoint);
        const maxDistance = (sunsetHour - sunriseHour) / 2;
        value = 100 * (1 - Math.pow(distance / maxDistance, 2));
      }
      
      const hourLabel = i.toString().padStart(2, '0') + ':00';
      
      timeline.push({
        hour: hourLabel,
        value: Math.max(0, Math.min(100, value)),
        isCurrent: hour === Math.floor(currentHour) || 
                  (hour === Math.floor(currentHour + 1) && currentTime.getMinutes() >= 30),
        isSunrise: hour === Math.floor(sunriseHour),
        isSunset: hour === Math.floor(sunsetHour)
      });
    }
    
    return timeline;
  }, [sunrise, sunset]);

  const formatHour = (hour: string) => {
    return hour.split(':')[0];
  };

  // Format time from timestamp
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const customConfig = {
    daylight: {
      label: 'Daylight',
      theme: { light: '#ffa50090', dark: '#ffa50090' }
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-orange-400 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/></svg>
          <span className="text-xs font-medium">{formatTime(sunrise)}</span>
        </div>
        <span className="text-xs font-medium">Daylight</span>
        <div className="flex items-center">
          <span className="text-xs font-medium">{formatTime(sunset)}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-purple-500 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10V2"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="M16 18a4 4 0 0 0-8 0"/><path d="m8 6 4 4 4-4"/></svg>
        </div>
      </div>
      
      <div className="h-16 sm:h-20 w-full">
        <ChartContainer config={customConfig} className="h-full w-full">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="daylight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFB84D" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#FFD699" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="hour" 
              tick={{ fontSize: 8 }} 
              tickFormatter={formatHour} 
              interval={5}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              formatter={(value, name) => {
                return `${value}% brightness`;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              name="daylight"
              stroke="#FFB84D" 
              fillOpacity={1}
              fill="url(#daylight)" 
              dot={false}
              activeDot={{ r: 4, fill: "#FF8C00" }}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default SunriseSunsetChart;
