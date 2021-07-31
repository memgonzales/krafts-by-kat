const mongoose = require('mongoose');
const db = require('../models/db.js');
const Display = require('../models/display-schema.js');

db.connect();

let display1 = {
	id: 0,
	logo: "lorem_ipsum"
};

db.insertOne(Display, display1, function(flag) {
	if (flag) {
		console.log("\nDisplay database population complete! Press Ctrl + C to continue.");
	}
})