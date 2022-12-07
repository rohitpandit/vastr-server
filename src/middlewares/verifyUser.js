const jwt = require('jsonwebtoken')
const logger = require('../lib/logger')

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
    logger.error('',error)
    next(error)
  }
  next()
}

module.exports = verifyUser
