const verifyUser = require('../middlewares/verifyUser');
const orderService = require('./orderService')

const orderRoute = (app)=>{

    app.get('/',verifyUser, async (req, res) => {
        try {
            if (!req.userId) {
                res.status(401).json({ message: 'Unauthorized user!' });
                return;
            }

            let orderList = await orderService.getOrders(req.userId);            
            res.status(200).json({ orderList });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Some internal error occured' });
        }
    });
    
    app.post('/increment/:id',verifyUser, async (req, res) => {
        try {
            const { id } = req.params;
            if (!req.userId) {
                res.status(401).json({ message: 'Unauthorized user!' });
                return;
            }

            const productList = await orderService.incrementOrder(req.userId, id)
            res.status(200).json({ orderList: productList });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Some internal error occured' });
        }
    });
    
    // DECREMENT an item in order
    app.post('/decrement/:id',verifyUser, async (req, res) => {
        try {
            const { id } = req.params;
            if (!req.userId) {
                res.status(401).json({ message: 'Unauthorized user!' });
                return;
            }
            const productList = await orderService.decrementOrder(req.userId, id);
            res.status(200).json({ orderList: productList });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Some internal error occured' });
        }
    });
    
    // DELETE an order item
    app.delete('/:id', verifyUser, async (req, res) => {
        try {
            const { id } = req.params;
            if (!req.userId) {
                res.status(401).json({ message: 'Unauthorized user!' });
                return;
            }
            const productList = await orderService.deleteItem(req.userId, id);
            res.status(200).json({ orderList: productList });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Some internal error occured' });
        }
    });
    
    app.post('/',verifyUser, async (req, res) => {
        try {
            if (!req.userId) {
                res.status(401).json({ message: 'Unauthorized user!' });
                return;
            }
            const { product } = req.body;
            const productList = await orderService.addProducts(req.userId, product)
            res.status(200).json({ orderList: productList });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Some internal error occured' });
        }
    });
    
    app.patch('/paymentSuccess', verifyUser, async (req, res) => {
        try {
            if (!req.userId) {
                res.status(401).json({ message: 'Unauthorized user!' });
                return;
            }
    
            await orderService.afterSuccessfullPayment(req.userId);
            res.status(200).json({ orderList: [] });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Some internal error occured' });
        }
    });
    
}

module.exports = orderRoute;