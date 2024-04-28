const express = require("express");
const router = express.Router();
const client = require("../../database");
const { getLeave, getBulkLeave } = require("./leave.controller");

router.get("/",getBulkLeave, async (req, res) => {
    res.json(req.leave);
});

//fetching leave data for a user from database
router.get("/user/:user_id", async (req, res) => {
    try {
        const query = "SELECT * FROM leave WHERE user_id = $1";
        const values = [req.params.id];
        const result = await client.query(query, values);
        const leave = result.rows[0];

        res.json(leave);
    } catch (error) {
        console.error("Error fetching leave:", error);
        res.sendStatus(500);
    }
});

//fetching one leave from database
router.get("/:id", getLeave, (req, res) => {
    res.json(req.leave);
});

router.post("/", async (req, res) => {
    try {
        const { user_id, start_date, end_date, reason, type } = req.body;
        const query = "INSERT INTO leave (user_id, start_date, end_date, type, reason, status) VALUES ($1, $2, $3, $4, $5, $6)";
        const values = [null, start_date, end_date, type, reason, "PENDING"];
        await client.query(query, values);

        res.sendStatus(200);
    } catch (error) {
        console.error("Error creating leave:", error);
        res.sendStatus(500);
    }
});

router.put("/:id",getLeave, async (req, res) => {
    if(req.leave.status !== "PENDING") return res.sendStatus(400);
    try {
        const { user_id, start_date, end_date, reason, type } = req.body;
        const query = "UPDATE leave SET start_date = $1, end_date = $2, reason = $3, type = $4 WHERE leave_id = $5";
        const values = [start_date, end_date, reason, type, req.params.id];
        await client.query(query, values);

        res.sendStatus(200);
    } catch (error) {
        console.error("Error updating leave:", error);
        res.sendStatus(500);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const query = "DELETE FROM leave WHERE leave_id = $1";
        const values = [req.params.id];
        const result = await client.query(query, values);
        if(result.rows.length === 0) return res.sendStatus(404);
        res.sendStatus(200);
    } catch (error) {
        console.error("Error deleting leave:", error);
        res.sendStatus(500);
    }
});

router.put("/approve/:id", async (req, res) => {
    try {
        const query = "UPDATE leave SET status = $1 WHERE leave_id = $2";
        const values = ["APPROVED", req.params.id];
        await client.query(query, values);

        res.sendStatus(200);
    } catch (error) {
        console.error("Error approving leave:", error);
        res.sendStatus(500);
    }
});

router.put("/reject/:id", async (req, res) => {
    try {
        const query = "UPDATE leave SET status = $1 WHERE leave_id = $2";
        const values = ["REJECTED", req.params.id];
        await client.query(query, values);

        res.sendStatus(200);
    } catch (error) {
        console.error("Error rejecting leave:", error);
        res.sendStatus(500);
    }
});

module.exports = router;