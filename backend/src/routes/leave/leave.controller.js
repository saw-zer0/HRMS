const client = require("../../database");

const getLeave = async (req, res, next) => {
    try {
        const query = "SELECT * FROM leave WHERE leave_id = $1";
        const values = [req.params.id];
        const result = await client.query(query, values);
        const leave = result.rows[0];
        if(!leave) return res.sendStatus(404);
        req.leave = leave;
        next();
    } catch (error) {
        console.error("Error fetching leave:", error);
        res.sendStatus(500);
    }
};

const getUserLeave = async (req, res, next) => {
    try {
        const query = "SELECT * FROM leave WHERE user_id = $1";
        const values = [req.params.user_id];
        const result = await client.query(query, values);
        const leave = result.rows[0];
        req.leave = leave;
        next();
    } catch (error) {
        console.error("Error fetching leave:", error);
        res.sendStatus(500);
    }
}
const getBulkLeave = async (req, res, next) => {
    try {
        const query = "SELECT * FROM leave";
        const result = await client.query(query);
        const leaves = result.rows;
        if(!leaves) return res.sendStatus(404);
        req.leave = leaves;
        next();
    } catch (error) {
        console.error("Error fetching leaves:", error);
        res.sendStatus(500);
    }
};

module.exports = {getLeave, getBulkLeave};