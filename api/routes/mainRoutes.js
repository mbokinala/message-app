const express = require('express');
const router = express.Router();

const shortid = require('shortid');

const mongoose = require('mongoose');
const Message = require('../models/message');

router.post('/messages', (req, res) => {
	var code = shortid.generate();
	const message = new Message({
		_id: new mongoose.Types.ObjectId(),
		message: req.body.message,
		password: req.body.password,
		code: code
	});

	message.save()
		.then(result => {
			res.status(201).json({
				message: req.body.message,
				password: req.body.message,
				code: code
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).send(err);
		});
});

router.post('/getmessage', (req, res) => {
	const query = {
		code: req.body.code,
		password: req.body.password
	}

	Message.findOne(query, (err, message) => {
		if (message){
			console.log('retrieved message: ');
			console.log(message.message);
			res.status(200).send(message);
		} else {
			console.log('Not found');
			res.status(404).send('not found');
		}
	});
});

module.exports = router;
