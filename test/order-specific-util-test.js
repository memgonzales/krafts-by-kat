const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const assert = require('chai').assert;
const {getOrderItemId,
    formatNumber,
    unformatNumber,
    hideProduct,
    trackRemovedOrderItems,
    removeProductFromSummary} = require('./order-specific-util');

describe('the function to extract the ID of an order item', function(){
    beforeEach(function() {
        const dom = new JSDOM(
            '<html><body><div></div></body></html>',
            {url: 'http://localhost'});

        global.window = dom.window;
        global.document = dom.window.document;   
        global.$ = global.jQuery = require('jquery')(window);
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