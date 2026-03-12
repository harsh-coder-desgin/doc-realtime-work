import dotenv from "dotenv"
import connectDB from "../src/db/index.js";
import { app } from '../src/app.js'
import http from "http";
import { Server } from "socket.io";
import { socketHandler } from "./../src/socket/socketHandler.js";

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
socketHandler(io)

server.listen(8000)

dotenv.config({
    path: './.env'
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })