const mongoose = require('mongoose');

/* Schema for the web application logo displayed on the navigation bar */
const displaySchema = new mongoose.Schema({
	/* Logo ID */
	id: {
		type: Number,
		required: true
	},
	
	/* Logo file name */
	logo: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Display', displaySchema)