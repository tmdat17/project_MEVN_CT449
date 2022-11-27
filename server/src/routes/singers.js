const express = require("express");
const router = express.Router();

const singerController = require("../app/controllers/singerController");

router.post("/add", singerController.addNewSinger);
router.get("/", singerController.getAllSingers);
router.get("/:id", singerController.getOneSinger);
router.put("/edit/:id", singerController.editSinger);
router.delete("/delete/:id", singerController.deleteOneSinger);

module.exports = router;
