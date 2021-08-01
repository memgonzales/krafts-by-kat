$(document).ready(function() {
	/* Variables for preventing expensive database queries */
	let isValidUsername = false;
	let isChangedUsername = true;
	
	function isUniqueUsername(field, callback) {
		let username = validator.trim($('#create-username').val());
		let data = {username: username};
		
		$.get('/getCheckUsername', data, function(result) {
			if (result.username != username) {
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
		
		if (password == confirmPassword) {
			$('#confirm-password-error').text('');
			validConfirmPassword = true;
		} else {
			$('#confirm-password-error').text('Passwords do not match');
		}
		
		return validConfirmPassword;
	}
	
	function validateField(field, fieldName, error) {
		let value = validator.trim(field.val());
		
		let validPassword = isValidPassword(field);
		let validConfirmPassword = isValidConfirmPassword(field);
		
		/* There is a change in the username input by the user */
		if (isChangedUsername) {
			isChangedUsername = false;
			
			/* Check since it is still not a valid username */
			if (!isValidUsername) {
				isUniqueUsername(field, function(uniqueUsername) {
					if (validPassword && validConfirmPassword && uniqueUsername) {
						alert("a");
						$('#signup-submit').prop('disabled', false);
					} else {
						alert("b");
						$('#signup-submit').prop('disabled', true);
					}
				});
				
			} else {
				/* Do not check anymore since it is already a valid username */
				if (validPassword && validConfirmPassword) {
					alert("c");
					$('#signup-submit').prop('disabled', false);
				} else {
					alert("d");
					$('#signup-submit').prop('disabled', true);
				}
			}
			
		} else {
			/* There is no change in the username input by the user */
			if (validPassword && validConfirmPassword && isValidUsername) {
				alert("e");
				$('#signup-submit').prop('disabled', false);
			} else {
				alert("f");
				$('#signup-submit').prop('disabled', true);
			}
		}
	}
	
	$('#create-username').keyup(function() {
		isValidUsername = false;
		isChangedUsername = true;
		
		validateField($('#create-username'), '', $('#username-error'));
	});
	
	$('#create-password').keyup(function() {
		validateField($('#create-password'), '', $('#password-error'));
	});
	
	$('#confirm-pass').keyup(function() {
		validateField($('#confirm-pass'), '', $('#confirm-password-error'));
	});
});