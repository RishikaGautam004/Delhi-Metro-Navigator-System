import React, { useState } from 'react';
import { CreditCard, Users, Ticket, TrendingDown, Info } from 'lucide-react';
import { StationSelector } from './StationSelector';
import { findShortestPath } from '../utils/pathfinding';
import { calculateFare } from '../data/metroData';

type PassengerType = 'adult' | 'senior' | 'student';
type CardType = 'token' | 'smart-card' | 'tourist-card';

export const FareCalculator: React.FC = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [passengerType, setPassengerType] = useState<PassengerType>('adult');
  const [cardType, setCardType] = useState<CardType>('token');
  const [fareResult, setFareResult] = useState<{
    baseFare: number;
    discount: number;
    finalFare: number;
    distance: number;
    savings?: number;
  } | null>(null);

  const getDiscount = (type: PassengerType | CardType): number => {
    if (type === 'senior') return 50;
    if (type === 'student') return 25;
    if (type === 'smart-card') return 10;
    if (type === 'tourist-card') return 15;
    return 0;
  };

  const calculateDetailedFare = () => {
    if (!source || !destination) return;

    const route = findShortestPath(source, destination, 'distance');
    if (!route) return;

    const baseFare = calculateFare(route.distance);
    const passengerDiscount = getDiscount(passengerType);
    const cardDiscount = getDiscount(cardType);
    const totalDiscount = passengerDiscount + cardDiscount;
    const finalFare = Math.max(Math.round(baseFare * (1 - totalDiscount / 100)), 10);
    const savings = baseFare - finalFare;

    setFareResult({
      baseFare,
      discount: totalDiscount,
      finalFare,
      distance: route.distance,
      savings
    });
  };

  const passengerTypes = [
    { value: 'adult', label: 'Adult', discount: 0 },
    { value: 'senior', label: 'Senior Citizen', discount: 50 },
    { value: 'student', label: 'Student', discount: 25 }
  ];

  const cardTypes = [
    { value: 'token', label: 'Token', discount: 0, desc: 'Single journey' },
    { value: 'smart-card', label: 'Smart Card', discount: 10, desc: 'Reloadable card' },
    { value: 'tourist-card', label: 'Tourist Card', discount: 15, desc: 'Unlimited travel for 1/3 days' }
  ];

  return (
    <div className="space-y-6">
      <div className="metro-card">
        <div className="flex items-center mb-6">
          <CreditCard className="w-6 h-6 text-green-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-800">Fare Calculator</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <StationSelector
              label="From"
              value={source}
              onChange={setSource}
              placeholder="Select source station..."
            />

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
                <Users className="inline w-4 h-4 mr-1" />
                Passenger Type
              </label>
              <div className="space-y-2">
                {passengerTypes.map((type) => (
                  <label key={type.value} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="passenger"
                        value={type.value}
                        checked={passengerType === type.value}
                        onChange={(e) => setPassengerType(e.target.value as PassengerType)}
                        className="mr-3 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-gray-700">{type.label}</span>
                    </div>
                    {type.discount > 0 && (
                      <span className="text-xs font-semibold text-green-600">{type.discount}% OFF</span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Ticket className="inline w-4 h-4 mr-1" />
                Card Type
              </label>
              <div className="space-y-2">
                {cardTypes.map((card) => (
                  <label key={card.value} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <div className="flex items-center flex-1">
                      <input
                        type="radio"
                        name="card"
                        value={card.value}
                        checked={cardType === card.value}
                        onChange={(e) => setCardType(e.target.value as CardType)}
                        className="mr-3 text-green-600 focus:ring-green-500"
                      />
                      <div>
                        <div className="text-gray-700">{card.label}</div>
                        <div className="text-xs text-gray-500">{card.desc}</div>
                      </div>
                    </div>
                    {card.discount > 0 && (
                      <span className="text-xs font-semibold text-green-600">{card.discount}% OFF</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={calculateDetailedFare}
          disabled={!source || !destination}
          className={`w-full mt-6 metro-button-primary ${
            (!source || !destination) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <CreditCard className="w-4 h-4 mr-2 inline" />
          Calculate Fare
        </button>
      </div>

      {fareResult && (
        <div className="metro-card bg-gradient-to-br from-green-50 to-blue-50">
          <h4 className="font-bold text-lg text-gray-800 mb-4">Fare Breakdown</h4>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="text-gray-700">Distance</span>
              <span className="font-bold text-gray-800">{fareResult.distance} km</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="text-gray-700">Base Fare</span>
              <span className="font-semibold text-gray-800">₹{fareResult.baseFare}</span>
            </div>

            {fareResult.discount > 0 && (
              <>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700 flex items-center">
                    <TrendingDown className="w-4 h-4 mr-2 text-green-600" />
                    Total Discount
                  </span>
                  <span className="font-semibold text-green-600">{fareResult.discount}%</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">Savings</span>
                  <span className="font-semibold text-green-600">₹{fareResult.savings}</span>
                </div>
              </>
            )}

            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg">
              <span className="text-white font-bold text-lg">Total Fare</span>
              <span className="text-white font-bold text-2xl">₹{fareResult.finalFare}</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-100 rounded-lg flex items-start">
            <Info className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>Tip:</strong> Use a Smart Card to get automatic discounts on every journey and avoid queues at token counters.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
