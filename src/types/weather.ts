
export interface WeatherData {
  city: string;
  country: string;
  current: CurrentWeather;
  forecast: ForecastDay[];
  lastUpdated: string;
}

export interface CurrentWeather {
  temp: number;
  tempMin: number;
  tempMax: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
  visibility: number;
  timeZone: number;
}

export interface ForecastDay {
  date: string;
  dayOfWeek: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface WeatherError {
  message: string;
}

export type WeatherCondition = 
  | 'clear'
  | 'clouds'
  | 'rain'
  | 'drizzle'
  | 'thunderstorm' 
  | 'snow'
  | 'mist'
  | 'fog'
  | 'smoke'
  | 'haze'
  | 'dust'
  | 'sand'
  | 'ash'
  | 'squall'
  | 'tornado'
  | 'unknown';
