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

    it('should display an error message if the contact number is erroneous', function() {
        $('#contact-number').val(123456);
        const result = isValidContactNumber('#contact-number') ;
        assert.equal($('#contact-number-error').text(), 'Enter a valid contact number');
    });

    it('should display a red border if the contact number is erroneous', function() {
        $('#contact-number').val(123456);
        const result = isValidContactNumber('#contact-number') ;
        assert.equal($('#contact-number').css('border-color'), '#ff0000');
    });

    it('should not display an error message if the contact number is correct', function() {
        $('#contact-number').val(09123456789);
        const result = isValidContactNumber('#contact-number') ;
        assert.equal($('#contact-number-error').text(), '');
    });

    it('should not display a red border if the contact number is correct', function() {
        $('#contact-number').val(09123456789);
        const result = isValidContactNumber('#contact-number') ;
        assert.notEqual($('#contact-number').css('border-color'), '#ff0000');
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

describe('the function to display the error message related to the zip code', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "text" id = "zip-code"><div id = "zip-code-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display an error message if the zip code is erroneous', function() {
        $('#zip-code').val(123456);
        const result = isValidZipCode('#zip-code') ;
        assert.equal($('#zip-code-error').text(), 'Enter a valid ZIP code');
    });

    it('should display a red border if the zip code is erroneous', function() {
        $('#zip-code').val(123456);
        const result = isValidZipCode('#zip-code') ;
        assert.equal($('#zip-code').css('border-color'), '#ff0000');
    });

    it('should not display an error message if the zip code is correct', function() {
        $('#zip-code').val(1234);
        const result = isValidZipCode('#zip-code') ;
        assert.equal($('#zip-code-error').text(), '');
    });

    it('should not display a red border if the zip code is correct', function() {
        $('#zip-code').val(1234);
        const result = isValidZipCode('#zip-code') ;
        assert.notEqual($('#zip-code').css('border-color'), '#ff0000');
    });
});


describe('the function to check if a given password is valid', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "password" id = "create-password"><div id = "password-error"></div></body></html>',
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


describe('the function to display the error message related to the password', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "password" id = "create-password"><div id = "password-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display the proper error message if the password is less than 8 characters', function() {
        $('#create-password').val('a1b2c3');
        const result = isValidPassword('#create-password') ;
        assert.equal($('#password-error').text(), 'Should contain at least 8 characters');
    });

    it('should display the proper error message if the password does not contain at least one letter and at least one number', function() {
        $('#create-password').val('abcdefghjik');
        const result = isValidPassword('#create-password') ;
        assert.equal($('#password-error').text(), 'Should contain at least one number and at least one letter');
    });

    it('should display a red border if the password is less than 8 characters', function() {
        $('#create-password').val('a1b2c3');
        const result = isValidPassword('#create-password') ;
        assert.equal($('#create-password').css('border-color'), '#ff0000');
    });

    it('should display a red border if the password does not contain at least one letter and at least one number', function() {
        $('#create-password').val('abcdefghijk');
        const result = isValidPassword('#create-password') ;
        assert.equal($('#create-password').css('border-color'), '#ff0000');
    });

    it('should not display an error message if the password is correct', function() {
        $('#create-password').val('a1b2c3d4');
        const result = isValidPassword('#create-password') ;
        assert.equal($('#password-error').text(), '');
    });

    it('should not display a red border if the password is erroneous', function() {
        $('#create-password').val('a1b2c3d4');
        const result = isValidPassword('#create-password') ;
        assert.notEqual($('#create-password').css('border-color'), '#ff0000');
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

describe('the function to display the error message related to the password confirmation', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "password" id = "create-password"><input type = "password" id = "confirm-pass"><div id = "confirm-password-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display an error message if the password confirmation is erroneous', function() {
        $('#create-password').val('a1b2c3d4');
        $('#confirm-pass').val('a1b2c3d5');
        const result = isValidConfirmPassword('#create-password', '#confirm-pass') ;
        assert.equal($('#confirm-password-error').text(), 'Passwords do not match');
    });

    it('should display a red border if the password confirmation is erroneous', function() {
        $('#create-password').val('a1b2c3d4');
        $('#confirm-pass').val('a1b2c3d5');
        const result = isValidConfirmPassword('#create-password', '#confirm-pass') ;
        assert.equal($('#confirm-pass').css('border-color'), '#ff0000');
    });

    it('should not display an error message if the password confirmation is correct', function() {
        $('#create-password').val('a1b2c3d4');
        $('#confirm-pass').val('a1b2c3d4');
        const result = isValidConfirmPassword('#create-password', '#confirm-pass') ;
        assert.equal($('#confirm-password-error').text(), '');
    });

    it('should not display a red border if the password confirmation is correct', function() {
        $('#create-password').val('a1b2c3d4');
        $('#confirm-pass').val('a1b2c3d4');
        const result = isValidConfirmPassword('#create-password', '#confirm-pass') ;
        assert.notEqual($('#confirm-password-errore').css('border-color'), '#ff0000');
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

describe('the function to display the error message related to empty first name', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "text" id = "firstname"><div id = "firstname-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display an error message if the first name is empty', function() {
        $('#firstname').val('')
        const result = isEmptyFirstName() ;
        assert.equal($('#firstname-error').text(), 'Required');
    });

    it('should display an error message if the first name consists only whitespaces', function() {
        $('#firstname').val('   ')
        const result = isEmptyFirstName() ;
        assert.equal($('#firstname-error').text(), 'Required');
    });

    it('should display a red border if the first name is empty', function() {
        $('#firstname').val('')
        const result = isEmptyFirstName() ;
        assert.equal($('#firstname').css('border-color'), '#ff0000');
    });

    it('should display a red border if the first name consists only whitespaces', function() {
        $('#firstname').val('     ');
        const result = isEmptyFirstName() ;
        assert.equal($('#firstname').css('border-color'), '#ff0000');
    });

    it('should not display an error message if the first name is non-empty', function() {
        $('#firstname').val('helloworld');
        const result = isEmptyFirstName() ;
        assert.equal($('#firstname-error').text(), '');
    });

    it('should not display a red border if the first name is non-empty', function() {
        $('#firstname').val('helloworld');
        const result = isEmptyFirstName() ;
        assert.notEqual($('#firstname').css('border-color'), '#ff0000');
    });
});

describe('the function to check whether a surname was entered', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "text" id = "surname"><div id = "surname-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should return false if a surname was entered', function() {
        const result = isEmptySurnameText('gianina');
        assert.equal(result, false);
    });

    it('should return true if a surname was not entered', function() {
        const result = isEmptySurnameText('');
        assert.equal(result, true);
    });
});

describe('the function to display the error message related to empty surname', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "text" id = "surname"><div id = "surname-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display an error message if the surname is empty', function() {
        $('#surname').val('')
        const result = isEmptySurname() ;
        assert.equal($('#surname-error').text(), 'Required');
    });

    it('should display an error message if the surname consists only whitespaces', function() {
        $('#surname').val('   ')
        const result = isEmptySurname() ;
        assert.equal($('#surname-error').text(), 'Required');
    });

    it('should display a red border if the surname is empty', function() {
        $('#surname').val('')
        const result = isEmptySurname() ;
        assert.equal($('#surname').css('border-color'), '#ff0000');
    });

    it('should display a red border if the surname consists only whitespaces', function() {
        $('#surname').val('     ');
        const result = isEmptySurname() ;
        assert.equal($('#surname').css('border-color'), '#ff0000');
    });

    it('should not display an error message if the surname is non-empty', function() {
        $('#surname').val('helloworld');
        const result = isEmptySurname() ;
        assert.equal($('#surname-error').text(), '');
    });

    it('should not display a red border if the surname is non-empty', function() {
        $('#surname').val('helloworld');
        const result = isEmptySurname() ;
        assert.notEqual($('#surname').css('border-color'), '#ff0000');
    });
});

describe('the function to check whether a contact number was entered', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "text" id = "contact-number"><div id = "contact-number-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should return false if a contact number was entered', function() {
        const result = isEmptyContactText('09123456789');
        assert.equal(result, false);
    });

    it('should return true if a contact number was not entered', function() {
        const result = isEmptyContactText('');
        assert.equal(result, true);
    });
});

describe('the function to display the error message related to empty contact number', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "text" id = "contact-number"><div id = "contact-number-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display an error message if the contact number is empty', function() {
        $('#contact-number').val('')
        const result = isEmptyContact() ;
        assert.equal($('#contact-number-error').text(), 'Required');
    });

    it('should display an error message if the contact number consists only whitespaces', function() {
        $('#contact-number').val('   ')
        const result = isEmptyContact() ;
        assert.equal($('#contact-number-error').text(), 'Required');
    });

    it('should display a red border if the contact number is empty', function() {
        $('#contact-number').val('')
        const result = isEmptyContact() ;
        assert.equal($('#contact-number').css('border-color'), '#ff0000');
    });

    it('should display a red border if the contact number consists only whitespaces', function() {
        $('#contact-number').val('     ');
        const result = isEmptyContact() ;
        assert.equal($('#contact-number').css('border-color'), '#ff0000');
    });

    it('should not display an error message if the contact number is non-empty', function() {
        $('#contact-number').val('09123456897');
        const result = isEmptyContact() ;
        assert.equal($('#contact-number-error').text(), '');
    });

    it('should not display a red border if the contact number is non-empty', function() {
        $('#contact-number').val('09123456897');
        const result = isEmptyContact() ;
        assert.notEqual($('#contact-number').css('border-color'), '#ff0000');
    });
});

describe('the function to check whether a region was entered', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><select id = "region"><option>NCR</option></select><div id = "region-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should return false if a region was entered', function() {
        const result = isEmptyRegionText('hello');
        assert.equal(result, false);
    });

    it('should return true if a region was not entered', function() {
        const result = isEmptyRegionText('');
        assert.equal(result, true);
    });
});

describe('the function to display the error message related to empty region', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><select id = "region"><option>NCR</option></select><div id = "region-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });


    it('should display an error message if the region is empty', function() {
        $('#region').find(':selected').text('');
        const result = isEmptyRegion() ;
        assert.equal($('#region-error').text(), 'Required');
    });

    it('should display a red border if the region is empty', function() {
        $('#region').find(':selected').text('');
        const result = isEmptyRegion() ;
        assert.equal($('#region').css('border-color'), '#ff0000');
    });

    it('should not display an error message if the region is non-empty', function() {
        $('#region').find(':selected').text('NCR');
        const result = isEmptyRegion() ;
        assert.equal($('#region-error').text(), '');
    });

    it('should not display a red border if the region is non-empty', function() {
        $('#region').find(':selected').text('NCR');
        const result = isEmptyRegion() ;
        assert.notEqual($('#region').css('border-color'), '#ff0000');
    });
});

describe('the function to check whether a province was entered', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><select id = "province"><option>NCR</option></select><div id = "province-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should return false if a province was entered', function() {
        const result = isEmptyProvinceText('hello');
        assert.equal(result, false);
    });

    it('should return true if a province was not entered', function() {
        const result = isEmptyProvinceText('');
        assert.equal(result, true);
    });
});

describe('the function to display the error message related to empty province', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><select id = "province"><option>NCR</option></select><div id = "province-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display an error message if the province is empty', function() {
        $('#province').find(':selected').text('');
        const result = isEmptyProvince() ;
        assert.equal($('#province-error').text(), 'Required');
    });

    it('should display a red border if the province is empty', function() {
        $('#province').find(':selected').text('');
        const result = isEmptyProvince() ;
        assert.equal($('#province').css('border-color'), '#ff0000');
    });

    it('should not display an error message if the province is non-empty', function() {
        $('#province').find(':selected').text('NCR');
        const result = isEmptyProvince() ;
        assert.equal($('#province-error').text(), '');
    });

    it('should not display a red border if the province is non-empty', function() {
        $('#province').find(':selected').text('NCR');
        const result = isEmptyProvince() ;
        assert.notEqual($('#province').css('border-color'), '#ff0000');
    });
});

describe('the function to check whether a city was entered', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><select id = "city"><option>NCR</option></select><div id = "city-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should return false if a city was entered', function() {
        const result = isEmptyCityText('hello');
        assert.equal(result, false);
    });

    it('should return true if a city was not entered', function() {
        const result = isEmptyCityText('');
        assert.equal(result, true);
    });
});

describe('the function to display the error message related to empty city', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><select id = "city"><option>NCR</option></select><div id = "city-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display an error message if the city is empty', function() {
        $('#city').find(':selected').text('');
        const result = isEmptyCity() ;
        assert.equal($('#city-error').text(), 'Required');
    });

    it('should display a red border if the city is empty', function() {
        $('#city').find(':selected').text('');
        const result = isEmptyCity() ;
        assert.equal($('#city').css('border-color'), '#ff0000');
    });

    it('should not display an error message if the city is non-empty', function() {
        $('#city').find(':selected').text('NCR');
        const result = isEmptyCity() ;
        assert.equal($('#city-error').text(), '');
    });

    it('should not display a red border if the city is non-empty', function() {
        $('#city').find(':selected').text('NCR');
        const result = isEmptyCity() ;
        assert.notEqual($('#city').css('border-color'), '#ff0000');
    });
});

describe('the function to check whether a barangay was entered', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><select id = "barangay"><option>NCR</option></select><div id = "barangay-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should return false if a barangay was entered', function() {
        const result = isEmptyBarangayText('hello');
        assert.equal(result, false);
    });

    it('should return true if a barangay was not entered', function() {
        const result = isEmptyBarangayText('');
        assert.equal(result, true);
    });
});

describe('the function to display the error message related to empty barangay', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><select id = "barangay"><option>NCR</option></select><div id = "barangay-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display an error message if the barangay is empty', function() {
        $('#barangay').find(':selected').text('');
        const result = isEmptyBarangay() ;
        assert.equal($('#barangay-error').text(), 'Required');
    });

    it('should display a red border if the barangay is empty', function() {
        $('#barangay').find(':selected').text('');
        const result = isEmptyBarangay() ;
        assert.equal($('#barangay').css('border-color'), '#ff0000');
    });

    it('should not display an error message if the barangay is non-empty', function() {
        $('#barangay').find(':selected').text('NCR');
        const result = isEmptyBarangay() ;
        assert.equal($('#barangay-error').text(), '');
    });

    it('should not display a red border if the barangay is non-empty', function() {
        $('#barangay').find(':selected').text('NCR');
        const result = isEmptyBarangay() ;
        assert.notEqual($('#barangay').css('border-color'), '#ff0000');
    });
});

describe('the function to check whether a ZIP code was entered', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "number" id = "zip-code"><div id = "zip-code-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should return false if a ZIP code was entered', function() {
        const result = isEmptyZipCodeText('1230');
        assert.equal(result, false);
    });

    it('should return true if a ZIP code was not entered', function() {
        const result = isEmptyZipCodeText('');
        assert.equal(result, true);
    });
});

describe('the function to display the error message related to empty ZIP code', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "number" id = "zip-code"><div id = "zip-code-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display an error message if the ZIP code is empty', function() {
        $('#zip-code').val('');
        const result = isEmptyZipCode() ;
        assert.equal($('#zip-code-error').text(), 'Required');
    });

    it('should display an error message if the ZIP code consists only whitespaces', function() {
        $('#zip-code').val('   ');
        const result = isEmptyZipCode() ;
        assert.equal($('#zip-code-error').text(), 'Required');
    });

    it('should display a red border if the ZIP code is empty', function() {
        $('#zip-code').val('')
        const result = isEmptyZipCode() ;
        assert.equal($('#zip-code').css('border-color'), '#ff0000');
    });

    it('should display a red border if the ZIP code consists only whitespaces', function() {
        $('#zip-code').val('     ');
        const result = isEmptyZipCode() ;
        assert.equal($('#zip-code').css('border-color'), '#ff0000');
    });

    it('should not display an error message if the ZIP code is non-empty', function() {
        $('#zip-code').val('1230');
        const result = isEmptyZipCode() ;
        assert.equal($('#zip-code-error').text(), '');
    });

    it('should not display a red border if the ZIP code is non-empty', function() {
        $('#zip-code').val('1230');
        const result = isEmptyZipCode() ;
        assert.notEqual($('#zip-code').css('border-color'), '#ff0000');
    });
});

describe('the function to check whether an address was entered', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "text" id = "address"><div id = "address-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should return false if an address was entered', function() {
        const result = isEmptyAddressText('1230');
        assert.equal(result, false);
    });

    it('should return true if an address was not entered', function() {
        const result = isEmptyAddressText('');
        assert.equal(result, true);
    });
});

describe('the function to display the error message related to empty address', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "text" id = "address"><div id = "address-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display an error message if the address is empty', function() {
        $('#address').val('');
        const result = isEmptyAddress() ;
        assert.equal($('#address-error').text(), 'Required');
    });

    it('should display an error message if the address consists only whitespaces', function() {
        $('#address').val('   ');
        const result = isEmptyAddress() ;
        assert.equal($('#address-error').text(), 'Required');
    });

    it('should display a red border if the address is empty', function() {
        $('#address').val('')
        const result = isEmptyAddress() ;
        assert.equal($('#address').css('border-color'), '#ff0000');
    });

    it('should display a red border if the address consists only whitespaces', function() {
        $('#address').val('     ');
        const result = isEmptyAddress() ;
        assert.equal($('#address').css('border-color'), '#ff0000');
    });

    it('should not display an error message if the address is non-empty', function() {
        $('#address').val('hello');
        const result = isEmptyAddress() ;
        assert.equal($('#address-error').text(), '');
    });

    it('should not display a red border if the address is non-empty', function() {
        $('#address').val('hello');
        const result = isEmptyAddress() ;
        assert.notEqual($('#address').css('border-color'), '#ff0000');
    });
});

describe('the function to check whether an email address was entered', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "email" id = "create-email"><div id = "email-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should return false if an email address was entered', function() {
        const result = isEmptyEmailText('sample@sample.com');
        assert.equal(result, false);
    });

    it('should return true if an email address was not entered', function() {
        const result = isEmptyEmailText('');
        assert.equal(result, true);
    });
});

describe('the function to display the error message related to empty email address', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "email" id = "create-email"><div id = "email-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display an error message if the email address is empty', function() {
        $('#create-email').val('');
        const result = isEmptyEmail() ;
        assert.equal($('#email-error').text(), 'Required');
    });

    it('should display an error message if the email address consists only whitespaces', function() {
        $('#create-email').val('   ');
        const result = isEmptyEmail() ;
        assert.equal($('#email-error').text(), 'Required');
    });

    it('should display a red border if the email address is empty', function() {
        $('#create-email').val('')
        const result = isEmptyEmail() ;
        assert.equal($('#create-email').css('border-color'), '#ff0000');
    });

    it('should display a red border if the email address consists only whitespaces', function() {
        $('#create-email').val('     ');
        const result = isEmptyEmail() ;
        assert.equal($('#create-email').css('border-color'), '#ff0000');
    });

    it('should not display an error message if the email address is non-empty', function() {
        $('#create-email').val('hello');
        const result = isEmptyEmail() ;
        assert.equal($('#email-error').text(), '');
    });

    it('should not display a red border if the email address is non-empty', function() {
        $('#create-email').val('hello');
        const result = isEmptyEmail() ;
        assert.notEqual($('#create-email').css('border-color'), '#ff0000');
    });
});

describe('the function to check whether a username was entered', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "text" id = "create-username"><div id = "username-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should return false if a username was entered', function() {
        const result = isEmptyUsernameText('hello');
        assert.equal(result, false);
    });

    it('should return true if a username was not entered', function() {
        const result = isEmptyUsernameText('');
        assert.equal(result, true);
    });
});

describe('the function to display the error message related to empty username', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "text" id = "create-username"><div id = "username-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display an error message if the username is empty', function() {
        $('#create-username').val('');
        const result = isEmptyUsername() ;
        assert.equal($('#username-error').text(), 'Required');
    });

    it('should display an error message if the username consists only whitespaces', function() {
        $('#create-username').val('   ');
        const result = isEmptyUsername() ;
        assert.equal($('#username-error').text(), 'Required');
    });

    it('should display a red border if the username is empty', function() {
        $('#create-username').val('')
        const result = isEmptyUsername() ;
        assert.equal($('#create-username').css('border-color'), '#ff0000');
    });

    it('should display a red border if the username consists only whitespaces', function() {
        $('#create-username').val('     ');
        const result = isEmptyUsername() ;
        assert.equal($('#create-username').css('border-color'), '#ff0000');
    });

    it('should not display an error message if the username is non-empty', function() {
        $('#create-username').val('hello');
        const result = isEmptyUsername() ;
        assert.equal($('#username-error').text(), '');
    });

    it('should not display a red border if the username is non-empty', function() {
        $('#create-username').val('hello');
        const result = isEmptyUsername() ;
        assert.notEqual($('#create-username').css('border-color'), '#ff0000');
    });
});

describe('the function to check whether a password was entered', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "password" id = "create-password"><div id = "password-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should return false if a password was entered', function() {
        const result = isEmptyPasswordText('a1b2c3d4');
        assert.equal(result, false);
    });

    it('should return true if a password was not entered', function() {
        const result = isEmptyPasswordText('');
        assert.equal(result, true);
    });
});

describe('the function to display the error message related to empty password', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "password" id = "create-password"><div id = "password-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display an error message if the password is empty', function() {
        $('#create-password').val('');
        const result = isEmptyPassword() ;
        assert.equal($('#password-error').text(), 'Required');
    });

    it('should not display an error message if the password consists only whitespaces', function() {
        $('#create-password').val('   ');
        const result = isEmptyPassword() ;
        assert.equal($('#password-error').text(), '');
    });

    it('should display a red border if the password is empty', function() {
        $('#create-password').val('')
        const result = isEmptyPassword() ;
        assert.equal($('#create-password').css('border-color'), '#ff0000');
    });

    it('should not display a red border if the password consists only whitespaces', function() {
        $('#create-password').val('     ');
        const result = isEmptyPassword() ;
        assert.notEqual($('#create-password').css('border-color'), '#ff0000');
    });

    it('should not display an error message if the password is non-empty', function() {
        $('#create-password').val('a1b2c3d4');
        const result = isEmptyPassword() ;
        assert.equal($('#password-error').text(), '');
    });

    it('should not display a red border if the password is non-empty', function() {
        $('#create-password').val('a1b2c3d4');
        const result = isEmptyPassword() ;
        assert.notEqual($('#create-password').css('border-color'), '#ff0000');
    });
});

describe('the function to check whether a confirmatory password was entered', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "password" id = "confirm-pass"><div id = "confirm-password-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should return false if a password was entered', function() {
        const result = isEmptyRepeatPasswordText('a1b2c3d4');
        assert.equal(result, false);
    });

    it('should return true if a password was not entered', function() {
        const result = isEmptyRepeatPasswordText('');
        assert.equal(result, true);
    });
});

describe('the function to display the error message related to empty confirmatory password', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><input type = "password" id = "confirm-pass"><div id = "confirm-password-error"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should display an error message if the confirmatory password is empty', function() {
        $('#confirm-pass').val('');
        const result = isEmptyRepeatPassword() ;
        assert.equal($('#confirm-password-error').text(), 'Required');
    });

    it('should not display an error message if the confirmatory password consists only whitespaces', function() {
        $('#confirm-pass').val('   ');
        const result = isEmptyRepeatPassword() ;
        assert.equal($('#confirm-password-error').text(), '');
    });

    it('should display a red border if the confirmatory password is empty', function() {
        $('#confirm-pass').val('')
        const result = isEmptyRepeatPassword() ;
        assert.equal($('#confirm-pass').css('border-color'), '#ff0000');
    });

    it('should not display a red border if the confirmatory password consists only whitespaces', function() {
        $('#confirm-pass').val('     ');
        const result = isEmptyRepeatPassword() ;
        assert.notEqual($('#confirm-pass').css('border-color'), '#ff0000');
    });

    it('should not display an error message if the confirmatory password is non-empty', function() {
        $('#confirm-pass').val('a1b2c3d4');
        const result = isEmptyRepeatPassword() ;
        assert.equal($('#confirm-password-error').text(), '');
    });

    it('should not display a red border if the confirmatory password is non-empty', function() {
        $('#confirm-pass').val('a1b2c3d4');
        const result = isEmptyRepeatPassword() ;
        assert.notEqual($('#confirm-password-error').css('border-color'), '#ff0000');
    });
});