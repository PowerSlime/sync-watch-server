const express = require("express");
const router = express.Router();

const Kodik = require("../controllers/kodik");

async function search(req, res, next) {
    try {
        const title = req.body.title || req.query.title;
        const result = await Kodik.search(title);
        res.send(result);

        return Promise.resolve();
    } catch (e) {
        console.log(e);
        next();
    }
}

router.get("/", search);
router.post("/", search);

module.exports = router;
