const express = require("express");
const router = express.Router();
const { DateTime } = require('luxon');

const client = require("../../database");


//clock in logic
router.post("/clock-in", async (req, res) => {
    try {
        const currentTime = DateTime.now().setZone('Asia/Kathmandu');
        const formattedDate = currentTime.toFormat('yyyy-MM-dd');
        const formattedTime = currentTime.toFormat('HH:mm');

        const query = "INSERT INTO attendance (date, clock_in) VALUES ($1, $2)";
        const values = [formattedDate, formattedTime];
        await client.query(query, values);

        console.log("Clock-in time inserted successfully for date:", formattedDate);
        res.status(200).json({ date: formattedDate, time: formattedTime }); // Send formatted date and time in the API response
    } catch (error) {
        console.error("Error inserting clock-in time:", error);
        res.sendStatus(500);
    }
});

//clock out logic
router.put("/clock-out", async (req, res) => {
    try {
        const currentTime = DateTime.now().setZone('Asia/Kathmandu');
        const formattedTime = formatTimeAMPM(currentTime);

        const query = "INSERT INTO attendance (clock_out) VALUES ($1)";
        const values = [formattedTime];

        await client.query(query, values);
        console.log("Clock-out time inserted successfully");

        res.sendStatus(200);
    } catch (error) {
        console.error("Error inserting clock-out time:", error);
        res.sendStatus(500);
    }
});
//fetching clock-in data from database 
router.get("/", async (req, res) => {
    try {
        const query = "SELECT a.*, u.full_name FROM attendance a JOIN users u ON a.user_id = u.user_id";
        const result = await client.query(query);
        const attendanceData = result.rows;

        res.json(attendanceData);
    } catch (error) {
        console.error("Error fetching attendance data:", error);
        res.sendStatus(500);
    }
});

router.get("/requests", async (req, res) => {
    try {

        const query = "SELECT ar.*, a.clock_in old_clockin, a.clock_out old_clockout, u.full_name FROM attendance_requests ar JOIN attendance a ON ar.att_id = a.attendance_id JOIN users u ON a.user_id = u.user_id ORDER BY ar.date_created";
        const result = await client.query(query);
        const attendanceRequests = result.rows;

        res.json(attendanceRequests);
    } catch (error) {
        console.error("Error fetching attendance requests:", error);
        res.sendStatus(500);
    }
});

router.put("/requests/:id/approve", async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await client.query("SELECT * FROM attendance_requests WHERE att_req_id = $1", [id]);
        const {att_id, clock_in, clock_out} = rows[0];
        const query = "UPDATE attendance_requests SET status = $1 WHERE att_req_id = $2";
        const values = ["APPROVED", id];
        await client.query(query, values);
        const updateQuery = "UPDATE attendance SET clock_in = $1, clock_out = $2 WHERE attendance_id = $3";
        const updateValues = [clock_in, clock_out, att_id];
        await client.query(updateQuery, updateValues);
        console.log("Attendance record updated successfully");

        res.sendStatus(200);
    } catch (error) {
        console.error("Error updating attendance request:", error);
        res.sendStatus(500);
    }
});
router.put("/requests/:id/reject", async (req, res) => {
    try {
        const { id } = req.params;

        const query = "UPDATE attendance_requests SET status = $1 WHERE att_req_id = $2";
        const values = ["REJECTED", id];
        await client.query(query, values);
        console.log("Attendance record updated successfully");

        res.sendStatus(200);
    } catch (error) {
        console.error("Error updating attendance request:", error);
        res.sendStatus(500);
    }
});

module.exports = router;