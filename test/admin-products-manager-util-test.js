const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const assert = require('chai').assert;
const {formatNumber,
    formatNumberIDText} = require('./admin-products-manager-util');

describe('the function to format numbers', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><div id = "sample-div"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should not place any commas on digits with less than or equal to 3 digits', function() {
        const result = formatNumberIDText('.units-sold', $('#sample-div'), '123');
        assert.equal($('#sample-div').text(), '123');
    });

    it('should place commas to separate groups of three digits', function() {
        const result = formatNumberIDText('.units-sold', $('#sample-div'), '1234567');
        assert.equal($('#sample-div').text(), '1,234,567');
    });

    it('should affix peso sign to product prices (integers)', function() {
        const result = formatNumberIDText('.item-prices', $('#sample-div'), '₱1234567');
        assert.equal($('#sample-div').text(), '₱1,234,567.00');
    });

    it('should affix peso sign to product prices (with decimal digits)', function() {
        const result = formatNumberIDText('.item-prices', $('#sample-div'), '₱1234567.84');
        assert.equal($('#sample-div').text(), '₱1,234,567.84');
    });

    it('should display exactly two decimal digits for product prices (integers)', function() {
        const result = formatNumberIDText('.item-prices', $('#sample-div'), '₱1234567');
        assert.equal($('#sample-div').text(), '₱1,234,567.00');
    });

    it('should display exactly two decimal digits for product prices (with decimal digits)', function() {
        const result = formatNumberIDText('.item-prices', $('#sample-div'), '₱1234567.50');
        assert.equal($('#sample-div').text(), '₱1,234,567.50');
    });

    it('should not display decimal digits for non-product prices', function() {
        const result = formatNumberIDText('.units-sold', $('#sample-div'), '123.4');
        assert.equal($('#sample-div').text(), '123');
    });
});

describe('the function to format all numbers inside container having the given class', function() {
    it('should handle the case when there is only one product', function() {
        const dom = new JSDOM(
            '<html><body><div id = "sample-div-1" class = "units-sold">12345</div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);

        const result = formatNumber('.units-sold');
        assert.equal($('#sample-div-1').text(), '12,345');
    });

    it('should handle the case when there are multiple products', function() {
        const dom = new JSDOM(
            '<html><body><div id = "sample-div-1" class = "units-sold">12345</div><div id = "sample-div-2" class = "units-sold">2345</div><div id = "sample-div-3" class = "units-sold">345</div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);

        const result = formatNumber('.units-sold');
        assert.equal($('#sample-div-1').text(), '12,345');
        assert.equal($('#sample-div-2').text(), '2,345');
        assert.equal($('#sample-div-3').text(), '345');
    });
});