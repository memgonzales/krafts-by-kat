/* Controller for signing a user up for the web application */

/* The db file, fs file, client schema, and display schema are used for the sign up page */
const db = require('../models/db.js');
const fs = require('fs');
const Client = require('../models/client-schema.js');
const Display = require('../models/display-schema.js');

/* Bcrypt is used for password hashing */
const bcrypt = require('bcrypt');

/* Use ten salt rounds for password hashing */
const saltRounds = 10;

const signUpController = {

	/* Retrieve the sign up page */
	getSignUp: function(req, res) {

		/* Prepare a query for the display schema */
		let query = {id: 0};

		/* Retrieve the web application logo for display */
    	db.findOne(Display, query, '', function(result) {
			
			/* If the data retrieval is successful, render the sign up page with the web application logo */
			if (result) {
				fs.readFile('./public/json/ph.json', 'utf8', function (err, jsonString) {
					if (err) {
						console.log("File read failed: ", err);
					} else {
						let details = {
							style: 'sign-up',
							logo: result.logo,
							user: '',
		
							/* Only for sign up */
							ph: jsonString
						}

						res.render('sign-up', details);
					}
				});

			/* If the data retrieval is unsuccessful, display an error message */
			} else {
				console.log("Missing graphics elements");
			}
		});	
	},

	/* Submit information stored in the sign up page */
	postSignUp: function(req, res) {
		
		/* Retrieve user inputs */
		let firstName = req.body.firstName;
		let middleName = req.body.middleName;
		let surname = req.body.surname;
		let contactNumber = req.body.contactNumber;
		let region = req.body.region;
		let province = req.body.province;
		let city = req.body.city;
		let barangay = req.body.barangay;
		let zipCode = req.body.zipCode;
		let address = req.body.address;
		let email = req.body.createEmail;
		let username = req.body.createUsername;
		let password = req.body.createPassword;
		let confirmPassword = req.body.confirmPass;
		
		/* If the password and confirm password entries match, sign the user up for the web application */
		if (JSON.stringify(password) === JSON.stringify(confirmPassword)) {

			/* Hash the user's password */
			bcrypt.hash(password, saltRounds, function (err, hash) {

				/* Assign pertinent information to the client variable */
				let client = {
					username: username,
					password: hash,
					firstName: firstName,
					middleName: middleName,
					lastName: surname,
					emailAddress: email,
					contactNumber: contactNumber,
					region: region,
					province: province,
					city: city,
					barangay: barangay,
					zipCode: zipCode,
					address: address,
					orderIds: [],
					threadId: "",
					pictureFileName: ""
				}

				/* Insert the user data into the database and open a session for the user */
				db.insertOne(Client, client, function(flag) {
					req.session.username = client.username;
					res.send(200);
				});
			})
		} 

		/* If the password and confirm password do not match, display an error message */
		else {
			console.log("Error: Passwords do not match");
			res.redirect('/signup');
			res.send(403);
		}	
    },
	
	/* Verify whether the entered username is unique */
	getCheckUsername: function(req, res) {

		/* Retrieve the pertinent user input */
		let username = req.query.username;

		/* Use the user input as a query */
		let query = {username: username};
				
		/* Find the entered username in the database and return the result */
		db.findOne(Client, query, 'username', function(result) {			
			res.send(result);
		});
	},
	
	/* Verify whether the entered email address is unique */
	getCheckEmail: function(req, res) {

		/* Retrieve the pertinent user input */
		let emailAddress = req.query.emailAddress;

		/* Use the user input as a query */
		let query = {emailAddress: emailAddress};
		
		/* Find the entered email address in the database and return the result */
		db.findOne(Client, query, 'emailAddress', function(result) {			
			res.send(result);
		});
	}
}

module.exports = signUpController;