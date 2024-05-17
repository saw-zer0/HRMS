const express = require('express');
const { isAdmin } = require('../helper/auth');
const client = require('../../database');

const router = express.Router();

// GET /payroll
router.get('/', isAdmin, async (req, res) => {
    try {
        const query = "SELECT payroll.*, users.full_name FROM payroll join users on payroll.user_id = users.user_id";
        const result = await client.query(query);
        const payroll = result.rows;
        res.json(payroll);
    } catch (error) {
        console.error("Error fetching payroll:", error);
        res.sendStatus(500);
    }
});

router.get("/user_payroll", async (req, res) => {
    try {
        const query = "SELECT * FROM payroll WHERE user_id = $1";
        const values = [req.user.user_id];
        const result = await client.query(query, values);
        const payroll = result.rows;
        res.json(payroll);
    } catch (error) {
        console.error("Error fetching payroll:", error);
        res.sendStatus(500);
    }
});

// POST /payroll
router.post('/bulkpay', isAdmin, async (req, res) => {
    try {
        const query = "SELECT * FROM users where role = 'EMPLOYEE' ";
        const result = await client.query(query);
        const users = result.rows;
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        for (const user of users) {
            const { user_id, salary } = user;
            const query = "INSERT INTO payroll (user_id, salary, date, total) VALUES ($1,$2, $3, $4)";
            // Get the current locale date
            const date = new Date().toLocaleDateString().replace(/\//g, '-');
            //get bonus and deduction for users and calculate the net pay

            const values = [user_id, salary, date, salary];
            await client.query(query, values);
        }
        // send a response to the client
        res.status(201).json({ message: 'Payroll entry created for all users' });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.sendStatus(500);
    }
});

module.exports = router;