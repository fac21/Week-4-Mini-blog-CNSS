const express = require("express");
const server = express();
const movies = require("./movies.js");


const PORT = 3000;

// Create a handler to configure the middleware to serve this directory
const staticHandler = express.static("public");

server.listen(PORT, () => console.log(`Listen on http://localhost:${PORT}..`));

server.get("/", (req, res) => {
  res.send("hello");
});

// Serve the public directory incl css file
server.use(staticHandler);
