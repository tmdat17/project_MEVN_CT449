const express = require("express");
const router = express.Router();

const songController = require("../app/controllers/songController");

router.post("/add", songController.addNewSong);
router.get("/", songController.getAllSongs);
router.get("/:id", songController.getOneSong);

module.exports = router;
