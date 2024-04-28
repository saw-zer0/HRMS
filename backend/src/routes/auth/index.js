const express = require("express");
const router = express.Router();
const client = require("../../database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require("../helper/auth");

const refreshTokens = [];



router.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({ name: user.name })
      res.json({ accessToken: accessToken })
    })
  })
  
  router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
  })
  
  router.post('/login', async(req, res) => {
    // Authenticate User
    const email = req.body.email;
    const password = req.body.password;
    // Get user with given email from database
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    // Verify password using bcrypt
    if (!user || !bcrypt.compare(password, user.password)) {
        return res.sendStatus(401);
    }
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
  })
  
  function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })
  }

router.put("/change_password",authenticateToken, async (req, res) => {
    try {
        const {  oldPassword, newPassword } = req.body;
        const user = req.user;
        if (!user || !bcrypt.compare(oldPassword, user.password)) {
            return res.sendStatus(401);
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await client.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, user.email]);
        res.sendStatus(200);
    } catch (error) {
        console.error("Error changing password:", error);
        res.sendStatus(500);
    }
});

module.exports = router;