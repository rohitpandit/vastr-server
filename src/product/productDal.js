const Product = require('../models/Product')
const connection = require('../db')

const productDal = {
    findById: async (id)=>{
        try {
            let productQuery = `select * from product where id = '${id}' `;
            let product = await connection.query(productQuery);
            return product.res[0];
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err
        }
    },
    incrementProductById : async (id) =>{
        try {
            const productIncrementQuery = ` update product set quantity = quantity + 1 where id '${id}' `;
            await connection.query(productIncrementQuery);

            let productListQuery = `select * from product `;
            let productList = await connection.query(productListQuery);
            return productList.rows;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    decrementProductById : async (id) =>{
        try {
            const productDecrementQuery = ` update product set quantity = quantity - 1 where id '${id}' `;
            await connection.query(productDecrementQuery);

            let productListQuery = `select * from product `;
            let productList = await connection.query(productListQuery);
            return productList.rows;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    deleteProductById : async (id) =>{
        try {
            const deleteProductQuery = `delete from product where id = '${id}' `;
            await connection.query(deleteProductQuery)

            let productListQuery = `select * from product `;
            let productList = await connection.query(productListQuery);
            return productList.rows;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    getProductsByCategory : async (category)=>{
        try {
            const productListQuery = `select * from product where category = '${category}' `;
            console.log("productListQuery: ", productListQuery)
            let productList = await connection.query(productListQuery);
            return productList.rows;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    getAllProducts : async () =>{
        try {

           let productListQuery = `select * from product `;
            let productList = await connection.query(productListQuery);
            return productList.rows;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    addNewProduct : async (desc, quantity, price, category, result)=>{
        try {

            const insertProductQuery = ` insert into product (url, thumb_url, description, price, quantiy, category)
             values (result.image.url, result,thumb.url,desc,price, quantity, category) `

            await connection.query(insertProductQuery);
            return;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    }
}

module.exports = productDal