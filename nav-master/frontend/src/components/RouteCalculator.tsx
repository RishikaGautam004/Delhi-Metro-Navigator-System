import React, { useState } from 'react';
import { Navigation, ArrowLeftRight, Route } from 'lucide-react';
import { StationSelector } from './StationSelector';
import { RouteResult } from './RouteResult';
import { findShortestPath } from '../utils/pathfinding';
import { RouteResult as RouteResultType } from '../types/metro';

export const RouteCalculator: React.FC = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [optimizeFor, setOptimizeFor] = useState<'distance' | 'time'>('distance');
  const [routeResult, setRouteResult] = useState<RouteResultType | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    if (!source || !destination) {
      setError('Please select both source and destination stations');
      return;
    }

    if (source === destination) {
      setError('Source and destination cannot be the same');
      return;
    }

    setError('');
    setIsCalculating(true);

    // Simulate calculation time for better UX
    setTimeout(() => {
      const result = findShortestPath(source, destination, optimizeFor);
      
      if (result) {
        setRouteResult(result);
      } else {
        setError('No route found between the selected stations');
      }
      
      setIsCalculating(false);
    }, 1000);
  };

  const handleSwapStations = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
    setRouteResult(null);
    setError('');
  };

  const handleReset = () => {
    setSource('');
    setDestination('');
    setRouteResult(null);
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="metro-card">
        <div className="flex items-center mb-6">
          <Navigation className="w-6 h-6 text-metro-blue mr-3" />
          <h3 className="text-xl font-bold text-gray-800">Route Calculator</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <StationSelector
              label="From"
              value={source}
              onChange={setSource}
              placeholder="Select source station..."
            />
            
            <div className="flex justify-center">
              <button
                onClick={handleSwapStations}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                title="Swap stations"
              >
                <ArrowLeftRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <StationSelector
              label="To"
              value={destination}
              onChange={setDestination}
              placeholder="Select destination station..."
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Route className="inline w-4 h-4 mr-1" />
                Optimize Route For
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="optimize"
                    value="distance"
                    checked={optimizeFor === 'distance'}
                    onChange={(e) => setOptimizeFor(e.target.value as 'distance' | 'time')}
                    className="mr-3 text-metro-blue focus:ring-metro-blue"
                  />
                  <span className="text-gray-700">Shortest Distance</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="optimize"
                    value="time"
                    checked={optimizeFor === 'time'}
                    onChange={(e) => setOptimizeFor(e.target.value as 'distance' | 'time')}
                    className="mr-3 text-metro-blue focus:ring-metro-blue"
                  />
                  <span className="text-gray-700">Fastest Time</span>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleCalculate}
                disabled={!source || !destination || isCalculating}
                className={`w-full metro-button-primary flex items-center justify-center ${
                  (!source || !destination || isCalculating) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Calculating Route...
                  </>
                ) : (
                  <>
                    <Route className="w-4 h-4 mr-2" />
                    Find Best Route
                  </>
                )}
              </button>

              {(source || destination) && (
                <button
                  onClick={handleReset}
                  className="w-full mt-2 metro-button-secondary"
                >
                  Reset Selection
                </button>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}
      </div>

      {routeResult && (
        <RouteResult result={routeResult} optimizedFor={optimizeFor} />
      )}
    </div>
  );
};