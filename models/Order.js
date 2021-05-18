const mongoose = require('mongoose');
const Product = require('./Product');
const User = required('./User');

const orderSchema = mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		ref: User,
		required: true,
	},
	products: [Product],
});

module.exports = mongoose.model('order', orderSchema);
