/* Schema for the catalog items */

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
		required: true
	},

    /* ObjectIDs of the order items */
    orderItemIds: [
        {
            productName: {
                type: String,
                required: true
            },

            quantity: {
                type: Number,
                required: true
            },

            packaging: {
                type: String,
                required: true
            },

            packagingColor: {
                type: String,
                required: true
            },

            packagingMessage: {
                type: String,
                required: false
            },

            itemColor: {
                type: String,
                required: true
            },

            itemText: {
                type: String,
                required: false
            },

            companyLogo: {
                type: String,
                required: true
            },

            companyLogoLocation: {
                type: [String],
                required: false
            },

            additionalInstructions: {
                type: String,
                required: false
            }
        }
    ],

    /* Delivery mode of the order */
    deliveryMode: {
        type: String,
        required: true
    },

    /* Preferred delivery date of the order */
    preferredDeliveryDate: {
        type: Date,
        required: true
    },

    /* Payment type for the order */
    paymentType: {
        type: String,
        required: true
    },

    /* Whether the order has been placed */
    orderPlaced: {
        type: Boolean,
        required: true
    },

    /* Status of the order */
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);