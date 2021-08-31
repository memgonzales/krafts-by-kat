const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const assert = require('chai').assert;
const {isAdminCredential,
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
    isEmptyRepeatPassword} = require('./sign-up-validate-util');

describe('the function to check if the user input is the same as the email address or username of the administrator account', function() {
    it('should return a Boolean', function() {
        const result = isAdminCredential('krafts.by.kat.webmaster@gmail.com');
        assert.isBoolean(result);
    });

    it('should return true if the username is that of the administrator', function() {
        const result = isAdminCredential('kraftsbykatadmin');
        assert.equal(result, true);
    });

    it('should return true if the username (uppercase) is that of the administrator', function() {
        const result = isAdminCredential('KRAFTSBYKATADMIN');
        assert.equal(result, true);
    });

    it('should return true if the email is that of the administrator', function() {
        const result = isAdminCredential('krafts.by.kat.webmaster@gmail.com');
        assert.equal(result, true);
    });

    it('should return true if the email (uppercase) is that of the administrator', function() {
        const result = isAdminCredential('KRAFTS.BY.KAT.WEBMASTER@GMAIL.COM');
        assert.equal(result, true);
    });

    it('should return false if the email is not that of the administrator', function() {
        const result = isAdminCredential('krafts.by.kat.webmaster@dlsu.edu.ph');
        assert.equal(result, false);
    });

    it('should return false if the username is not that of the administrator', function() {
        const result = isAdminCredential('boogiepop');
        assert.equal(result, false);
    });
});

describe('the function to check if a given contact number is valid', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "text" id = "contact-number"><div id = "contact-number-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should return a Boolean', function() {
        const result = isValidContactNumberText('#hello', '09123456789');
        assert.isBoolean(result);
    });

    it('should return true if the contact number is 7 digits long', function() {
        const result = isValidContactNumberText('#hello', '1234567');
        assert.equal(result, true);
    });

    it('should return true if the contact number is 12 digits long', function() {
        const result = isValidContactNumberText('#hello', '639123456789');
        assert.equal(result, true);
    });

    it('should return true if the contact number is between 7 and 12 digits long', function() {
        const result = isValidContactNumberText('#hello', '09123456789');
        assert.equal(result, true);
    });

    it('should return false if the contact number is less than 7 digits long', function() {
        const result = isValidContactNumberText('#hello', '403931');
        assert.equal(result, false);
    });

    it('should return false if the contact number is more than 12 digits long', function() {
        const result = isValidContactNumberText('#hello', '6391234567890');
        assert.equal(result, false);
    });
});

describe('the function to display the error message related to the contact number', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "text" id = "contact-number"><div id = "contact-number-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    
});


describe('the function to check if a given zip code is valid', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "text" id = "zip-code"><div id = "zip-code-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });


    it('should return a Boolean', function() {
        const result = isValidZipCodeText('#hello', '1234');
        assert.isBoolean(result);
    });

    it('should return true if the zip code is 3 digits long', function() {
        const result = isValidZipCodeText('#hello', '700');
        assert.equal(result, true);
    });

    it('should return true if the zip code is 4 digits long', function() {
        const result = isValidZipCodeText('#hello', '1234');
        assert.equal(result, true);
    });

    it('should return false if the zip code is less than 3 digits long', function() {
        const result = isValidZipCodeText('#hello', '12');
        assert.equal(result, false);
    });

    it('should return false if the zip code is more than 4 digits long', function() {
        const result = isValidZipCodeText('#hello', '12345');
        assert.equal(result, false);
    });
});

describe('the function to check if a given password is valid', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "text" id = "create-password"><div id = "password-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });


    it('should return a Boolean', function() {
        const result = isValidPasswordText('#hello', 'boogiepop');
        assert.isBoolean(result);
    });

    it('should return true if the password is 8 characters long, and contains at least one letter and one number', function() {
        const result = isValidPasswordText('#hello', 'abcdefg2');
        assert.equal(result, true);
    });

    it('should return true if the password is more than 8 characters long, and contains at least one letter and one number', function() {
        const result = isValidPasswordText('#hello', 'abcdefghijkl123');
        assert.equal(result, true);
    });

    it('should return true if the password is at least 8 characters long, and contains a number before a sequence of letters', function() {
        const result = isValidPasswordText('#hello', '1abcdefghij');
        assert.equal(result, true);
    });

    it('should return true if the password is at least 8 characters long, and contains a letter before a sequence of numbers', function() {
        const result = isValidPasswordText('#hello', 'a12345678');
        assert.equal(result, true);
    });

    it('should return false if the password is at least 8 characters long, and contains a series of numbers and letters', function() {
        const result = isValidPasswordText('#hello', 'a1b2c3d4e5');
        assert.equal(result, true);
    });

    it('should return false if the password is less than 8 characters long, and contains a number before a sequence of letters', function() {
        const result = isValidPasswordText('#hello', '1abc');
        assert.equal(result, false);
    });

    it('should return false if the password is less than 8 characters long and contains a letter before a sequence of numbers', function() {
        const result = isValidPasswordText('#hello', 'a1234');
        assert.equal(result, false);
    });

    it('should return false if the password is less than 8 characters long, and contains a series of numbers and letters', function() {
        const result = isValidPasswordText('#hello', 'a1b2c3');
        assert.equal(result, false);
    });

    it('should return false if the password is at least 8 characters long, and contains only numbers', function() {
        const result = isValidPasswordText('#hello', '123456789');
        assert.equal(result, false);
    });

    it('should return false if the password is at least 8 characters long, and contains only letters', function() {
        const result = isValidPasswordText('#hello', 'abcdefghik');
        assert.equal(result, false);
    });
    
    it('should return false if the password is at least 8 characters long, and contains only special characters', function() {
        const result = isValidPasswordText('#hello', '!@#$%^&*()');
        assert.equal(result, false);
    });

    it('should return false if the password is at least 8 characters long, and contains only numbers and special characters', function() {
        const result = isValidPasswordText('#hello', '123!@#$%^&*()');
        assert.equal(result, false);
    });

    it('should return false if the password is at least 8 characters long, and contains only letters and special characters', function() {
        const result = isValidPasswordText('#hello', 'abc!@#$%&*()');
        assert.equal(result, false);
    });
});

describe('the function to check whether the password for confirmation is equal to the first entered password', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "password" id = "create-password"><input type = "password" id = "confirm-pass"><div id = "confirm-password-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });


    it('should return a Boolean', function() {
        const result = isValidConfirmPasswordText('#hello', 'boogiepop1', 'boogiepop1');
        assert.isBoolean(result)
    });

    it('should return true if the password and the confirmatory password are the same', function() {
        const result = isValidConfirmPasswordText('#hello', 'boogiepop1', 'boogiepop1');
        assert.equal(result, true)
    });

    it('should return false if the password and the confirmatory password are different', function() {
        const result = isValidConfirmPasswordText('#hello', 'boogiepop1', 'boogiepop2');
        assert.equal(result, false)
    });
});

describe('the function to check whether a first name was entered', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "text" id = "firstname"><div id = "firstname-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should return false if a first name was entered', function() {
        const result = isEmptyFirstNameText('gianina');
        assert.equal(result, false);
    });

    it('should return true if a first name was not entered', function() {
        const result = isEmptyFirstNameText('');
        assert.equal(result, true);
    });
});

