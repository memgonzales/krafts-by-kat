const mongoose = require('mongoose');

const businessOwnerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
	
	password : {
		type: String,
		required: true
	},

    emailAddress: {
        type: String,
        required: true
    },

    contactNumber: {
        type: Number,
        required: true
    },

    threadIds: {
        type: [String],
        required: false
    },

    picture: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('BusinessOwner', businessOwnerSchema);