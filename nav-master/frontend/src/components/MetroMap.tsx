import React from 'react';
import { Train, MapPin } from 'lucide-react';
import { metroLines, stations, getLineColor } from '../data/metroData';

export const MetroMap: React.FC = () => {
  return (
    <div className="metro-card">
      <div className="flex items-center mb-6">
        <Train className="w-6 h-6 text-metro-blue mr-3" />
        <h3 className="text-xl font-bold text-gray-800">Delhi Metro Network</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Metro Lines */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Metro Lines
          </h4>
          <div className="space-y-3">
            {metroLines.map((line, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: line.color }}
                  ></div>
                  <span className="font-semibold text-gray-800">{line.name}</span>
                  <span className="ml-auto text-sm text-gray-500">
                    {line.stations.length} stations
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {line.stations.slice(0, 3).join(' → ')}
                  {line.stations.length > 3 && ' → ...'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Station Statistics */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Network Statistics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-metro-blue">{stations.length}</div>
              <div className="text-sm text-gray-600">Total Stations</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{metroLines.length}</div>
              <div className="text-sm text-gray-600">Metro Lines</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {stations.reduce((total, station) => total + station.connections.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Connections</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">6</div>
              <div className="text-sm text-gray-600">Interchange Stations</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h5 className="font-semibold text-gray-800 mb-2">Key Interchange Stations</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-metro-blue rounded-full mr-2"></div>
                <span>Rajiv Chowk (Blue ↔ Yellow)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-metro-yellow rounded-full mr-2"></div>
                <span>New Delhi (Yellow ↔ Orange)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                <span>Rajouri Garden (Blue ↔ Pink)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Network Representation */}
      <div className="mt-8">
        <h4 className="font-semibold text-gray-800 mb-4">Network Visualization</h4>
        <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-6 text-white overflow-x-auto">
          <div className="min-w-full">
            <svg viewBox="0 0 800 400" className="w-full h-64">
              {/* Blue Line */}
              <line x1="50" y1="200" x2="750" y2="200" stroke="#0066CC" strokeWidth="4" />
              <circle cx="100" cy="200" r="6" fill="#0066CC" />
              <text x="100" y="190" textAnchor="middle" fontSize="10" fill="white">Noida</text>
              <circle cx="200" cy="200" r="6" fill="#0066CC" />
              <text x="200" y="190" textAnchor="middle" fontSize="10" fill="white">Botanical</text>
              <circle cx="350" cy="200" r="8" fill="#0066CC" stroke="#FFD320" strokeWidth="2" />
              <text x="350" y="190" textAnchor="middle" fontSize="10" fill="white">Rajiv Chowk</text>
              <circle cx="500" cy="200" r="6" fill="#0066CC" />
              <text x="500" y="190" textAnchor="middle" fontSize="10" fill="white">Moti Nagar</text>
              <circle cx="650" cy="200" r="6" fill="#0066CC" />
              <text x="650" y="190" textAnchor="middle" fontSize="10" fill="white">Dwarka</text>

              {/* Yellow Line */}
              <line x1="350" y1="50" x2="350" y2="350" stroke="#FFD320" strokeWidth="4" />
              <circle cx="350" cy="100" r="6" fill="#FFD320" />
              <text x="350" y="90" textAnchor="middle" fontSize="10" fill="white">Vishwavidyalaya</text>
              <circle cx="350" cy="150" r="6" fill="#FFD320" />
              <text x="350" y="140" textAnchor="middle" fontSize="10" fill="white">Chandni Chowk</text>
              <circle cx="350" cy="250" r="6" fill="#FFD320" />
              <text x="350" y="240" textAnchor="middle" fontSize="10" fill="white">AIIMS</text>
              <circle cx="350" cy="300" r="6" fill="#FFD320" />
              <text x="350" y="290" textAnchor="middle" fontSize="10" fill="white">Saket</text>

              {/* Orange Line */}
              <line x1="250" y1="120" x2="450" y2="280" stroke="#FF8C00" strokeWidth="4" />
              <circle cx="280" cy="140" r="6" fill="#FF8C00" />
              <text x="280" y="130" textAnchor="middle" fontSize="10" fill="white">IGI Airport</text>
              <circle cx="420" cy="260" r="6" fill="#FF8C00" />
              <text x="420" y="250" textAnchor="middle" fontSize="10" fill="white">Shivaji Stadium</text>
            </svg>
          </div>
          <p className="text-center text-sm mt-4 opacity-75">
            Simplified network visualization showing major lines and interchange points
          </p>
        </div>
      </div>
    </div>
  );
};