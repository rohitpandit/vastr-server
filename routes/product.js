const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const util = require('util');
const fs = require('fs');
const imgbbUploader = require('imgbb-uploader');

const router = express.Router();
const Product = require('../models/Product');
const upload = multer({ dest: 'uploads/' });

const readFileAsync = util.promisify(fs.readFile);

router.get('/', (req, res) => {
	res.send('hi');
});

router.post('/', upload.single('photo'), async (req, res) => {
	try {
		const { desc, quantity, price, category } = req.body;
		console.log(req.body);
		const photo = req.file;
		console.log('photo', photo);

		// const imageStream = await readFileAsync(photo.path);

		// const formData = new FormData();
		// formData.append('image', imageStream);
		// // console.log(formData);

		// const result = await axios.post(
		// 	'https://api.imgbb.com/1/upload?key=c6b7fb4de9df340838a4565ac668a1e9',
		// 	formData
		// );

		// console.log(result.data);

		const result = await imgbbUploader(process.env.IMGBBSecret, photo.path);
		console.log(result);

		// if (result.status !== 200) {
		// 	res.status(500).json({ message: 'some internal error occured' });
		// 	return;

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
