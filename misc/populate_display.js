/* Script for populating the database with a dummy logo */

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

/* The db file and display schema are used to manipulate the logos on the database */
const db = require('../models/db.js');
const Display = require('../models/display-schema.js');

/* Establish a connection to the database */
db.connect();

/* Initialize a dummy logo */
let display1 = {
	id: 0,
	logo: "lorem_ipsum"
};

/* Insert initialized logo into the database */
db.insertOne(Display, display1, function(flag) {
	if (flag) {
		console.log("\nDisplay database population complete! Press Ctrl + C to continue.");
	}
})