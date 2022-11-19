const singerRouter = require("./singers");
const songRouter = require("./songs");
function route(app) {
    app.use("/singer", singerRouter);
    app.use("/song", songRouter);
}

module.exports = route;
