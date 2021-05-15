const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('./db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log('Sever live at port: ', PORT);
});
