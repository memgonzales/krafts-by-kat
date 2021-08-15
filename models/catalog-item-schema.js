const mongoose = require('mongoose');

/* Schema for the catalog items */
const catalogItemSchema = new mongoose.Schema({
    /* Item name */
    name: {
        type: String,
        required: true
    },
	
    /* Item quantity */
	quantity: {
		type: Number,
		required: true
	},

    /* Item description (optional) */
    description: {
        type: String,
        required: false
    },

    /* Item price */
    price: {
        type: Number,
        required: true
    },

    /* ObjectIDs of customer comments regarding the item */
    commentIds: {
        type: [Number],
        required: false
    },

    /* Images of the item (optional) */
    pictures: {
        type: [String],
        required: false
    },

    /* Customer ratings of the item */
    ratings: {
        type: [Number],
        required: false
    },

    /* Number of units sold of the item */
    numberSold: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('CatalogItem', catalogItemSchema);