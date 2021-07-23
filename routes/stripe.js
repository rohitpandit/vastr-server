const express = require('express');
const router = express.Router();
const stripe = require('stripe')(
    'sk_test_51JGFlFSFYhBO3CRq6LXypCRWIKHGIDCPqDUxcXTtzOye3oT7MKKOKYCcmdFItABSMciqkndWzV1lHxmRalal1Ln600D9AyUqpp'
);

app.post('/crate-payment-intent', async (req, res) => {
    const { items } = req.body;

    const paymentIntent = await stripe.paymentIntent.create({
        amount: calculateAmount(items),
        currency: 'inr',
    });

    res.status(200).json({ clientSecter: paymentIntent.client_secter });
});

module.exports = router;
