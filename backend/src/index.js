const express = require("express");
const path = require("path");
const server = express();
const { Client } = require("pg");
const { DateTime } = require('luxon');
const PORT = process.env.PORT || 8080;


const staticPath = path.join(__dirname, "../public");
server.use(express.static(staticPath));


server.get("/", (req, res) => {
    
    res.sendFile(path.join(staticPath, "attendance.html"));
});
const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "HRMS",
    password: "2003", 
    port: 5432,
});
client.connect();
//clock-in logic

server.post("/clock-in", async (req, res) => {
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


//clock-out logic
server.post("/clock-out", async (req, res) => {
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

server.get("/attendance", async (req, res) => {
    try {
        const query = "SELECT * FROM attendance";
        const result = await client.query(query);
        const attendanceData = result.rows;

        res.json(attendanceData);
    } catch (error) {
        console.error("Error fetching attendance data:", error);
        res.sendStatus(500);
    }
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));