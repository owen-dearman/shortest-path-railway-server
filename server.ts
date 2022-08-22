
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createRailwayMap } from "./shortestPathAlgorithm/1.createRailwayMap";
import filePath from "./filePath";
import { Railway } from "./shortestPathAlgorithm/typing";


// const herokuSSLSetting = { rejectUnauthorized: false }
// const sslSetting = process.env.LOCAL ? false : herokuSSLSetting

const app = express();

app.use(express.json());
app.use(cors())
dotenv.config();

let railwayMap: Railway = createRailwayMap()

app.use("/data", express.static('./public/tracks.csv'));

app.get("/", async (req, res) => {
  const pathToFile = filePath("../public/index.html");
  res.sendFile(pathToFile);
});

app.get("/tiplocs/list", async (req, res) => {
  const tiplocArr = railwayMap.getListOfTiplocs()
  res.status(200).json(tiplocArr)
})

app.get("/tiplocs/num", async (req, res) => {
  const numTiplocs = railwayMap.getNumTiplocs()
  res.status(200).json(numTiplocs)
})

app.get("/routes/num", async (req, res) => {
  const numRoutes = railwayMap.getNumRoutes()
  res.status(200).json(numRoutes)
})

app.get("/reloadData", async (req, res) => {
  try {
    railwayMap = createRailwayMap()
    res.status(200).send("Data Loaded")
  } catch (error) {
    res.status(500).send({ error: error.stack })
  }
})

app.get("/test", async (req, res) => {
  if (Object.keys(railwayMap).length > 0) {
    res.status(200).send(`Data present with ${Object.keys(railwayMap).length} Functions. Data Present With ${railwayMap.getNumRoutes()} rows.`)
  }
})

app.get<{ from: string, to: string }, {}, {}>("/path/:from/:to", async (req, res) => {
  try {
    const { from, to } = req.params
    const shortestRoute = railwayMap.findShortestRoute(from.toUpperCase(), to.toUpperCase())
    res.status(200).json(shortestRoute)

  } catch (error) {
    res.status(401).send({ error: error.stack })
  }
})

//Start the server on the given port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}. Welcome to shortest-rail-route-server...`);
});
