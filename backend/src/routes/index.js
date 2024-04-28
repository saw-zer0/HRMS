require('dotenv').config()
const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const userRouter = require("./user");
const attendanceRouter = require("./attendance");
const leaveRouter = require("./leave");
const authenticateToken = require('./helper/auth');


router.use("/auth", authRouter);
router.use("/user", authenticateToken, userRouter);
router.use("/attendance", authenticateToken, attendanceRouter);
router.use("/leave", authenticateToken, leaveRouter);

module.exports = router;