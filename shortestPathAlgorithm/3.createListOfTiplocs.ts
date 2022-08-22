import { Route } from "./typing";

export function createListOfTiplocs(data: Route[]): string[] {
  const stationArr: string[] = [];

  for (const node of data) {
    const isInArr = stationArr.includes(node.origin);
    if (!isInArr) {
      stationArr.push(node.origin);
    }
  }
  return stationArr.sort();
}
