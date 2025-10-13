import { stations } from '../data/metroData';
import { RouteResult, DelayInfo } from '../types/metro';

interface DijkstraNode {
  station: string;
  distance: number;
  time: number;
  path: string[];
}

export const findShortestPath = (source: string, destination: string, optimizeFor: 'distance' | 'time' = 'distance'): RouteResult | null => {
  if (source === destination) {
    return {
      distance: 0,
      time: 0,
      path: [source],
      fare: 10
    };
  }

  const visited = new Set<string>();
  const distances = new Map<string, number>();
  const times = new Map<string, number>();
  const previous = new Map<string, string>();
  const queue: DijkstraNode[] = [];

  // Initialize distances and times
  stations.forEach(station => {
    distances.set(station.name, Infinity);
    times.set(station.name, Infinity);
  });

  distances.set(source, 0);
  times.set(source, 0);
  queue.push({ station: source, distance: 0, time: 0, path: [source] });

  while (queue.length > 0) {
    // Sort queue by the optimization criteria
    queue.sort((a, b) => {
      if (optimizeFor === 'distance') {
        return a.distance - b.distance;
      } else {
        return a.time - b.time;
      }
    });

    const current = queue.shift()!;
    
    if (visited.has(current.station)) continue;
    visited.add(current.station);

    if (current.station === destination) {
      const totalDistance = distances.get(destination) || 0;
      const totalTime = times.get(destination) || 0;
      
      return {
        distance: totalDistance,
        time: totalTime,
        path: current.path,
        fare: calculateFare(totalDistance)
      };
    }

    const currentStation = stations.find(s => s.name === current.station);
    if (!currentStation) continue;

    currentStation.connections.forEach(connection => {
      if (visited.has(connection.to)) return;

      const newDistance = current.distance + connection.distance;
      const newTime = current.time + connection.time;
      
      const currentBestDistance = distances.get(connection.to) || Infinity;
      const currentBestTime = times.get(connection.to) || Infinity;

      let shouldUpdate = false;
      if (optimizeFor === 'distance' && newDistance < currentBestDistance) {
        shouldUpdate = true;
      } else if (optimizeFor === 'time' && newTime < currentBestTime) {
        shouldUpdate = true;
      }

      if (shouldUpdate) {
        distances.set(connection.to, newDistance);
        times.set(connection.to, newTime);
        previous.set(connection.to, current.station);
        
        queue.push({
          station: connection.to,
          distance: newDistance,
          time: newTime,
          path: [...current.path, connection.to]
        });
      }
    });
  }

  return null;
};

export const calculateFare = (distance: number): number => {
  if (distance <= 2) return 10;
  else if (distance <= 5) return 20;
  else if (distance <= 12) return 30;
  else if (distance <= 21) return 40;
  else if (distance <= 32) return 50;
  else return 60;
};

export const simulateDelay = (stationName: string, delayMinutes: number): DelayInfo => {
  const affectedStations: Array<{
    name: string;
    additionalDelay: number;
    totalDelay: number;
  }> = [];

  const visited = new Set<string>();
  const queue: Array<{ station: string; level: number; delay: number }> = [];
  
  queue.push({ station: stationName, level: 0, delay: delayMinutes });
  visited.add(stationName);

  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (current.level >= 3) continue; // Max 3 hops

    const currentStation = stations.find(s => s.name === current.station);
    if (!currentStation) continue;

    currentStation.connections.forEach(connection => {
      if (!visited.has(connection.to)) {
        const propagatedDelay = current.delay + 3; // Add 3 minutes per hop
        const additionalDelay = propagatedDelay - delayMinutes;
        
        affectedStations.push({
          name: connection.to,
          additionalDelay,
          totalDelay: propagatedDelay
        });

        visited.add(connection.to);
        queue.push({
          station: connection.to,
          level: current.level + 1,
          delay: propagatedDelay
        });
      }
    });
  }

  return {
    station: stationName,
    delayMinutes,
    affectedStations: affectedStations.sort((a, b) => a.additionalDelay - b.additionalDelay)
  };
};

export const fuzzySearch = (query: string, stationNames: string[]): string[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return stationNames.slice(0, 5);

  // Exact matches first
  const exactMatches = stationNames.filter(name => 
    name.toLowerCase() === normalizedQuery
  );

  // Prefix matches
  const prefixMatches = stationNames.filter(name => 
    name.toLowerCase().startsWith(normalizedQuery) && 
    !exactMatches.includes(name)
  );

  // Contains matches
  const containsMatches = stationNames.filter(name => 
    name.toLowerCase().includes(normalizedQuery) && 
    !exactMatches.includes(name) && 
    !prefixMatches.includes(name)
  );

  // Fuzzy matches using simple distance
  const fuzzyMatches = stationNames.filter(name => {
    if (exactMatches.includes(name) || prefixMatches.includes(name) || containsMatches.includes(name)) {
      return false;
    }
    return levenshteinDistance(normalizedQuery, name.toLowerCase()) <= 3;
  });

  return [...exactMatches, ...prefixMatches, ...containsMatches, ...fuzzyMatches].slice(0, 5);
};

const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }

  return matrix[str2.length][str1.length];
};