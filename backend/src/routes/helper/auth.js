const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
}

function isAdmin(req, res, next) {
    if (req.user.role !== 'ADMIN') return res.sendStatus(403)
    next()
}

function isEmployee(req, res, next) {
    if (req.user.role !== 'EMPLOYEE') return res.sendStatus(403)
    next()
}

function isHR(req, res, next) {
    if (req.user.role !== 'HR') return res.sendStatus(403)
    next()
}

module.exports = authenticateToken;

