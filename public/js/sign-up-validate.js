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

	/**
	 * Checks if the user input is the same as the email address or username of the administrator account
	 * 
	 * @param value the user input
	 * @return whether the user input is the same as the email address or username of the administrator account
	 */
	function isAdminCredential(value) {
		/* Provide the email address and username of the administrator account as constants */
		const adminEmail = "krafts.by.kat.webmaster@gmail.com";
		const adminUsername = "kraftsbykatadmin";

		return value.toString().toLowerCase() == adminEmail || value.toString().toLowerCase() == adminUsername;
	}
	
	/**
	 * Checks whether the entered contact number is valid
	 * 
	 * @param field the text field for entering the contact number
	 * @return true if the entered contact number is valid; false, otherwise
	 */
	function isValidContactNumber(field) {
		let contactNumber = validator.trim($('#contact-number').val());
		return isValidContactNumberText(field, contactNumber);
	}

	/**
	 * Implements the algorithm to check whether the entered contact number is valid
	 * 
	 * @param field the text field for entering the contact number
	 * @param contactNumber the contact number entered by the user
	 * @return true if the entered contact number is valid; false, otherwise
	 */
	function isValidContactNumberText(field, contactNumber) {
		/* Assume that the input is invalid */
		let validContactNumber = false;
		
		/* Specify restrictions for the contact number */
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
	 * @return true if the entered ZIP code is valid; false, otherwise
	 */
	function isValidZipCode(field) {
		let zipCode = validator.trim($('#zip-code').val());
		return isValidZipCodeText(field, zipCode);
	}

	/**
	 * Implements the algorithm to check whether the entered ZIP code is valid
	 * 
	 * @param field the text field for entering the ZIP code
	 * @param zipCode the ZIP code entered by the user
	 * @return true if the entered ZIP code is valid; false, otherwise
	 */
	function isValidZipCodeText(field, zipCode) {
		/* Assume that the input is invalid */
		let validZipCode = false;
		
		/* Specify restrictions for the ZIP code*/
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
	 * @return true if the entered email address is not in use; false, otherwise
	 */
	function isUniqueEmail(field, callback) {

		/* Use the entered email address in a database query */
		let emailAddress = validator.trim($('#create-email').val().toLowerCase());
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
	 * @return true if the entered username is not in use; false, otherwise
	 */
	function isUniqueUsername(field, callback) {
		
		/* Use the entered username in a database query */
		let username = validator.trim($('#create-username').val().toLowerCase());
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
				scrollToUsername = true;
				
				return callback(false);
			}
		});
	}
	
	/**
	 * Checks whether the entered password is valid
	 * 
	 * @param field the text field for entering the password
	 * @return true if the entered password is valid; false, otherwise
	 */
	function isValidPassword(field) {
		/* Retrieve the entered password, and do not trim */
		let password = $('#create-password').val();
		return isValidPasswordText(field, password);
	}
		
	/**
	 * Implements the algorithm to check whether the entered password is valid
	 * 
	 * @param field the text field for entering the password
	 * @param password the password entered by the user
	 * @return true if the entered password is valid; false, otherwise
	 */
	function isValidPasswordText(field, password) {
		/* Assume that the input is invalid */
		let validPassword = false;
		
		/* Specify restrictions for the password */
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
	 * @return true if the entered password (for confirmation) is valid; false, otherwise
	 */
	function isValidConfirmPassword(field) {
		/* Retrieve the entered passwords, and do not trim */
		let password = $('#create-password').val();
		let confirmPassword = $('#confirm-pass').val();
		
		return isValidConfirmPasswordText(field, password, confirmPassword);
	}

	/**
	 * Implements the algorithm to check whether the entered password (for confirmation) is valid
	 * 
	 * @param field the text field for entering the password (for confirmation)
	 * @param confirmPassword the password (for confirmation) entered by the user
	 * @return true if the entered password (for confirmation) is valid; false, otherwise
	 */
	function isValidConfirmPasswordText(field, password, confirmPassword) {
		/* Assume that the input is invalid */
		let validConfirmPassword = false;
		
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

	/**
	 * Checks whether the first name text field is empty
	 * 
	 * @return true if the first name text field is empty; false, otherwise
	 */
	function isEmptyFirstName() {
		return isEmptyFirstNameText($('#firstname').val().trim());
	}

	/**
	 * Implements the algorithm to check whether the first name text field is empty
	 * 
	 * @param str the contents of the first name text field
	 * @return true if the first name text field is empty; false, otherwise
	 */
	function isEmptyFirstNameText(str) {
		/* If the first name text field is left empty, an error message is displayed */
		if (str == '') {		
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

	/**
	 * Checks whether the last name text field is empty
	 * 
	 * @return true if the last name text field is empty; false, otherwise
	 */
	function isEmptySurname() {
		return isEmptySurnameText($('#surname').val().trim());
	}

	/**
	 * Implements the algorithm to check whether the last name text field is empty
	 * 
	 * @param str the contents of the last name text field
	 * @return true if the last name text field is empty; false, otherwise
	 */
	function isEmptySurnameText(str) {
		/* If the surname text field is left empty, an error message is displayed */
		if (str == '') {
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

	/**
	 * Checks whether the contact number text field is empty
	 * 
	 * @return true if the contact number text field is empty; false, otherwise
	 */
	function isEmptyContact() {
		return isEmptyContactText($('#contact-number').val().trim());
	}

	/**
	 * Implements the algorithm to check whether the contact number text field is empty
	 * 
	 * @param str the contents of the contact number text field
	 * @return true if the contact number text field is empty; false, otherwise
	 */
	function isEmptyContactText(str) {
		/* If the contact number text field is left empty, an error message is displayed */
		if (str == '') {
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

	/**
	 * Checks whether the region selection field is empty
	 * 
	 * @return true if the region selection field is empty; false, otherwise
	 */
	function isEmptyRegion() {
		return isEmptyRegionText($('#region').find(':selected').text());
	}

	/**
	 * Implements the algorithm to check whether the region selection field is empty
	 * 
	 * @param str the contents of the region selection field
	 * @return true if the region selection field is empty; false, otherwise
	 */
	function isEmptyRegionText(str) {
		/* If the region selection field is left empty, an error message is displayed */
		if (str == '') {
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

	/**
	 * Checks whether the province selection field is empty
	 * 
	 * @return true if the province selection field is empty; false, otherwise
	 */
	function isEmptyProvince() {
		return isEmptyProvinceText($('#province').find(':selected').text());
	}

	/**
	 * Implements the algorithm to check whether the province selection field is empty
	 * 
	 * @param str the contents of the province selection field
	 * @return true if the province selection field is empty; false, otherwise
	 */
	function isEmptyProvinceText(str) {
		/* If the province selection field is left empty, an error message is displayed */
		if (str == '') {
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

	/**
	 * Checks whether the city selection field is empty
	 * 
	 * @return true if the city selection field is empty; false, otherwise
	 */
	function isEmptyCity() {
		return isEmptyCityText($('#city').find(':selected').text());
	}

	/**
	 * Implements the algorithm to check whether the city selection field is empty
	 * 
	 * @param str the contents of the city selection field
	 * @return true if the city selection field is empty; false, otherwise
	 */
	function isEmptyCityText(str) {
		/* If the city selection field is left empty, an error message is displayed */
		if (str == '') {
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
	 * Checks whether the barangay selection field is empty
	 * 
	 * @return true if the barangay selection field is empty; false, otherwise
	 */
	function isEmptyBarangay() {
		return isEmptyBarangayText($('#barangay').find(':selected').text());
	}

	/**
	 * Implements the algorithm to check whether the barangay selection field is empty
	 * 
	 * @param str the contents of the barangay selection field
	 * @return true if the barangay selection field is empty; false, otherwise
	 */
	function isEmptyBarangayText(str) {
		/* If the barangay selection field is left empty, an error message is displayed */
		if (str == '') {
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

	/**
	 * Checks whether the ZIP code text field is empty
	 * 
	 * @return true if the ZIP code text field is empty; false, otherwise
	 */	
	function isEmptyZipCode() {
		return isEmptyZipCodeText($('#zip-code').val().trim());
	}

	/**
	 * Implements the algorithm to check whether the ZIP code text field is empty
	 * 
	 * @param str the contents of the ZIP code text field
	 * @return true if the ZIP code text field is empty; false, otherwise
	 */
	function isEmptyZipCodeText(str) {
		/* If the ZIP code text field is left empty, an error message is displayed */
		if (str == '') {
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

	/**
	 * Checks whether the address text field is empty
	 * 
	 * @return true if the address text field is empty; false, otherwise
	 */	
	function isEmptyAddress() {
		return isEmptyAddressText($('#address').val().trim());
	}

	/**
	 * Implements the algorithm to check whether the address text field is empty
	 * 
	 * @param str the contents of the address text field
	 * @return true if the address text field is empty; false, otherwise
	 */
	function isEmptyAddressText(str) {
		/* If the address text field is left empty, an error message is displayed */
		if (str == '') {
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

	/**
	 * Checks whether the email text field is empty
	 * 
	 * @return true if the email text field is empty; false, otherwise
	 */	
	function isEmptyEmail() {
		return isEmptyEmailText($('#create-email').val().trim());		
	}

	/**
	 * Implements the algorithm to check whether the email text field is empty
	 * 
	 * @param str the contents of the email text field
	 * @return true if the email text field is empty; false, otherwise
	 */
	function isEmptyEmailText(str) {
		/* If the email text field is left empty, an error message is displayed */
		if (str == '') {
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

	/**
	 * Checks whether the username text field is empty
	 * 
	 * @return true if the username text field is empty; false, otherwise
	 */	
	function isEmptyUsername() {
		return isEmptyUsernameText($('#create-username').val().trim());		
	}

	/**
	 * Implements the algorithm to check whether the username text field is empty
	 * 
	 * @param str the contents of the username text field
	 * @return true if the username text field is empty; false, otherwise
	 */
	function isEmptyUsernameText(str) {
		/* If the username text field is left empty, an error message is displayed */
		if (str == '') {
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

	/**
	 * Checks whether the password text field is empty
	 * 
	 * @return true if the password text field is empty; false, otherwise
	 */	
	function isEmptyPassword() {
		/* Do not trim the password */
		return isEmptyPasswordText($('#create-password').val());
	}

	/**
	 * Implements the algorithm to check whether the password text field is empty
	 * 
	 * @param str the contents of the password text field
	 * @return true if the password text field is empty; false, otherwise
	 */
	function isEmptyPasswordText(str) {
		/* If the password text field is left empty, an error message is displayed */
		if (str == '') {
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

	/**
	 * Checks whether the confirm password text field is empty
	 * 
	 * @return true if the confirm password text field is empty; false, otherwise
	 */	
	function isEmptyRepeatPassword() {
		/* Do not trim the confirmatory password */
		return isEmptyRepeatPasswordText($('#confirm-pass').val());
	}

	/**
	 * Implements the algorithm to check whether the confirm password text field is empty
	 * 
	 * @param str the contents of the confirm password text field
	 * @return true if the confirm password text field is empty; false, otherwise
	 */
	function isEmptyRepeatPasswordText(str) {
		/* If the confirm password text field is left empty, an error message is displayed */
		if (str == '') {
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
		} else {
			/* Disable warning if navigating away from page */
			window.onbeforeunload = null;
		}
	});
});