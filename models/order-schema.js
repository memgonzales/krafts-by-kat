/* Schema for the orders */

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    /* Order name (optional) */
    name: {
        type: String,
        required: false
    },
	
    /* Company name */
	companyName: {
		type: String,
		required: false
	},

    companyLogo: {
        type: String,
        required: false
    },

    isCompanyLogoUploaded: {
        type: String,
        required: false
    },

    /* ObjectIDs of the order items */
    orderItemIds: {
        type: [String],
        required: true
    },

    /* Delivery mode of the order */
    deliveryMode: {
        type: String,
        required: false
    },

    /* Preferred delivery date of the order */
    preferredDeliveryDate: {
        type: Date,
        required: false
    },

    /* Payment type for the order */
    paymentType: {
        type: String,
        required: false
    },

    /* Total price of the order */
    price: {
        type: Number,
        required: true
    },

    /* Status of the order */
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);