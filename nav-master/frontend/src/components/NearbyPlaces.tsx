import React, { useState } from 'react';
import { MapPin, Landmark, ShoppingBag, Utensils, Hospital, Hotel, GraduationCap, Building2 } from 'lucide-react';
import { StationSelector } from './StationSelector';

interface Place {
  name: string;
  category: string;
  distance: string;
  rating: number;
  icon: React.ElementType;
}

const nearbyPlacesData: { [key: string]: Place[] } = {
  'Rajiv Chowk': [
    { name: 'Connaught Place', category: 'Shopping', distance: '0.2 km', rating: 4.5, icon: ShoppingBag },
    { name: 'Palika Bazaar', category: 'Shopping', distance: '0.1 km', rating: 4.0, icon: ShoppingBag },
    { name: 'Central Park', category: 'Landmark', distance: '0.3 km', rating: 4.8, icon: Landmark },
    { name: 'Odeon Cinema', category: 'Entertainment', distance: '0.4 km', rating: 4.2, icon: Building2 },
    { name: 'Keventer\'s', category: 'Restaurant', distance: '0.2 km', rating: 4.4, icon: Utensils }
  ],
  'Chandni Chowk': [
    { name: 'Red Fort', category: 'Landmark', distance: '1.0 km', rating: 4.7, icon: Landmark },
    { name: 'Jama Masjid', category: 'Landmark', distance: '0.8 km', rating: 4.6, icon: Landmark },
    { name: 'Paranthe Wali Gali', category: 'Restaurant', distance: '0.3 km', rating: 4.5, icon: Utensils },
    { name: 'Chandni Chowk Market', category: 'Shopping', distance: '0.1 km', rating: 4.3, icon: ShoppingBag },
    { name: 'Gurudwara Sis Ganj', category: 'Landmark', distance: '0.5 km', rating: 4.7, icon: Landmark }
  ],
  'AIIMS': [
    { name: 'AIIMS Hospital', category: 'Hospital', distance: '0.1 km', rating: 4.8, icon: Hospital },
    { name: 'IIT Delhi', category: 'Education', distance: '2.5 km', rating: 4.9, icon: GraduationCap },
    { name: 'Safdarjung Tomb', category: 'Landmark', distance: '1.2 km', rating: 4.4, icon: Landmark },
    { name: 'Green Park Market', category: 'Shopping', distance: '1.8 km', rating: 4.2, icon: ShoppingBag }
  ],
  'New Delhi': [
    { name: 'India Gate', category: 'Landmark', distance: '2.5 km', rating: 4.8, icon: Landmark },
    { name: 'Rashtrapati Bhavan', category: 'Landmark', distance: '3.0 km', rating: 4.9, icon: Landmark },
    { name: 'Parliament House', category: 'Landmark', distance: '2.8 km', rating: 4.7, icon: Building2 },
    { name: 'Paharganj', category: 'Shopping', distance: '1.0 km', rating: 4.1, icon: ShoppingBag },
    { name: 'Hotel Metropolis', category: 'Hotel', distance: '0.5 km', rating: 4.3, icon: Hotel }
  ],
  'Botanical Garden': [
    { name: 'Worlds of Wonder', category: 'Entertainment', distance: '3.5 km', rating: 4.4, icon: Building2 },
    { name: 'The Great India Place', category: 'Shopping', distance: '2.0 km', rating: 4.5, icon: ShoppingBag },
    { name: 'DLF Mall of India', category: 'Shopping', distance: '4.0 km', rating: 4.6, icon: ShoppingBag },
    { name: 'Botanical Garden', category: 'Landmark', distance: '0.5 km', rating: 4.3, icon: Landmark }
  ],
  'IGI Airport': [
    { name: 'Terminal 3', category: 'Airport', distance: '0.1 km', rating: 4.5, icon: Building2 },
    { name: 'Aerocity', category: 'Hotel', distance: '1.5 km', rating: 4.6, icon: Hotel },
    { name: 'Worldmark Aerocity', category: 'Shopping', distance: '1.8 km', rating: 4.4, icon: ShoppingBag },
    { name: 'Roseate House', category: 'Hotel', distance: '2.0 km', rating: 4.7, icon: Hotel }
  ],
  'Dwarka Sector 21': [
    { name: 'Vegas Mall', category: 'Shopping', distance: '1.0 km', rating: 4.3, icon: ShoppingBag },
    { name: 'City Centre Mall', category: 'Shopping', distance: '1.5 km', rating: 4.2, icon: ShoppingBag },
    { name: 'Dwarka Sector 10 Market', category: 'Shopping', distance: '2.0 km', rating: 4.0, icon: ShoppingBag }
  ],
  'Saket': [
    { name: 'Select Citywalk', category: 'Shopping', distance: '0.5 km', rating: 4.7, icon: ShoppingBag },
    { name: 'MGF Metropolitan Mall', category: 'Shopping', distance: '0.8 km', rating: 4.4, icon: ShoppingBag },
    { name: 'DLF Place Saket', category: 'Shopping', distance: '0.6 km', rating: 4.5, icon: ShoppingBag },
    { name: 'PVR Anupam', category: 'Entertainment', distance: '0.3 km', rating: 4.3, icon: Building2 }
  ]
};

const defaultPlaces: Place[] = [
  { name: 'Select a station', category: 'Info', distance: '-', rating: 0, icon: MapPin },
  { name: 'to view nearby places', category: 'Info', distance: '-', rating: 0, icon: MapPin }
];

export const NearbyPlaces: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const places = selectedStation && nearbyPlacesData[selectedStation]
    ? nearbyPlacesData[selectedStation]
    : defaultPlaces;

  const categories = [
    { value: 'all', label: 'All Places', icon: MapPin },
    { value: 'Shopping', label: 'Shopping', icon: ShoppingBag },
    { value: 'Restaurant', label: 'Food', icon: Utensils },
    { value: 'Landmark', label: 'Landmarks', icon: Landmark },
    { value: 'Hospital', label: 'Healthcare', icon: Hospital },
    { value: 'Hotel', label: 'Hotels', icon: Hotel },
    { value: 'Education', label: 'Education', icon: GraduationCap }
  ];

  const filteredPlaces = selectedCategory === 'all'
    ? places
    : places.filter(place => place.category === selectedCategory);

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      'Shopping': 'bg-purple-50 text-purple-700 border-purple-200',
      'Restaurant': 'bg-orange-50 text-orange-700 border-orange-200',
      'Landmark': 'bg-blue-50 text-blue-700 border-blue-200',
      'Hospital': 'bg-red-50 text-red-700 border-red-200',
      'Hotel': 'bg-green-50 text-green-700 border-green-200',
      'Education': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Entertainment': 'bg-pink-50 text-pink-700 border-pink-200',
      'Airport': 'bg-gray-50 text-gray-700 border-gray-200',
      'Info': 'bg-gray-50 text-gray-500 border-gray-200'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="space-y-6">
      <div className="metro-card">
        <div className="flex items-center mb-6">
          <MapPin className="w-6 h-6 text-purple-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-800">Nearby Places</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <StationSelector
              label="Select Metro Station"
              value={selectedStation}
              onChange={setSelectedStation}
              placeholder="Choose a station to explore nearby places..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Filter by Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat.value
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {selectedStation && (
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <div className="text-sm text-purple-800">
              Showing {filteredPlaces.length} place(s) near <strong>{selectedStation}</strong>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlaces.map((place, index) => {
          const Icon = place.icon;
          return (
            <div
              key={index}
              className="metro-card hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center flex-1">
                  <div className={`p-2 rounded-lg ${getCategoryColor(place.category)} border mr-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 truncate">{place.name}</h4>
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getCategoryColor(place.category)} border`}>
                      {place.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Distance</span>
                  <span className="font-semibold text-gray-800">{place.distance}</span>
                </div>

                {place.rating > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <span className="font-semibold text-yellow-600 mr-1">{place.rating}</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                  </div>
                )}
              </div>

              {place.rating > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <button className="w-full text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
                    View Details →
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedStation && nearbyPlacesData[selectedStation] && (
        <div className="metro-card bg-gradient-to-r from-purple-50 to-blue-50">
          <h4 className="font-bold text-gray-800 mb-3">Local Tips</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Use Gate numbers on signages to find the nearest exit to your destination</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Check station maps for exact gate locations before exiting</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Popular destinations may have dedicated signage at the station</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
