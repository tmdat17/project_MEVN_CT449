const { Singer } = require("../models/Singer");

const singerController = {
    addNewSinger: async (req, res) => {
        try {
            const newSinger = new Singer(req.body);
            const savedNewSinger = await newSinger.save();
            res.status(200).json(savedNewSinger);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /singer  (GET all singers)
    getAllSingers: async (req, res) => {
        try {
            const listSinger = await Singer.find();
            res.status(200).json(listSinger);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /singer/:id  (GET one singer)
    getOneSinger: async (req, res) => {
        try {
            const singerNeedFind = await Singer.findById(
                req.params.id
            ).populate("songs", "nameSong thumb srcSong");
            res.status(200).json(singerNeedFind);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = singerController;
