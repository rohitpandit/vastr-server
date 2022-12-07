const multer = require('multer');
const productService = require('./productService');
const upload = multer({ dest: 'uploads/' });

const productRoute = (app)=>{

    app.get('/single/:id', async (req, res) => {
        try {
            const { id } = req.params;
    
            const product = await productService.getSingleProduct(id);
            res.status(200).json({ product: product });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'some internal error occured' });
        }
    });
    
    // Increment in product
    app.post('/increment/:id', async (req, res) => {
        try {
            const { id } = req.params;
    
            const productList = await productService.incrementProduct(id);
            res.status(200).json({ productList: productList });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Some internal error occured' });
        }
    });
    
    // DECREMENT an item in product
    app.post('/decrement/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const productList = await productService.decrementProduct(id);
        
            res.status(200).json({ productList: productList });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Some internal error occured' });
        }
    });
    
    // DELETE an product item
    app.delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;
    
            const productList = await productService.deleteProduct(id);
            res.status(200).json({ productList: productList });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Some internal error occured' });
        }
    });
    
    app.get('/:type?', async (req, res) => {
        try {
            const { type } = req.params;
            let productList = await productService.getProducts(type);    
            
            res.status(200).json({ productList: productList });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'some internal error occured' });
        }
    });
    
    app.post('/', upload.single('photo'), async (req, res) => {
        try {
            const { desc, quantity, price, category } = req.body;
    
            const photo = req.file;
            await productService.addNewProduct(desc, quantity, price, category, photo);    
    
            res.status(201).json({ message: 'upload successful' });
        } catch (error) {
            logger.error('Error', error.message);
            res.status(500).json({ message: 'some internal error occured' });
        }
    });
    
}

module.exports = productRoute;