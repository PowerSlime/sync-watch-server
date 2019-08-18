module.exports = {
    CONFIG: {
        ROOM: {
            PROTECT_FROM_DELETING: 60000,
            CLEAN_UNUSED_TIMEOUT: 5000,
        },
    },

    ERROR: {
        ROOM: {
            OK: {
                code: 0,
                message: null,
            },

            NO_ID_PROVIDED: {
                code: 1,
                message: "No id provided",
            },

            UNDEFINED_ROOM: {
                code: 2,
                message: "There is no such room",
            },

            NO_KINOPOISK_PROVIDED: {
                code: 3,
                message: "Provide kinopoisk id",
            },

            CREATE_ROOM_ERROR: {
                code: 4,
                message: "Internal error. Room wasn't created",
            },
        },
    },
};
