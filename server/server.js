const http = require("http");
const express = require("express");
const socketio = require("socket.io");
// const cors = require("cors");

const PORT = 4000;

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const router = require("./routes/routes");

const app = express();
console.log("express app created");
const server = http.createServer(app);
console.log("http server created");
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
console.log("socketio io created");

// app.use(cors());
app.use(router);

io.on("connect", (socket) => {
  console.log("connection to socket successful");

  socket.on("join", ({ username, roomname }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, roomname });

    if (error) return callback(error);

    socket.join(user.roomname);

    socket.emit("message", {
      user: "admin",
      text: `${user.username}, welcome to room ${user.roomname}.`,
    });
    socket.broadcast
      .to(user.roomname)
      .emit("message", { user: "admin", text: `${user.username} has joined!` });

    io.to(user.roomname).emit("roomData", {
      roomname: user.roomname,
      users: getUsersInRoom(user.roomname),
    });

    callback();
  });

  socket.on("sendMessage", async (message, callback) => {
    const user = await getUser(socket.id);

    io.to(user.roomname).emit("message", {
      user: user.username,
      text: message,
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.roomname).emit("message", {
        user: "Admin",
        text: `${user.username} has left.`,
      });
      io.to(user.roomname).emit("roomData", {
        roomname: user.roomname,
        users: getUsersInRoom(user.roomname),
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
