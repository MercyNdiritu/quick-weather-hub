import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import WeatherSearch from '@/components/WeatherSearch';
import CurrentWeather from '@/components/CurrentWeather';
import ForecastCard from '@/components/ForecastCard';
import FavoriteLocations from '@/components/FavoriteLocations';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { getWeatherByCity, getWeatherByCoords, getWeatherBackground, getMockWeatherData } from '@/api/weatherApi';
import { WeatherData } from '@/types/weather';

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('openWeatherApiKey'));
  const [bgClass, setBgClass] = useState('bg-sunny-gradient');
  const { toast } = useToast();

  // Load a default location or last searched location on initial render
  useEffect(() => {
    const lastSearch = localStorage.getItem('lastWeatherSearch');
    
    if (process.env.NODE_ENV === 'development') {
      // Use mock data for development
      setWeather(getMockWeatherData());
      setBgClass(getWeatherBackground('01d'));
      return;
    }
    
    if (!apiKey) {
      // Skip API call if no API key is set
      return;
    }
    
    if (lastSearch) {
      fetchWeatherData(lastSearch);
    } else {
      // Try to get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
          },
          () => {
            // If geolocation fails, use a default city
            fetchWeatherData('New York');
          }
        );
      } else {
        fetchWeatherData('New York');
      }
    }
    
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentWeatherSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, [apiKey]);

  const fetchWeatherData = async (city: string) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenWeather API key in the settings",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
      setBgClass(getWeatherBackground(data.current.icon));
      
      // Save to localStorage
      localStorage.setItem('lastWeatherSearch', city);
      
      // Update recent searches
      if (!recentSearches.includes(city)) {
        const updated = [city, ...recentSearches].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentWeatherSearches', JSON.stringify(updated));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to fetch weather data',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    if (!apiKey) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherByCoords(lat, lon);
      setWeather(data);
      setBgClass(getWeatherBackground(data.current.icon));
      
      // Save to localStorage
      localStorage.setItem('lastWeatherSearch', data.city);
      
      // Update recent searches
      if (!recentSearches.includes(data.city)) {
        const updated = [data.city, ...recentSearches].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentWeatherSearches', JSON.stringify(updated));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to fetch weather data',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const key = formData.get('apiKey') as string;
    
    if (key) {
      localStorage.setItem('openWeatherApiKey', key);
      setApiKey(key);
      toast({
        title: "Success",
        description: "API key saved successfully",
      });
    }
  };

  return (
    <FavoritesProvider>
      <div className={`min-h-screen transition-colors duration-500 ${bgClass}`}>
        <div className="container mx-auto px-2 py-1 max-h-screen overflow-hidden">
          <header className="text-center mb-1">
            <h1 className="text-lg sm:text-xl font-bold text-white mb-0.5">WeatherWise</h1>
            <p className="text-xs text-white/90">Real-time weather updates and forecasts</p>
          </header>

          {!apiKey ? (
            <div className="max-w-xs sm:max-w-sm mx-auto">
              <Card className="p-3 bg-white/90 backdrop-blur-sm">
                <h2 className="text-sm font-semibold mb-2">Enter OpenWeather API Key</h2>
                <p className="text-xs text-gray-600 mb-2">
                  To use this weather app, you need an API key from{" "}
                  <a 
                    href="https://openweathermap.org/api" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-weather-blue hover:underline"
                  >
                    OpenWeather
                  </a>
                </p>
                <form onSubmit={handleApiKeySubmit}>
                  <input 
                    type="text" 
                    name="apiKey"
                    placeholder="Enter your API key"
                    className="w-full p-2 border rounded mb-2 text-xs"
                    required
                  />
                  <button 
                    type="submit"
                    className="w-full bg-weather-blue hover:bg-weather-blue-dark text-white p-2 rounded text-xs"
                  >
                    Save API Key
                  </button>
                </form>
              </Card>
            </div>
          ) : (
            <div className="h-[calc(100vh-80px)] overflow-hidden">
              <div className="mb-1">
                <WeatherSearch 
                  onSearch={fetchWeatherData} 
                  recentSearches={recentSearches}
                />
              </div>

              <div className="space-y-1 h-[calc(100%-60px)] overflow-y-auto">
                <FavoriteLocations onSelectCity={fetchWeatherData} />

                {loading ? (
                  <div className="text-center py-2">
                    <div className="inline-block animate-pulse bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                      <div className="text-white text-sm">Loading weather data...</div>
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-center py-2">
                    <div className="inline-block bg-red-100 p-2 rounded-lg">
                      <div className="text-red-600 text-xs">{error}</div>
                    </div>
                  </div>
                ) : weather ? (
                  <>
                    <CurrentWeather 
                      data={weather.current} 
                      city={weather.city} 
                      country={weather.country} 
                    />
                    <ForecastCard forecast={weather.forecast} />
                    <div className="text-center text-white/70 text-xs">
                      Last updated: {new Date(weather.lastUpdated).toLocaleString()}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          )}

          <footer className="text-center text-white/70 text-xs py-1">
            <p>Created with ❤️ using React, Tailwind CSS, and shadcn/ui</p>
          </footer>
        </div>
      </div>
    </FavoritesProvider>
  );
};

export default Index;
