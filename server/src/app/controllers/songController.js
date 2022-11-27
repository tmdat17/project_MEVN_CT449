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

    // [PUT] /song/edit/:id  (Edit one song)
    editSong: async (req, res) => {
        try {
            const songNeedEdit = await Song.findById(req.params.id);
            if (req.body.nameSinger === songNeedEdit.nameSinger) {
                await songNeedEdit.updateOne({ $set: req.body });
                res.status(200).json("Cập nhật bài hát thành công!!");
                return;
            } else {
                const singerNew = await Singer.find({
                    nameSinger: req.body.nameSinger,
                });

                //Thêm bài hát cần cập nhật vào mảng songs của ca sĩ mới
                await singerNew[0].updateOne({
                    $push: {
                        songs: songNeedEdit._id,
                    },
                });

                const singerOld = await Singer.findById(songNeedEdit.singer);
                // Xóa bài hát cần cập nhật ra khỏi mảng songs của ca sĩ cũ
                await singerOld.updateOne({
                    $pull: {
                        songs: songNeedEdit._id,
                    },
                });

                // Sau đó cập nhật các thông tin cơ bản lại cho bài hát đó
                req.body.singer = singerNew[0]._id;
                await songNeedEdit.updateOne({ $set: req.body });
                res.status(200).json("Cập nhật bài hát thành côngg!!");
                return;
            }
        } catch (error) {}
    },

    // [DELETE] /song/delete/:id  (Delete one song)
    deleteOneSong: async (req, res) => {
        try {
            const songNeedDelete = await Song.findById(req.params.id);
            const singer = await Singer.findById(songNeedDelete.singer);
            await singer.updateOne({
                $pull: {
                    songs: songNeedDelete._id,
                },
            });
            await songNeedDelete.delete();
            res.status(200).json("Xóa bài hát thành công!!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = songController;
