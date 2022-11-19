const { Song } = require("../models/Song");
const { Singer } = require("../models/Singer");

const songController = {
    // [POST] /song/add     (POST one new song)
    addNewSong: async (req, res) => {
        try {
            if (req.body.nameSinger) {
                const singer = await Singer.find({
                    nameSinger: req.body.nameSinger,
                });
                console.log("Singer tim duoc:  ", singer);
                if (singer[0]) {
                    const newSong = new Song({
                        ...req.body,
                        singer: singer[0]._id,
                    });
                    const savedNewSong = await newSong.save();
                    await singer[0].updateOne({
                        $push: {
                            songs: savedNewSong._id,
                        },
                    });
                    res.status(200).json(savedNewSong);
                } else {
                    res.status(400).json("Ca sĩ không tồn tại");
                    return;
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /song  (GET all songs)
    getAllSongs: async (req, res) => {
        try {
            const listSong = await Song.find();
            res.status(200).json(listSong);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [GET] /song/:id  (GET one song)
    getOneSong: async (req, res) => {
        try {
            const songNeedFind = await Song.findById(req.params.id).populate(
                "singer",
                "nameSinger avt"
            );
            res.status(200).json(songNeedFind);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = songController;
