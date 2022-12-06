const paymentService = require('./paymentService')

const paymentRoute = (app)=>{
    app.post('/crate-payment-intent', async (req, res) => {
        try {
            const { totalPayable } = req.body;
    
            paymentIntent = await paymentService.getPaymentIntent(totalPayable);
            res.status(200).json({ clientSecret: paymentIntent?.client_secret });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'some internal error occured' });
        }
    });   
}

module.exports = paymentRoute