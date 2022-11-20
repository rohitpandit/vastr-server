const logger = require('../../lib/logger');
const User = require('../models/User')

const authDal = {
    getUser: async (email)=>{
        try {
            const user = await User.findOne({ email: email })
            return user;
        } catch (error) {
            logger.error(error)
            throw new Error('Internal error occured!', {status: 500})
        }
    },

    createUser: async (email, password) =>{
        try {
            const user = await User.create({ email, password });
            return user;
        } catch (error) {
            logger.error(error)
            throw new Error('Internal error occured!', {status: 500})
        }
    }
}

module.exports = authDal;