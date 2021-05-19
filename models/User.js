const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	address: {
		type: String,
	},
	name: {
		type: String,
	},
});

module.exports = mongoose.model('user', userSchema);
