const assert = require('chai').assert;
const {formatNumberIDText} = require('./view-products-util');

describe('the function to format numbers', function() {
    it('should not place any commas on digits with less than or equal to 3 digits', function() {
        const result = formatNumberIDText('#units-sold', '123');
        assert.equal(result, '123');
    });

    it('should place commas to separate groups of three digits', function() {
        const result = formatNumberIDText('#units-available', '1234567');
        assert.equal(result, '1,234,567')
    });

    it('should affix peso sign to product prices (integers)', function() {
        const result = formatNumberIDText('#product-price-num', '₱1234567');
        assert.equal(result, '₱1,234,567')
    });

    it('should affix peso sign to product prices (with decimal digits)', function() {
        const result = formatNumberIDText('#product-price-num', '₱1234567.84');
        assert.equal(result, '₱1,234,567.84')
    });

    it('should display up to two decimal digits only', function() {
        const result = formatNumberIDText('#product-price-num', '₱1234567.50');
        assert.equal(result, '₱1,234,567.50')
    });
});

