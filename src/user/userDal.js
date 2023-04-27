const User = require('../models/User')
const logger = require('../lib/logger')
const connection = require('../db')

const userDal = {
    getUserById:async (userId)=>{
        try {
            let userQuery = `select email name address admin from public.user where id = ${userId} `;
            let user = await connection.query(userQuery);
            return user.res[0];
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err
        }
    },

    updateProfile : async (userId, name, address)=>{
        try {
            let updateUserQuery = `update public.user set address = '${address}'
            , name = '${name}' where id = '${userId}' returning name, email, address, admin `;
            let user = await connection.query(updateUserQuery);
            return user.rows[0];
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err
        }
    }
};

module.exports = userDal;