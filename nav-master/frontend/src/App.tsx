import React, { useState } from 'react';
import { Train, Navigation, MapPin, AlertTriangle, Map, Radio, CreditCard, Clock, BarChart3, Wallet } from 'lucide-react';
import { RouteCalculator } from './components/RouteCalculator';
import { DelaySimulation } from './components/DelaySimulation';
import { MetroMap } from './components/MetroMap';
import { StationList } from './components/StationList';
import { LiveMetroStatus } from './components/LiveMetroStatus';
import { FareCalculator } from './components/FareCalculator';
import { MetroTimings } from './components/MetroTimings';
import { NearbyPlaces } from './components/NearbyPlaces';
import { TravelInsights } from './components/TravelInsights';
import { SmartCardBalance } from './components/SmartCardBalance';

type TabType = 'route' | 'delay' | 'map' | 'stations' | 'live' | 'fare' | 'timings' | 'places' | 'insights' | 'card';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('route');

  const tabs = [
    { id: 'route', label: 'Route Planner', icon: Navigation },
    { id: 'live', label: 'Live Status', icon: Radio },
    { id: 'fare', label: 'Fare Calculator', icon: CreditCard },
    { id: 'timings', label: 'Timings', icon: Clock },
    { id: 'places', label: 'Nearby Places', icon: MapPin },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
    { id: 'card', label: 'Smart Card', icon: Wallet },
    { id: 'delay', label: 'Delays', icon: AlertTriangle },
    { id: 'map', label: 'Network Map', icon: Map },
    { id: 'stations', label: 'Stations', icon: Train },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'route':
        return <RouteCalculator />;
      case 'live':
        return <LiveMetroStatus />;
      case 'fare':
        return <FareCalculator />;
      case 'timings':
        return <MetroTimings />;
      case 'places':
        return <NearbyPlaces />;
      case 'insights':
        return <TravelInsights />;
      case 'card':
        return <SmartCardBalance />;
      case 'delay':
        return <DelaySimulation />;
      case 'map':
        return <MetroMap />;
      case 'stations':
        return <StationList />;
      default:
        return <RouteCalculator />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 animate-fade-in">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                    <Train className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-3">
                    <h1 className="text-xl font-bold text-gray-900">Delhi Metro Navigator</h1>
                    <p className="text-sm text-gray-500">Smart Route Planning & Real-time Updates</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="text-xs text-blue-600 font-medium">
                    {new Date().toLocaleDateString('en-IN', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'short'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-t-lg transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-slide-in">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Train className="w-5 h-5 text-metro-blue mr-2" />
              <span className="text-gray-600 font-medium">Delhi Metro Navigator</span>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              Your complete guide to Delhi Metro - Route planning, live updates, and travel insights
            </p>
            <p className="text-xs text-gray-400">
              Built with React, TypeScript, and modern web technologies
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;