const productDal = require('./productDal');
const imgbbUploader = require('imgbb-uploader');

const productService ={
    getSingleProduct : (id)=>{
        return productDal.findById(id)
    },
    incrementProduct : (id)=>{
        return productDal.incrementProductById(id);
    },
    decrementProduct : (id)=>{
        return productDal.decrementProductById(id);
    },
    deleteProduct : (id)=>{
        return productDal.deleteProductById(id);
    },
    getProducts : (type)=>{
        console.log('type: ', type)
        if (type) {
            return productDal.getProductsByCategory(type); 
        }
        return productDal.getAllProducts();
    },
    addNewProduct :async (desc, quantity, price, category, photo) =>{
        const result = await imgbbUploader(process.env.IMGBBSECRET, photo.path);
        return productDal.addNewProduct(desc, quantity, price, category, result);
    }
}

module.exports = productService;