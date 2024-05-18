const express = require("express");
const router = express.Router();

const client = require("../../database");

router.get("/", async (req, res) => {
    try {
        const query = "SELECT * FROM teams";
        const result = await client.query(query);
        const teams = result.rows;

        res.json(teams);
    } catch (error) {
        console.error("Error fetching teams:", error);
        res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    const user = req.user;
    try {
        const query = "SELECT * FROM teams WHERE team_id = $1";
        const values = [req.params.id];
        const result = await client.query(query, values);
        const teamInfo = result.rows[0];

        res.json(teamInfo);
    } catch (error) {
        console.error("Error fetching team:", error);
        res.sendStatus(500);
    }
});

router.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        const query = "INSERT INTO teams (name) VALUES ($1) RETURNING *";
        const values = [name];
        const result = await client.query(query, values);
        const newTeam = result.rows[0];

        // Send the newly created user back in the response
        res.json(newTeam);
        
    } catch (error) {
        console.error("Error creating new team:", error);
        res.sendStatus(500);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { name } = req.body;
        const query = "UPDATE teams SET name = $1 WHERE team_id = $2";
        const values = [name, req.params.id];
        await client.query(query, values);

        res.sendStatus(200);
    } catch (error) {
        console.error("Error updating user:", error);
        res.sendStatus(500);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const query = "DELETE FROM teams WHERE id = $1";
        const values = [req.params.id];
        await client.query(query, values);

        res.sendStatus(200);
    } catch (error) {
        console.error("Error deleting user:", error);
        res.sendStatus(500);
    }
});

router.get("/:id/members", async (req, res) => {
    try {
        const query = "SELECT tu.*, u.full_name, u.email FROM team_users tu JOIN users u ON tu.user_id = u.user_id WHERE tu.team_id = $1";
        const values = [req.params.id];
        const result = await client.query(query, values);
        const members = result.rows;

        res.json(members);
    } catch (error) {
        console.error("Error fetching team members:", error);
        res.sendStatus(500);
    }
});

router.post("/:id/members", async (req, res) => {
    try {
        const { user_id, can_verify } = req.body;
        const query = "INSERT INTO team_users (team_id, user_id, can_verify) VALUES ($1, $2, false) RETURNING *";
        const values = [req.params.id, user_id];
        const result = await client.query(query, values);
        const newMember = result.rows[0];

        res.json(newMember);
        
    } catch (error) {
        console.error("Error adding team member:", error);
        res.sendStatus(500);
    }
});

router.put("/:id/members/:user_id", async (req, res) => {
    try {
        const { can_verify } = req.body;
        const query = "UPDATE team_users SET can_verify = $1 WHERE team_id = $2 AND user_id = $3";
        const values = [can_verify, req.params.id, req.params.user_id];
        await client.query(query, values);

        res.sendStatus(200);
    } catch (error) {
        console.error("Error updating team member:", error);
        res.sendStatus(500);
    }
});

router.put("/:id/members/:user_id/toggle-verify", async (req, res) => {
    try {
        const query = "UPDATE team_users SET can_verify = NOT can_verify WHERE team_id = $1 AND user_id = $2";
        const values = [req.params.id, req.params.user_id];
        await client.query(query, values);

        res.sendStatus(200);
    } catch (error) {
        console.error("Error toggling team member verification:", error);
        res.sendStatus(500);
    }
});

router.delete("/:id/members/:user_id", async (req, res) => {
    try {
        const query = "DELETE FROM team_users WHERE team_id = $1 AND user_id = $2";
        const values = [req.params.id, req.params.user_id];
        await client.query(query, values);

        res.sendStatus(200);
    } catch (error) {
        console.error("Error deleting team member:", error);
        res.sendStatus(500);
    }
});


router.get("/members/verify", async (req, res) => {
    try {
        const query = "SELECT t.* FROM teams t JOIN team_users tu ON t.team_id = tu.team_id WHERE tu.user_id = $1";
        const values = [req.user.user_id];
        const result = await client.query(query, values);
        const teams = result.rows;

        res.json(teams);
    } catch (error) {
        console.error("Error fetching user teams:", error);
        res.sendStatus(500);
    }
});



module.exports = router;