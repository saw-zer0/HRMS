require('dotenv').config()
const express = require("express");
const path = require("path");
const server = express();

const apiRouter = require("./routes");
const pageRouter = require("./pages/routes");
const cookieParser = require("cookie-parser");

const job = require("./utils/scheduleMail");

const staticPath = path.join(__dirname, "../public");
const srcPath = path.join(__dirname, "../public/src");
server.use(express.static(staticPath));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(cookieParser());

server.use("/", pageRouter);
server.use("/api", apiRouter);

const PORT = 8080;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
