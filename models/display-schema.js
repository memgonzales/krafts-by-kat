const mongoose = require('mongoose');

const displaySchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true
	},
	
	logo: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Display', displaySchema)