const axios = require("axios");

class Kodik {
    constructor(token) {
        this._token = token;
        this._BASEURL = "https://kodikapi.com";
    }

    async _request(method, params = {}) {
        params = Object.assign({}, { token: this._token }, params);
        const response = await axios.get(`${this._BASEURL}/${method}`, { params });

        return response.data;
    }

    search(str = "") {
        const isNumber = !!+str;
        let field = "title";

        if (isNumber) {
            field = "kinopoisk_id";
        } else if (str.startsWith("tt")) {
            field = "imdb_id";
        } else if (str.startsWith("movie-") || str.startsWith("serial-")) {
            field = "id";
        }

        return this._request("search", {
            [field]: str,
        });
    }
}

module.exports = new Kodik(process.env.KODIK_TOKEN);
