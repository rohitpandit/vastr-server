const Order = require('../models/Order')
const connection = require('../db')

const orderDal = {
    getOrderByUser : async (userId) =>{
        try {
            const orderQuery = `select p.* from product_order po inner join project p 
            on po.product_id = p.id where user_id = ${userId} `
            const order = await connection.query(orderQuery);
            return order.rows; 
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    incrementOrderByOne: async (userId, productId) =>{
        try {
            const orderIncrementQuery = ` update product_order set quantity = quantity + 1 
            where user_id = '${user_id}' and product_id = '${productId}' ` 
            await connection.query(orderIncrementQuery);

            const orderQuery = `select p.* from product_order po inner join project p 
            on po.product_id = p.id where user_id = ${userId} `
            const order = await connection.query(orderQuery);
            return order.rows;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    decrementOrderByOne: async (userId, productId) =>{
        try {
            const orderDecrementQuery = ` update product_order set quantity = quantity - 1 
            where user_id = '${user_id}' and product_id = '${productId}' ` 
            await connection.query(orderDecrementQuery);

            const orderQuery = `select p.* from product_order po inner join project p 
            on po.product_id = p.id where user_id = ${userId} `
            const order = await connection.query(orderQuery);
            return order.rows;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    deleteOrderByProductId: async (userId, productId) =>{
        try {
            const deleteOderQuery = `delete from product_order where user_id = '${userId}' and product_id = '${productId}' `
            await connection.query(deleteOderQuery);

            const orderQuery = `select p.* from product_order po inner join project p 
            on po.product_id = p.id where user_id = ${userId} `
            const order = await connection.query(orderQuery);
            return order.rows;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    addProducts: async (userId, productId) =>{
        try {
            const productAddQuery = ` insert into product_order (user_id, product_id, quantity) 
            values ('${userId}', '${productId}', 1)`;
            await connection.query(productAddQuery);

            const orderQuery = `select p.* from product_order po inner join project p 
            on po.product_id = p.id where user_id = ${userId} `
            const order = await connection.query(orderQuery);
            return order.rows;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }   
    },
    clearOrder: async (userId)=>{
        try {
            let deleteOrders = `delete from product_order where user_id = '${userId}' `
            await connection.query(deleteOrders);
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err             
        }
    }
}

module.exports = orderDal