const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const client = require("../../database");
const sendMail = require("../helper/sendMail");

router.get("/", async (req, res) => {
    try {
        const searchTerm = req.query.search;
        let query = "SELECT * FROM users";
        let values = [];
        let result;
        if(searchTerm){
            query = "SELECT * FROM users WHERE full_name LIKE $1 OR email LIKE $1";
            values = [`%${searchTerm}%`];
        }
        result = await client.query(query, values);
        const users = result.rows;
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.sendStatus(500);
    }
});

router.get("/profile", async (req, res) => {
    const user = req.user;
    try {
        const query = "SELECT * FROM users WHERE user_id = $1";
        const values = [user.user_id];
        const result = await client.query(query, values);
        const profile = result.rows[0];

        res.json(profile);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.sendStatus(500);
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "INSERT INTO users (full_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [name, email, hashedPassword, role];
        const result = await client.query(query, values);
        const newUser = result.rows[0];

        // Send email to user notifying them of their account creation with nodemailer
        sendMail(newUser.email, "Account Created", "Your account has been created successfully!", "<b>password: password123</b>");

        // Send the newly created user back in the response
        res.json(newUser);
        
    } catch (error) {
        console.error("Error creating user:", error);
        res.sendStatus(500);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const query = "UPDATE users SET full_name = $1, email = $2, password = $3 WHERE user_id = $4";
        const values = [name, email, password, req.params.id];
        await client.query(query, values);

        res.sendStatus(200);
    } catch (error) {
        console.error("Error updating user:", error);
        res.sendStatus(500);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const query = "DELETE FROM users WHERE user_id = $1";
        const values = [req.params.id];
        await client.query(query, values);

        res.json({"message": "User deleted successfully"});
    } catch (error) {
        console.error("Error deleting user:", error);
        res.sendStatus(500);
    }
});

module.exports = router;