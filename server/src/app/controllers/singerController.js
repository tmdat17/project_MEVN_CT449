const { Singer } = require("../models/Singer");
const { Song } = require("../models/Song");

const singerController = {
    // [POST] /singer/add (ADD one new singer)
    addNewSinger: async (req, res) => {
        try {
            const newSinger = new Singer(req.body);
            const singerList = await Singer.find();
            let flag = 0;
            for (let i = 0; i < singerList.length; i++) {
                console.log(`${i}`);
                if (
                    singerList[i].nameSinger.toLowerCase() ==
                    req.body.nameSinger.toLowerCase()
                ) {
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                const savedNewSinger = await newSinger.save();
                res.status(200).json(savedNewSinger);
            } else {
                res.status(403).json("Ca sĩ đã được thêm từ trước!!");
            }
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

    // [PUT] /singer/edit/:id  (Edit one singer)
    editSinger: async (req, res) => {
        try {
            const singerNeedUpdate = await Singer.findById(req.params.id);
            await singerNeedUpdate.updateOne({ $set: req.body });
            const song = await Song.find({ singer: req.params.id });
            song.map(async (item) => {
                await item.updateOne({
                    $set: {
                        nameSinger: req.body.nameSinger,
                    },
                });
            });
            res.status(200).json("Cập nhật ca sĩ thành công!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [DELETE] /singer/delete/:id (Delete one singer)
    deleteOneSinger: async (req, res) => {
        try {
            const song = await Song.find({ singer: req.params.id });
            song.map(async (item) => {
                await item.delete();
            });
            await Singer.findByIdAndDelete(req.params.id);
            res.status(200).json("Xóa ca sĩ thành công!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = singerController;
