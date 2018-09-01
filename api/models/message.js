const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	message: String,
	password: String,
	code: String
});

module.exports = mongoose.model('Message', messageSchema);
