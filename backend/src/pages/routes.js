const express = require("express");
const router = express.Router();
const path = require("path");

const srcPath = path.join(__dirname, "../../public/src");
const adminRouter = require("./adminRoutes");
const {authenticateToken, isAdmin} = require("../routes/helper/auth");

//Dashboard
router.get("/",authenticateToken, (req, res) => {
    const role = req.user.role;
    if(role === "ADMIN"){
        res.sendFile(path.join(srcPath, "admin/admin_home.html"));
    }else if(role === "EMPLOYEE"){
        res.sendFile(path.join(srcPath, "dashboard/home.html"));
    }
})

//admin routes
router.use("/admin", authenticateToken, isAdmin, adminRouter);


//employees routes
router.get("/attendance", authenticateToken, (req, res) => {
    res.sendFile(path.join(srcPath, "attendance/attendance.html"));
})

router.get("/profile", authenticateToken, (req, res) => {
    res.sendFile(path.join(srcPath, "profile/profile.html"));
})

router.get("/leave", authenticateToken, (req, res) => {
    res.sendFile(path.join(srcPath, "leave/leave.html"));
})

router.get("/payroll", authenticateToken, (req, res) => {
    res.sendFile(path.join(srcPath, "payroll/payroll.html"));
})

//Authentication
router.get("/login", (req, res) => {
    res.sendFile(path.join(srcPath, "auth/login.html"));
})


module.exports = router;