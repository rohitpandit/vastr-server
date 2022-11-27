const User = require('../models/User')
const logger = require('../lib/logger')

const userDal = {
    getUserById:async (userId)=>{
        try {
            let user = await User.findOne({ _id: userId }).select(
                'email name address admin'
            );
            return user;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err
        }
    },

    updateProfile : async (userId, name, address)=>{
        try {
            const user = await User.findOne({ _id: userId }).select(
                'email name address admin'
            );
    
            if (address) {
                user.address = address;
            }
            if (name) {
                user.name = name;
            }
    
            await user.save();
            return user;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err
        }
    }
};

module.exports = userDal;