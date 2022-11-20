const express = require('express');
const logger = require('../../lib/logger');
const router = express.Router();
const stripe = require('stripe')(
    'sk_test_51JGFlFSFYhBO3CRq6LXypCRWIKHGIDCPqDUxcXTtzOye3oT7MKKOKYCcmdFItABSMciqkndWzV1lHxmRalal1Ln600D9AyUqpp'
);

router.post('/crate-payment-intent', async (req, res) => {
    try {
        const { totalPayable } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPayable * 100,
            currency: 'inr',
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: 'some internal error occured' });
    }
});

module.exports = router;
