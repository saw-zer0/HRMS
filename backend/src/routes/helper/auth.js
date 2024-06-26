const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.cookies['jwt']
    if (!token) return res.redirect("/login")
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.redirect("/login")
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

module.exports = {authenticateToken, isAdmin, isEmployee, isHR};

