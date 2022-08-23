# Shortest-Path-Railway-Server
## Owen Dearman

A node server that uses a bespoke dijkstra algorithm to calculate the shortest path between two TIPLOCs on a locally stored railway geography

## Usage:

Access the server at https://shortest-rail-route-server.herokuapp.com/


## Install

`yarn`


## Running locally

`yarn start:dev`

This will set the env var LOCAL to true, which will cause the db connection configuration to NOT use SSL (appropriate for your local db)

## running on heroku

When the project is deployed to heroku, the command in your `Procfile` file will be run.
