const stripe = require('stripe')(
    'sk_test_51JGFlFSFYhBO3CRq6LXypCRWIKHGIDCPqDUxcXTtzOye3oT7MKKOKYCcmdFItABSMciqkndWzV1lHxmRalal1Ln600D9AyUqpp'
);


const paymentSerice ={
    getPaymentIntent : (totalPayable) =>{
        return stripe.paymentIntents.create({
            amount: totalPayable * 100,
            currency: 'inr',
        });
    }
}

module.exports = paymentSerice;