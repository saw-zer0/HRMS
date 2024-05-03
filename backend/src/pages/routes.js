const express = require("express");
const router = express.Router();
const path = require("path");

const srcPath = path.join(__dirname, "../../public/src");
const adminRouter = require("./adminRoutes");

//Dashboard
router.get("/", (req, res) => {
    res.sendFile(path.join(srcPath, "admin/admin_home.html"));
})

//admin routes
router.use("/admin", adminRouter);


//employees routes
router.get("/attendance", (req, res) => {
    res.sendFile(path.join(srcPath, "attendance/attendance.html"));
})

router.get("/profile", (req, res) => {
    res.sendFile(path.join(srcPath, "profile/profile.html"));
})

router.get("/leave", (req, res) => {
    res.sendFile(path.join(srcPath, "leave/leave.html"));
})

router.get("/payroll", (req, res) => {
    res.sendFile(path.join(srcPath, "payroll/payroll.html"));
})

//Authentication
router.get("/login", (req, res) => {
    console.log("login")
    res.sendFile(path.join(srcPath, "auth/login.html"));
})


module.exports = router;