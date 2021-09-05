const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const assert = require('chai').assert;
const {logInError} = require('./log-in-util');

describe('the function to format the fields when invalid credentials are entered', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><div id = "error-text"></div><input type = "password" id = "password"></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should change the color of the error text to red', function() {
        const result = logInError();
        assert.equal($('#error-text').css('color'), 'rgb(199, 0, 57)');
    });

    it('should empty the password field', function() {
        const result = logInError();
        assert.equal($('#password').val(), '');
    })
});


