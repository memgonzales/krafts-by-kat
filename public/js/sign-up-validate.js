$(document).ready(function() {
	/* Variables for preventing repetitive database queries */
	let isValidUsername = false;
	let isChangedUsername = false;
	
	let isValidEmail = false;
	let isChangedEmail = false;
	
	let isReachedConfirmPassword = false;

	let isSubmitButtonDisabled = false;
	
	const adminEmail = "krafts.by.kat.webmaster@gmail.com";
	const adminUsername = "kraftsbykatadmin";
	
	function isAdminCredential(value) {
		return value == adminEmail || value == adminUsername;
	}
	
	function isValidContactNumber(field) {
		let validContactNumber = false;
		
		let contactNumber = validator.trim($('#contact-number').val());
		let isValidLength = validator.isLength(contactNumber, {min: 7, max: 12});
		let isValidCompose = validator.matches(contactNumber, /^\d+$/);
		
		if (isValidLength && isValidCompose) {
			if (field.is($('#contact-number'))) {
				$('#contact-number-error').text('');
			}
			
			validContactNumber = true;
		} else {
			if (field.is($('#contact-number'))) {
				$('#contact-number-error').text('Enter a valid contact number');
			}
		}

		return validContactNumber;
	}
	
	function isValidZipCode(field) {
		let validZipCode = false;
		
		let zipCode = validator.trim($('#zip-code').val());
		let isValidLength = validator.isLength(zipCode, {min: 3, max: 4});
		let isValidCompose = validator.matches(zipCode, /^\d+$/);
		
		if (isValidLength && isValidCompose) {
			if (field.is($('#zip-code'))) {
				$('#zip-code-error').text('');
			}
			
			validZipCode = true;
		} else {
			if (field.is($('#zip-code'))) {
				$('#zip-code-error').text('Enter a valid ZIP code');
			}
		}

		return validZipCode;
	}
	
	function isUniqueEmail(field, callback) {
		let emailAddress = validator.trim($('#create-email').val());
		let data = {emailAddress: emailAddress};
		
		$.get('/getCheckEmail', data, function(result) {
			if (result.emailAddress != emailAddress && !isAdminCredential(emailAddress)) {
				if (field.is($('#create-email'))) {
					$('#email-error').text('');
				}
				
				isValidEmail = true;
				
				return callback(true);
				
			} else {
				if (field.is($('#create-email'))) {
					$('#email-error').text('Email is already in use');
				}
				
				isValidEmail = false;
				
				return callback(false);
			}
		});
	}
	
	function isUniqueUsername(field, callback) {
		let username = validator.trim($('#create-username').val());
		let data = {username: username};
		
		$.get('/getCheckUsername', data, function(result) {
			if (result.username != username && !isAdminCredential(username)) {
				if (field.is($('#create-username'))) {
					$('#username-error').text('');
				}
				
				isValidUsername = true;
				
				return callback(true);
				
			} else {
				if (field.is($('#create-username'))) {
					$('#username-error').text('Username has already been taken');
				}
				
				isValidUsername = false;
				
				return callback(false);
			}
		});
	}
	
	function isValidPassword(field) {
		let validPassword = false;
		
		let password = validator.trim($('#create-password').val());
		let isValidLength = validator.isLength(password, {min: 8});
		let isValidCompose = validator.matches(password, /.*[0-9].*/);
		
		if (isValidLength) {
			if (isValidCompose) {
				if (field.is($('#create-password'))) {
					$('#password-error').text('');
				}
				
				validPassword = true;
			} else {
				if (field.is($('#create-password'))) {
					$('#password-error').text('Should contain at least one number');
				}
			}
			
		} else {
			if (field.is($('#create-password'))) {
				$('#password-error').text('Should contain at least 8 characters');
			}
		}
		
		return validPassword;
	}
	
	function isValidConfirmPassword(field) {
		let validConfirmPassword = false;
		
		let password = validator.trim($('#create-password').val());
		let confirmPassword = validator.trim($('#confirm-pass').val());
		
		/* 
		 * Omit field.is check since client-side error must be detected even if the focus 
		 * is not on the confirm password field (for example, on the password field instead)
		 */
		if (password == confirmPassword) {
			$('#confirm-password-error').text('');
			validConfirmPassword = true;
		} else {
			if (isReachedConfirmPassword) {
				$('#confirm-password-error').text('Passwords do not match');
			}
		}
		
		return validConfirmPassword;
	}
	
	function validateField(field, fieldName, error) {
		let value = validator.trim(field.val());
		
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
									// $('#signup-submit').prop('disabled', false);
									isSubmitButtonDisabled = false;
								} else {
									// $('#signup-submit').prop('disabled', true);
									isSubmitButtonDisabled = true;
								}
							});
							
						} else {
							/* Do not check anymore since it is already a valid username */
							if (validPassword && validConfirmPassword && validContactNumber && validZipCode && uniqueEmail && nonAdmin) {
								// $('#signup-submit').prop('disabled', false);
								isSubmitButtonDisabled = false;
							} else {
								// $('#signup-submit').prop('disabled', true);
								isSubmitButtonDisabled = true;
							}
						}
						
					} else {
						/* There is no change in the username input by the user */
						
						/* Use the global isValidUsername for efficiency */
						if (validPassword && validConfirmPassword && isValidUsername && validContactNumber && validZipCode && uniqueEmail && nonAdmin) {
							// $('#signup-submit').prop('disabled', false);
							isSubmitButtonDisabled = false;
						} else {
							// $('#signup-submit').prop('disabled', true);
							isSubmitButtonDisabled = true;
						}
					}
				});
				
			} else {
				/* Do not check anymore since it is already a valid email */
				
				/* There is a change in the username input by the user */
				if (isChangedUsername) {
					isChangedUsername = false;
					
					/* Check since it is still not a valid username */
					if (!isValidUsername) {
						isUniqueUsername(field, function(uniqueUsername) {
							if (validPassword && validConfirmPassword && uniqueUsername && validContactNumber && validZipCode && nonAdmin) {
								// $('#signup-submit').prop('disabled', false);
								isSubmitButtonDisabled = false;
							} else {
								// $('#signup-submit').prop('disabled', true);
								isSubmitButtonDisabled = true;
							}
						});
						
					} else {
						/* Do not check anymore since it is already a valid username */
						if (validPassword && validConfirmPassword && validContactNumber && validZipCode && nonAdmin) {
							// $('#signup-submit').prop('disabled', false);
							isSubmitButtonDisabled = false;
						} else {
							// $('#signup-submit').prop('disabled', true);
							isSubmitButtonDisabled = true;
						}
					}
					
				} else {
					/* There is no change in the username input by the user */
					
					/* Use the global isValidUsername for efficiency */
					if (validPassword && validConfirmPassword && isValidUsername && validContactNumber && validZipCode && nonAdmin) {
						// $('#signup-submit').prop('disabled', false);
						isSubmitButtonDisabled = false;
					} else {
						// $('#signup-submit').prop('disabled', true);
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
							// $('#signup-submit').prop('disabled', false);
							isSubmitButtonDisabled = false;
						} else {
							// $('#signup-submit').prop('disabled', true);
							isSubmitButtonDisabled = true;
						}
					});
					
				} else {
					/* Do not check anymore since it is already a valid username */
					if (validPassword && validConfirmPassword && validContactNumber && validZipCode && isValidEmail && nonAdmin) {
						// $('#signup-submit').prop('disabled', false);
						isSubmitButtonDisabled = false;
					} else {
						// $('#signup-submit').prop('disabled', true);
						isSubmitButtonDisabled = true;
					}
				}
				
			} else {
				/* 
				 * There is no change in the username input by the user
				 * Use the global isValidUsername for efficiency 
				 */
				if (validPassword && validConfirmPassword && isValidUsername && validContactNumber && validZipCode && isValidEmail && nonAdmin) {
					// $('#signup-submit').prop('disabled', false);
					isSubmitButtonDisabled = false;
				} else {
					// $('#signup-submit').prop('disabled', true);
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
		}
	});
});