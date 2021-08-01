const db = require('../models/db.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const Client = require('../models/client-schema.js');
const Display = require('../models/display-schema.js');

const signUpController = {
	getSignUp: function(req, res) {
		let query = {id: 0};

    	db.findOne(Display, query, '', function(result) {
			if (result) {
				let details = {
					style: 'sign-up',
					logo: result.logo,
					user: ''
				}
					
				res.render('sign-up', details);
			} else {
				console.log("Missing graphics elements");
			}
		});	
	},

	postSignUp: function(req, res) {
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
		
		if (JSON.stringify(password) === JSON.stringify(confirmPassword)) {

			bcrypt.hash(password, saltRounds, function (err, hash) {
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

				console.log(client);

				db.insertOne(Client, client, function(flag) {
					res.redirect('/');
				});
			})
		} 

		/* TODO handle error message when passwords do not match */
		else {
			console.log("Error: Passwords do not match");
			res.redirect('/signup');
		}	
    },
	
	getCheckUsername: function(req, res) {
		let username = req.query.username;
		let query = {username: username};
				
		db.findOne(Client, query, 'username', function(result) {			
			res.send(result);
		});
	}
}

module.exports = signUpController;