export interface Station {
  name: string;
  line: string;
  connections: Connection[];
}

export interface Connection {
  to: string;
  distance: number;
  time: number;
}

export interface RouteResult {
  distance: number;
  time: number;
  path: string[];
  fare: number;
}

export interface DelayInfo {
  station: string;
  delayMinutes: number;
  affectedStations: Array<{
    name: string;
    additionalDelay: number;
    totalDelay: number;
  }>;
}

export interface MetroLine {
  name: string;
  color: string;
  stations: string[];
}