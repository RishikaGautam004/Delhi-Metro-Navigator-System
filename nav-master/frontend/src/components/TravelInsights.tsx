import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Clock, IndianRupee, Award, Target } from 'lucide-react';
import { stations, metroLines } from '../data/metroData';

interface TravelStats {
  totalJourneys: number;
  totalDistance: number;
  totalSpent: number;
  avgJourneyTime: number;
  favoriteStation: string;
  mostUsedLine: string;
  carbonSaved: number;
}

const generateMockStats = (): TravelStats => {
  const randomJourneys = Math.floor(Math.random() * 50) + 20;
  const randomDistance = Math.floor(Math.random() * 300) + 150;

  return {
    totalJourneys: randomJourneys,
    totalDistance: randomDistance,
    totalSpent: Math.floor(randomDistance * 2.5),
    avgJourneyTime: Math.floor(Math.random() * 20) + 25,
    favoriteStation: stations[Math.floor(Math.random() * stations.length)].name,
    mostUsedLine: metroLines[Math.floor(Math.random() * metroLines.length)].name,
    carbonSaved: Math.floor(randomDistance * 0.12)
  };
};

const monthlyData = [
  { month: 'Jan', journeys: 45, spent: 950 },
  { month: 'Feb', journeys: 52, spent: 1100 },
  { month: 'Mar', journeys: 48, spent: 1020 },
  { month: 'Apr', journeys: 61, spent: 1280 },
  { month: 'May', journeys: 55, spent: 1150 },
  { month: 'Jun', journeys: 58, spent: 1220 }
];

const achievements = [
  { title: 'Metro Explorer', desc: 'Visited 15+ stations', icon: Target, unlocked: true },
  { title: 'Eco Warrior', desc: 'Saved 50kg CO₂', icon: Award, unlocked: true },
  { title: 'Regular Commuter', desc: '50+ journeys', icon: TrendingUp, unlocked: true },
  { title: 'Line Master', desc: 'Traveled on all lines', icon: BarChart3, unlocked: false }
];

export const TravelInsights: React.FC = () => {
  const [stats, setStats] = useState<TravelStats>(generateMockStats());
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    setStats(generateMockStats());
  }, [timeRange]);

  const maxJourneys = Math.max(...monthlyData.map(d => d.journeys));

  return (
    <div className="space-y-6">
      <div className="metro-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <BarChart3 className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-800">Travel Insights</h3>
          </div>
          <div className="flex space-x-2">
            {(['week', 'month', 'year'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="text-3xl font-bold text-blue-700">{stats.totalJourneys}</div>
            <div className="text-sm text-blue-600 mt-1">Total Journeys</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="text-3xl font-bold text-green-700">{stats.totalDistance} km</div>
            <div className="text-sm text-green-600 mt-1">Distance Traveled</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center">
              <IndianRupee className="w-6 h-6 text-purple-700 mr-1" />
              <div className="text-3xl font-bold text-purple-700">{stats.totalSpent}</div>
            </div>
            <div className="text-sm text-purple-600 mt-1">Total Spent</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
            <div className="text-3xl font-bold text-yellow-700">{stats.avgJourneyTime} min</div>
            <div className="text-sm text-yellow-600 mt-1">Avg Journey Time</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="metro-card">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Monthly Journey Trends
          </h4>
          <div className="space-y-3">
            {monthlyData.map((data, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 font-medium">{data.month}</span>
                  <span className="text-gray-600">{data.journeys} journeys</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(data.journeys / maxJourneys) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="metro-card">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-green-600" />
            Your Travel Profile
          </h4>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Favorite Station</div>
              <div className="font-bold text-lg text-gray-800">{stats.favoriteStation}</div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Most Used Line</div>
              <div className="font-bold text-lg text-gray-800">{stats.mostUsedLine}</div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="text-sm text-gray-600 mb-1">Carbon Footprint Saved</div>
              <div className="flex items-center">
                <div className="font-bold text-2xl text-green-700">{stats.carbonSaved} kg</div>
                <div className="ml-2 text-xs text-green-600">CO₂</div>
              </div>
              <div className="text-xs text-green-600 mt-2">
                vs. driving a car
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="metro-card">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-yellow-600" />
          Achievements
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center mb-2">
                  <Icon className={`w-6 h-6 ${achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'}`} />
                  {achievement.unlocked && (
                    <span className="ml-auto text-2xl">🏆</span>
                  )}
                </div>
                <div className={`font-bold ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                  {achievement.title}
                </div>
                <div className={`text-xs mt-1 ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                  {achievement.desc}
                </div>
                {!achievement.unlocked && (
                  <div className="mt-2 text-xs text-gray-500 italic">Locked</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="metro-card bg-gradient-to-r from-blue-50 to-purple-50">
        <h4 className="font-bold text-gray-800 mb-3">Environmental Impact</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{stats.carbonSaved} kg</div>
            <div className="text-sm text-gray-600">CO₂ Saved</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{Math.floor(stats.totalDistance * 0.8)} L</div>
            <div className="text-sm text-gray-600">Fuel Saved</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">{Math.floor(stats.totalDistance * 1.5)} hrs</div>
            <div className="text-sm text-gray-600">Traffic Avoided</div>
          </div>
        </div>
        <p className="text-sm text-gray-700 mt-4">
          By choosing metro, you're contributing to a cleaner and more sustainable Delhi!
        </p>
      </div>
    </div>
  );
};
