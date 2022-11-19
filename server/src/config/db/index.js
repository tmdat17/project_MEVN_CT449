const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/app_music";
async function connect() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect App Music Server Successfully!!");
    } catch (error) {
        console.log("Connect App Music Server Failure!!!");
    }
}

module.exports = { connect };
