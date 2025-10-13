import React, { useState, useMemo } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { stations, getLineColor } from '../data/metroData';

export const StationList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLine, setSelectedLine] = useState('All');

  const lines = ['All', ...Array.from(new Set(stations.flatMap(s => s.line.split('/'))))];

  const filteredStations = useMemo(() => {
    return stations.filter(station => {
      const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLine = selectedLine === 'All' || station.line.includes(selectedLine);
      return matchesSearch && matchesLine;
    });
  }, [searchQuery, selectedLine]);

  return (
    <div className="metro-card">
      <div className="flex items-center mb-6">
        <MapPin className="w-6 h-6 text-metro-blue mr-3" />
        <h3 className="text-xl font-bold text-gray-800">All Metro Stations</h3>
        <span className="ml-auto bg-metro-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
          {filteredStations.length} stations
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search stations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="station-input pl-10"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={selectedLine}
            onChange={(e) => setSelectedLine(e.target.value)}
            className="station-input pl-10 pr-8 appearance-none bg-white"
          >
            {lines.map(line => (
              <option key={line} value={line}>{line} Line</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-3 max-h-96 overflow-y-auto">
        {filteredStations.map((station, index) => {
          const lines = station.line.split('/');
          
          return (
            <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{station.name}</h4>
                  <div className="flex items-center mt-1">
                    {lines.map((line, lineIndex) => (
                      <div key={lineIndex} className="flex items-center mr-4">
                        <div
                          className="line-indicator"
                          style={{ backgroundColor: getLineColor(line) }}
                        ></div>
                        <span className="text-sm text-gray-600 font-medium">{line} Line</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    {station.connections.length} connection{station.connections.length !== 1 ? 's' : ''}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {station.connections.map(conn => conn.to).slice(0, 2).join(', ')}
                    {station.connections.length > 2 && '...'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredStations.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No stations found matching your criteria</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedLine('All');
            }}
            className="mt-2 text-metro-blue hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};