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
//clock in logic
server.post("/clock-in", async (req, res) => {
    try {
       
        const currentTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' });



        const query = "INSERT INTO attendance (clock_in) VALUES ($1)";
        const values = [currentTime];


        await client.query(query, values);
        console.log("Clock-in time inserted successfully");

       
        res.sendStatus(200);
    } catch (error) {
        console.error("Error inserting clock-in time:", error);
        res.sendStatus(500);
    }
});

//clock out logic
server.post("/clock-out", async (req, res) => {
    try {
       
        const currentTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' });



        const query = "INSERT INTO attendance (clock_out) VALUES ($1)";
        const values = [currentTime];


        await client.query(query, values);
        console.log("Clock-out time inserted successfully");

       
        res.sendStatus(200);
    } catch (error) {
        console.error("Error inserting clock-out time:", error);
        res.sendStatus(500);
    }
});
//fetching clock-in data from database 
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
//fetching clock-out data from database
// server.get("/attendance", async (req, res) => {
//     try {
       
//         const query = "SELECT * FROM attendance";
//         const result = await client.query(query);
//         const attendanceData = result.rows;

        
//         res.json(attendanceData);
//     } catch (error) {
//         console.error("Error fetching attendance data:", error);
//         res.sendStatus(500);
//     }
// });



const PORT = 8080;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
