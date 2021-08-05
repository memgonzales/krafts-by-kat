const mongoose = require('mongoose');
const db = require('../models/db.js');
const BusinessOwner = require('../models/business-owner-schema.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

db.connect();

bcrypt.hash("ASDFGHJKL123;", saltRounds, function (err, hash) {
	let businessOwner1 = {
		username: "kraftsbykatadmin",
		password: hash,
		emailAddress: "krafts.by.kat.webmaster@gmail.com",
		contactNumber: 09174001813,
		threadIds: [],
		picture: ""
	};

	db.insertMany(BusinessOwner, [businessOwner1], function(flag) {	
		if (flag) {
			console.log("\nDatabase population complete! Press Ctrl + C to continue.");
		}
	});
});