module.exports = function(server) {
    const Rooms = require("./rooms");
    const io = require("socket.io")(server);

    io.on("connection", (socketClient) => {
        const client = {
            _room: null,
            get room() {
                return this._room;
            },

            set room(value) {
                Rooms.removeUserFromRoom(this.room);
                socketClient.broadcast.emit(`room/${this.room}/update`, Rooms.getRoomInfo(this.room));

                this._room = value;

                Rooms.addUserToRoom(this.room);
                socketClient.broadcast.emit(`room/${this.room}/update`, Rooms.getRoomInfo(this.room));
            },
        };

        socketClient.on("room/get", (data = {}, callback = () => {}) => {
            const room = Rooms.getRoomInfo(data.id);
            client.room = data.id;

            callback(room);
        });

        socketClient.on("room/player/play", (data, callback = () => {}) => {
            const room = Rooms.getRoomInfo(data.room);
            console.log("got play");

            socketClient.broadcast.emit(`room/${data.room}/player/play`, data.time);
            callback(room);
        });

        socketClient.on("room/player/stop", (data, callback = () => {}) => {
            const room = Rooms.getRoomInfo(data.room);
            console.log("got stop");

            socketClient.broadcast.emit(`room/${data.room}/player/stop`, data.time);
            callback(room);
        });

        socketClient.on("room/player/seek", (data, callback = () => {}) => {
            const room = Rooms.getRoomInfo(data.room);
            console.log("got seek", data.time);

            socketClient.broadcast.emit(`room/${data.room}/player/seek`, data.time);
            callback(room);
        });

        socketClient.on("disconnect", (data, callback = () => {}) => {
            const room = Rooms.getRoomInfo(client.room);
            client.room = null;

            callback(room);
        });
    });
};
