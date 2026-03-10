const usersName = []

export const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("a user connected:", socket.id);

        socket.on("join-room", (roomName) => {
            socket.join(roomName);
            socket.emit("joined-room", roomName);
            socket.on("helloroom", (data) => {
                socket.broadcast.emit("toalljoineduser", data);
            });
            socket.on("cursor-move", (data) => {
                socket.broadcast.emit("cursor-update", data);
            });
            socket.on("content-all", (data) => {
                if (!data?.contentall) return;
                const payload = {
                    id: socket.id,
                    contentall: data.contentall
                };
                // console.log("content received:", payload.id);
                socket.broadcast.emit("content-send", payload);
            });
            socket.on("comeindoc", (data) => {
                console.log(data);
                io.emit("nameallsend",usersName);
            });
            // io.to(roomName).emit("room-mess", "Hello room users");
        });

        socket.on("message", (message) => {
            // io.emit("private-mess", message);
            console.log(message);
        });

        socket.on("usernamesend", (message) => {
            usersName.push(message);
            console.log(usersName);
        });

        socket.emit("helloserver", "connected form server");

        socket.on("disconnect", () => {
            console.log("user disconnected:", socket.id);
        });
    });

    // server.listen(8000, () => {
    //     console.log("Server running on port 8000");
    // });
}