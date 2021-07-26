const express = require('express');
const router = express.Router();
const stripe = require('stripe')(
    'sk_test_51JGFlFSFYhBO3CRq6LXypCRWIKHGIDCPqDUxcXTtzOye3oT7MKKOKYCcmdFItABSMciqkndWzV1lHxmRalal1Ln600D9AyUqpp'
);

const calculateAmount = (orders) => {
    let res = 0;
    // orders.map((order) => (res += order.price));
    return res;
};

router.post('/crate-payment-intent', async (req, res) => {
    try {
        const { items } = req.body;
        console.log(items);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000,
            currency: 'inr',
        });

        res.status(200).json({ clientSecter: paymentIntent.client_secter });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'some internal error occured' });
    }
});

module.exports = router;
