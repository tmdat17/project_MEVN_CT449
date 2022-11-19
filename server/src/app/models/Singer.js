const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const singerSchema = new Schema(
    {
        nameSinger: {
            type: String,
            require: true,
        },
        avt: {
            type: String,
            require: true,
        },
        songs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Song",
            },
        ],
    },
    {
        timestamps: true,
    }
);

let Singer = mongoose.model("Singer", singerSchema);
module.exports = { Singer };
