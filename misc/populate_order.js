/* Script for populating the database with dummy orders */

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

/* The db file and order schema are used to manipulate the orders on the database */
const db = require('../models/db.js');
const Order = require('../models/order-schema.js');

/* Establish a connection to the database */
db.connect();

/* Add one dummy order item to the database */

let order = {
    name: "Company Giveaway",
    companyName: "Uber",
    orderItemIds: ["6135da5f2adfe11914f19186"],
    deliveryMode: "Courier",
    preferredDeliveryDate: Date.now(),
    paymentType: "Gcash",
    price: 500,
    status: "Accepted"
};

/* Insert initialized accounts into the database */
db.insertOne(Order, order, function(flag) {	
    if (flag != false) {
        console.log("\nDatabase population complete! Press Ctrl + C to continue.");
    }
});