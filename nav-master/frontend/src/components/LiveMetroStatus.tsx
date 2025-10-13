import React, { useState, useEffect } from 'react';
import { Train, Activity, Clock, AlertCircle, CheckCircle, Radio } from 'lucide-react';
import { metroLines } from '../data/metroData';

interface TrainStatus {
  id: string;
  line: string;
  currentStation: string;
  nextStation: string;
  status: 'on-time' | 'delayed' | 'maintenance';
  delayMinutes?: number;
  progress: number;
}

const generateLiveTrains = (): TrainStatus[] => {
  const trains: TrainStatus[] = [];

  metroLines.forEach((line, idx) => {
    if (line.stations.length >= 3) {
      const numTrains = Math.floor(line.stations.length / 3);

      for (let i = 0; i < numTrains; i++) {
        const stationIndex = Math.floor((line.stations.length - 1) * (i / numTrains));
        const currentStation = line.stations[stationIndex];
        const nextStation = line.stations[Math.min(stationIndex + 1, line.stations.length - 1)];

        const statuses: Array<'on-time' | 'delayed' | 'maintenance'> = ['on-time', 'on-time', 'on-time', 'delayed', 'maintenance'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

        trains.push({
          id: `${line.name.split(' ')[0]}-${i + 1}`,
          line: line.name,
          currentStation,
          nextStation,
          status: randomStatus,
          delayMinutes: randomStatus === 'delayed' ? Math.floor(Math.random() * 10) + 2 : 0,
          progress: Math.floor(Math.random() * 100)
        });
      }
    }
  });

  return trains;
};

export const LiveMetroStatus: React.FC = () => {
  const [liveTrains, setLiveTrains] = useState<TrainStatus[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    setLiveTrains(generateLiveTrains());

    if (isLive) {
      const interval = setInterval(() => {
        setLiveTrains(generateLiveTrains());
        setLastUpdate(new Date());
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isLive]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'delayed':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'maintenance':
        return <Activity className="w-5 h-5 text-red-600" />;
      default:
        return <Train className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'on-time':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">On Time</span>;
      case 'delayed':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">Delayed</span>;
      case 'maintenance':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">Maintenance</span>;
      default:
        return null;
    }
  };

  const onTimeTrains = liveTrains.filter(t => t.status === 'on-time').length;
  const delayedTrains = liveTrains.filter(t => t.status === 'delayed').length;
  const maintenanceTrains = liveTrains.filter(t => t.status === 'maintenance').length;

  return (
    <div className="space-y-6">
      <div className="metro-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Radio className={`w-6 h-6 mr-3 ${isLive ? 'text-red-600 animate-pulse' : 'text-gray-400'}`} />
            <h3 className="text-xl font-bold text-gray-800">Live Metro Status</h3>
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isLive
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isLive ? 'Live' : 'Paused'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-700">{onTimeTrains}</div>
                <div className="text-sm text-green-600">On Time</div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-700">{delayedTrains}</div>
                <div className="text-sm text-yellow-600">Delayed</div>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-700">{maintenanceTrains}</div>
                <div className="text-sm text-red-600">Maintenance</div>
              </div>
              <Activity className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
          <div>{liveTrains.length} trains active</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {liveTrains.map((train) => (
          <div
            key={train.id}
            className="metro-card hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                {getStatusIcon(train.status)}
                <div className="ml-3">
                  <div className="font-bold text-gray-800">Train {train.id}</div>
                  <div className="text-sm text-gray-500">{train.line}</div>
                </div>
              </div>
              {getStatusBadge(train.status)}
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <div className="w-24 text-gray-600">Current:</div>
                <div className="font-medium text-gray-800">{train.currentStation}</div>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-24 text-gray-600">Next:</div>
                <div className="font-medium text-gray-800">{train.nextStation}</div>
              </div>
              {train.status === 'delayed' && train.delayMinutes && (
                <div className="flex items-center text-sm">
                  <div className="w-24 text-gray-600">Delay:</div>
                  <div className="font-medium text-yellow-700">{train.delayMinutes} minutes</div>
                </div>
              )}
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress to next station</span>
                <span>{train.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${train.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
