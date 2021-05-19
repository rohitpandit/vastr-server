const express = require('express');
const axios = require('axios');
const multer = require('multer');
const imgbbUploader = require('imgbb-uploader');

const router = express.Router();
const Product = require('../models/Product');
const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
	res.send('hi');
});

router.post('/', upload.single('photo'), async (req, res) => {
	try {
		const { desc, quantity, price, category } = req.body;
		console.log(req.body);
		const photo = req.file;

		const result = await imgbbUploader(process.env.IMGBBSecret, photo.path);
		console.log(result);

		const newProduct = new Product({
			url: result.image.url,
			thumbUrl: result.thumb.url,
			desc: desc,
			price: price,
			quantity: quantity,
			category: category,
		});

		await newProduct.save();
		console.log(result.data);

		res.status(201).json({ message: 'upload successful' });
	} catch (error) {
		console.log('Error', error.message);
		res.status(500).json({ message: 'some internal error occured' });
	}
});

module.exports = router;
