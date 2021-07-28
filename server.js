const express = require("express");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: true,
  origins: ["*"],
  optionsSuccessStatus: 200,
});

app.use(express.json());

const rooms = new Map();

app.get("/rooms", (request, response) => {
  response.json(rooms);
});

app.post("/rooms", (request, response) => {
  const { roomId, userName } = request.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ["users", new Map()],
        ["messages", []],
      ]),
    );
  }
  response.send();
});

io.on("connection", (socket) => {
  socket.on("ROOM:JOIN", ({roomId, userName}) => {
    socket.join(roomId);
    rooms.get(roomId).get('users').set(socket.id, userName);
    const users = [...rooms.get(roomId).get('users').values()];
    socket.to(roomId).emit('ROOM:JOINED', users);
    // io.in(roomId).emit("ROOM:JOINED", users);
  });

  console.log("socket connected", socket.id);
});

server.listen(9999, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("Server is running");
});
