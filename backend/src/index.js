const express = require("express");
const path = require("path");
const server = express();
const { Client } = require("pg");


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

server.post("/clock-in", async (req, res) => {
    try {
        // Get the current time
        const currentTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' });



        const query = "INSERT INTO attendance (clock_in) VALUES ($1)";
        const values = [currentTime];


        await client.query(query, values);
        console.log("Clock-in time inserted successfully");

        // Send a success response to the client
        res.sendStatus(200);
    } catch (error) {
        console.error("Error inserting clock-in time:", error);
        res.sendStatus(500);
    }
});

server.get("/attendance", async (req, res) => {
    try {
        // Fetch attendance data from the database
        const query = "SELECT * FROM attendance";
        const result = await client.query(query);
        const attendanceData = result.rows;

        // Send the attendance data as JSON response to the client
        res.json(attendanceData);
    } catch (error) {
        console.error("Error fetching attendance data:", error);
        res.sendStatus(500);
    }
});


const PORT = 8080;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
