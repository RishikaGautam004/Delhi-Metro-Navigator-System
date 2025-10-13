import React from 'react';
import { Clock, MapPin, IndianRupee, Route, ArrowRight } from 'lucide-react';
import { RouteResult as RouteResultType } from '../types/metro';
import { stations, getLineColor } from '../data/metroData';

interface RouteResultProps {
  result: RouteResultType;
  optimizedFor: 'distance' | 'time';
}

export const RouteResult: React.FC<RouteResultProps> = ({ result, optimizedFor }) => {
  const getStationLine = (stationName: string) => {
    const station = stations.find(s => s.name === stationName);
    return station?.line || '';
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="metro-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">
          Route Found
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-metro-blue">
            <Route className="w-5 h-5 mr-1" />
            <span className="font-semibold">
              {optimizedFor === 'distance' ? 'Shortest Distance' : 'Fastest Route'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <MapPin className="w-6 h-6 text-metro-blue mx-auto mb-2" />
          <div className="text-2xl font-bold text-metro-blue">{result.distance} km</div>
          <div className="text-sm text-gray-600">Total Distance</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">{formatTime(result.time)}</div>
          <div className="text-sm text-gray-600">Travel Time</div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <IndianRupee className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-600">₹{result.fare}</div>
          <div className="text-sm text-gray-600">Estimated Fare</div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
          <Route className="w-4 h-4 mr-2" />
          Route Path ({result.path.length} stations)
        </h4>
        
        <div className="space-y-3">
          {result.path.map((station, index) => {
            const line = getStationLine(station);
            const lineColor = getLineColor(line);
            const isLast = index === result.path.length - 1;
            
            return (
              <div key={index} className="flex items-center">
                <div className="flex items-center flex-1">
                  <div className="flex flex-col items-center mr-4">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: lineColor }}
                    ></div>
                    {!isLast && (
                      <div className="w-0.5 h-8 bg-gray-300 mt-1"></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{station}</div>
                    <div className="text-sm text-gray-500">{line} Line</div>
                  </div>
                </div>
                
                {!isLast && (
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-2" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Fare is calculated based on distance traveled. 
          Keep your metro card/token ready for a smooth journey!
        </p>
      </div>
    </div>
  );
};