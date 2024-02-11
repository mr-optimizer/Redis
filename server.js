const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cluster = require("cluster");
const numCPUs = require('os').cpus().length;

const port = process.env.PORT || 8000;

const { connectRedis, client } = require("./config/redis");

// controllers
const { setData, deleteData, getData } = require("./redisController");

app.use(bodyParser.json());

// Connect to Redis Server
connectRedis();

// Check if the current process is a master
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  // Creating worker processes
  for (let i = 0; i < 1; i++) {
    cluster.fork();
  }

  // Listen for dying workers and replace them
  cluster.on("exit", function (worker) {
    console.log("Worker %d died, restarting...", worker.id);
    cluster.fork();
  });
} else {
  // APIs
  app.get("/:userId", function (req, res) {
    getData(req, res, client);
  });
  app.post("/", function (req, res) {
    setData(req, res, client);
  });
  app.delete("/:userId", function (req, res) {
    deleteData(req, res, client);
  });

  // Server
  app.listen(port, () => {
    console.log(`Worker ${process.pid} started and listening on port ${port}`);
  });
}
