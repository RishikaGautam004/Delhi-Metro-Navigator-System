import React, { useState } from 'react';
import { AlertTriangle, Clock, Zap, MapPin } from 'lucide-react';
import { StationSelector } from './StationSelector';
import { simulateDelay } from '../utils/pathfinding';
import { DelayInfo } from '../types/metro';

export const DelaySimulation: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState('');
  const [delayMinutes, setDelayMinutes] = useState(15);
  const [delayInfo, setDelayInfo] = useState<DelayInfo | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    if (!selectedStation) return;
    
    setIsSimulating(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const result = simulateDelay(selectedStation, delayMinutes);
      setDelayInfo(result);
      setIsSimulating(false);
    }, 1000);
  };

  const getSeverityColor = (delay: number) => {
    if (delay <= 5) return 'text-yellow-600 bg-yellow-50';
    if (delay <= 10) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getSeverityIcon = (delay: number) => {
    if (delay <= 5) return '⚠️';
    if (delay <= 10) return '🔶';
    return '🚨';
  };

  return (
    <div className="space-y-6">
      <div className="metro-card">
        <div className="flex items-center mb-6">
          <AlertTriangle className="w-6 h-6 text-orange-500 mr-3" />
          <h3 className="text-xl font-bold text-gray-800">Delay Simulation</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StationSelector
            label="Select Station with Delay"
            value={selectedStation}
            onChange={setSelectedStation}
            placeholder="Choose station experiencing delay..."
          />
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Clock className="inline w-4 h-4 mr-1" />
              Delay Duration (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={delayMinutes}
              onChange={(e) => setDelayMinutes(parseInt(e.target.value) || 15)}
              className="station-input"
            />
          </div>
        </div>

        <button
          onClick={handleSimulate}
          disabled={!selectedStation || isSimulating}
          className={`mt-6 w-full metro-button-primary flex items-center justify-center ${
            (!selectedStation || isSimulating) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSimulating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Simulating Delay Propagation...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Simulate Delay Impact
            </>
          )}
        </button>
      </div>

      {delayInfo && (
        <div className="metro-card">
          <div className="flex items-center mb-6">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
            <h4 className="text-lg font-bold text-gray-800">
              Delay Impact Analysis
            </h4>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              <div>
                <div className="font-semibold text-red-800">
                  Primary Delay: {delayInfo.station}
                </div>
                <div className="text-red-600">
                  +{delayInfo.delayMinutes} minutes delay reported
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="font-semibold text-gray-800 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Affected Stations ({delayInfo.affectedStations.length})
            </h5>
            
            {delayInfo.affectedStations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No stations affected by this delay</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {delayInfo.affectedStations.map((affected, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getSeverityColor(affected.additionalDelay)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">
                          {getSeverityIcon(affected.additionalDelay)}
                        </span>
                        <div>
                          <div className="font-medium">{affected.name}</div>
                          <div className="text-sm opacity-75">
                            +{affected.additionalDelay} min additional delay
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          {affected.totalDelay} min
                        </div>
                        <div className="text-xs opacity-75">total delay</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>ℹ️ How it works:</strong> Delays propagate to connected stations 
              with +3 minutes added per connection hop, up to 3 stations away. 
              This simulation helps predict real-time impact on the metro network.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};