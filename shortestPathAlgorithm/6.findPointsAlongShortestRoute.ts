import { Route, RailwayMap } from "./typing";

export function findPointsAlongShortestRoute(
  start: string,
  end: string,
  nodes: RailwayMap,
): { nodesOnRoute: string[]; numTracks: number } {
  let nodesOnRoute: string[] = [];
  let currentNode = end;
  while (currentNode !== start) {
    /*NB. The graph is uni-directional, and so we can't trace a route from detsination->onwardsRoute to origin because the route may not exist.
    Instead, we find all nodes which have a route to destination, and calculate the distance of their origin + distance to destination. Then we set currentNode to origin
    */
    nodesOnRoute.push(currentNode);
    let minWeight = Infinity;
    //find nodes with a route to currentNode
    const routesToCurrentNode = findNodesWithRouteToLocation(
      currentNode,
      nodes,
    );
    for (const route of routesToCurrentNode) {
      const cumulativeWeight = route.distance + nodes[route.origin].weight;
      //if distance from journey origin is shorter, then set that as the next node in route
      if (cumulativeWeight < minWeight) {
        minWeight = cumulativeWeight;
        currentNode = route.origin;
      }
    }
  }
  const numTracks = nodesOnRoute.length;
  //add the starting station to the route as the while loop is not activated
  nodesOnRoute.push(start);
  //reverse the list so origin is at the start and destination at the end
  nodesOnRoute = nodesOnRoute.reverse();
  return { nodesOnRoute: nodesOnRoute, numTracks: numTracks };
}

export function findNodesWithRouteToLocation(
  location: string,
  nodes: RailwayMap,
): Route[] {
  const routes: Route[] = [];
  for (const key in nodes) {
    const currentNodeRoutes = nodes[key].routes;
    for (const route of currentNodeRoutes) {
      route.destination === location && routes.push(route);
    }
  }
  return routes;
}
