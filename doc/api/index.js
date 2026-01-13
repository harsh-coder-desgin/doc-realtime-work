import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("join-room", (roomName) => {
    socket.join(roomName);
    socket.emit("joined-room", roomName);
    socket.on("cursor-move", (data) => {
      socket.broadcast.emit("cursor-update", data);
    });
    socket.on("content-all",(alldata)=>{
      alldata['id']=socket.id
      socket.broadcast.emit("content-send",alldata)
      console.log(alldata);
    })
    // io.to(roomName).emit("room-mess", "Hello room users");
  });

  socket.on("message", (message) => {
    // io.emit("private-mess", message);
    console.log(message);
  });

  socket.emit("helloserver", "connected form server");

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});
