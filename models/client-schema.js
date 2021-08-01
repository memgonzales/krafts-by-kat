var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
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

    deliveryAddress: {
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

    pictureFileName: {
        type: String,
        required: false
    }
});

/*
    exports a mongoose.model object based on `ClientSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `clients` -> plural of the argument `Client`
*/
module.exports = mongoose.model('Client', ClientSchema);
