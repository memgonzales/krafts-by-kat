/* Script for populating the database with dummy customer accounts */

/* Mongoose is used for database functions */
const mongoose = require('mongoose');

/* The db file and client schema are used to manipulate the customer accounts on the database */
const db = require('../models/db.js');
const Client = require('../models/client-schema.js');

/* Bcrypt is used for password hashing */
const bcrypt = require('bcrypt');

/* Ten salt rounds are used for password hashing */
const saltRounds = 10;

/* Establish a connection to the database */
db.connect();

/* Add two dummy customer accounts to the database with the same password (ASDFGHJKL123;) */
bcrypt.hash("ASDFGHJKL123;", saltRounds, function (err, hash) {
	/* Initialize customer account details */
	let client1 = {
		username: "shibaichi",
		password: hash,
		firstName: "Kentaro",
		middleName: "Daimyo",
		lastName: "Shiba",
		emailAddress: "kentaroshiba@gmail.com",
		contactNumber: "09176362343",
		region: "NCR - National Capital Region",
		province: "Metro Manila",
		city: "Manila",
		barangay: "726",
		zipCode: "1004",
		address: "928 Cong. A. Francisco St.",
		orderIds: [],
		threadId: "",
		picture: ""
	};

	let client2 = {
		username: "akitani",
		password: hash,
		firstName: "Natsuki",
		middleName: "Ookami",
		lastName: "Akita",
		emailAddress: "wolfdog@gmail.com",
		contactNumber: "09176372343",
		region: "IVA - CALABARZON",
		province: "Cavite",
		city: "Bacoor",
		barangay: "Molino VI",
		zipCode: "1005",
		address: "109 Burgos St., Ayala Southvale Sonera",
		orderIds: [],
		threadId: "",
		picture: ""
	};

	/* Insert initialized accounts into the database */
	db.insertMany(Client, [client1, client2], function(flag) {	
		if (flag) {
			console.log("\nDatabase population complete! Press Ctrl + C to continue.");
		}
	});
});