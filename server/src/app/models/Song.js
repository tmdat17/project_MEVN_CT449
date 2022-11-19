const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema(
    {
        nameSong: {
            type: String,
            require: true,
        },
        thumb: {
            type: String,
            require: true,
        },
        srcSong: {
            type: String,
            require: true,
        },
        nameSinger: {
            type: String,
            require: true,
        },
        singer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Singer",
        },
    },
    {
        timestamps: true,
    }
);

let Song = mongoose.model("Song", songSchema);
module.exports = { Song };
