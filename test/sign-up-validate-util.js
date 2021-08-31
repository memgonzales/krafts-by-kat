const validator = require('./validator-util.min');
$ = require('jquery');

const isAdminCredential = function(value) {
    /* Provide the email address and username of the administrator account as constants */
    const adminEmail = "krafts.by.kat.webmaster@gmail.com";
    const adminUsername = "kraftsbykatadmin";

    return value.toString().toLowerCase() == adminEmail || value.toString().toLowerCase() == adminUsername;
}

const isValidContactNumberText = function(field, contactNumber) {
    /* Assume that the input is invalid */
    let validContactNumber = false;
    
    /* Specify restrictions for the contact number */
    let isValidLength = validator.isLength(contactNumber, {min: 7, max: 12});
    let isValidCompose = validator.matches(contactNumber, /^\d+$/);
    
    /* If the contact number is between 7 to 12 characters and contains only numeric characters, it is accepted */
    if (isValidLength && isValidCompose) {
        // if (field.is($('#contact-number'))) {
            $('#contact-number-error').text('');
            $('#contact-number').css('border-color', '#CED4DA');
            $('#contact-number').css('border-width', 'thin');
        // }
        
        validContactNumber = true;

       /* Otherwise, an error message is displayed and the page scrolls back to the contact number text field 
        * (if applicable)
        */
    } else {
        // if (field.is($('#contact-number'))) {
            $('#contact-number-error').text('Enter a valid contact number');
            $('#contact-number').css('border-color', '#FF0000');
            $('#contact-number').css('border-width', '2px');
        // }
    }

    return validContactNumber;
}

const isValidContactNumber = function(field) {
    let contactNumber = validator.trim($('#contact-number').val());
	return isValidContactNumberText(field, contactNumber);
}

const isValidZipCodeText = function(field, zipCode) {
    /* Assume that the input is invalid */
    let validZipCode = false;
    
    /* Specify restrictions for the ZIP code*/
    let isValidLength = validator.isLength(zipCode, {min: 3, max: 4});
    let isValidCompose = validator.matches(zipCode, /^\d+$/);
    
    /* If the input is between 3 to 4 characters and is only composed of numeric characters, it is accepted */
    if (isValidLength && isValidCompose) {
        // if (field.is($('#zip-code'))) {
            $('#zip-code-error').text('');
            $('#zip-code').css('border-color', '#CED4DA');
            $('#zip-code').css('border-width', 'thin');
        // }
        
        validZipCode = true;

    /* Otherwise, display an error message and scroll back to the ZIP code text field (if applicable) */
    } else {
        // if (field.is($('#zip-code'))) {
            $('#zip-code-error').text('Enter a valid ZIP code');
            $('#zip-code').css('border-color', '#FF0000');
            $('#zip-code').css('border-width', '2px');
        // }
    }

    return validZipCode;
}

const isValidZipCode = function(field) {
    let zipCode = validator.trim($('#zip-code').val());
	return isValidZipCodeText(field, zipCode);
}

const isValidPasswordText = function(field, password) {
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
            // if (field.is($('#create-password'))) {
                $('#password-error').text('');
                $('#create-password').css('border-color', '#CED4DA');
                $('#create-password').css('border-width', 'thin');
            // }
            
            validPassword = true;

        /* If the password does not contain a numeric character, display an error message 
            * and scroll back to the password text field (if applicable) 
            */
        } else {
            // if (field.is($('#create-password'))) {
                $('#password-error').text('Should contain at least one number and at least one letter');
                $('#create-password').css('border-color', '#FF0000');
                $('#create-password').css('border-width', '2px');
            // }
        }
        
    /* If the password contains less than 8 characters, display an error message
        * and scroll back to the password text field (if applicable)
        */
    } else {
        // if (field.is($('#create-password'))) {
            $('#password-error').text('Should contain at least 8 characters');
            $('#create-password').css('border-color', '#FF0000');
            $('#create-password').css('border-width', '2px');
        // }
    }
    
    return validPassword;
}

const isValidPassword = function(field) {
    /* Retrieve the entered password, and do not trim */
    let password = $('#create-password').val();
    return isValidPasswordText(field, password);
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
        $('#confirm-password-error').text('');
        $('#confirm-pass').css('border-color', '#CED4DA');
        $('#confirm-pass').css('border-width', 'thin');

        validConfirmPassword = true;

    /* Otherwise, display an error message and scroll back to the confirm password text field 
        * (if applicable)
        */
    } else {
        // if (isReachedConfirmPassword) {
            $('#confirm-password-error').text('Passwords do not match');
            $('#confirm-pass').css('border-color', '#FF0000');
            $('#confirm-pass').css('border-width', '2px');
        // }
    }
    
    return validConfirmPassword;
}

const isValidConfirmPassword = function(field) {
    /* Retrieve the entered passwords, and do not trim */
    let password = $('#create-password').val();
    let confirmPassword = $('#confirm-pass').val();
    
    return isValidConfirmPasswordText(field, password, confirmPassword);
}

const isEmptyFirstNameText = function(str) {
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

const isEmptyFirstName = function() {
    return isEmptyFirstNameText($('#firstname').val().trim());
}

const isEmptySurnameText = function(str) {
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

const isEmptySurname = function() {
    return isEmptySurnameText($('#surname').val().trim());
}

const isEmptyContactText = function(str) {
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

const isEmptyContact = function() {
    return isEmptyContactText($('#contact-number').val().trim());
}

const isEmptyRegionText = function(str) {
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

const isEmptyRegion = function() {
    return isEmptyRegionText($('#region').find(':selected').text());
}

const isEmptyProvinceText = function(str) {
    /* If the region selection field is left empty, an error message is displayed */
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

const isEmptyProvince = function() {
    return isEmptyProvinceText($('#province').find(':selected').text());
}

const isEmptyCityText = function(str) {
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

const isEmptyCity = function() {
    return isEmptyCityText($('#city').find(':selected').text());
}

const isEmptyBarangayText = function(str) {
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

const isEmptyBarangay = function() {
    return isEmptyBarangayText($('#barangay').find(':selected').text());
}

const isEmptyZipCodeText = function(str) {
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

const isEmptyZipCode = function() {
    return isEmptyZipCodeText($('#zip-code').val().trim());
}

const isEmptyAddressText = function(str) {
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

const isEmptyAddress = function() {
    return isEmptyAddressText($('#address').val().trim());
}

const isEmptyEmailText = function(str) {
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

const isEmptyEmail = function() {
    return isEmptyEmailText($('#create-email').val().trim());		
}

const isEmptyUsernameText = function(str) {
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

const isEmptyUsername = function() {
    return isEmptyUsernameText($('#create-username').val().trim());		
}

const isEmptyPasswordText = function(str) {
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

const isEmptyPassword = function() {
    /* Do not trim the password */
    return isEmptyPasswordText($('#create-password').val());
}

const isEmptyRepeatPasswordText = function(str) {
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

const isEmptyRepeatPassword = function() {
    /* Do not trim the confirmatory password */
    return isEmptyRepeatPasswordText($('#confirm-pass').val());
}

module.exports = {
    isAdminCredential,
    isValidContactNumberText,
    isValidContactNumber,
    isValidZipCodeText,
    isValidZipCode,
    isValidPasswordText,
    isValidPassword,
    isValidConfirmPasswordText,
    isValidConfirmPassword,
    isEmptyFirstNameText,
    isEmptyFirstName,
    isEmptySurnameText,
    isEmptySurname,
    isEmptyContactText,
    isEmptyContact,
    isEmptyRegionText,
    isEmptyRegion,
    isEmptyProvinceText,
    isEmptyProvince,
    isEmptyCityText,
    isEmptyCity,
    isEmptyBarangayText,
    isEmptyBarangay,
    isEmptyZipCodeText,
    isEmptyZipCode,
    isEmptyAddressText,
    isEmptyAddress,
    isEmptyEmailText,
    isEmptyEmail,
    isEmptyUsernameText,
    isEmptyUsername,
    isEmptyPasswordText,
    isEmptyPassword,
    isEmptyRepeatPasswordText,
    isEmptyRepeatPassword
}