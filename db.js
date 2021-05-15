const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
	'mongodb+srv://test:test@cluster0.poymf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on('error', (error) => {
	console.log(error);
});

db.once('open', () => {
	console.log('Database connected');
});
