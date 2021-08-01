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
		contactNumber: "09176362343",
		deliveryAddress: "932 Cong. A. Francisco St., Paco, Manila",
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
		deliveryAddress: "937 Cong. A. Francisco St., Binondo, Manila",
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