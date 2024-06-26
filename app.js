// require('dotenv').config();
// import path from "path";
// const path = require("path");
const { fileURLToPath } = require("url");

// import { fileURLToPath } from "url";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
var bodyParser = require("body-parser");

// const __file_name = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__file_name);

// const path = require('path');
const currentFilePath = __filename;
const currentDirPath = path.dirname(__filename);

console.log(currentDirPath);

const port = process.env.PORT || 3010;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  process.env.MONGOLAB_URI ||
    "mongodb+srv://admin_aravind:battlebee4799@cluster0.5xhau.mongodb.net/NotesDB",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
// to verify connection with mongodb cloud
mongoose.connection.once("open", () => console.log("connected"));

const users = require("./routes/users");

//a http request logger.
//a http request logger

app.use(morgan("tiny"));
//whenever we go into path localhost:3000/users then code in routes/users.js will be
//executed
app.use("/", users);

// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(currentDirPath, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
// }

app.listen(port, () => console.log("server up and running at port " + port));
