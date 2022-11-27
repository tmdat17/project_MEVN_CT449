const express = require("express");
const router = express.Router();

const songController = require("../app/controllers/songController");

router.post("/add", songController.addNewSong);
router.get("/", songController.getAllSongs);
router.get("/:id", songController.getOneSong);
router.put("/edit/:id", songController.editSong);
router.delete("/delete/:id", songController.deleteOneSong);

module.exports = router;
