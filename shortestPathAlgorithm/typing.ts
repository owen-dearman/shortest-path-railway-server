export interface Railway {
  getNumTiplocs: () => number;
  getNumRoutes: () => number;
  getListOfTiplocs: () => string[];
  findShortestRoute: (arg0: string, arg1: string) => ShortestRoute | TiplocError;
}

export type RailwayMap = {
  [key: string]: {
    routes: Route[];
    weight: number;
  };
};

export type Route = { origin: string; destination: string; distance: number };

export type ShortestRoute = {
  distance: number;
  nodes: string[];
  numTracks: number;
};

export type TiplocError = { message: "Origin or Destination TIPLOC Not Found", fault: string }