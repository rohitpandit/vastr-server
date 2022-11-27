const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const logger = require('../lib/logger');
const authDal = require('./authDal')


const authService = {
    login : async (email, password) => {
        let user = await authDal.getUser(email);
        if (!user) {
            let err = new Error('Wrong email or password')
            err.status = 400 
            throw err;
        }

        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {
            let err = new Error('Wrong email or password')
            err.status = 400
            throw err;
        }

        const token = jwt.sign({ _id: user._id }, 'jwtSecret')
        return {token: token, admin: user.admin};
    },

    signup : async (email, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = await authDal.getUser(email)
        logger.info('', user)
        if (user) {
            let err = new Error('Email not available!');
            err.status = 400;
            throw err;
        }
        let newUser = await authDal.createUser(email, hashedPassword);
        const token = jwt.sign({ _id: newUser._id }, 'jwtSecret')
        return {token: token};
    }
}

module.exports = authService;