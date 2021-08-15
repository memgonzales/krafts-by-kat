/* Script for populating the database with an administrator account to be used by the business owner */

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

/* The db file and business owner schema are used to manipulate the administrator account on the database */
const db = require('../models/db.js');
const BusinessOwner = require('../models/business-owner-schema.js');

/* Bcrypt is used for password hashing */
const bcrypt = require('bcrypt');

/* Ten salt rounds are used for password hashing */
const saltRounds = 10;

/* Establish a connection to the database */
db.connect();

/* Add an administrator account to the database with the password ASDFGHJKL123; */
bcrypt.hash("ASDFGHJKL123;", saltRounds, function (err, hash) {
	/* Initialize administrator account details */
	let businessOwner1 = {
		username: "kraftsbykatadmin",
		password: hash,
		emailAddress: "krafts.by.kat.webmaster@gmail.com",
		contactNumber: 09174001813,
		threadIds: [],
		picture: ""
	};

	/* Insert initialized administrator account into the database */
	db.insertOne(BusinessOwner, businessOwner1, function(flag) {	
		if (flag) {
			console.log("\nDatabase population complete! Press Ctrl + C to continue.");
		}
	});
});