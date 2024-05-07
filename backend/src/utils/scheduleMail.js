const schedule = require('node-schedule');
const sendMail = require('../routes/helper/sendMail');
const client = require('../database');

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(1, 5)];
rule.hour = 7;
rule.minute = 47;


const getNotClockedInUsers = async () => {
    try {
        const currentTime = new Date().setZone('Asia/Kathmandu');
        const formattedDate = currentTime.toFormat('yyyy-MM-dd');
    
        const query = "SELECT * FROM users WHERE id NOT IN (SELECT user_id FROM attendance WHERE date = $1)";
        const values = [formattedDate];
        const result = await client.query(query, values);
        const users = result.rows;
    
        return users;
    } catch (error) {
        console.error("Error fetching users who have not clocked in:", error);
        return [];
    }
    }
const job = schedule.scheduleJob(rule, function(){
    console.log('Today is recognized by Rebecca Black!');
    const users = getNotClockedInUsers();
    users.forEach(user => {
        console.log(`Sending reminder email to ${user.email}`);
        sendMail(user.email, 'Clockin Reminder', '', '<b>Please clock in for today!</b>');
    });
});
console.log("Job scheduled successfully!")
module.exports = job;