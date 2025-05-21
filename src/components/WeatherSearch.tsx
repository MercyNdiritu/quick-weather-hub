
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  recentSearches?: string[];
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch, recentSearches = [] }) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowDropdown(false);
    }
  };

  const handleRecentSearch = (city: string) => {
    setQuery(city);
    onSearch(city);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-full sm:max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-grow w-full">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => recentSearches.length > 0 && setShowDropdown(true)}
            className="pr-10 h-10 sm:h-12 rounded-lg border-gray-300 focus:border-weather-blue focus:ring-weather-blue w-full"
          />
        </div>
        <Button 
          type="submit" 
          className="h-10 sm:h-12 bg-weather-blue hover:bg-weather-blue-dark rounded-lg w-full sm:w-auto"
        >
          <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="ml-2">Search</span>
        </Button>
      </form>

      {/* Recent searches dropdown */}
      {showDropdown && recentSearches.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          <div className="py-1">
            <div className="px-4 py-2 text-xs sm:text-sm text-gray-500">Recent Searches</div>
            {recentSearches.map((city, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleRecentSearch(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;
