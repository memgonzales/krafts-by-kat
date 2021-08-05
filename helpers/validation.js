const db = require('../models/db.js');

const {check} = require('express-validator');

const Client = require('../models/client-schema.js');

const adminEmail = "krafts.by.kat.webmaster@gmail.com";
const adminUsername = "kraftsbykatadmin"

const validation = {
	signUpValidation: function() {
		let validation = [/* Check the contact number */
						  check('contactNumber', 'Enter a valid contact number').trim().isLength({min: 7, max: 12}),
						  check('contactNumber').custom(function(value) {
							  if (value.match(/^\d+$/)) {
								  return true;
							  } else {
								  throw new Error('Enter a valid contact number');
							  }
						  }),
				
						  /* Check the ZIP code */
						  check('zipCode', 'Enter a valid ZIP code').trim().isLength({min: 3, max: 4}),
						  check('zipCode').custom(function(value) {
							  if (value.match(/^\d+$/)) {
								  return true;
							  } else {
								  throw new Error('Enter a valid ZIP code');
							  }
						  }),
						
						  /* Check the username */
						  check('createUsername').custom(function(value) {
							  if (value != adminUsername) {
								  return true;
							  } else {
								  throw new Error('Username has already been taken')
							  }
						  }),
						  
						  check('createUsername').custom(function(value) {
							  return new Promise(function(resolve, reject) {
								  let query = {username: value};
								  
								  db.findOne(Client, query, 'username', function(error, result) {
									  if (error || result) {
										  reject(new Error('Username has already been taken'));
									  }
									  
									  resolve(true);
								  });
							  });
						  }),
						  
						  /* Check the email */
						  check('createEmail').custom(function(value) {
							  if (value != adminEmail) {
								  return true;
							  } else {
								  throw new Error('Email is already in use');
							  }
						  }),
						  
						  check('createEmail').custom(function(value) {
							  return new Promise(function(resolve, reject) {
								  let query = {emailAddress: value};
								  
								  db.findOne(Client, query, 'emailAddress', function(error, result) {
									  if (error || result) {
										  reject(new Error('Email is already in use'));
									  }
									  
									  resolve(true);
								  });
							  });
						  }),
						  
						  /* Check the password */
						  check('createPassword', 'Should contain at least 8 characters').trim().isLength({min: 8}),
						  check('createPassword').custom(function(value) {
							  if (value.match(/.*[0-9].*/)) {
								  return true;
							  } else {
								  throw new Error('Should contain at least one number');
							  }
						  }),
						  
						  /* Check the confirm password */
						  check('confirmPass').custom(function(value, {req}) {
							  if (value == req.body.createPassword) {
								  return true;
							  } else {
								  throw new Error('Passwords do not match');
							  }
						  })];
		
		return validation;
	}
}

module.exports = validation;