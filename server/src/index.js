const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const db = require("./config/db");
const route = require("./routes/index");

dotenv.config();

const PORT = process.env.PORT || 5555;
const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome Server's CT449");
});

route(app);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

db.connect();
