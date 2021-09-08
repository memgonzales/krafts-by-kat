const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const assert = require('chai').assert;
const {hideProduct,
    trackRemovedOrderItems} = require('./order-specific-util');

describe('the function to remove the selected order item from view', function() {
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><div id = "accordion-item-1"></div><div id = "accordion-item-2"></div></html>',
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
            '<html><body><form><input type = "hidden" id = "removed-order-items"></form></html>',
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