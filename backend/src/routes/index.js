require('dotenv').config()
const express = require("express");
const router = express.Router();

const authRouter = require("./helper");
const userRouter = require("./user");
const attendanceRouter = require("./attendance");
const leaveRouter = require("./leave");
const payrollRouter = require("./payroll");
const {authenticateToken} = require('./helper/auth');


router.use("/auth", authRouter);
router.use("/user", authenticateToken, userRouter);
router.use("/attendance", authenticateToken, attendanceRouter);
router.use("/leaves",  authenticateToken, leaveRouter);
router.use("/payroll",  authenticateToken, payrollRouter);

module.exports = router;