/* Schema for the business owner (i.e., the project client) account; this account also serves as the 
 * "administrator" of the web app 
 */

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

const businessOwnerSchema = new mongoose.Schema({
    /* Account username */
    username: {
        type: String,
        required: true
    },
	
    /* Account password */
	password : {
		type: String,
		required: true
	},

    /* Account email address */
    emailAddress: {
        type: String,
        required: true
    },

    /* Account contact number (mobile number) */
    contactNumber: {
        type: Number,
        required: true
    },

    /* ObjectIDs of message threads */
    threadIds: {
        type: [String],
        required: false
    },

    /* Account profile picture */
    picture: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('BusinessOwner', businessOwnerSchema);