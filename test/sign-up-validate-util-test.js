const assert = require('chai').assert;
const {isAdminCredential,
    isValidContactNumberText,
    isValidZipCodeText,
    isValidPasswordText} = require('./sign-up-validate-util');

describe('the function to check if the user input is the same as the email address or username of the administrator account', function() {
    it('should return a Boolean', function() {
        const result = isAdminCredential('krafts.by.kat.webmaster@gmail.com');
        assert.isBoolean(result);
    });

    it('should return true if the username is that of the administrator', function() {
        const result = isAdminCredential('kraftsbykatadmin');
        assert.equal(result, true);
    });

    it('should return true if the email is that of the administrator', function() {
        const result = isAdminCredential('krafts.by.kat.webmaster@gmail.com');
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

describe('the function to check if a given zip code is valid', function() {
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

    it('should return true if the password is at least 8 characters long, and contains a series of numbers and letters', function() {
        const result = isValidPasswordText('#hello', 'a1b2c3d4e5');
        assert.equal(result, true);
    });

});


