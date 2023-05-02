const jwt = require('jsonwebtoken')
const logger = require('../lib/logger')

const verifyUser = (req, res, next) => {
  try {
    console.log('-----: ', req.headers)
    if (req.headers['authorization']) {
      const token = req.headers['authorization']
      console.log("token: ", token)
      logger.info("token: ", token)
      const verify = jwt.verify(token, 'jwtSecret')
      logger.info("verify ", verify)
      console.log('verify: ', verify)
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
