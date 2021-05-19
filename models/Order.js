const mongoose = require('mongoose');
const Product = require('./Product');
const { productSchema } = require('./Product');
const User = require('./User');

const orderSchema = mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		ref: User,
		required: true,
	},
	products: [productSchema],
});

module.exports = mongoose.model('order', orderSchema);
