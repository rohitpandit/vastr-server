const Order = require('../models/Order')

const orderDal = {
    getOrderByUser : async (userId) =>{
        try {
            const orderQuery = `select * from public.user where id = ${userId} `
            const order = await Order.findOne({ userId: userId });
            if (order === null) {
                return []
            }

            return order.products;    
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    incrementOrderByOne: async (userId, productId) =>{
        try {
            const order = await Order.findOne({ userId: userId });
            const newProducts = order.products.map((item) => {
                if (productId == item._id) {
                    item.quantity += 1;

                    return item;
                } else {
                    return item;
                }
            });

            logger.info(newProducts);

            order.products = newProducts;
            await order.save();
            return newProducts;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    decrementOrderByOne: async (userId, productId) =>{
        try {
            const order = await Order.findOne({ userId: userId });
            const newProducts = order.products.map((item) => {
                if (productId == item._id) {
                    item.quantity -= 1;
    
                    return item;
                } else {
                    return item;
                }
            });
    
            order.products = newProducts;
            await order.save();
            return newProducts;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    deleteProductById: async (userId, productId) =>{
        try {
            const order = await Order.findOne({ userId: userId });
            const newProducts = order.products.filter((item) => {
                if (productId != item._id) {
                    return item;
                }
            });
    
            order.products = newProducts;
            await order.save();
            return newProducts;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    addProducts: async (userId, product) =>{
        try {
            const order = await Order.findOne({ userId: userId });
            if (order == null) {
                const newOrder = new Order({
                    userId: userId,
                    products: [product],
                });
    
                await newOrder.save();
                return newOrder.products 
            } else {
                order.products = [...order.products, product];
                await order.save();
                return order.products;
            }
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }   
    },
    clearOrder: async (userId)=>{
        try {
            await Order.findOneAndDelete({ userId: userId });
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err             
        }
    }
}

module.exports = orderDal