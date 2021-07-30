const express = require("express");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: true,
  origins: ["*"],
  optionsSuccessStatus: 200,
});

app.use(express.json());

const rooms = new Map();

app.get('/rooms/:id', (request, response) => {
  const { id: roomId } = request.params;
  const obj = rooms.has(roomId)
    ? {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()],
      }
    : { users: [], messages: [] };
  response.json(obj);
});
// app.get("/rooms", (request, response) => {
//   response.json(rooms);
// });

app.post("/rooms", (request, response) => {
  const { roomId, userName } = request.body;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ["users", new Map()],
        ["messages", []],
      ])
    );
  }
  response.send();
});

io.on("connection", (socket) => {
  socket.on("ROOM:JOIN", ({ roomId, userName }) => {
    socket.join(roomId);
    rooms.get(roomId).get("users").set(socket.id, userName);
    const users = [...rooms.get(roomId).get("users").values()];
    // io.in(roomId).emit("ROOM:SET_USERS", users);
    socket.to(roomId).emit('ROOM:SET_USERS', users);
  });

  socket.on("ROOM:NEW_MESSAGE", ({ roomId, userName, text }) => {
    const obj = {
        userName,
        text,
    };
    rooms.get(roomId).get("messages").push(obj);
    socket.to(roomId).emit("ROOM:NEW_MESSAGE", obj);
  });

  socket.on("disconnect", () => {
    rooms.forEach((value, roomId) => {
      if (value.get("users").delete(socket.id)) {
        const users = [...value.get("users").values()];
        socket.to(roomId).emit("ROOM:SET_USERS", users);
      }
    });
  });

  console.log("socket connected", socket.id);
});

server.listen(9999, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("Server is running");
});
