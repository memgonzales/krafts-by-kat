/* Schema for the user (i.e. the customer) accounts */

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
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

    /* First name of the account owner */
    firstName: {
        type: String,
        required: true
    },

    /* Middle name of the account owner (optional) */
    middleName: {
        type: String,
        required: false
    },

    /* Last name of the account owner */
    lastName: {
        type: String,
        required: true
    },

    /* Account email address */
    emailAddress: {
        type: String,
        required: true
    },

    /* Account contact number */
    contactNumber: {
        type: String,
        required: true
    },

    /* Region of the delivery address */
    region: {
        type: String,
        required: true
    },

    /* Province of the delivery address */
    province: {
        type: String,
        required: true
    },

    /* City of the delivery address */
    city: {
        type: String,
        required: true
    },

    /* Barangay of the delivery address */
    barangay: {
        type: String,
        required: true
    },

    /* ZIP code of the delivery address */
    zipCode: {
        type: String,
        required: true
    },

    /* Address proper (i.e., unit name/building name) of the delivery address */
    address: {
        type: String,
        required: true
    },

    /* ObjectIDs of orders made by the user */
    orderIds: {
        type: [Number],
        required: false
    },

    /* ObjectID of the user's message thread with the business owner */
    threadId: {
        type: Number,
        required: false
    },

    /* Account profile picture */
    picture: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Client', clientSchema);