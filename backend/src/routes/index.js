require('dotenv').config()
const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const userRouter = require("./user");
const attendanceRouter = require("./attendance");
const leaveRouter = require("./leave");
const authenticateToken = require('./helper/auth');


router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/attendance", attendanceRouter);
router.use("/leaves",  leaveRouter);

module.exports = router;