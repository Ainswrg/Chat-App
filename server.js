const express = require("express");

const app = express();
const server = require('http').createServer(app)
const io = require("socket.io")(server, {
  cors: true,
  origins:("*"),
});
const rooms = new Map();

app.get("/rooms", (request, response) => {
  response.json(rooms);
});

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
});
server.listen(9999, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("Server is running");
});
