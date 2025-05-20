
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
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative flex-grow">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => recentSearches.length > 0 && setShowDropdown(true)}
            className="pr-10 h-12 rounded-lg border-gray-300 focus:border-weather-blue focus:ring-weather-blue"
          />
        </div>
        <Button 
          type="submit" 
          className="ml-2 h-12 bg-weather-blue hover:bg-weather-blue-dark rounded-lg"
        >
          <Search className="h-5 w-5" />
          <span className="ml-2 hidden sm:inline">Search</span>
        </Button>
      </form>

      {/* Recent searches dropdown */}
      {showDropdown && recentSearches.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-500">Recent Searches</div>
            {recentSearches.map((city, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
