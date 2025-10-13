import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search } from 'lucide-react';
import { stations } from '../data/metroData';
import { fuzzySearch } from '../utils/pathfinding';

interface StationSelectorProps {
  label: string;
  value: string;
  onChange: (station: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const StationSelector: React.FC<StationSelectorProps> = ({
  label,
  value,
  onChange,
  placeholder = "Start typing station name...",
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const stationNames = stations.map(s => s.name);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = fuzzySearch(searchQuery, stationNames);
      setSuggestions(results);
    } else {
      setSuggestions(stationNames.slice(0, 8));
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsOpen(true);
    
    if (!query.trim()) {
      onChange('');
    }
  };

  const handleStationSelect = (station: string) => {
    onChange(station);
    setSearchQuery(station);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (!searchQuery && value) {
      setSearchQuery(value);
    }
  };

  const getStationLine = (stationName: string) => {
    const station = stations.find(s => s.name === stationName);
    return station?.line || '';
  };

  const getLineColor = (line: string) => {
    const colors: { [key: string]: string } = {
      'Blue': '#0066CC',
      'Yellow': '#FFD320',
      'Orange': '#FF8C00',
      'Pink': '#ED64A6',
      'Purple': '#9F7AEA',
      'Red': '#E53E3E',
      'Green': '#38A169'
    };
    
    if (line.includes('/')) {
      return colors[line.split('/')[0]] || '#718096';
    }
    
    return colors[line] || '#718096';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        <MapPin className="inline w-4 h-4 mr-1" />
        {label}
      </label>
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          disabled={disabled}
          className="station-input pl-10 pr-4"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {suggestions.map((station, index) => {
            const line = getStationLine(station);
            const lineColor = getLineColor(line);
            
            return (
              <button
                key={index}
                onClick={() => handleStationSelect(station)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0 transition-colors duration-150"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{station}</span>
                  <div className="flex items-center">
                    <span
                      className="line-indicator"
                      style={{ backgroundColor: lineColor }}
                    ></span>
                    <span className="text-xs text-gray-500 font-medium">{line}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};