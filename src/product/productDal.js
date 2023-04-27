const Product = require('../models/Product')

const productDal = {
    findById: async (id)=>{
        try {
            let productQuery = '';
            return product;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err
        }
    },
    incrementProductById : async (id) =>{
        try {
            const product = ''
            product.quantity += 1;
            await product.save();

            const productList = await Product.find();
            return productList;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    decrementProductById : async (id) =>{
        try {
            const product = await Product.findOne({ _id: id });
            product.quantity -= 1;
            await product.save();

            const productList = await Product.find();
            return productList;
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    deleteProductById : async (id) =>{
        try {
            await Product.deleteOne({ _id: id });
            const productList = await Product.find();
            return productList
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    getProductsByCategory : async (category)=>{
        try {
            const productList = await Product.find({ category: type });
            return productList
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    getAllProducts : async () =>{
        try {
            const productList = await Product.find();
            return productList
        } catch (error) {
            logger.error('',error)
            let err  = new Error('Internal error occured!')
            err.status = 500;
            throw err 
        }
    },
    addNewProduct : async (desc, quantity, price, category, result)=>{
        try {
            const newProduct = new Product({
                url: result.image.url,
                thumbUrl: result.thumb.url,
                desc: desc,
                price: price,
                quantity: quantity,
                category: category,
            });

            await newProduct.save();
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