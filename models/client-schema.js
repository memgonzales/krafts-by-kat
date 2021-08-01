const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
	
	password : {
		type: String,
		required: true
	},

    firstName: {
        type: String,
        required: true
    },

    middleName: {
        type: String,
        required: false
    },

    lastName: {
        type: String,
        required: true
    },

    emailAddress: {
        type: String,
        required: true
    },

    contactNumber: {
        type: String,
        required: true
    },

    region: {
        type: String,
        required: true
    },

    province: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    barangay: {
        type: String,
        required: true
    },

    zipCode: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    orderIds: {
        type: [Number],
        required: false
    },

    threadId: {
        type: Number,
        required: false
    },

    picture: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Client', clientSchema);