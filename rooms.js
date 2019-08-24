const Kodik = require("./controllers/kodik");
const throttle = require("lodash/throttle");
const constants = require("./constants");

class Room {
    constructor() {
        this._rooms = {};

        this.cleanUnusedRooms = throttle(this._cleanUnusedRooms, constants.CONFIG.ROOM.CLEAN_UNUSED_TIMEOUT);
    }

    _cleanUnusedRooms() {
        Object.keys(this._rooms).forEach((key) => {
            const room = this.getRoomInfo(key);

            if (room) {
                // When created time more than 1 minutes, but still have 0 users
                // Can be useful when users finish to watch a movie and left from room
                const shouldBeDeleted =
                    room.link === null ||
                    (room.users <= 0 && new Date() - room.timestamp > constants.CONFIG.ROOM.PROTECT_FROM_DELETING);
                if (shouldBeDeleted) {
                    delete this._rooms[key];
                }
            }
        });
    }

    _getNewRoomIndex() {
        const roomsId = Object.keys(this._rooms);

        if (roomsId.length === 0) {
            return 1;
        }

        const lastRoomId = parseInt(roomsId[roomsId.length - 1]);
        return lastRoomId + 1;
    }

    async addRoom(roomId, kinopoiskId) {
        this.cleanUnusedRooms();

        const response = await Kodik.search(kinopoiskId);
        const item = response.results[0];

        this._rooms[roomId] = {
            link: item ? item.link : null,
            users: 0,
            timestamp: new Date(),
        };

        return {
            roomId,
        };
    }

    async createRoom(kinopoiskID) {
        if (kinopoiskID) {
            this.cleanUnusedRooms();
            const roomId = this._getNewRoomIndex();
            return await this.addRoom(roomId, kinopoiskID);
        }

        return null;
    }

    getRooms() {
        this.cleanUnusedRooms();
        return this._rooms;
    }

    getRoomInfo(roomId) {
        this.cleanUnusedRooms();
        return this._rooms[roomId];
    }

    addUserToRoom(roomId) {
        const room = this.getRoomInfo(roomId);
        if (room) {
            room.users++;
        }
    }

    removeUserFromRoom(roomId) {
        const room = this.getRoomInfo(roomId);
        if (room) {
            if (room.users > 0) {
                room.users--;
            }
        }
    }

    setRoomEpisode(roomId, season, episode) {
        const room = this.getRoomInfo(roomId);
        if (room) {
            room.season = season;
            room.episode = episode;
        }
    }
}

module.exports = new Room();
