const express = require("express");
const router = express.Router();

const constants = require("../constants");
const Room = require("../rooms");

router.get("/", function(req, res) {
    res.send({
        error_code: constants.ERROR.ROOM.NO_ID_PROVIDED.code,
        error: constants.ERROR.ROOM.NO_ID_PROVIDED.message,
    });
});

router.get("/:id", function(req, res) {
    const room = Room.getRoomInfo([req.params.id]);

    if (room) {
        res.send({
            error_code: constants.ERROR.ROOM.OK.code,
            data: {
                room,
            },
        });
    } else {
        res.send({
            error_code: constants.ERROR.ROOM.UNDEFINED_ROOM.code,
            error: constants.ERROR.ROOM.UNDEFINED_ROOM.message,
        });
    }
});

router.post("/", async function(req, res, next) {
    try {
        const kinopoisk_id = req.body.kinopoisk_id;

        if (kinopoisk_id) {
            const room = await Room.createRoom(kinopoisk_id);

            if (room) {
                res.send({
                    error_code: constants.ERROR.ROOM.OK.code,
                    data: room,
                });
            } else {
                res.send({
                    error_code: constants.ERROR.ROOM.CREATE_ROOM_ERROR.code,
                    error: constants.ERROR.ROOM.CREATE_ROOM_ERROR.message,
                });
            }

            return room;
        }

        res.send({
            error_code: constants.ERROR.ROOM.NO_KINOPOISK_PROVIDED.code,
            error: constants.ERROR.ROOM.NO_KINOPOISK_PROVIDED.message,
        });

        return Promise.resolve();
    } catch (e) {
        next();
    }
});

module.exports = router;
