const express = require("express");
const server = express();

const PORT = 3000;

server.listen(PORT, () => console.log(`Listen on http://localhost:${PORT}..`));

server.get("/", (req, res) => {
  res.send("hello");
});
