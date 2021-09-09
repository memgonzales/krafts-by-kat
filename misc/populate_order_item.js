/* Script for populating the database with dummy order items */

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

/* The db file and order item schema are used to manipulate the order items on the database */
const db = require('../models/db.js');
const OrderItem = require('../models/order-item-schema.js');

/* Establish a connection to the database */
db.connect();

/* Add one dummy order item to the database */

let orderItem = {
    productName: "Sample Product",
    quantity: 5,
    packaging: "Silk Pouch",
    packagingColor: "Navy Blue",
    packagingMessage: "Happy anniversary! From Uber",
    itemColor: "White",
    itemText: "Happy anniversary! From Uber",
    includeCompanyLogo: false,
    companyLogoImage: "",
    companyLogoLocation: ["Packaging"],
    additionalInstructions: "",
    price: 50,
    orderItemPrice: 250
};

/* Insert initialized accounts into the database */
db.insertOne(OrderItem, orderItem, function(flag) {	
    if (flag != false) {
        console.log("\nDatabase population complete! Press Ctrl + C to continue.");
    }
});