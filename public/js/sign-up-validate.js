/* JavaScript file for validating the user input in the sign up page */

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
		let isValidCompose = validator.matches(password, /^(?=.*[a-zA-Z])(?=.*[0-9])/);
		
		if (isValidLength) {
			if (isValidCompose) {

				/* If the entered password is at least 8 characters long and has at least one numeric and literal 
				 * character, it is accepted
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
					$('#password-error').text('Should contain at least one number and at least one letter');
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
	 * @param error the container of the error message
	 */
	function validateField(field, error) {
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

	function isEmptyFirstName() {
		/* If the first name text field is left empty, an error message is displayed */
		if ($('#firstname').val().trim() == '') {		
			$('#firstname-error').text('Required');
			$('#firstname').css('border-color', '#FF0000');
			$('#firstname').css('border-width', '2px');
			return true;
		}

		/* Otherwise, the entered first name is accepted */
		$('#firstname-error').text('');
		$('#firstname').css('border-color', '#CED4DA');
		$('#firstname').css('border-width', 'thin');
		return false;
	}

	function isEmptySurname() {
		/* If the surname text field is left empty, an error message is displayed */
		if ($('#surname').val().trim() == '') {
			$('#surname-error').text('Required');
			$('#surname').css('border-color', '#FF0000');
			$('#surname').css('border-width', '2px');
			return true;
		}

		/* Otherwise, the entered surname is accepted */
		$('#surname-error').text('');
		$('#surname').css('border-color', '#CED4DA');
		$('#surname').css('border-width', 'thin');
		return false;
	}

	function isEmptyContact() {
		/* If the contact number text field is left empty, an error message is displayed */
		if ($('#contact-number').val().trim() == '') {
			$('#contact-number-error').text('Required');
			$('#contact-number').css('border-color', '#FF0000');
			$('#contact-number').css('border-width', '2px');
			return true;
		}

		/* Otherwise, the entered contact number is accepted */
		$('#contact-number-error').text('');
		$('#contact-number').css('border-color', '#CED4DA');
		$('#contact-number').css('border-width', 'thin');
		return false;
	}

	function isEmptyRegion() {
		/* If the region selection field is left empty, an error message is displayed */
		if ($('#region').find(':selected').text() == '') {
			$('#region-error').text('Required');
			$('#region').css('border-color', '#FF0000');
			$('#region').css('border-width', '2px');
			return true;
		}

		/* Otherwise, the entered region is accepted */
		$('#region-error').text('');
		$('#region').css('border-color', '#CED4DA');
		$('#region').css('border-width', 'thin');
		return false;
	}

	function isEmptyProvince() {
		/* If the region selection field is left empty, an error message is displayed */
		if ($('#province').find(':selected').text() == '') {
			$('#province-error').text('Required');
			$('#province').css('border-color', '#FF0000');
			$('#province').css('border-width', '2px');
			return true;
		}

		/* Otherwise, the entered province is accepted */
		$('#province-error').text('');
		$('#province').css('border-color', '#CED4DA');
		$('#province').css('border-width', 'thin');
		return false;
	}

	function isEmptyCity() {
		/* If the city selection field is left empty, an error message is displayed */
		if ($('#city').find(':selected').text() == '') {
			$('#city-error').text('Required');
			$('#city').css('border-color', '#FF0000');
			$('#city').css('border-width', '2px');
			return true;
		}

		/* Otherwise, the entered city is accepted */
		$('#city-error').text('');
		$('#city').css('border-color', '#CED4DA');
		$('#city').css('border-width', 'thin');
		return false;
	}

	/**
	 * Checks if the user has placed any input on the field for barangay
	 * 
	 * @return true if the user has not placed any input on the field for barangay; false, otherwise
	 */
	function isEmptyBarangay() {
		/* If the barangay selection field is left empty, an error message is displayed */
		if ($('#barangay').find(':selected').text() == '') {
			$('#barangay-error').text('Required');
			$('#barangay').css('border-color', '#FF0000');
			$('#barangay').css('border-width', '2px');
			return true;
		}

		/* Otherwise, the entered barangay is accepted */
		$('#barangay-error').text('');
		$('#barangay').css('border-color', '#CED4DA');
		$('#barangay').css('border-width', 'thin');
		return false;
	}

	
	function isEmptyZipCode() {
		/* If the ZIP code text field is left empty, an error message is displayed */
		if ($('#zip-code').val().trim() == '') {
			$('#zip-code-error').text('Required');
			$('#zip-code').css('border-color', '#FF0000');
			$('#zip-code').css('border-width', '2px');
			return true;
		}

		/* Otherwise, the entered ZIP code is accepted */
		$('#zip-code-error').text('');
		$('#zip-code').css('border-color', '#CED4DA');
		$('#zip-code').css('border-width', 'thin');
		return false;
	}

	function isEmptyAddress() {
		/* If the address text field is left empty, an error message is displayed */
		if ($('#address').val().trim() == '') {
			$('#address-error').text('Required');
			$('#address').css('border-color', '#FF0000');
			$('#address').css('border-width', '2px');
			return true;
		}

		/* Otherwise, the entered address is accepted */
		$('#address-error').text('');
		$('#address').css('border-color', '#CED4DA');
		$('#address').css('border-width', 'thin');
		return false;
	}

	function isEmptyEmail() {
		/* If the email text field is left empty, an error message is displayed */
		if ($('#create-email').val().trim() == '') {
			$('#email-error').text('Required');
			$('#create-email').css('border-color', '#FF0000');
			$('#create-email').css('border-width', '2px');
			return true;
		}

		/* Otherwise, the entered email is accepted */
		$('#email-error').text('');
		$('#create-email').css('border-color', '#CED4DA');
		$('#create-email').css('border-width', 'thin');
		return false;
	}

	function isEmptyUsername() {
		/* If the username text field is left empty, an error message is displayed */
		if ($('#create-username').val().trim() == '') {
			$('#username-error').text('Required');
			$('#create-username').css('border-color', '#FF0000');
			$('#create-username').css('border-width', '2px');
			return true;
		}

		/* Otherwise, the entered username is accepted */
		$('#username-error').text('');
		$('#create-username').css('border-color', '#CED4DA');
		$('#create-username').css('border-width', 'thin');
		return false;
	}

	function isEmptyPassword() {
		/* If the password text field is left empty, an error message is displayed */
		if ($('#create-password').val().trim() == '') {
			$('#password-error').text('Required');
			$('#create-password').css('border-color', '#FF0000');
			$('#create-password').css('border-width', '2px');
			return true;
		}

		/* Otherwise, the entered password is accepted */
		$('#password-error').text('');
		$('#create-password').css('border-color', '#CED4DA');
		$('#create-password').css('border-width', 'thin');
		return false;
	}

	function isEmptyRepeatPassword() {
		/* If the confirm password text field is left empty, an error message is displayed */
		if ($('#confirm-pass').val().trim() == '') {
			$('#confirm-password-error').text('Required');
			$('#confirm-pass').css('border-color', '#FF0000');
			$('#confirm-pass').css('border-width', '2px');
			return true;
		}

		/* Otherwise, the entered confirm password is accepted */
		$('#confirm-password-error').text('');
		$('#confirm-pass').css('border-color', '#CED4DA');
		$('#confirm-pass').css('border-width', 'thin');
		return false;
	}

	/* Validate the contact number for every key press */
	$('#contact-number').keyup(function() {
		validateField($('#contact-number'), $('#contact-number-error'));
	});
	
	/* Validate the ZIP code for every key press */
	$('#zip-code').keyup(function() {
		validateField($('#zip-code'), $('#zip-code-error'));
	});
	
	/* Validate the username for every key press */
	$('#create-username').keyup(function() {
		isValidUsername = false;
		isChangedUsername = true;
		
		validateField($('#create-username'), $('#username-error'));
	});
	
	/* Validate the email address for every key press */
	$('#create-email').keyup(function() {
		isValidEmail = false;
		isChangedEmail = true;
		
		validateField($('#create-email'), $('#email-error'));
	});
	
	/* Validate the password for every key press */
	$('#create-password').keyup(function() {
		validateField($('#create-password'), $('#password-error'));
	});
	
	/* Validate the password for confirmation for every key press */
	$('#confirm-pass').keyup(function() {
		isReachedConfirmPassword = true;
		
		validateField($('#confirm-pass'), $('#confirm-password-error'));
	});

	/* Scroll to the text field with an erroneous input if applicable */
	$('#signup-submit').on('click', function(e) {
		if (isEmptyFirstName()) {
			$('html, body').animate({
				scrollTop: $('#firstname-label').offset().top
			});

		} else if (isEmptySurname()) {
			$('html, body').animate({
				scrollTop: $('#surname-label').offset().top
			});
 
		} else if (isEmptyContact()) {
			$('html, body').animate({
				scrollTop: $('#contact-number-label').offset().top
			});

		} else if (scrollToContact) {
			$('html, body').animate({
				scrollTop: $('#contact-number-label').offset().top
			});

			$('#contact-number-error').text('Enter a valid contact number');
			$('#contact-number').css('border-color', '#FF0000');
			$('#contact-number').css('border-width', '2px');

		} else if (isEmptyRegion()) {
			$('html, body').animate({
				scrollTop: $('#region-label').offset().top
			});

		} else if (isEmptyProvince()) {
			$('html, body').animate({
				scrollTop: $('#province-label').offset().top
			});

		} else if (isEmptyCity()) {
			$('html, body').animate({
				scrollTop: $('#city-label').offset().top
			});

		} else if (isEmptyBarangay()) {
			$('html, body').animate({
				scrollTop: $('#barangay-label').offset().top
			});

		} else if (isEmptyZipCode()) {
			$('html, body').animate({
				scrollTop: $('#zip-code-label').offset().top
			});

		} else if (scrollToZip) {
			$('html, body').animate({
				scrollTop: $('#zip-code-label').offset().top
			});

			$('#zip-code-error').text('Enter a valid ZIP code');
			$('#zip-code').css('border-color', '#FF0000');
			$('#zip-code').css('border-width', '2px');

		} else if (isEmptyAddress()) {
			$('html, body').animate({
				scrollTop: $('#address-label').offset().top
			});

		} else if (isEmptyEmail()) {
			$('html, body').animate({
				scrollTop: $('#create-email-label').offset().top
			});

		} else if (scrollToEmail) {
			$('html, body').animate({
				scrollTop: $('#create-email-label').offset().top
			});

			$('#email-error').text('Email is already in use');
			$('#create-email').css('border-color', '#FF0000');
			$('#create-email').css('border-width', '2px');

		} else if (isEmptyUsername()) {
			$('html, body').animate({
				scrollTop: $('#create-username-label').offset().top
			});

		} else if (scrollToUsername) {
			$('html, body').animate({
				scrollTop: $('#create-username-label').offset().top
			});

			$('#username-error').text('Username has already been taken');
			$('#create-username').css('border-color', '#FF0000');
			$('#create-username').css('border-width', '2px');

		} else if (isEmptyPassword()) {
			$('html, body').animate({
				scrollTop: $('#create-password-label').offset().top
			});

		} else if (scrollToPassword) {
			$('html, body').animate({
				scrollTop: $('#create-password-label').offset().top
			});

			if ($('#create-password').val().length < 8) {
				$('#password-error').text('Should contain at least 8 characters');
				$('#create-password').css('border-color', '#FF0000');
				$('#create-password').css('border-width', '2px');

			} else {
				$('#password-error').text('Should contain at least one number and at least one letter');
				$('#create-password').css('border-color', '#FF0000');
				$('#create-password').css('border-width', '2px');
			}

		} else if (isEmptyRepeatPassword()) {
			$('html, body').animate({
				scrollTop: $('#confirm-pass-label').offset().top
			});

		} else if (scrollToConfirmPassword) {
			$('html, body').animate({
				scrollTop: $('#confirm-pass-label').offset().top
			});
			
			$('#confirm-password-error').text('Passwords do not match');
			$('#confirm-pass').css('border-color', '#FF0000');
			$('#confirm-pass').css('border-width', '2px');
		}
 
		/* Necessary to carry out client-side validation */
		if (isSubmitButtonDisabled) {
			e.preventDefault();
		} 
		
		// else {
		// 	window.onbeforeunload = null;
		// }
	});
});