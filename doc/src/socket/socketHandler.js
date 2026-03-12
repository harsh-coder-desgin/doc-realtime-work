const usersName = []

export const socketHandler = (io) => {
    io.on("connection", (socket) => {
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
                socket.broadcast.emit("content-send", payload);
            });
            socket.on("comeindoc", (data) => {
                io.emit("nameallsend", usersName);
            });
            socket.on("send-chat", (data) => {
                const { message, formuser,touser,mes_id } = data;
                io.to(roomName).emit("receive-chat", {
                    message,
                    formuser,
                    touser,
                    mes_id
                });
            });
        });

        socket.on("message", (message) => {
            console.log(message);
        });

        socket.on("usernamesend", (message) => {
            usersName.push(message);
        });

        socket.emit("helloserver", "connected form server");

        socket.on("disconnect", () => {
            console.log("user disconnected:", socket.id);
        });
    });
}