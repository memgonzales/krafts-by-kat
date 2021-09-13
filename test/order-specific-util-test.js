const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const assert = require('chai').assert;
const {getOrderItemId,
    formatNumber,
    unformatNumber,
    hideProduct,
    trackRemovedOrderItems,
    removeProductFromSummary} = require('./order-specific-util');

describe('the function to extract the ID of an order item', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><div></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should return a string', function() {
        $('div').attr('id', 'quantity-001');
        const result = getOrderItemId(document.getElementById('quantity-001'));
        assert.typeOf(result, 'string');
    });

    it('should handle the case when the container ID has two constituent tokens', function() {
        $('div').attr('id', 'quantity-001');
        const result = getOrderItemId(document.getElementById('quantity-001'));
        assert.equal(result, '001');
    });

    it('should handle the case when the container ID has three constituent tokens', function() {
        $('div').attr('id', 'item-price-001');
        const result = getOrderItemId(document.getElementById('item-price-001'));
        assert.equal(result, '001');
    });
});

describe('the function to format numbers', function() {
    it('should return a string', function() {
        const result = formatNumber('4567');
        assert.typeOf(result, 'string');
    });

    it('should not place any commas on numbers with less than or equal to 3 digits', function() {
        const result = formatNumber('123');
        assert.equal(result, '123.00');
    });

    it('should place commas to separate groups of three digits', function() {
        const result = formatNumber('1234567');
        assert.equal(result, '1,234,567.00');
    });

    it('should display exactly two decimal digits for product prices (integers)', function() {
        const result = formatNumber('1234567');
        assert.equal(result, '1,234,567.00');
    });

    it('should display exactly two decimal digits for product prices (with decimal digits)', function() {
        const result = formatNumber('1234567.5');
        assert.equal(result, '1,234,567.50');
    });
});

describe('the function to remove the formatting of numbers', function() {
    it('should return a string', function() {
        const result = unformatNumber('4567');
        assert.typeOf(result, 'string');
    });

    it('should not remove commas in integers with less than four digits', function() {
        const result = unformatNumber('567');
        assert.equal(result, '567');
    });

    it('should remove the comma in integers with four to six digits', function() {
        const result = unformatNumber('4,567');
        assert.equal(result, '4567');
    });

    it('should remove all the commas in integers with more than six digits', function() {
        const result = unformatNumber('4,567,890');
        assert.equal(result, '4567890');
    });

    it('should not remove the period in numbers with decimal digits', function() {
        const result = unformatNumber('4,567,890.45');
        assert.equal(result, '4567890.45');
    });
});

describe('the function to remove the selected order item from view', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><div id = "accordion-item-1"></div><div id = "accordion-item-2"></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should remove the selected order item', function() {
        const result = hideProduct(1);
        assert.equal($('#accordion-item-1').css('display'), 'none');
    });

    it('should not remove an order item that has not been selected for removal', function() {
        const result = hideProduct(2);
        assert.notEqual($('#accordion-item-1').css('display'), 'none')
    });
});

describe('the function to keep track of the order item IDs of the removed items', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><form><input type = "hidden" id = "removed-order-items"></form></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
    });

    it('should handle the case of one removed item', function() {
        trackRemovedOrderItems('a1b1');
        assert.equal($('#removed-order-items').val(), ',a1b1');
    });

    it('should handle the case of two removed items', function() {
        trackRemovedOrderItems('a1b1');
        trackRemovedOrderItems('a2b2');
        assert.equal($('#removed-order-items').val(), ',a1b1,a2b2');
    });

    it('should handle the case of three removed items', function() {
        trackRemovedOrderItems('a1b1');
        trackRemovedOrderItems('a2b2');
        trackRemovedOrderItems('a3b3');
        assert.equal($('#removed-order-items').val(), ',a1b1,a2b2,a3b3');
    });
})