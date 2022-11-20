const mongoose = require('mongoose');
const logger = require('../lib/logger')

mongoose.connect(
	'mongodb+srv://test:test@cluster0.poymf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on('error', (error) => {
	logger.error(error);
});

db.once('open', () => {
	logger.info('Database connected');
});
