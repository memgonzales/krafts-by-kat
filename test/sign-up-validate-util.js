const validator = require('./validator-util.min');

const isAdminCredential = function(value) {
    /* Provide the email address and username of the administrator account as constants */
    const adminEmail = "krafts.by.kat.webmaster@gmail.com";
    const adminUsername = "kraftsbykatadmin";

    return value == adminEmail || value == adminUsername;
}

const isValidContactNumberText = function(field, contactNumber) {
    /* Assume that the input is invalid */
    let validContactNumber = false;
    
    /* Specify restrictions for the contact number */
    let isValidLength = validator.isLength(contactNumber, {min: 7, max: 12});
    let isValidCompose = validator.matches(contactNumber, /^\d+$/);
    
    /* If the contact number is between 7 to 12 characters and contains only numeric characters, it is accepted */
    if (isValidLength && isValidCompose) {
        validContactNumber = true;

    /* Otherwise, an error message is displayed and the page scrolls back to the contact number text field 
     * (if applicable)
     */
    } else {

    }

    return validContactNumber;
}

const isValidZipCodeText = function(field, zipCode) {
    /* Assume that the input is invalid */
		let validZipCode = false;
		
		/* Specify restrictions for the ZIP code*/
		let isValidLength = validator.isLength(zipCode, {min: 3, max: 4});
		let isValidCompose = validator.matches(zipCode, /^\d+$/);
		
		/* If the input is between 3 to 4 characters and is only composed of numeric characters, it is accepted */
		if (isValidLength && isValidCompose) {
			validZipCode = true;

		/* Otherwise, display an error message and scroll back to the ZIP code text field (if applicable) */
		} else {

		}

		return validZipCode;
}

const isValidPasswordText = function(field, password) {
    let validPassword = false;
		
    /* Specify restrictions for the password */
    let isValidLength = validator.isLength(password, {min: 8});
    let isValidCompose = validator.matches(password, /^(?=.*[a-zA-Z])(?=.*[0-9])/);
    
    if (isValidLength) {
        if (isValidCompose) {

            /* If the entered password is at least 8 characters long and has at least one numeric and literal 
                * character, it is accepted
                */

            validPassword = true;

        /* If the password does not contain a numeric character, display an error message 
            * and scroll back to the password text field (if applicable) 
            */
        } else {
           
        }
        
    /* If the password contains less than 8 characters, display an error message
        * and scroll back to the password text field (if applicable)
        */
    } else {

    }
    
    return validPassword;
}

const isValidConfirmPasswordText = function(field, password, confirmPassword) {
    /* Assume that the input is invalid */
    let validConfirmPassword = false;
    
    /* 
     * Omit field.is check since client-side error must be detected even if the focus 
     * is not on the confirm password field (for example, on the password field instead)
     */

     /* If the entered passwords match, the password is accepted */
    if (password == confirmPassword) {
        validConfirmPassword = true;

    /* Otherwise, display an error message and scroll back to the confirm password text field 
     * (if applicable)
     */
    } else {

    }
    
    return validConfirmPassword;
}


module.exports = {
    isAdminCredential,
    isValidContactNumberText,
    isValidZipCodeText,
    isValidPasswordText,
    isValidConfirmPasswordText
}