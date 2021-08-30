const assert = require('chai').assert;
const {formatNumberIDText, 
    getPicturesPaths,
    isPlaceholder} = require('./view-product-util');

describe('the function to format numbers', function() {
    it('should return a string', function() {
        const result = formatNumberIDText('#units-sold', '4567');
        assert.typeOf(result, 'string');
    });

    it('should not place any commas on digits with less than or equal to 3 digits', function() {
        const result = formatNumberIDText('#units-sold', '123');
        assert.equal(result, '123');
    });

    it('should place commas to separate groups of three digits', function() {
        const result = formatNumberIDText('#units-available', '1234567');
        assert.equal(result, '1,234,567');
    });

    it('should affix peso sign to product prices (integers)', function() {
        const result = formatNumberIDText('#product-price', '₱1234567');
        assert.equal(result, '₱1,234,567.00');
    });

    it('should affix peso sign to product prices (with decimal digits)', function() {
        const result = formatNumberIDText('#product-price', '₱1234567.84');
        assert.equal(result, '₱1,234,567.84');
    });

    it('should display exactly two decimal digits for product prices (integers)', function() {
        const result = formatNumberIDText('#product-price', '₱1234567');
        assert.equal(result, '₱1,234,567.00');
    });

    it('should display exactly two decimal digits for product prices (with decimal digits)', function() {
        const result = formatNumberIDText('#product-price', '₱1234567.50');
        assert.equal(result, '₱1,234,567.50');
    });

    it('should not display decimal digits for non-product prices', function() {
        const result = formatNumberIDText('#units-available', '123.4');
        assert.equal(result, '123');
    });
});

describe('the function to get the paths of the product photos', function() {
    it('should return an array', function() {
        const result = getPicturesPaths('');
        assert.typeOf(result, 'array');
    });

    it('should return a single-element array if the path string does not contain any path', function() {
        const result = getPicturesPaths('');
        assert.lengthOf(result, 1);
    });

    it('should return a single-element array if the path string contains only a single path', function() {
        const result = getPicturesPaths('img1.png');
        assert.lengthOf(result, 1);
    });

    it('should return a two-element array if the path string contains two paths', function() {
        const result = getPicturesPaths('img1.png,img2.png');
        assert.lengthOf(result, 2);
    });

    it('should return a three-element array if the path string contains three paths', function() {
        const result = getPicturesPaths('img1.png,img2.png,img3.png');
        assert.lengthOf(result, 3);
    });
});

describe('the function to check if the first photo is merely a placeholder', function() {
    it('should return a Boolean', function() {
        const result = isPlaceholder(['/img/placeholder/no-image.png', 'img1.png'], '/img/placeholder/no-image.png');
        assert.isBoolean(result);
    });

    it('should return true if the first photo is a placeholder', function() {
        const result = isPlaceholder(['/img/placeholder/no-image.png', 'img1.png'], '/img/placeholder/no-image.png');
        assert.equal(result, true);
    });

    it('should return true if the first photo is a placeholder', function() {
        const result = isPlaceholder(['img1.png', 'img2.png'], '/img/placeholder/no-image.png');
        assert.equal(result, false);
    });
});

