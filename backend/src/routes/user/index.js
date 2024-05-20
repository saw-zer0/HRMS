const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const client = require("../../database");
const sendMail = require("../helper/sendMail");
const { isAdmin } = require("../helper/auth");

router.get("/", isAdmin,async (req, res) => {
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
        const query = "INSERT INTO users (full_name, email, password, role, pw_change) VALUES ($1, $2, $3, $4, true) RETURNING *";
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

router.put("/change_password", async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = req.user;
        const query = "SELECT password FROM users WHERE user_id = $1";
        const values = [user.user_id];
        const result = await client.query(query, values);
        const dbPassword = result.rows[0].password;
        const isMatch = await bcrypt.compare(oldPassword, dbPassword);
        if(!isMatch){
            return res.status(400).json({message: "Old password is incorrect"});
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateQuery = "UPDATE users SET password = $1, pw_change = $2 WHERE user_id = $3";
        const updateValues = [hashedPassword, false, user.user_id];
        await client.query(updateQuery, updateValues);

        res.json({message: "Password changed successfully"});
    } catch (error) {
        console.error("Error changing password:", error);
        res.sendStatus(500);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { name, email, gender, role, phone  } = req.body;
        const query = "UPDATE users SET full_name = $1, email = $2, gender = $3, role = $4, phone = $5 WHERE user_id = $6";
        const values = [name, email, gender, role, phone, req.params.id];
        await client.query(query, values);

        res.json({"message": "User updated successfully"});
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

router.put("/reset-password/:id", async (req, res) => {
    try {
        const query = "UPDATE users SET pw_change = true WHERE user_id = $1";
        const values = [req.params.id];
        await client.query(query, values);

        res.json({ message: "Password reset mode enabled successfully" });
    } catch (error) {
        console.error("Error enabling resetting password:", error);
        res.sendStatus(500);
    }

}
    
    );

module.exports = router;