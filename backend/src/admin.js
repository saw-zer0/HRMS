const express = require("express");
const path = require("path");
const server = express();
const { Client } = require("pg");
const PORT = process.env.PORT || 3000;


const staticPath = path.join(__dirname, "../public");
server.use(express.static(staticPath));


server.get("/", (req, res) => {
    
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
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));