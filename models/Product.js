const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	category: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	thumbUrl: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('product', productSchema);
