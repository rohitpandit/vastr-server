const auth = require('./auth');
const user = require('./user')
const product = require('./product')
const order = require('./order');
const payment = require('./payment')

const routes = (app)=>{
    auth.authRoute(app);
    user.userRoute(app);
    product.productRoute(app);
    order.orderRoute(app);
    payment.paymentRoute(app);
}

module.exports = routes;