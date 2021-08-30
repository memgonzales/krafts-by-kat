const assert = require('chai').assert;
const {isAdminCredential} = require('./sign-up-validate-util');

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