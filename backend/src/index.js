const express = require("express");
const path = require("path");
const server = express();
const bodyParser = require("body-parser");
const { Client } = require("pg");
const { DateTime } = require('luxon');

const PORT = process.env.PORT || 8080;


const staticPath = path.join(__dirname, "../public");
server.use(express.static(staticPath));


server.get("/", (req, res) => {
    
    res.sendFile(path.join(staticPath, "attendance.html"));
});

server.get("/admin", (req, res) => {
    
    res.sendFile(path.join(staticPath, "admin.html"));
});


const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "HRMS",
    password: "2003", 
    port: 5432,
});
client.connect();
server.use(bodyParser.json());
server.get("/validate-user/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const query = "SELECT EXISTS (SELECT 1 FROM users WHERE user_id = $1)";
        const result = await client.query(query, [userId]);

        const isValid = result.rows[0].exists;

        console.log("User validation result:", isValid);

        if (isValid) {
            res.status(200).json({ message: "Correct user. Please clock in." });
        } else {
            res.status(404).json({ message: "Invalid user ID." });
        }
    } catch (error) {
        console.error("Error validating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//clock-in logic

server.post("/clock-in", async (req, res) => {
    try {
        const { userId } = req.body;
        const currentTime = DateTime.now().setZone('Asia/Kathmandu');
        const formattedDate = currentTime.toFormat('yyyy-MM-dd');
        const formattedTime = currentTime.toFormat('HH:mm');

        const query = `
            INSERT INTO attendance (user_id, date, clock_in)
            VALUES ($1, $2, $3)
            RETURNING user_id, date, clock_in
        `;
        
        const values = [userId, formattedDate, formattedTime];
        const result = await client.query(query, values);
        const { id, date, clock_in } = result.rows[0];

        console.log("Clock-in time inserted successfully for date:", formattedDate);
        res.status(200).json({ id, date, clock_in }); // Send inserted details in the API response
    } catch (error) {
        console.error("Error inserting clock-in time:", error);
        res.sendStatus(500);
    }
});


//clock-out logic
server.post("/clock-out", async (req, res) => {
    try {
        const { userId } = req.body;
        const currentTime = DateTime.now().setZone('Asia/Kathmandu');
        const formattedTime = currentTime.toFormat('HH:mm');
        const formattedDate = currentTime.toFormat('yyyy-MM-dd');
        
        if (typeof userId !== 'string' || userId.trim() === '') {
            throw new Error("Invalid user ID format.");
        }

        const query = `
            UPDATE attendance
            SET clock_out = $1
            WHERE user_id = $2 AND date = $3
            RETURNING user_id, date, clock_in, clock_out
        `;

        const values = [formattedTime, userId, formattedDate];
        const result = await client.query(query, values);

        if (result.rows.length > 0) {
            const { user_id, date, clock_in, clock_out } = result.rows[0];
            console.log("Clock-out time updated successfully");
            res.status(200).json({ user_id, date, clock_in, clock_out });
        } else {
            console.error("No matching record found for the given user_id and date.");
            res.status(404).json({ message: "No matching record found." });
        }
    } catch (error) {
        console.error("Error updating clock-out time:", error);
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



//---------ADMIN ATTENADNACE BACKEND-------------//

