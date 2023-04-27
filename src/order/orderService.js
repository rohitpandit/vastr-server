const orderDal = require("./orderDal")

const orderService = {
    getOrders: (userId) => {
        return orderDal.getOrderByUser(userId)
    },
    incrementOrder: (userId, productId) =>{
        return orderDal.incrementOrderByOne(userId, productId)
    },
    decrementOrder: (userId, productId) =>{
        return orderDal.decrementOrderByOne(userId, productId)
    },
    deleteItem: (userId, productId) =>{
        return orderDal.deleteOrderByProductId(userId, productId)
    },
    addProducts: (userId, product) =>{
        return orderDal.addProducts(userId, product)
    },
    afterSuccessfullPayment: (userId) => {
        return orderDal.clearOrder(userId)
    }
}

module.exports = orderService;