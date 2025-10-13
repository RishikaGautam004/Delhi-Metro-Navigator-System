import { Station, MetroLine } from '../types/metro';

export const metroLines: MetroLine[] = [
  {
    name: 'Blue Line',
    color: '#0066CC',
    stations: ['Noida Sector 62', 'Botanical Garden', 'Yamuna Bank', 'Rajiv Chowk', 'Moti Nagar', 'Janak Puri West', 'Dwarka Sector 21']
  },
  {
    name: 'Yellow Line',
    color: '#FFD320',
    stations: ['Huda City Center', 'Saket', 'AIIMS', 'Rajiv Chowk', 'New Delhi', 'Chandni Chowk', 'Vishwavidyalaya']
  },
  {
    name: 'Orange Line',
    color: '#FF8C00',
    stations: ['IGI Airport', 'DDS Campus', 'Shivaji Stadium', 'New Delhi']
  },
  {
    name: 'Pink Line',
    color: '#ED64A6',
    stations: ['Rajouri Garden', 'Netaji Subhash Place']
  },
  {
    name: 'Purple Line',
    color: '#9F7AEA',
    stations: ['Punjabi Bagh West', 'Netaji Subhash Place']
  }
];

export const stations: Station[] = [
  {
    name: 'Noida Sector 62',
    line: 'Blue',
    connections: [{ to: 'Botanical Garden', distance: 8, time: 12 }]
  },
  {
    name: 'Botanical Garden',
    line: 'Blue',
    connections: [
      { to: 'Noida Sector 62', distance: 8, time: 12 },
      { to: 'Yamuna Bank', distance: 10, time: 15 }
    ]
  },
  {
    name: 'Yamuna Bank',
    line: 'Blue',
    connections: [
      { to: 'Botanical Garden', distance: 10, time: 15 },
      { to: 'Vaishali', distance: 8, time: 12 },
      { to: 'Rajiv Chowk', distance: 6, time: 9 }
    ]
  },
  {
    name: 'Vaishali',
    line: 'Blue',
    connections: [{ to: 'Yamuna Bank', distance: 8, time: 12 }]
  },
  {
    name: 'Rajiv Chowk',
    line: 'Blue/Yellow',
    connections: [
      { to: 'Yamuna Bank', distance: 6, time: 9 },
      { to: 'Moti Nagar', distance: 9, time: 13 },
      { to: 'AIIMS', distance: 7, time: 10 },
      { to: 'New Delhi', distance: 1, time: 2 }
    ]
  },
  {
    name: 'Moti Nagar',
    line: 'Blue',
    connections: [
      { to: 'Rajiv Chowk', distance: 9, time: 13 },
      { to: 'Janak Puri West', distance: 7, time: 10 },
      { to: 'Rajouri Garden', distance: 2, time: 3 }
    ]
  },
  {
    name: 'Janak Puri West',
    line: 'Blue/Orange',
    connections: [
      { to: 'Moti Nagar', distance: 7, time: 10 },
      { to: 'Dwarka Sector 21', distance: 6, time: 9 }
    ]
  },
  {
    name: 'Dwarka Sector 21',
    line: 'Blue',
    connections: [{ to: 'Janak Puri West', distance: 6, time: 9 }]
  },
  {
    name: 'Huda City Center',
    line: 'Yellow',
    connections: [{ to: 'Saket', distance: 15, time: 22 }]
  },
  {
    name: 'Saket',
    line: 'Yellow',
    connections: [
      { to: 'Huda City Center', distance: 15, time: 22 },
      { to: 'AIIMS', distance: 6, time: 9 }
    ]
  },
  {
    name: 'AIIMS',
    line: 'Yellow',
    connections: [
      { to: 'Saket', distance: 6, time: 9 },
      { to: 'Rajiv Chowk', distance: 7, time: 10 }
    ]
  },
  {
    name: 'New Delhi',
    line: 'Yellow/Orange',
    connections: [
      { to: 'Rajiv Chowk', distance: 1, time: 2 },
      { to: 'Chandni Chowk', distance: 2, time: 3 },
      { to: 'Shivaji Stadium', distance: 2, time: 3 }
    ]
  },
  {
    name: 'Chandni Chowk',
    line: 'Yellow',
    connections: [
      { to: 'New Delhi', distance: 2, time: 3 },
      { to: 'Vishwavidyalaya', distance: 5, time: 7 }
    ]
  },
  {
    name: 'Vishwavidyalaya',
    line: 'Yellow',
    connections: [{ to: 'Chandni Chowk', distance: 5, time: 7 }]
  },
  {
    name: 'Shivaji Stadium',
    line: 'Orange',
    connections: [
      { to: 'New Delhi', distance: 2, time: 3 },
      { to: 'DDS Campus', distance: 7, time: 10 }
    ]
  },
  {
    name: 'DDS Campus',
    line: 'Orange',
    connections: [
      { to: 'Shivaji Stadium', distance: 7, time: 10 },
      { to: 'IGI Airport', distance: 8, time: 12 }
    ]
  },
  {
    name: 'IGI Airport',
    line: 'Orange',
    connections: [{ to: 'DDS Campus', distance: 8, time: 12 }]
  },
  {
    name: 'Rajouri Garden',
    line: 'Blue/Pink',
    connections: [
      { to: 'Moti Nagar', distance: 2, time: 3 },
      { to: 'Punjabi Bagh West', distance: 2, time: 3 }
    ]
  },
  {
    name: 'Punjabi Bagh West',
    line: 'Purple',
    connections: [
      { to: 'Rajouri Garden', distance: 2, time: 3 },
      { to: 'Netaji Subhash Place', distance: 3, time: 4 }
    ]
  },
  {
    name: 'Netaji Subhash Place',
    line: 'Pink/Purple',
    connections: [{ to: 'Punjabi Bagh West', distance: 3, time: 4 }]
  }
];

export const getLineColor = (lineName: string): string => {
  const colorMap: { [key: string]: string } = {
    'Blue': '#0066CC',
    'Yellow': '#FFD320',
    'Orange': '#FF8C00',
    'Pink': '#ED64A6',
    'Purple': '#9F7AEA',
    'Red': '#E53E3E',
    'Green': '#38A169'
  };
  
  return colorMap[lineName] || '#718096';
};

export const calculateFare = (distance: number): number => {
  if (distance <= 2) return 10;
  else if (distance <= 5) return 20;
  else if (distance <= 12) return 30;
  else if (distance <= 21) return 40;
  else if (distance <= 32) return 50;
  else return 60;
};