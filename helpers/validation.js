/* Object for performing validations on the sign up page */

/* The db file, client schema, and express validator are used for the validatio object */
const db = require('../models/db.js');
const Client = require('../models/client-schema.js');
const {check} = require('express-validator');

/* The email address and username of the administrator account are included as constants */
const adminEmail = "krafts.by.kat.webmaster@gmail.com";
const adminUsername = "kraftsbykatadmin"

const validation = {

	/**
	 * Performs validations on the sign up page
	 * 
	 * @return whether the input on a sign up text field is valid 
	 */
	signUpValidation: function() {
		let validation = [/* Check for empty fields */
						  check('firstName', 'Required').trim().notEmpty(),
						  check('surname', 'Required').trim().notEmpty(),
						  check('contactNumber', 'Required').trim().notEmpty(),
						  check('region', 'Required').trim().notEmpty(),
						  check('province', 'Required').trim().notEmpty(),
						  check('city', 'Required').trim().notEmpty(),
						  check('barangay', 'Required').trim().notEmpty(),
						  check('zipCode', 'Required').trim().notEmpty(),
						  check('address', 'Required').trim().notEmpty(),
						  check('createEmail', 'Required').trim().notEmpty(),
						  check('createUsername', 'Required').trim().notEmpty(),

						  /* Do not trim the passwords */
						  check('createPassword', 'Required').notEmpty(),
						  check('confirmPass', 'Required').notEmpty(),

						  /* Check the contact number */
						  
						  /* Limit the contact number to 7 to 12 digits */
						  check('contactNumber', 'Enter a valid contact number').trim().isLength({min: 7, max: 12}),
						  check('contactNumber').custom(function(value) {
							 
							  /* If the input does not contain non-numeric characters, it is valid */
							  if (value.trim().match(/^\d+$/)) {
								  return true;

							  /* Otherwise, display an error message */
							  } else {
								  throw new Error('Enter a valid contact number');
							  }
						  }),
				
						  /* Check the ZIP code */

						  /* Limit the ZIP code to 3 to 4 digits */
						  check('zipCode', 'Enter a valid ZIP code').trim().isLength({min: 3, max: 4}),
						  check('zipCode').custom(function(value) {

						  	  /* If the input does not contain non-numeric characters, it is valid */
							  if (value.trim().match(/^\d+$/)) {
								  return true;

							  /* Otherwise, display an error message */
							  } else {
								  throw new Error('Enter a valid ZIP code');
							  }
						  }),
						
						  /* Check the username */
						  check('createUsername').custom(function(value) {
							  
							  /* If the input is not the same as the username for the administrator account, 
							   * it is valid
							   */
							  if (value.trim().toLowerCase() != adminUsername) {
								  return true;

							  /* Otherwise, display an error message */
							  } else {
								  throw new Error('Username has already been taken')
							  }
						  }),
						  
						  check('createUsername').custom(function(value) {
							  
							  /* Accept usernames that are not already in use (i.e., in the database) */
							  return new Promise(function(resolve, reject) {
								  let query = {username: value.trim().toLowerCase()};
								  
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
							  
							  /* If the input is not the same as the email address of the administrator account,
							   * it is valid
							   */
							  if (value.trim().toLowerCase() != adminEmail) {
								  return true;

							  /* Otherwise, display an error message */
							  } else {
								  throw new Error('Email is already in use');
							  }
						  }),
						  
						  check('createEmail').custom(function(value) {
							  
							  /* Accept email addresses that are not already in use (i.e., in the database) */
							  return new Promise(function(resolve, reject) {
								  let query = {emailAddress: value.trim().toLowerCase()};
								  
								  db.findOne(Client, query, 'emailAddress', function(error, result) {
									  if (error || result) {
										  reject(new Error('Email is already in use'));
									  }
									  
									  resolve(true);
								  });
							  });
						  }),
						  
						  /* Check the password */

						  /* 
						   * Check that the password contains at least 8 characters.
						   * Do not trim the password.
						   */
						  check('createPassword', 'Should contain at least 8 characters').isLength({min: 8}),
						  check('createPassword').custom(function(value) {
							  
							  /* If the password contains at least one numeric and literal character, it is accepted */
							  if (value.match(/^(?=.*[a-zA-Z])(?=.*[0-9])/)) {
								  return true;

						      /* Otherwise, display an error message */
							  } else {
								  throw new Error('Should contain at least one number and at least one letter');
							  }
						  }),
						  
						  /* Check the confirm password */
						  check('confirmPass').custom(function(value, {req}) {
							  
						  	  /*
							   * If the text field has the same input as the password text field, it is accepted.
							   * Do not trim the password.
							   */
							  if (value == req.body.createPassword) {
								  return true;

							  /* Otherwise, display an error message */
							  } else {
								  throw new Error('Passwords do not match');
							  }
						  })];
		
		return validation;
	}
}

module.exports = validation;