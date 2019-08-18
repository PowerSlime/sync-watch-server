const io = require("socket.io-client");

const socket = io("http://localhost:8000");

socket.on("connect", () => {
    socket.emit("room/get", { id: 1 }, (data) => {
        console.log(data);
    });
    socket.emit("room/get", { id: 1 }, (data) => {
        console.log(data);
    });
    socket.emit("room/get", { id: 1 }, (data) => {
        console.log(data);
    });
});

socket.on("room/event", (data) => {
    console.log(data);
});
