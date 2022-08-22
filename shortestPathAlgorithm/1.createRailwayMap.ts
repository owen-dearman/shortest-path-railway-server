import filePath from "../filePath";
import { convertCSVtoJS } from "./2.convertCSVtoJS";
import { createListOfTiplocs } from "./3.createListOfTiplocs";
import { getShortestRoute } from "./4.getShortestRoute";
import { Railway, Route, ShortestRoute, TiplocError } from "./typing";

/**
 *
 * @returns functions as the basis of querying the railway infratsructure
 */

export function createRailwayMap(): Railway {
  //pull in the data from the CSV file. In this way, this step only has to be done once for multiple searches.
  const railwayData: Route[] = convertCSVtoJS(filePath("tracks.csv"));

  //returns list of unique TIPLOCs in alphabetical order
  const tiplocArr = createListOfTiplocs(railwayData);

  //number of routes in the data
  function getNumRoutes(): number {
    return railwayData.length;
  }

  //list of all TIPLOCs in the data
  function getListOfTiplocs(): string[] {
    return tiplocArr;
  }

  //number of TIPLOCS in the data
  function getNumTiplocs(): number {
    return tiplocArr.length;
  }

  //return the shortest route between two TIPLOCS
  function findShortestRoute(
    origin: string,
    destination: string,
  ): ShortestRoute | TiplocError {
    const originTiplocExist = tiplocArr.includes(origin)
    const destinationTiplocExist = tiplocArr.includes(destination)
    if (originTiplocExist && destinationTiplocExist) {
      return getShortestRoute(
        origin.toUpperCase(),
        destination.toUpperCase(),
        railwayData,
      );
    } else {
      return !originTiplocExist ? { message: "Origin or Destination TIPLOC Not Found", fault: origin } : { message: "Origin or Destination TIPLOC Not Found", fault: destination }
    }
  }

  return {
    getNumRoutes,
    getListOfTiplocs,
    getNumTiplocs,
    findShortestRoute,
  };
}
