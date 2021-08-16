/* Javascript file for validating the user input in the sign up page */

$(document).ready(function() {
	
	/* Variables for preventing repetitive database queries */
	let isValidUsername = false;
	let isChangedUsername = false;
	let isValidEmail = false;
	let isChangedEmail = false;
	let isReachedConfirmPassword = false;
	let isSubmitButtonDisabled = false;

	/* Variables for scrolling to erroneous fields */
	let scrollToContact = true;
	let scrollToZip = true;
	let scrollToEmail = true;
	let scrollToUsername = true;
	let scrollToPassword = true;
	let scrollToConfirmPassword = true;
	
	/* Provide the email address and username of the administrator account as constants */
	const adminEmail = "krafts.by.kat.webmaster@gmail.com";
	const adminUsername = "kraftsbykatadmin";
	
	/**
	 * Checks if the user input is the same as the email address or username of the administrator account
	 * 
	 * @param value the user input
	 * @return whether the user input is the same as the email address or username of the administrator account
	 */
	function isAdminCredential(value) {
		return value == adminEmail || value == adminUsername;
	}
	
	/**
	 * Checks whether the entered contact number is valid
	 * 
	 * @param field the text field for entering the contact number
	 * @return whether the entered contact number is valid
	 */
	function isValidContactNumber(field) {

		/* Assume that the input is invalid */
		let validContactNumber = false;
		
		/* Specify restrictions for the contact number */
		let contactNumber = validator.trim($('#contact-number').val());
		let isValidLength = validator.isLength(contactNumber, {min: 7, max: 12});
		let isValidCompose = validator.matches(contactNumber, /^\d+$/);
		
		/* If the contact number is between 7 to 12 characters and contains only numeric characters, it is accepted */
		if (isValidLength && isValidCompose) {
			if (field.is($('#contact-number'))) {
				$('#contact-number-error').text('');
				$('#contact-number').css('border-color', '#CED4DA');
				$('#contact-number').css('border-width', 'thin');
			}
			
			validContactNumber = true;
			scrollToContact = false;

		/* Otherwise, an error message is displayed and the page scrolls back to the contact number text field 
		 * (if applicable)
		 */
		} else {
			if (field.is($('#contact-number'))) {
				$('#contact-number-error').text('Enter a valid contact number');
				$('#contact-number').css('border-color', '#FF0000');
				$('#contact-number').css('border-width', '2px');
			}

			scrollToContact = true;
		}

		return validContactNumber;
	}
	
	/**
	 * Checks whether the entered ZIP code is valid
	 * 
	 * @param field the text field for entering the ZIP code
	 * @return whether the entered ZIP code is valid
	 */
	function isValidZipCode(field) {

		/* Assume that the input is invalid */
		let validZipCode = false;
		
		/* Specify restrictions for the ZIP code*/
		let zipCode = validator.trim($('#zip-code').val());
		let isValidLength = validator.isLength(zipCode, {min: 3, max: 4});
		let isValidCompose = validator.matches(zipCode, /^\d+$/);
		
		/* If the input is between 3 to 4 characters and is only composed of numeric characters, it is accepted */
		if (isValidLength && isValidCompose) {
			if (field.is($('#zip-code'))) {
				$('#zip-code-error').text('');
				$('#zip-code').css('border-color', '#CED4DA');
				$('#zip-code').css('border-width', 'thin');
			}
			
			validZipCode = true;
			scrollToZip = false;

		/* Otherwise, display an error message and scroll back to the ZIP code text field (if applicable) */
		} else {
			if (field.is($('#zip-code'))) {
				$('#zip-code-error').text('Enter a valid ZIP code');
				$('#zip-code').css('border-color', '#FF0000');
				$('#zip-code').css('border-width', '2px');
			}

			scrollToZip = true;
		}

		return validZipCode;
	}
	
	/**
	 * Checks whether the entered email address is not in use
	 * 
	 * @param field the text field for entering the email address
	 * @param callback callback for querying the database for the uniqueness of the email address 
	 * @return whether the entered email address is not in use
	 */
	function isUniqueEmail(field, callback) {

		/* Use the entered email address in a database query */
		let emailAddress = validator.trim($('#create-email').val());
		let data = {emailAddress: emailAddress};
		
		$.get('/getCheckEmail', data, function(result) {

			/* If the entered email address is not yet in the database, it is accepted */
			if (result.emailAddress != emailAddress && !isAdminCredential(emailAddress)) {
				if (field.is($('#create-email'))) {
					$('#email-error').text('');
					$('#create-email').css('border-color', '#CED4DA');
					$('#create-email').css('border-width', 'thin');
				}
				
				isValidEmail = true;
				scrollToEmail = false;
				
				return callback(true);
				
			/* Otherwise, display an error message and scroll back to the email address text field 
			 * (if applicable) 
			 */
			} else {
				if (field.is($('#create-email'))) {
					$('#email-error').text('Email is already in use');
					$('#create-email').css('border-color', '#FF0000');
					$('#create-email').css('border-width', '2px');
				}
				
				isValidEmail = false;
				scrollToEmail = true;
				
				return callback(false);
			}
		});
	}
	
	/** 
	 * Checks whether the entered username is not in use 
	 * 
	 * @param field the text field for entering the username
	 * @param callback callback for querying the database for the uniqueness of the username
	 * @return whether the entered username is not in use
	 */
	function isUniqueUsername(field, callback) {
		
		/* Use the entered username in a database query */
		let username = validator.trim($('#create-username').val());
		let data = {username: username};
		
		$.get('/getCheckUsername', data, function(result) {

			/* If the entered username is not yet in the database, it is accepted */
			if (result.username != username && !isAdminCredential(username)) {
				if (field.is($('#create-username'))) {
					$('#username-error').text('');
					$('#create-username').css('border-color', '#CED4DA');
					$('#create-username').css('border-width', 'thin');
				}
				
				isValidUsername = true;
				scrollToUsername = false;
				
				return callback(true);
				
			/* Otherwise, display an error message and scroll back to the username text field (if applicable) */
			} else {
				if (field.is($('#create-username'))) {
					$('#username-error').text('Username has already been taken');
					$('#create-username').css('border-color', '#FF0000');
					$('#create-username').css('border-width', '2px');
				}
				
				isValidUsername = false;
				
				return callback(false);
			}
		});
	}
	
	/**
	 * Checks whether the entered password is valid
	 * 
	 * @param field the text field for entering the password
	 */
	function isValidPassword(field) {
		
		/* Assume that the input is invalid */
		let validPassword = false;
		
		/* Specify restrictions for the password */
		let password = validator.trim($('#create-password').val());
		let isValidLength = validator.isLength(password, {min: 8});
		let isValidCompose = validator.matches(password, /.*[0-9].*/);
		
		if (isValidLength) {
			if (isValidCompose) {

				/* If the entered password is at least 8 characters long and has at least one numeric character, 
				 * it is accepted
				 */
				if (field.is($('#create-password'))) {
					$('#password-error').text('');
					$('#create-password').css('border-color', '#CED4DA');
					$('#create-password').css('border-width', 'thin');
				}
				
				scrollToPassword = false;
				validPassword = true;

			/* If the password does not contain a numeric character, display an error message 
			 * and scroll back to the password text field (if applicable) 
			 */
			} else {
				if (field.is($('#create-password'))) {
					$('#password-error').text('Should contain at least one number');
					$('#create-password').css('border-color', '#FF0000');
					$('#create-password').css('border-width', '2px');
				}

				scrollToPassword = true;
			}
			
		/* If the password contains less than 8 characters, display an error message
		 * and scroll back to the password text field (if applicable)
		 */
		} else {
			if (field.is($('#create-password'))) {
				$('#password-error').text('Should contain at least 8 characters');
				$('#create-password').css('border-color', '#FF0000');
				$('#create-password').css('border-width', '2px');

				scrollToPassword = true;
			}
		}
		
		return validPassword;
	}
	

	/**
	 * Checks whether the entered password (for cofirmation) is valid
	 * 
	 * @param field the text field for entering the password for confirmation
	 * @return whether the entered password (for confirmation) is valid
	 */
	function isValidConfirmPassword(field) {
		
		/* Assume that the input is invalid */
		let validConfirmPassword = false;
		
		/* Retrieve the entered passwords */
		let password = validator.trim($('#create-password').val());
		let confirmPassword = validator.trim($('#confirm-pass').val());
		
		/* 
		 * Omit field.is check since client-side error must be detected even if the focus 
		 * is not on the confirm password field (for example, on the password field instead)
		 */

		 /* If the entered passwords match, the password is accepted */
		if (password == confirmPassword) {
			$('#confirm-password-error').text('');
			$('#confirm-pass').css('border-color', '#CED4DA');
			$('#confirm-pass').css('border-width', 'thin');

			validConfirmPassword = true;

			scrollToConfirmPassword = false;

		/* Otherwise, display an error message and scroll back to the confirm password text field 
		 * (if applicable)
		 */
		} else {
			if (isReachedConfirmPassword) {
				$('#confirm-password-error').text('Passwords do not match');
				$('#confirm-pass').css('border-color', '#FF0000');
				$('#confirm-pass').css('border-width', '2px');

				scrollToConfirmPassword = true;
			}
		}
		
		return validConfirmPassword;
	}
	
	/**
	 * Validates the text fields in the sign up page
	 * 
	 * @param field the text field to be validated
	 * @param fieldName the name of the text field to be validated
	 * @param error whether the text field input is invalid
	 */
	function validateField(field, fieldName, error) {
		let value = validator.trim(field.val());
		
		/* Check whether the text fields are valid */
		let validContactNumber = isValidContactNumber(field);
		let validZipCode = isValidZipCode(field);
		
		let validPassword = isValidPassword(field);
		let validConfirmPassword = isValidConfirmPassword(field);
		
		let nonAdmin = !isAdminCredential(field);
				
		/* There is a change in the email input by the user */
		if (isChangedEmail) {
			isChangedEmail = false;
			
			if (!isValidEmail) {
				isUniqueEmail(field, function(uniqueEmail) {
					if (isChangedUsername) {
						isChangedUsername = false;
						
						/* Check since it is still not a valid username */
						if (!isValidUsername) {
							isUniqueUsername(field, function(uniqueUsername) {
								if (validPassword && validConfirmPassword && uniqueUsername && validContactNumber && validZipCode && uniqueEmail && nonAdmin) {
									isSubmitButtonDisabled = false;
								} else {
									isSubmitButtonDisabled = true;
								}
							});
							
						} else {
							/* Do not check anymore since it is already a valid username */
							if (validPassword && validConfirmPassword && validContactNumber && validZipCode && uniqueEmail && nonAdmin) {
								isSubmitButtonDisabled = false;
							} else {
								isSubmitButtonDisabled = true;
							}
						}
						
					} else {
						/* There is no change in the username input by the user */
						
						/* Use the global isValidUsername for efficiency */
						if (validPassword && validConfirmPassword && isValidUsername && validContactNumber && validZipCode && uniqueEmail && nonAdmin) {
							isSubmitButtonDisabled = false;
						} else {
							isSubmitButtonDisabled = true;
						}
					}
				});
			
			/* Do not check anymore since it is already a valid email */	
			} else {
				
				/* There is a change in the username input by the user */
				if (isChangedUsername) {
					isChangedUsername = false;
					
					/* Check since it is still not a valid username */
					if (!isValidUsername) {
						isUniqueUsername(field, function(uniqueUsername) {
							if (validPassword && validConfirmPassword && uniqueUsername && validContactNumber && validZipCode && nonAdmin) {
								isSubmitButtonDisabled = false;
							} else {
								isSubmitButtonDisabled = true;
							}
						});
						
					} else {
						/* Do not check anymore since it is already a valid username */
						if (validPassword && validConfirmPassword && validContactNumber && validZipCode && nonAdmin) {
							isSubmitButtonDisabled = false;
						} else {
							isSubmitButtonDisabled = true;
						}
					}
				
				/* There is no change in the username input by the user */	
				} else {
					
					/* Use the global isValidUsername for efficiency */
					if (validPassword && validConfirmPassword && isValidUsername && validContactNumber && validZipCode && nonAdmin) {
						isSubmitButtonDisabled = false;
					} else {
						isSubmitButtonDisabled = true;
					}
				}	
			}
			
		} else {
			/* 
			 * There is no change in the username input by the user
			 * Use the global isValidEmail for efficiency 
			 */
			
			/* There is a change in the username input by the user */
			if (isChangedUsername) {
				isChangedUsername = false;
				
				/* Check since it is still not a valid username */
				if (!isValidUsername) {
					isUniqueUsername(field, function(uniqueUsername) {
						if (validPassword && validConfirmPassword && uniqueUsername && validContactNumber && validZipCode && isValidEmail && nonAdmin) {
							isSubmitButtonDisabled = false;
						} else {
							isSubmitButtonDisabled = true;
						}
					});
					
				} else {
					/* Do not check anymore since it is already a valid username */
					if (validPassword && validConfirmPassword && validContactNumber && validZipCode && isValidEmail && nonAdmin) {
						isSubmitButtonDisabled = false;
					} else {
						isSubmitButtonDisabled = true;
					}
				}
				
			} else {
				/* 
				 * There is no change in the username input by the user
				 * Use the global isValidUsername for efficiency 
				 */
				if (validPassword && validConfirmPassword && isValidUsername && validContactNumber && validZipCode && isValidEmail && nonAdmin) {
					isSubmitButtonDisabled = false;
				} else {
					isSubmitButtonDisabled = true;
				}
			}
		}
	}
	
	$('#contact-number').keyup(function() {
		validateField($('#contact-number'), '', $('#contact-number-error'));
	});
	
	$('#zip-code').keyup(function() {
		validateField($('#zip-code'), '', $('#zip-code-error'));
	});
	
	$('#create-username').keyup(function() {
		isValidUsername = false;
		isChangedUsername = true;
		
		validateField($('#create-username'), '', $('#username-error'));
	});
	
	$('#create-email').keyup(function() {
		isValidEmail = false;
		isChangedEmail = true;
		
		validateField($('#create-email'), '', $('#email-error'));
	});
	
	
	$('#create-password').keyup(function() {
		validateField($('#create-password'), '', $('#password-error'));
	});
	
	$('#confirm-pass').keyup(function() {
		isReachedConfirmPassword = true;
		
		validateField($('#confirm-pass'), '', $('#confirm-password-error'));
	});

	$('#signup-submit').on('click', function(e) {
		if (isSubmitButtonDisabled) {
			e.preventDefault();

			/* Scroll to error */
			if (scrollToContact) {
				$('html, body').animate({
					scrollTop: $('#contact-number-label').offset().top
				});
			} else if (scrollToZip) {
				$('html, body').animate({
					scrollTop: $('#zip-code-label').offset().top
				});
			} else if (scrollToEmail) {
				$('html, body').animate({
					scrollTop: $('#create-email-label').offset().top
				});
			} else if (scrollToUsername) {
				$('html, body').animate({
					scrollTop: $('#create-username-label').offset().top
				});
			} else if (scrollToPassword) {
				$('html, body').animate({
					scrollTop: $('#create-password-label').offset().top
				});
			} else if (scrollToConfirmPassword) {
				$('html, body').animate({
					scrollTop: $('#confirm-pass-label').offset().top
				});
			}
		}
	});
});