const express = require("express");
const router = express.Router();
const path = require("path");

const srcPath = path.join(__dirname, "../../public/src");

router.get("/user", (req, res) => {
    res.sendFile(path.join(srcPath, "admin/manage_user.html"));
})
router.get("/attendance", (req, res) => {
    res.sendFile(path.join(srcPath, "admin/admin_attendance.html"));
})
router.get("/leave", (req, res) => {
    res.sendFile(path.join(srcPath, "admin/admin_leave.html"));
})

module.exports = router;