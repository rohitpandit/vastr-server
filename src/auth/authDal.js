const logger = require('../lib/logger');
const connection = require('../db');

const authDal = {
    getUser: async (email)=>{
        try {
            const userQuery = `select * from public.user where email = '${email}' `;
            const user = await connection.query(userQuery);
            return user.rows[0];
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err
        }
    },

    createUser: async (email, password) =>{
        try {
            const userQuery = `insert into public.user (email, password) values ('${email}', '${password}') `;
            const user = await connection.query(userQuery);
            return user;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err
        }
    }
}

module.exports = authDal;