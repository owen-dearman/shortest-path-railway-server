import { Route, RailwayMap } from "./typing";

export function buildMapFromOrigin(
  journeyOrigin: string,
  data: Route[],
): { nodes: RailwayMap; unvisitedNodes: string[] } {
  const nodes = createDefaultRailwayMap(data);
  const unvisitedNodes: string[] = [];

  //set up the weights based on starting point
  for (const tiploc in nodes) {
    tiploc === journeyOrigin
      ? (nodes[tiploc].weight = 0)
      : (nodes[tiploc].weight = Infinity);
    unvisitedNodes.push(tiploc);
  }
  return { nodes, unvisitedNodes };
}

function createDefaultRailwayMap(data: Route[]): RailwayMap {
  const mapOfRoutes = {} as RailwayMap;
  for (const node of data) {
    const routeDestinations: Route[] = [];
    //get all onward routes from the current node
    const arrayOfOnwardsRoutes = filterForOnwardsRoutes(node.origin, data);
    //for each onward route from the current node, push it into routeDestinations. Add 1 to the distance of all routes to avoid a zero-weighting error. This is removed at the end
    arrayOfOnwardsRoutes.forEach((route) => {
      routeDestinations.push({
        origin: route.origin,
        destination: route.destination,
        distance: route.distance + 1,
      });
    });
    //create a node in the graph for each data point, containing its name, connected nodes, and a default distance from the origin as weight. This will be updated in buildMapFromOrigin
    mapOfRoutes[node.origin] = {
      routes: routeDestinations,
      weight: 1,
    };
  }
  return mapOfRoutes;
}

export function filterForOnwardsRoutes(
  currentTiploc: string,
  databaseOfStations: Route[],
): Route[] {
  //return array of stations with a starting point or ending point of the same name as the current station
  const onwardsRoutes = databaseOfStations.filter(
    (route) => route.origin === currentTiploc,
  );
  return onwardsRoutes;
}
