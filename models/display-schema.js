/* Schema for the web application logo displayed on the navigation bar */

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

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