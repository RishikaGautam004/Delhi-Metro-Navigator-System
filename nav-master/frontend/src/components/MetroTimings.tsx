import React, { useState } from 'react';
import { Clock, Sunrise, Sunset, Calendar, AlertTriangle } from 'lucide-react';
import { StationSelector } from './StationSelector';
import { metroLines } from '../data/metroData';

interface TimingInfo {
  line: string;
  firstTrain: string;
  lastTrain: string;
  frequency: string;
  color: string;
}

const metroTimingsData: { [key: string]: TimingInfo[] } = {
  'weekday': [
    { line: 'Blue Line', firstTrain: '05:00 AM', lastTrain: '11:00 PM', frequency: '4-6 mins', color: '#0066CC' },
    { line: 'Yellow Line', firstTrain: '05:15 AM', lastTrain: '11:15 PM', frequency: '5-7 mins', color: '#FFD320' },
    { line: 'Orange Line', firstTrain: '05:10 AM', lastTrain: '11:30 PM', frequency: '8-12 mins', color: '#FF8C00' },
    { line: 'Pink Line', firstTrain: '05:30 AM', lastTrain: '10:45 PM', frequency: '6-10 mins', color: '#ED64A6' },
    { line: 'Purple Line', firstTrain: '05:25 AM', lastTrain: '10:50 PM', frequency: '7-10 mins', color: '#9F7AEA' }
  ],
  'weekend': [
    { line: 'Blue Line', firstTrain: '06:00 AM', lastTrain: '11:00 PM', frequency: '6-8 mins', color: '#0066CC' },
    { line: 'Yellow Line', firstTrain: '06:15 AM', lastTrain: '11:15 PM', frequency: '7-9 mins', color: '#FFD320' },
    { line: 'Orange Line', firstTrain: '06:30 AM', lastTrain: '11:30 PM', frequency: '10-15 mins', color: '#FF8C00' },
    { line: 'Pink Line', firstTrain: '06:30 AM', lastTrain: '10:45 PM', frequency: '8-12 mins', color: '#ED64A6' },
    { line: 'Purple Line', firstTrain: '06:30 AM', lastTrain: '10:50 PM', frequency: '10-12 mins', color: '#9F7AEA' }
  ]
};

export const MetroTimings: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState('');
  const [dayType, setDayType] = useState<'weekday' | 'weekend'>('weekday');
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const isMetroOpen = currentHour >= 5 && currentHour < 23;

  const getTimingsForStation = (stationName: string): TimingInfo[] => {
    if (!stationName) return metroTimingsData[dayType];

    const stationLines = metroLines
      .filter(line => line.stations.includes(stationName))
      .map(line => line.name);

    return metroTimingsData[dayType].filter(timing =>
      stationLines.some(line => timing.line === line)
    );
  };

  const timings = getTimingsForStation(selectedStation);

  const getNextTrainTime = (firstTrain: string, lastTrain: string, frequency: string): string => {
    if (!isMetroOpen) return 'Service closed';

    const freqMinutes = parseInt(frequency.split('-')[0]);
    const nextMinutes = Math.floor(Math.random() * freqMinutes) + 1;

    return `${nextMinutes} min`;
  };

  return (
    <div className="space-y-6">
      <div className="metro-card">
        <div className="flex items-center mb-6">
          <Clock className="w-6 h-6 text-blue-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-800">Metro Timings</h3>
        </div>

        <div className={`mb-6 p-4 rounded-lg flex items-center ${
          isMetroOpen ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          {isMetroOpen ? (
            <>
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <div>
                <div className="font-semibold text-green-800">Metro is currently operational</div>
                <div className="text-sm text-green-600">Services available on all lines</div>
              </div>
            </>
          ) : (
            <>
              <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
              <div>
                <div className="font-semibold text-red-800">Metro services are closed</div>
                <div className="text-sm text-red-600">Services resume at 5:00 AM</div>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <StationSelector
              label="Filter by Station (Optional)"
              value={selectedStation}
              onChange={setSelectedStation}
              placeholder="Select a station to view specific timings..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <Calendar className="inline w-4 h-4 mr-1" />
              Day Type
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setDayType('weekday')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  dayType === 'weekday'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Weekday
              </button>
              <button
                onClick={() => setDayType('weekend')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  dayType === 'weekend'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Weekend
              </button>
            </div>
          </div>
        </div>

        {selectedStation && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-800">
              Showing timings for <strong>{selectedStation}</strong> station
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {timings.map((timing, index) => (
          <div
            key={index}
            className="metro-card hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center mb-4">
              <div
                className="w-4 h-4 rounded-full mr-3"
                style={{ backgroundColor: timing.color }}
              ></div>
              <h4 className="font-bold text-lg text-gray-800">{timing.line}</h4>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <Sunrise className="w-5 h-5 text-orange-600 mr-2" />
                  <span className="text-sm text-gray-700">First Train</span>
                </div>
                <span className="font-bold text-gray-800">{timing.firstTrain}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-center">
                  <Sunset className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-sm text-gray-700">Last Train</span>
                </div>
                <span className="font-bold text-gray-800">{timing.lastTrain}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-600 mr-2" />
                  <span className="text-sm text-gray-700">Frequency</span>
                </div>
                <span className="font-bold text-gray-800">{timing.frequency}</span>
              </div>

              {isMetroOpen && (
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm text-gray-700">Next Train</span>
                  </div>
                  <span className="font-bold text-green-700">
                    {getNextTrainTime(timing.firstTrain, timing.lastTrain, timing.frequency)}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="metro-card bg-gradient-to-r from-blue-50 to-purple-50">
        <h4 className="font-bold text-gray-800 mb-3">Important Information</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Trains run at higher frequencies during peak hours (8-10 AM and 5-8 PM)</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Sunday timings are same as Saturday timings</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Timings may vary on public holidays</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Last train timings shown are for the first station of the line</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
