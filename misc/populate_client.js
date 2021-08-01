const mongoose = require('mongoose');
const db = require('../models/db.js');
const Client = require('../models/client-schema.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

db.connect();

bcrypt.hash("ASDFGHJKL123;", saltRounds, function (err, hash) {
	let client1 = {
		username: "shibaichi",
		password: hash,
		firstName: "Kentaro",
		middleName: "Daimyo",
		lastName: "Shiba",
		emailAddress: "kentaroshiba@gmail.com",
		contactNumber: 09176362343,
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
		contactNumber: 09176372343,
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

	db.insertMany(Client, [client1, client2], function(flag) {	
		if (flag) {
			console.log("\nDatabase population complete! Press Ctrl + C to continue.");
		}
	});
});