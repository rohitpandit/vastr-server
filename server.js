const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('./db');
require('dotenv').config();

const auth = require('./routes/auth');
const product = require('./routes/product');
const user = require('./routes/user');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.use('/auth', auth);
app.use('/product', product);
app.use('/user', user);

app.get('/', (req, res) => {
	res.send('hi');
});

app.listen(PORT, () => {
	console.log('Sever live at port: ', PORT);
});
