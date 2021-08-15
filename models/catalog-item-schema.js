const mongoose = require('mongoose');

const catalogItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
	
	quantity: {
		type: Number,
		required: true
	},

    description: {
        type: String,
        required: false
    },

    price: {
        type: Number,
        required: true
    },

    commentIds: {
        type: [Number],
        required: false
    },

    pictures: {
        type: [String],
        required: false
    },

    ratings: {
        type: [Number],
        required: false
    }
});

module.exports = mongoose.model('CatalogItem', catalogItemSchema);