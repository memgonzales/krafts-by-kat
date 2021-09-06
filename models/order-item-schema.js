/* Schema for the order items */

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    /* Order name (optional) */

        /* Name of the product */
        productName: {
            type: String,
            required: true
        },

        /* Quantity to be ordered */
        quantity: {
            type: Number,
            required: true
        },

        /* Type of packaging */
        packaging: {
            type: String,
            required: false
        },

        /* Color of packaging */
        packagingColor: {
            type: String,
            required: false
        },

        /* Message to be included on packaging */
        packagingMessage: {
            type: String,
            required: false
        },

        /* Color of the product */
        itemColor: {
            type: String,
            required: false
        },

        /* Text to be printed on the product */
        itemText: {
            type: String,
            required: false
        },

        /* Whether the company logo of the customer is to be printed on the product */
        includeCompanyLogo: {
            type: Boolean,
            required: true
        },

        /* File path of the company logo (if a company logo is to be printed on the product) */
        companyLogoImage: {
            type: String,
            required: false
        },

        /* Items on which the company logo is to be placed (i.e. the product itself or the packaging) */
        companyLogoLocation: {
            type: [String],
            required: false
        },

        /* Additional requests or instructions the customer wishes to include */
        additionalInstructions: {
            type: String,
            required: false
        },

        /* Total price for the order item (i.e. unit price multiplied by quantity) */
        orderItemPrice: {
            type: Number,
            required: true
        }
});

module.exports = mongoose.model('OrderItem', orderItemSchema);