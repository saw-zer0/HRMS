const express = require("express");
const router = express.Router();
const { DateTime } = require('luxon');

const client = require("../../database");
const {isAdmin} = require("../helper/auth");


//clock in logic
router.post("/clock-in", async (req, res) => {
    try {
        const currentTime = DateTime.now().setZone('Asia/Kathmandu');
        const formattedDate = currentTime.toFormat('yyyy-MM-dd');
        const formattedTime = currentTime.toFormat('HH:mmZ');
        // get clockin from DBfor today
        const { rows } = await client.query("SELECT * FROM attendance WHERE date = $1", [formattedDate]);
        if (rows.length > 0) {
            return res.status(400).json({ message: "You have already clocked in for today" });
        }
        const query = "INSERT INTO attendance (date, clock_in, user_id) VALUES ($1, $2, $3)";
        const values = [formattedDate, formattedTime, req.user.user_id];
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
        const formattedTime = currentTime.toFormat('HH:mmZ');
        const formattedDate = currentTime.toFormat('yyyy-MM-dd');
        const { rows } = await client.query("SELECT * FROM attendance WHERE date = $1", [formattedDate]);
        if (rows.length = 0) {
            return res.status(400).json({ message: "You have not yet clocked in for today" });
        }

        const query = "UPDATE attendance SET clock_out = $1 WHERE date = $2 AND user_id = $3";
        const values = [formattedTime, formattedDate, req.user.user_id];

        await client.query(query, values);
        console.log("Clock-out time inserted successfully");

        res.sendStatus(200);
    } catch (error) {
        console.error("Error inserting clock-out time:", error);
        res.sendStatus(500);
    }
});
//fetching clock-in data from database 
router.get("/", isAdmin ,async (req, res) => {
    try {
        const query = "SELECT a.*, u.full_name FROM attendance a JOIN users u ON a.user_id = u.user_id";
        const result = await client.query(query);
        const attendanceData = result.rows;
        attendanceData.forEach(attendance => {
            attendance.date = new Date(attendance.date).toLocaleDateString("en-US", { timeZone: "Asia/Kathmandu" });
            const dateNow = new Date()
            if(attendance.clock_in !== null){
            const clockinArr = attendance.clock_in.slice(0,8).split(":")
            dateNow.setHours(clockinArr[0], clockinArr[1], clockinArr[2])
            attendance.clock_in = dateNow.toLocaleTimeString("en-US", { timeZone: "Asia/Kathmandu" })
            }
            if(attendance.clock_out !== null){
            const clockoutArr = attendance.clock_out.slice(0,8).split(":")
            dateNow.setHours(clockoutArr[0], clockoutArr[1], clockoutArr[2])
            attendance.clock_out = dateNow.toLocaleTimeString("en-US", { timeZone: "Asia/Kathmandu" })

            }
        });
        res.json(attendanceData);
    } catch (error) {
        console.error("Error fetching attendance data:", error);
        res.sendStatus(500);
    }
});

router.get("/requests", async (req, res) => {
    try {
        const status = req.query.status || "ALL";
        const query = "SELECT ar.*, a.clock_in old_clockin, a.clock_out old_clockout, u.full_name FROM attendance_requests ar JOIN attendance a ON ar.att_id = a.attendance_id JOIN users u ON a.user_id = u.user_id  ORDER BY ar.date_created";
        const result = await client.query(query);
        const attendanceRequests = result.rows;

        attendanceRequests.forEach(attendance => {
            console.log(attendance.date)
            attendance.date = new Date(attendance.date).toLocaleDateString("en-US", { timeZone: "Asia/Kathmandu" });
            // attendance.clock_in = new Date(attendance.clock_in).toLocaleDateString("en-US", { timeZone: "Asia/Kathmandu" });
            // attendance.clock_out = new Date(attendance.clock_out).toLocaleDateString("en-US", { timeZone: "Asia/Kathmandu" });
        });
        res.json(attendanceRequests);
    } catch (error) {
        console.error("Error fetching attendance requests:", error);
        res.sendStatus(500);
    }
});

router.get("/requests/pendings", async (req, res) => {
    try {
        const status = req.query.status || "ALL";
        const query = "SELECT ar.*, a.clock_in old_clockin, a.clock_out old_clockout, u.full_name FROM attendance_requests ar JOIN attendance a ON ar.att_id = a.attendance_id JOIN users u ON a.user_id = u.user_id WHERE status = 'PENDING'  ORDER BY ar.date_created";
        const result = await client.query(query);
        const attendanceRequests = result.rows;

        res.json(attendanceRequests);
    } catch (error) {
        console.error("Error fetching attendance requests:", error);
        res.sendStatus(500);
    }
}
);
router.get("/requests/user", async (req, res) => {
    try {
        const query = "SELECT ar.*, a.clock_in old_clockin, a.clock_out old_clockout, a.date, u.full_name FROM attendance_requests ar JOIN attendance a ON ar.att_id = a.attendance_id JOIN users u ON a.user_id = u.user_id WHERE u.user_id = $1 ORDER BY ar.date_created";
        const values = [req.user.user_id];
        const result = await client.query(query, values);
        const attendanceRequests = result.rows;
        attendanceRequests.forEach(attendance => {
            const dateNow = new Date()
            attendance.date = new Date(attendance.date).toLocaleDateString("en-US", { timeZone: "Asia/Kathmandu" });
            if(attendance.clock_in !== null){
                const clockinArr = attendance.clock_in.slice(0,8).split(":")
                dateNow.setHours(clockinArr[0], clockinArr[1], clockinArr[2])
                attendance.clock_in = dateNow.toLocaleTimeString("en-US", { timeZone: "Asia/Kathmandu" })
                }
                if(attendance.clock_out !== null){
                const clockoutArr = attendance.clock_out.slice(0,8).split(":")
                dateNow.setHours(clockoutArr[0], clockoutArr[1], clockoutArr[2])
                attendance.clock_out = dateNow.toLocaleTimeString("en-US", { timeZone: "Asia/Kathmandu" })
                }
        })

        res.json(attendanceRequests);
    } catch (error) {
        console.error("Error fetching attendance requests:", error);
        res.sendStatus(500);
    }
});

router.post("/requests", async (req, res) => {
    try {
        const { att_id, clock_in, clock_out, remark } = req.body;
        const query = "INSERT INTO attendance_requests (att_id, clock_in, clock_out, remark, status) VALUES ($1, $2, $3, $4, $5)";
        const values = [att_id, clock_in, clock_out, remark, "PENDING"];
        await client.query(query, values);

        console.log("Attendance request inserted successfully");
        res.sendStatus(200);
    } catch (error) {
        console.error("Error inserting attendance request:", error);
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

        res.json({att_id, clock_in, clock_out, message: "Attendance request approved successfully"});
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

        res.json({ message: "Attendance request rejected successfully" });
    } catch (error) {
        console.error("Error updating attendance request:", error);
        res.sendStatus(500);
    }
});
router.get("/clock-in-today", async (req, res) => {
    try {
        const currentTime = DateTime.now().setZone('Asia/Kathmandu');
        const formattedDate = currentTime.toFormat('yyyy-MM-dd');
        const query = "SELECT * FROM attendance WHERE date = $1";
        const values = [formattedDate];
        const result = await client.query(query, values);
        const attendanceData = result.rows;

        res.json(attendanceData);
    } catch (error) {
        console.error("Error fetching attendance data:", error);
        res.sendStatus(500);
    }
});

router.get("/user", async (req, res) => {
    try {
        const query = "SELECT * FROM attendance WHERE user_id = $1";
        const values = [req.user.user_id];
        const result = await client.query(query, values);
        const attendanceData = result.rows;
        attendanceData.forEach(attendance => {
            attendance.date = new Date(attendance.date).toLocaleDateString("en-US", { timeZone: "Asia/Kathmandu" });
        });
        res.json(attendanceData);
    } catch (error) {
        console.error("Error fetching attendance data:", error);
        res.sendStatus(500);
    }
}
);

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const query = "SELECT a.*, u.full_name FROM attendance a JOIN users u ON a.user_id = u.user_id WHERE a.attendance_id = $1";
        const values = [id];
        const result = await client.query(query, values);
        const attendanceData = result.rows[0];

        res.json(attendanceData);
    } catch (error) {
        console.error("Error fetching attendance data:", error);
        res.sendStatus(500);
    }
});

router.get("/requests/pending", async (req, res) => {
    try {
        const query = "SELECT * FROM attendance_requests WHERE status = 'PENDING' ";
        const result = await client.query(query);
        const pendingRequests = result.rows;

        res.json(pendingRequests);
    } catch (error) {
        console.error("Error fetching pending attendance requests:", error);
        res.sendStatus(500);
    }
});

router.get("/requests/teams", async (req, res) => {
    try {
        const query = "SELECT ar.*, a.clock_in old_clockin, a.clock_out old_clockout, a.date, u.full_name  FROM attendance_requests ar JOIN attendance a ON ar.att_id = a.attendance_id JOIN users u ON a.user_id = u.user_id WHERE team IN (SELECT team_id FROM team_users WHERE user_id = $1) ORDER BY ar.date_created";
        const values = [req.user.user_id];
        const result = await client.query(query, values);
        const teams = result.rows;

        res.json(teams);
    } catch (error) {
        console.error("Error fetching teams:", error);
        res.sendStatus(500);
    }
}
);

router.get("/requests/:id/approve_verify", async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await client.query("SELECT * FROM attendance_requests WHERE att_req_id = $1", [id]);
        const {att_id, clock_in, clock_out} = rows[0];
        const query = "UPDATE attendance_requests SET is_verified = $2 WHERE att_req_id = $3";
        const values = [ "VERIFIED", id];
        await client.query(query, values);


        res.sendStatus(200);
    } catch (error) {
        console.error("Error updating attendance request:", error);
        res.sendStatus(500);
    }
}
);

router.get("/requests/user/counts", async (req, res) => {
    try {
        const query = "SELECT ar.status, COUNT(*) FROM attendance_requests ar JOIN attendance a ON a.attendance_id = ar.att_id WHERE a.user_id = $1 group by ar.status;";
        const values = [req.user.user_id];
        const result = await client.query(query, values);
        const count = result.rows;

        res.json(count);
    } catch (error) {
        console.error("Error fetching attendance requests count:", error);
        res.sendStatus(500);
    }
});

router.get("/user/missed", async (req, res) => {
    try {
        const query = "SELECT COUNT(*) FROM attendance WHERE clock_in IS NULL AND user_id = $1";
        const values = [req.user.user_id];
        const result = await client.query(query, values);
        const missedAttendance = result.rows[0];

        res.json(missedAttendance);
    } catch (error) {
        console.error("Error fetching missed attendance data:", error);
        res.sendStatus(500);
    }
}
);


module.exports = router;