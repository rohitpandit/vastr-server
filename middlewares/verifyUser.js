const jwt = require('jsonwebtoken')

const verifyUser = (req, res, next) => {
  try {
    if (req.headers['authorization']) {
      const token = req.headers['authorization'].split(' ')[1]
      const verify = jwt.verify(token, 'jwtSecret')
      if (verify) {
        req.userId = verify._id
      }
    }
  } catch (error) {
    res.status(401).json({ message: 'unauthorized user' })
  }
  next()
}

module.exports = verifyUser
