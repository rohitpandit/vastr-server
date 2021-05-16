const mongoose = require('mongoose');
const Product = require('./Product');
const User = required('./User');

const products = mongoose.Schema({
	productId: {
		type: mongoose.Types.ObjectId,
		ref: Product,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
});

const cartSchema = mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		ref: User,
		required: true,
	},
	products: [products],
});

module.exports = mongoose.model('cart', cartSchema);
